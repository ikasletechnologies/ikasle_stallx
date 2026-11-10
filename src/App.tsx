import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Home } from '@/pages/Home'
import { PrivacyPolicy } from '@/pages/PrivacyPolicy'
import { TermsAndConditions } from '@/pages/TermsAndConditions'
import { FaqPage } from '@/pages/FaqPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { FloatingActions } from '@/components/common/FloatingActions'
import { PageLoader } from '@/components/common/PageLoader'

const pages: Record<string, React.ComponentType> = {
  '/privacy-policy': PrivacyPolicy,
  '/terms-and-conditions': TermsAndConditions,
  '/faq': FaqPage,
}

const normalizePathname = (pathname: string) => {
  const trimmed = pathname.replace(/\/+$/, '') || '/'
  return trimmed === '/index.html' ? '/' : trimmed
}

export function App() {
  const pathname = normalizePathname(window.location.pathname)
  const isHome = pathname === '/'
  const Page = isHome ? Home : Object.hasOwn(pages, pathname) ? pages[pathname] : NotFoundPage
  useScrollReveal()

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-navy-900 selection:bg-brand-500 selection:text-white">
      <PageLoader />
      <Navbar isHome={isHome} />
      <div className="flex-1">
        <Page />
      </div>
      <Footer />
      <FloatingActions />
    </div>
  )
}

export default App