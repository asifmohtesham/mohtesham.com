"use client"
import { useRef, useState } from "react"
import { useGSAP, gsap } from "@/lib/gsap"

const LINKS = [
  { label: "Email", href: "mailto:asifmohtesham@gmail.com", icon: "✉" },
  { label: "LinkedIn", href: "https://linkedin.com/in/asifmohtesham", icon: "in" },
  { label: "BeautyRe", href: "https://beautyre.com", icon: "↗" },
  { label: "Milano Leather", href: "https://milanoleather.ae", icon: "↗" },
]

type Status = "idle" | "sending" | "sent" | "error"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<Status>("idle")

  useGSAP(
    () => {
      gsap.from(".contact-field", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      })
    },
    { scope: sectionRef },
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      setStatus("sent")
      ;(e.target as HTMLFormElement).reset()
    } else {
      setStatus("error")
    }
  }

  const fieldClass =
    "contact-field w-full px-4 py-3 rounded-lg bg-bg-base border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple transition-colors"

  return (
    <section ref={sectionRef} id="contact" className="py-32 px-6 bg-bg-surface">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <p className="font-mono text-xs tracking-widest text-accent-purple uppercase mb-4">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-10">
            Let's build something.
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="name" required placeholder="Your name" className={fieldClass} />
            <input name="email" type="email" required placeholder="Email address" className={fieldClass} />
            <textarea name="message" required rows={5} placeholder="Your message..." className={`${fieldClass} resize-none`} />
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-accent-purple to-accent-pink text-white hover:opacity-90 transition-opacity disabled:opacity-50 w-fit"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "sent" && (
              <p className="text-accent-purple text-sm">Message sent! I'll be in touch.</p>
            )}
            {status === "error" && (
              <p className="text-accent-pink text-sm">Something went wrong. Please email me directly.</p>
            )}
          </form>
        </div>

        <div className="flex flex-col justify-center gap-4">
          <h3 className="text-lg font-semibold text-text-muted mb-2">Find me here</h3>
          {LINKS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border border-border bg-bg-base hover:border-accent-purple transition-colors group"
            >
              <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-muted group-hover:border-accent-purple group-hover:text-accent-purple transition-colors font-mono text-sm flex-shrink-0">
                {icon}
              </span>
              <span className="text-text-muted group-hover:text-text-primary transition-colors">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
