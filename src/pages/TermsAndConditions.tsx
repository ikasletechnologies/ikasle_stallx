import { LegalPageLayout } from '@/components/legal/LegalPageLayout'

const sections = [
  { title: 'Website use', content: 'You may use this website to learn about StallX services and submit genuine project enquiries. You must not misuse the site, interfere with its operation or attempt unauthorised access.' },
  { title: 'Project enquiries and quotations', content: 'Website enquiries do not create a binding contract. Scope, pricing, timelines, deliverables and payment terms become binding only when confirmed in a written proposal or agreement.' },
  { title: 'Designs and intellectual property', content: 'Concepts, renders, layouts, graphics and other creative work remain the intellectual property of StallX or their respective owners unless a written agreement states otherwise.' },
  { title: 'Client responsibilities', content: 'Clients must provide accurate event details, dimensions, venue rules, brand assets, approvals and other information required to plan and deliver the project.' },
  { title: 'Timelines and changes', content: 'Project schedules depend on timely approvals, venue access and information from the client. Changes to an approved scope may affect cost and delivery dates.' },
  { title: 'Third-party services', content: 'Some projects may involve venues, logistics providers, technology vendors or other third parties. Their services may be subject to separate terms and availability.' },
  { title: 'Limitation of liability', content: 'To the extent permitted by law, StallX is not responsible for indirect losses, interruptions or delays caused by events outside reasonable control.' },
  { title: 'Changes to these terms', content: 'We may update these terms when our services or legal obligations change. Continued use of the website after an update means the revised terms apply.' },
]

export const TermsAndConditions = () => <LegalPageLayout eyebrow="Website terms" title="Terms & Conditions" intro="These terms govern your use of the Ikaslé StallX website and explain the basis on which project enquiries and website content are provided." sections={sections} />