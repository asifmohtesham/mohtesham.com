"use client"
import { useRef } from "react"
import Link from "next/link"
import { useGSAP, gsap, ScrollTrigger } from "@/lib/gsap"

void ScrollTrigger

const NAV_LINKS = ["About", "Ventures", "Expertise", "Contact"]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    ScrollTrigger.create({
      onUpdate(self) {
        if (!navRef.current) return
        if (self.direction === -1) {
          gsap.to(navRef.current, { y: 0, duration: 0.3, ease: "power2.out" })
        } else if (Math.abs(self.getVelocity()) > 50) {
          gsap.to(navRef.current, { y: "-100%", duration: 0.3, ease: "power2.in" })
        }
      },
    })
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg-base/80 border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-extrabold text-xl bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent"
        >
          AM
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="text-text-muted hover:text-text-primary transition-colors text-sm"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-accent-purple to-accent-pink text-white hover:opacity-90 transition-opacity"
        >
          Get in Touch
        </a>
      </div>
    </nav>
  )
}
