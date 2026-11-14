import { LazyMotion, MotionConfig } from 'framer-motion'
import { About } from './components/About'
import { Ambient } from './components/Ambient'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { LightboxProvider } from './components/Lightbox'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'

export default function App() {
  return (
    <LazyMotion features={() => import('./motionFeatures').then((r) => r.default)} strict>
      <MotionConfig reducedMotion="user">
      <LightboxProvider>
        <Ambient />
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </LightboxProvider>
    </MotionConfig>
    </LazyMotion>
  )
}
