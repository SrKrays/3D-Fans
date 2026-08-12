import Hero from '../components/Hero'
import FandomMarquee from '../components/FandomMarquee'
import Categories from '../components/Categories'
import ProcessSection from '../components/ProcessSection'
import CustomOrder from '../components/CustomOrder'
import AboutSection from '../components/AboutSection'
import InstagramFeed from '../components/InstagramFeed'
import Events from '../components/Events'

export default function Home() {
  return (
    <>
      <Hero />
      <FandomMarquee />
      <Categories />
      <ProcessSection />
      <CustomOrder />
      <AboutSection />
      <InstagramFeed />
      <Events />
    </>
  )
}
