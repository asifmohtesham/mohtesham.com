"use client"
import { useRef } from "react"
import { useGSAP, gsap, TextPlugin } from "@/lib/gsap"
import ParticleBackground from "@/components/ParticleBackground"

// Suppress unused import lint — TextPlugin is registered via lib/gsap.ts
void TextPlugin

const ROLES = ["Founder", "Engineer", "Consultant"]

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const roleRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(".hero-word", {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
      })
        .from(".hero-label", { opacity: 0, y: -10, duration: 0.5 }, "-=0.5")
        .from(".hero-ctas a", { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, "-=0.3")
        .from(".hero-scroll", { opacity: 0, duration: 0.5 }, "-=0.2")

      tl.call(() => {
        let idx = 0
        const type = () => {
          if (!roleRef.current) return
          gsap.to(roleRef.current, {
            duration: 0.7,
            text: { value: ROLES[idx], delimiter: "" },
            ease: "none",
            onComplete: () => {
              gsap.delayedCall(2, () => {
                gsap.to(roleRef.current, {
                  duration: 0.35,
                  text: { value: "", delimiter: "" },
                  ease: "none",
                  onComplete: () => {
                    idx = (idx + 1) % ROLES.length
                    type()
                  },
                })
              })
            },
          })
        }
        type()
      })
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />

      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(108,61,232,0.15)_0%,transparent_70%)]" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p className="hero-label font-mono text-xs tracking-widest text-accent-purple uppercase mb-8">
          Dubai · UAE
        </p>

        <h1 className="text-7xl md:text-9xl font-extrabold tracking-tight text-text-primary mb-6 leading-none">
          <span className="hero-word inline-block mr-6">Asif</span>
          <span className="hero-word inline-block">Mohtesham</span>
        </h1>

        <div className="text-2xl md:text-3xl font-mono mb-12 h-10">
          <span
            ref={roleRef}
            className="bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent"
          />
          <span
            aria-hidden="true"
            className="animate-blink bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent"
          >|</span>
        </div>

        <div className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#ventures"
            className="px-10 py-4 rounded-full font-semibold bg-gradient-to-r from-accent-purple to-accent-pink text-white hover:opacity-90 transition-opacity"
          >
            Explore Ventures
          </a>
          <a
            href="#contact"
            className="px-10 py-4 rounded-full font-semibold border border-border text-text-muted hover:text-text-primary hover:border-accent-purple transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-text-muted">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
