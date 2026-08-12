import Hero from '../components/Hero'
import Categories from '../components/Categories'
import CustomOrder from '../components/CustomOrder'
import AboutSection from '../components/AboutSection'
import InstagramFeed from '../components/InstagramFeed'
import Events from '../components/Events'

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <CustomOrder />
      <AboutSection />
      <InstagramFeed />
      <Events />
    </>
  )
}
