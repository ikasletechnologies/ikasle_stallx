import {
  AboutSection,
  ContactSection,
  CustomSolutionsBanner,
  FaqSection,
  GroupCompaniesSection,
  HeroSection,
  ServicesSection,
  TestimonialsSection,
} from '@/components/home'

export const Home = () => (
  <div className="space-y-20 pb-20">
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <CustomSolutionsBanner />
    <GroupCompaniesSection />
    <TestimonialsSection />
    <FaqSection />
    <ContactSection />
  </div>
)

export default Home