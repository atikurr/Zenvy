
import { HeroSection } from '@/components/sections/HeroSection/HeroSection'
import { PartnersSection } from '@/components/sections/PartnersSection/PartnersSection'
import { ServicesSection } from '@/components/sections/ServicesSection/ServicesSection'
import { VideoShowcaseSection } from '@/components/sections/VideoShowcase/VideoShowcaseSection'
import { WorkSection } from '@/components/sections/WorkSection/WorkSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      
      <VideoShowcaseSection />
      
      <ServicesSection />
      <WorkSection />
    </>
  )
}