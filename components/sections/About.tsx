"use client"
import { useRef } from "react"
import { useGSAP, gsap, ScrollTrigger, SplitText } from "@/lib/gsap"

void ScrollTrigger

const STATS = [
  { label: "Ventures", value: 2, suffix: "" },
  { label: "BeautyRe Founded", value: 2017, suffix: "" },
  { label: "Years of Legacy", value: 30, suffix: "+" },
  { label: "App Platforms", value: 2, suffix: "" },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      let split: InstanceType<typeof SplitText> | null = null

      const bio = sectionRef.current?.querySelector<HTMLElement>(".about-bio")
      if (bio) {
        split = new SplitText(bio, { type: "words" })
        gsap.from(split.words, {
          y: 20,
          opacity: 0,
          stagger: 0.018,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bio,
            start: "top 80%",
            once: true,
          },
        })
      }

      sectionRef.current?.querySelectorAll<HTMLElement>(".stat-number").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") ?? "0", 10)
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate() {
            el.textContent = Math.round(obj.val).toString()
          },
        })
      })

      return () => {
        split?.revert()
      }
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div>
          <p className="font-mono text-xs tracking-widest text-accent-purple uppercase mb-4">
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
            Builder at heart,
            <br />
            engineer by trade.
          </h2>
          <p className="about-bio text-text-muted leading-relaxed text-lg">
            Based in Dubai, UAE, Asif Mohtesham has spent over a decade building consumer
            platforms and premium product businesses. He founded BeautyRe to bring genuine
            beauty products to UAE customers, and stewards the Milano Leather legacy — a brand
            with 30+ years of artisan craftsmanship. His engineering practice threads both
            ventures, from mobile apps to e-commerce infrastructure, while his consulting work
            helps MENA businesses scale their digital operations.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {STATS.map(({ label, value, suffix }) => (
            <div key={label} className="p-6 rounded-2xl border border-border bg-bg-surface">
              <div className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent mb-2">
                <span className="stat-number" data-target={value}>0</span>
                <span>{suffix}</span>
              </div>
              <p className="text-text-muted text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
