"use client"
import { useRef } from "react"
import { useGSAP, gsap } from "@/lib/gsap"

const PILLARS = [
  {
    icon: "⚡",
    title: "Founder",
    desc: "Building consumer products and marketplace businesses from zero to live, across beauty and premium goods verticals.",
  },
  {
    icon: "</>",
    title: "Engineer",
    desc: "Full-stack and mobile engineering — iOS, Android, and web — powering the platforms behind both ventures.",
  },
  {
    icon: "◈",
    title: "Consultant",
    desc: "Strategic and technical advisory for digital commerce, product architecture, and go-to-market in UAE/MENA.",
  },
]

const TAGS = [
  "iOS", "Android", "Next.js", "React Native", "E-commerce",
  "Product Strategy", "UAE Market", "MENA", "Leather Goods",
  "Beauty Tech", "App Store", "Play Store", "Node.js", "Firebase", "Shopify",
]

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const pillars = sectionRef.current?.querySelectorAll(".pillar")
      const tags = sectionRef.current?.querySelectorAll(".skill-tag")
      const pillarsGrid = sectionRef.current?.querySelector(".pillars-grid")
      const tagsCloud = sectionRef.current?.querySelector(".tags-cloud")

      if (pillars && pillarsGrid) {
        gsap.from(pillars, {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: pillarsGrid, start: "top 80%", once: true },
        })
      }

      if (tags && tagsCloud) {
        gsap.from(tags, {
          scale: 0.7,
          opacity: 0,
          stagger: 0.04,
          duration: 0.4,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: tagsCloud, start: "top 85%", once: true },
        })
      }
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="expertise" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-widest text-accent-purple uppercase mb-4">
          Expertise
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-16">
          Three roles. One mission.
        </h2>

        <div className="pillars-grid grid md:grid-cols-3 gap-8 mb-16">
          {PILLARS.map((p) => (
            <div key={p.title} className="pillar p-8 rounded-2xl border border-border bg-bg-surface">
              <div className="text-3xl mb-4 font-mono">{p.icon}</div>
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">
                {p.title}
              </h3>
              <p className="text-text-muted leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="tags-cloud flex flex-wrap gap-3">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="skill-tag px-4 py-2 rounded-full border border-border bg-bg-surface text-text-muted text-sm font-mono hover:border-accent-purple hover:text-text-primary transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
