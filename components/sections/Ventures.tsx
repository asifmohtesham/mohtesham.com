"use client"
import { useRef } from "react"
import { useGSAP, gsap } from "@/lib/gsap"

const VENTURES = [
  {
    name: "BeautyRe",
    tagline: "Premium Beauty Products · Dubai, UAE · Since 2017",
    description:
      "Multi-category beauty e-commerce platform offering genuine skincare, haircare, and cosmetics with UAE-wide delivery. Connecting customers with authentic premium products.",
    cta: "Visit BeautyRe",
    url: "https://beautyre.com",
    fromX: -120,
    gradient: "from-accent-purple to-accent-pink",
    border: "border-accent-purple",
  },
  {
    name: "Milano Leather",
    tagline: "Quality Above All · Dubai, UAE · Est. 1980s",
    description:
      "Premium leather goods manufacturer supplying belts, wallets, bags, and accessories across UAE and MENA. Four in-house brands, factory-controlled production, 30+ years of artisan heritage.",
    cta: "Visit Milano Leather",
    url: "https://milanoleather.ae",
    fromX: 120,
    gradient: "from-accent-pink to-accent-purple",
    border: "border-accent-pink",
  },
]

export default function Ventures() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      sectionRef.current?.querySelectorAll<HTMLElement>(".venture-card").forEach((card, i) => {
        gsap.from(card, {
          x: VENTURES[i].fromX,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 80%", once: true },
        })

        gsap.set(card, { transformPerspective: 900 })
        const quickX = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power2.out" })
        const quickY = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power2.out" })

        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5
          quickX(x * 8)
          quickY(-y * 8)
        })
        card.addEventListener("mouseleave", () => {
          quickX(0)
          quickY(0)
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="ventures" className="py-32 px-6 bg-bg-surface">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-widest text-accent-purple uppercase mb-4">
          Ventures
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-16">
          Built from the ground up.
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {VENTURES.map((v) => (
            <div
              key={v.name}
              className={`venture-card p-8 rounded-2xl border ${v.border} bg-bg-base flex flex-col gap-6`}
            >
              <div>
                <h3 className={`text-2xl font-extrabold bg-gradient-to-r ${v.gradient} bg-clip-text text-transparent mb-2`}>
                  {v.name}
                </h3>
                <p className="font-mono text-xs tracking-wide text-text-muted">{v.tagline}</p>
              </div>
              <p className="text-text-muted leading-relaxed flex-1">{v.description}</p>
              <a
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-gradient-to-r ${v.gradient} text-white hover:opacity-90 transition-opacity w-fit`}
              >
                {v.cta} ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
