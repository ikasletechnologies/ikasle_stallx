import { LegalPageLayout } from '@/components/legal/LegalPageLayout'

const sections = [
  { title: 'Information we collect', content: 'When you request a quote or contact StallX, we may collect your name, email address, phone number, company or event details, stall dimensions, budget range and project requirements.' },
  { title: 'How we use your information', content: 'We use the information you provide to respond to enquiries, prepare proposals, plan exhibition projects, improve our services and communicate relevant project updates.' },
  { title: 'Information sharing', content: 'We do not sell your personal information. Information may be shared only with trusted service providers or project partners when necessary to deliver your requested services or comply with applicable law.' },
  { title: 'Data security', content: 'We use reasonable administrative and technical safeguards to protect your information. No online system is completely secure, but we limit access to information to authorised people who need it.' },
  { title: 'Cookies and analytics', content: 'Our website may use essential cookies and basic analytics to understand site performance and visitor behaviour. You can manage cookie preferences through your browser settings.' },
  { title: 'Data retention', content: 'We retain enquiry and project information only for as long as required for business, contractual, accounting or legal purposes.' },
  { title: 'Your choices', content: 'You may request access, correction or deletion of your personal information, subject to legal and contractual requirements, by contacting the StallX team.' },
  { title: 'Contact us', content: 'For privacy questions or requests, use the contact form on our website and clearly mention that your message concerns privacy or personal data.' },
]

export const PrivacyPolicy = () => <LegalPageLayout eyebrow="Your privacy" title="Privacy Policy" intro="This policy explains how Ikaslé StallX collects, uses and protects information submitted through our website and project enquiry process." sections={sections} />