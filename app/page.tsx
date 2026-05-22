import Nav from "@/components/Nav"
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Ventures from "@/components/sections/Ventures"
import Expertise from "@/components/sections/Expertise"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Ventures />
        <Expertise />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
