/**
 * POST /api/contact — sends the "Request a quote" form through Gmail SMTP.
 *
 * Flow for every valid submission:
 *   1. Notification to the business inbox (CONTACT_RECEIVER) with all form details.
 *      Reply-To is the visitor, so hitting "Reply" answers them directly.
 *   2. Confirmation (auto-reply) to the visitor with a summary of what they sent.
 *      Reply-To is the business inbox.
 *
 * SMTP credentials stay on the server (see .env.example). Gmail requires an App Password
 * (Google Account → Security → 2-Step Verification → App passwords), not your normal password.
 */
import type { IncomingMessage, ServerResponse } from 'node:http'
import nodemailer, { type Transporter } from 'nodemailer'
import { HttpError, clientIp, readJsonBody, sendJson } from './http.ts'

export interface ContactMailConfig {
  host: string
  port: number
  user: string
  pass: string
  /** Inbox that receives new enquiries. */
  receiver: string
  /** Display name used on outgoing emails. */
  fromName: string
}

export interface ContactSubmission {
  name: string
  email: string
  phone: string
  expoName: string
  location: string
  eventDate: string
  dimensions: string
  budget: string
  service: string
  requirements: string
}

const BUDGETS: Record<string, string> = {
  'under-5l': 'Under ₹5 lakh',
  '5l-10l': '₹5–10 lakh',
  '10l-25l': '₹10–25 lakh',
  '25l-plus': '₹25 lakh+',
}
const SERVICES = ['Exhibition Stalls', 'Event Setups', 'Custom Designs', 'Brand Experiences']

const BUSINESS = {
  name: 'Ikaslé StallX',
  email: 'businessgroupikasle@gmail.com',
  phones: ['+91 78451 32962'],
  whatsapp: 'https://wa.me/917845132962',
  address: '1639/A, 2nd Floor, Hopes, Coimbatore, India – 641004',
}

const RATE_LIMIT = { max: 5, windowMs: 15 * 60 * 1000 }
const submissionsByIp = new Map<string, number[]>()

const isRateLimited = (ip: string) => {
  const now = Date.now()
  const recent = (submissionsByIp.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT.windowMs)
  if (recent.length >= RATE_LIMIT.max) {
    submissionsByIp.set(ip, recent)
    return true
  }
  recent.push(now)
  submissionsByIp.set(ip, recent)
  return false
}

/* ----------------------------------------------- validation ----------------------------------------------- */

const singleLine = (value: unknown, max: number) =>
  String(value ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .trim()
    .slice(0, max)

export const validateSubmission = (body: unknown): { data: ContactSubmission; errors: Record<string, string> } => {
  const input = (typeof body === 'object' && body !== null ? body : {}) as Record<string, unknown>
  const data: ContactSubmission = {
    name: singleLine(input.name, 120),
    email: singleLine(input.email, 254).toLowerCase(),
    phone: singleLine(input.phone, 20).replace(/\D/g, ''),
    expoName: singleLine(input.expoName, 160),
    location: singleLine(input.location, 160),
    eventDate: singleLine(input.eventDate, 10),
    dimensions: singleLine(input.dimensions, 80),
    budget: singleLine(input.budget, 20),
    service: singleLine(input.service, 40),
    requirements: String(input.requirements ?? '').trim().slice(0, 3000),
  }

  const errors: Record<string, string> = {}
  for (const [field, value] of Object.entries(data)) if (!value) errors[field] = 'This field is required.'
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = 'Enter a valid email address.'
  if (data.phone && !/^\d{10}$/.test(data.phone)) errors.phone = 'Enter a valid 10-digit phone number.'
  if (data.eventDate && (!/^\d{4}-\d{2}-\d{2}$/.test(data.eventDate) || Number.isNaN(Date.parse(data.eventDate)))) errors.eventDate = 'Enter a valid date as DD/MM/YYYY.'
  else if (data.eventDate && data.eventDate < new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10)) errors.eventDate = 'The event date cannot be in the past.'
  if (data.budget && !BUDGETS[data.budget]) errors.budget = 'Choose a budget range.'
  if (data.service && !SERVICES.includes(data.service)) errors.service = 'Choose a service.'
  return { data, errors }
}

/* ------------------------------------------------- emails ------------------------------------------------- */

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char)

const formatDate = (iso: string) => {
  const date = new Date(`${iso}T00:00:00`)
  return Number.isNaN(date.getTime()) ? iso : date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

const detailRows = (data: ContactSubmission): [string, string][] => [
  ['Name', data.name],
  ['Email', data.email],
  ['Phone', `+91 ${data.phone}`],
  ['Expo name', data.expoName],
  ['Location', data.location],
  ['Event date', formatDate(data.eventDate)],
  ['Stall dimensions', data.dimensions],
  ['Budget range', BUDGETS[data.budget] ?? data.budget],
  ['Service', data.service],
]

const htmlTable = (rows: [string, string][]) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eef1f4;color:#5b6b7b;width:38%;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #eef1f4;color:#071c31;font-weight:600">${escapeHtml(value)}</td></tr>`,
    )
    .join('')}</table>`

const htmlLayout = (heading: string, body: string) => `<!doctype html><html><body style="margin:0;background:#f4f6f8;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden">
<tr><td style="background:#071c31;padding:20px 24px;color:#ffffff;font-size:18px;font-weight:800">Ikaslé <span style="color:#f15a24">StallX</span></td></tr>
<tr><td style="height:4px;background:#f15a24"></td></tr>
<tr><td style="padding:24px"><h1 style="margin:0 0 14px;font-size:20px;color:#071c31">${heading}</h1>${body}</td></tr>
<tr><td style="padding:16px 24px;background:#f8f6f1;color:#5b6b7b;font-size:12px;line-height:1.6">${escapeHtml(BUSINESS.name)} · ${escapeHtml(BUSINESS.address)}<br>${escapeHtml(BUSINESS.email)} · ${BUSINESS.phones.map(escapeHtml).join(' · ')}</td></tr>
</table></td></tr></table></body></html>`

const requirementsHtml = (text: string) =>
  `<p style="margin:18px 0 6px;font-size:13px;color:#5b6b7b;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Requirements</p><div style="padding:12px 14px;background:#fff4ec;border-left:3px solid #f15a24;border-radius:6px;color:#17293a;font-size:14px;line-height:1.55;white-space:pre-wrap">${escapeHtml(text)}</div>`

export const buildBusinessEmail = (data: ContactSubmission, config: ContactMailConfig) => {
  const rows = detailRows(data)
  return {
    from: { name: `${config.fromName} Website`, address: config.user },
    to: config.receiver,
    replyTo: { name: data.name, address: data.email },
    subject: `New quote request: ${data.expoName} (${data.name})`,
    text: `New quote request from the website\n\n${rows.map(([label, value]) => `${label}: ${value}`).join('\n')}\n\nRequirements:\n${data.requirements}\n\nReply to this email to respond to ${data.name} directly.`,
    html: htmlLayout(
      'New quote request',
      `<p style="margin:0 0 16px;color:#405060;font-size:14px">Submitted from the website contact form. Reply to this email to respond to <strong>${escapeHtml(data.name)}</strong> directly.</p>${htmlTable(rows)}${requirementsHtml(data.requirements)}`,
    ),
  }
}

export const buildConfirmationEmail = (data: ContactSubmission, config: ContactMailConfig) => {
  const rows = detailRows(data).filter(([label]) => label !== 'Email')
  return {
    from: { name: config.fromName, address: config.user },
    to: { name: data.name, address: data.email },
    replyTo: config.receiver,
    subject: `We've received your quote request – ${config.fromName}`,
    text: `Hi ${data.name},\n\nThank you for contacting ${config.fromName}! We've received your quote request for ${data.expoName} and our team will get back to you shortly with a customised proposal.\n\nYour details:\n${rows.map(([label, value]) => `${label}: ${value}`).join('\n')}\n\nRequirements:\n${data.requirements}\n\nNeed us sooner? Call ${BUSINESS.phones.join(' / ')} or WhatsApp ${BUSINESS.whatsapp}\n\n– Team ${config.fromName}`,
    html: htmlLayout(
      `Thank you, ${escapeHtml(data.name)}!`,
      `<p style="margin:0 0 16px;color:#405060;font-size:14px;line-height:1.6">We've received your quote request for <strong>${escapeHtml(data.expoName)}</strong>. Our team will review it and get back to you shortly with a customised proposal.</p><p style="margin:0 0 10px;font-size:13px;color:#5b6b7b;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Your request</p>${htmlTable(rows)}${requirementsHtml(data.requirements)}<p style="margin:22px 0 0"><a href="${BUSINESS.whatsapp}" style="display:inline-block;background:#f15a24;color:#ffffff;text-decoration:none;font-weight:700;padding:11px 20px;border-radius:999px;font-size:14px">Chat with us on WhatsApp</a></p><p style="margin:14px 0 0;color:#5b6b7b;font-size:13px">Or call us on ${BUSINESS.phones.map(escapeHtml).join(' / ')}.</p>`,
    ),
  }
}

/* ------------------------------------------------- handler ------------------------------------------------- */

let cachedTransport: { key: string; transporter: Transporter } | null = null

const transportFor = (config: ContactMailConfig) => {
  const key = `${config.host}:${config.port}:${config.user}`
  if (cachedTransport?.key !== key) {
    cachedTransport = {
      key,
      transporter: nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.port === 465,
        auth: { user: config.user, pass: config.pass },
      }),
    }
  }
  return cachedTransport.transporter
}

export const isMailConfigured = (config: ContactMailConfig) => Boolean(config.user && config.pass && config.receiver)

export async function handleContactRequest(req: IncomingMessage, res: ServerResponse, config: ContactMailConfig) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    sendJson(res, 405, { error: 'Method not allowed.' })
    return
  }

  try {
    const body = (await readJsonBody(req, 32 * 1024)) as Record<string, unknown>

    // Honeypot: real visitors never see or fill the hidden "website" field.
    if (typeof body?.website === 'string' && body.website.trim()) {
      sendJson(res, 200, { ok: true })
      return
    }

    const { data, errors } = validateSubmission(body)
    if (Object.keys(errors).length) {
      sendJson(res, 400, { error: 'Please check the highlighted fields.', fields: errors })
      return
    }

    if (!isMailConfigured(config)) {
      console.error('[contact] SMTP is not configured: set SMTP_USER, SMTP_PASS and CONTACT_RECEIVER in .env')
      sendJson(res, 503, { error: 'Our form is temporarily unavailable. Please email or WhatsApp us instead.' })
      return
    }

    if (isRateLimited(clientIp(req))) {
      sendJson(res, 429, { error: 'Too many requests. Please try again in a few minutes.' })
      return
    }

    const transporter = transportFor(config)

    try {
      await transporter.sendMail(buildBusinessEmail(data, config))
    } catch (error) {
      console.error('[contact] failed to send business notification:', error)
      throw new HttpError(502, 'We could not send your request right now. Please try again or contact us on WhatsApp.')
    }

    let confirmationSent = true
    try {
      await transporter.sendMail(buildConfirmationEmail(data, config))
    } catch (error) {
      confirmationSent = false
      console.error('[contact] business was notified, but the confirmation email failed:', error)
    }

    sendJson(res, 200, { ok: true, confirmationSent })
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500
    sendJson(res, status, { error: error instanceof HttpError ? error.message : 'Something went wrong. Please try again.' })
  }
}
