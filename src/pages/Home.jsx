import { HeroSection, RecentSection, SectionTitle } from "../components/components"

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <SectionTitle text1="Recent Books" text2="The collection of latest published novels."/>
      <RecentSection/>
    </div>
  )
}

export default Home
