import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Home } from '@/pages/Home'
import { PrivacyPolicy } from '@/pages/PrivacyPolicy'
import { TermsAndConditions } from '@/pages/TermsAndConditions'
import { FaqPage } from '@/pages/FaqPage'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { FloatingActions } from '@/components/common/FloatingActions'
import { PageLoader } from '@/components/common/PageLoader'

const pages: Record<string, React.ComponentType> = {
  '/privacy-policy': PrivacyPolicy,
  '/terms-and-conditions': TermsAndConditions,
  '/faq': FaqPage,
}

export function App() {
  const Page = pages[window.location.pathname] ?? Home
  useScrollReveal()

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-navy-900 selection:bg-brand-500 selection:text-white">
      <PageLoader />
      <Navbar />
      <div className="flex-1">
        <Page />
      </div>
      <Footer />
      <FloatingActions />
    </div>
  )
}

export default App