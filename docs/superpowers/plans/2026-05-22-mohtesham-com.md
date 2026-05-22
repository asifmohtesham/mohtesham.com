# mohtesham.com Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a personal brand / venture-hub site for Asif Mohtesham with mesmerising GSAP scroll animations, a contact form, and a generic privacy policy page hosted at mohtesham.com on Vercel.

**Architecture:** Next.js 15 App Router with all animation-bearing components marked `"use client"`. GSAP plugins are registered once in `lib/gsap.ts` and re-exported; every animated section imports from there. The contact form POSTs to a Next.js API route that calls Resend. The privacy page is a static server component.

**Tech Stack:** Next.js 15 · TypeScript · Tailwind CSS v4 · GSAP 3 + ScrollTrigger + TextPlugin + SplitText + @gsap/react · tsParticles (@tsparticles/react + @tsparticles/slim) · Resend · Vitest (API tests) · Vercel + GitHub

---

## File Map

| File | Responsibility |
|------|---------------|
| `app/layout.tsx` | Root layout — fonts, metadata, body |
| `app/globals.css` | Tailwind v4 `@theme` tokens, base resets |
| `app/page.tsx` | Homepage — assembles all sections |
| `app/privacy/page.tsx` | Generic privacy policy (static) |
| `app/api/contact/route.ts` | POST handler — validates, sends via Resend |
| `lib/gsap.ts` | Registers all GSAP plugins, re-exports |
| `components/Nav.tsx` | Fixed glass-blur nav with GSAP scroll hide/show |
| `components/ParticleBackground.tsx` | tsParticles canvas (client-only) |
| `components/sections/Hero.tsx` | Full-screen hero — particles, name stagger, typewriter |
| `components/sections/About.tsx` | 2-col — SplitText bio reveal, stat counters |
| `components/sections/Ventures.tsx` | BeautyRe + Milano cards — slide-in, hover tilt |
| `components/sections/Expertise.tsx` | 3 pillars + skill tag cloud stagger |
| `components/sections/Contact.tsx` | Contact form + social/venture links |
| `components/Footer.tsx` | Minimal footer with privacy link |
| `__tests__/api/contact.test.ts` | Vitest tests for contact API route |
| `vitest.config.ts` | Vitest config |
| `.env.local` | `RESEND_API_KEY` (never committed) |

---

## Task 1: Scaffold Next.js project and install dependencies

**Files:**
- Create: entire project via `create-next-app`
- Create: `.env.local`
- Modify: `.gitignore`

- [ ] **Step 1: Scaffold with create-next-app**

Run from inside `C:\Users\asifm\source\repos\mohtesham.com`:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --turbopack --import-alias "@/*"
```

When prompted interactively, choose: TypeScript ✓, ESLint ✓, Tailwind CSS ✓, no `src/` directory, App Router ✓, Turbopack ✓, import alias `@/*`.

Expected: project files generated, `package.json` written, `node_modules/` populated.

- [ ] **Step 2: Install animation and utility packages**

```bash
npm install gsap @gsap/react @tsparticles/react @tsparticles/slim resend
npm install -D vitest @vitejs/plugin-react @types/node
```

Expected: all packages appear in `package.json` dependencies.

- [ ] **Step 3: Ensure `.gitignore` covers secrets and brainstorm artefacts**

Open `.gitignore` and confirm these lines exist (add them if not):

```
.env.local
.env*.local
.superpowers/
```

- [ ] **Step 4: Create `.env.local` placeholder**

```bash
echo "RESEND_API_KEY=re_placeholder_replace_me" > .env.local
```

You will replace the value with a real key from https://resend.com/api-keys in Task 15.

- [ ] **Step 5: Commit scaffold**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 project with dependencies"
```

---

## Task 2: Configure Tailwind v4 theme tokens and global styles

**Files:**
- Modify: `app/globals.css`
- Modify: `postcss.config.mjs` (if not already using `@tailwindcss/postcss`)

- [ ] **Step 1: Verify PostCSS config uses Tailwind v4 plugin**

Open `postcss.config.mjs`. It should contain `"@tailwindcss/postcss": {}`. If it still has the old `tailwindcss` key, replace the file with:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
export default config
```

- [ ] **Step 2: Replace `app/globals.css` with themed version**

```css
@import "tailwindcss";

@theme {
  --color-bg-base: #0d0d14;
  --color-bg-surface: #1a1a2e;
  --color-accent-purple: #6c3de8;
  --color-accent-pink: #e83d87;
  --color-text-primary: #ffffff;
  --color-text-muted: #aaaaaa;
  --color-border: #2a2a4e;

  --font-sans: var(--font-jakarta), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, monospace;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: var(--color-bg-base);
    color: var(--color-text-primary);
    -webkit-font-smoothing: antialiased;
  }
  ::selection {
    background-color: rgb(108 61 232 / 0.3);
  }
}
```

- [ ] **Step 3: Verify dev server starts without errors**

```bash
npm run dev
```

Expected: server starts on http://localhost:3000, no PostCSS or Tailwind errors in terminal. Stop with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css postcss.config.mjs
git commit -m "feat: configure Tailwind v4 design tokens"
```

---

## Task 3: Root layout — fonts and metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```typescript
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Asif Mohtesham — Founder, Engineer, Consultant",
  description:
    "Dubai-based founder, engineer, and consultant. Building BeautyRe and Milano Leather.",
  openGraph: {
    title: "Asif Mohtesham",
    description: "Dubai-based founder, engineer, and consultant.",
    url: "https://mohtesham.com",
    siteName: "Asif Mohtesham",
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: root layout with Plus Jakarta Sans and JetBrains Mono"
```

---

## Task 4: GSAP plugin registration

**Files:**
- Create: `lib/gsap.ts`

- [ ] **Step 1: Create `lib/gsap.ts`**

```typescript
// Client-only module — only import this from "use client" components.
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText, useGSAP)
}

export { gsap, ScrollTrigger, TextPlugin, SplitText, useGSAP }
```

- [ ] **Step 2: Verify TypeScript accepts it**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/gsap.ts
git commit -m "feat: register GSAP plugins (ScrollTrigger, TextPlugin, SplitText)"
```

---

## Task 5: Nav component

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Create `components/Nav.tsx`**

```typescript
"use client"
import { useRef } from "react"
import Link from "next/link"
import { useGSAP } from "@/lib/gsap"
import { gsap, ScrollTrigger } from "@/lib/gsap"

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
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: Nav with GSAP scroll hide/show and glass blur"
```

---

## Task 6: Particle background component

**Files:**
- Create: `components/ParticleBackground.tsx`

- [ ] **Step 1: Create `components/ParticleBackground.tsx`**

```typescript
"use client"
import { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { ISourceOptions } from "@tsparticles/engine"

const OPTIONS: ISourceOptions = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 80, density: { enable: true } },
    color: { value: ["#6c3de8", "#e83d87", "#aaaaaa"] },
    links: {
      enable: true,
      color: "#6c3de8",
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.6,
      outModes: { default: "bounce" },
    },
    opacity: { value: { min: 0.2, max: 0.5 } },
    size: { value: { min: 1, max: 2 } },
  },
  detectRetina: true,
}

export default function ParticleBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  if (!ready) return null

  return (
    <Particles
      id="tsparticles"
      options={OPTIONS}
      className="absolute inset-0 z-0"
    />
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ParticleBackground.tsx
git commit -m "feat: tsParticles background with purple/pink constellation"
```

---

## Task 7: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create `components/sections/` directory and `Hero.tsx`**

```bash
mkdir -p components/sections
```

```typescript
"use client"
import { useRef } from "react"
import { useGSAP, gsap, TextPlugin } from "@/lib/gsap"
import ParticleBackground from "@/components/ParticleBackground"

// Suppress unused import lint — TextPlugin is registered via lib/gsap.ts
void TextPlugin

const ROLES = ["Founder_", "Engineer_", "Consultant_"]

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

      // Cycle typewriter roles after timeline finishes
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

      {/* Radial glow */}
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
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: Hero section with particle field, name stagger, and typewriter"
```

---

## Task 8: About section

**Files:**
- Create: `components/sections/About.tsx`

- [ ] **Step 1: Create `components/sections/About.tsx`**

```typescript
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
      const bio = sectionRef.current?.querySelector<HTMLElement>(".about-bio")
      if (bio) {
        const split = new SplitText(bio, { type: "words" })
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
            <div
              key={label}
              className="p-6 rounded-2xl border border-border bg-bg-surface"
            >
              <div className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent mb-2">
                <span className="stat-number" data-target={value}>
                  0
                </span>
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: About section with SplitText reveal and animated stat counters"
```

---

## Task 9: Ventures section

**Files:**
- Create: `components/sections/Ventures.tsx`

- [ ] **Step 1: Create `components/sections/Ventures.tsx`**

```typescript
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
                <h3
                  className={`text-2xl font-extrabold bg-gradient-to-r ${v.gradient} bg-clip-text text-transparent mb-2`}
                >
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Ventures.tsx
git commit -m "feat: Ventures section with slide-in animation and hover tilt"
```

---

## Task 10: Expertise section

**Files:**
- Create: `components/sections/Expertise.tsx`

- [ ] **Step 1: Create `components/sections/Expertise.tsx`**

```typescript
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
  "iOS",
  "Android",
  "Next.js",
  "React Native",
  "E-commerce",
  "Product Strategy",
  "UAE Market",
  "MENA",
  "Leather Goods",
  "Beauty Tech",
  "App Store",
  "Play Store",
  "Node.js",
  "Firebase",
  "Shopify",
]

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from(".pillar", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".pillars-grid", start: "top 80%", once: true },
      })
      gsap.from(".skill-tag", {
        scale: 0.7,
        opacity: 0,
        stagger: 0.04,
        duration: 0.4,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".tags-cloud", start: "top 85%", once: true },
      })
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Expertise.tsx
git commit -m "feat: Expertise section with pillar stagger and skill tag pop-in"
```

---

## Task 11: Contact API route with tests

**Files:**
- Create: `app/api/contact/route.ts`
- Create: `vitest.config.ts`
- Create: `__tests__/api/contact.test.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
})
```

- [ ] **Step 2: Add test script to `package.json`**

Open `package.json` and add to the `"scripts"` object:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Write failing tests in `__tests__/api/contact.test.ts`**

```bash
mkdir -p __tests__/api
```

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest"
import { NextRequest } from "next/server"

// Mock Resend before importing the route
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ data: { id: "test-id" }, error: null }),
    },
  })),
}))

// Import after mock is set up
const { POST } = await import("@/app/api/contact/route")

function makeReq(body: Record<string, string>) {
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
}

describe("POST /api/contact", () => {
  it("returns 400 when name is missing", async () => {
    const res = await POST(makeReq({ email: "a@b.com", message: "hi" }))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe("All fields required")
  })

  it("returns 400 when email is missing", async () => {
    const res = await POST(makeReq({ name: "Asif", message: "hi" }))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe("All fields required")
  })

  it("returns 400 when message is missing", async () => {
    const res = await POST(makeReq({ name: "Asif", email: "a@b.com" }))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe("All fields required")
  })

  it("returns 400 for invalid email format", async () => {
    const res = await POST(makeReq({ name: "Asif", email: "not-an-email", message: "hi" }))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe("Invalid email")
  })

  it("returns 200 for a valid submission", async () => {
    const res = await POST(makeReq({ name: "Asif", email: "asif@example.com", message: "Hello!" }))
    expect(res.status).toBe(200)
    expect((await res.json()).success).toBe(true)
  })
})
```

- [ ] **Step 4: Run tests — expect them to FAIL (route doesn't exist yet)**

```bash
npm test
```

Expected: test suite fails with "Cannot find module '@/app/api/contact/route'".

- [ ] **Step 5: Create `app/api/contact/route.ts`**

```bash
mkdir -p app/api/contact
```

```typescript
import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  let body: Record<string, string> | null = null
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const name = body?.name?.trim() ?? ""
  const email = body?.email?.trim() ?? ""
  const message = body?.message?.trim() ?? ""

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: "mohtesham.com <onboarding@resend.dev>", // update to contact@mohtesham.com after domain verified in Resend
    to: ["asifmohtesham@gmail.com"],
    subject: `New message from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  })

  if (error) {
    console.error("Resend error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
```

- [ ] **Step 6: Run tests — expect them to PASS**

```bash
npm test
```

Expected output:
```
✓ returns 400 when name is missing
✓ returns 400 when email is missing
✓ returns 400 when message is missing
✓ returns 400 for invalid email format
✓ returns 200 for a valid submission

Test Files  1 passed (1)
Tests       5 passed (5)
```

- [ ] **Step 7: Commit**

```bash
git add app/api/contact/route.ts __tests__/api/contact.test.ts vitest.config.ts package.json
git commit -m "feat: contact API route with Resend integration and Vitest tests"
```

---

## Task 12: Contact section UI

**Files:**
- Create: `components/sections/Contact.tsx`

- [ ] **Step 1: Create `components/sections/Contact.tsx`**

```typescript
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
        {/* Form */}
        <div>
          <p className="font-mono text-xs tracking-widest text-accent-purple uppercase mb-4">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-10">
            Let's build something.
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              required
              placeholder="Your name"
              className={fieldClass}
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              className={fieldClass}
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Your message..."
              className={`${fieldClass} resize-none`}
            />
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
              <p className="text-accent-pink text-sm">
                Something went wrong. Please email me directly.
              </p>
            )}
          </form>
        </div>

        {/* Links */}
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat: Contact section with animated form and social/venture links"
```

---

## Task 13: Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create `components/Footer.tsx`**

```typescript
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-text-muted text-sm">
        <p>© {new Date().getFullYear()} Asif Mohtesham · Dubai, UAE</p>
        <Link
          href="/privacy"
          className="hover:text-text-primary transition-colors font-mono text-xs tracking-wide"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: Footer with privacy link"
```

---

## Task 14: Homepage assembly

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```typescript
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
```

- [ ] **Step 2: Start dev server and visually verify all sections render**

```bash
npm run dev
```

Open http://localhost:3000. Check:
- Particles render in hero background
- Name animates in on load
- Typewriter cycles through Founder_ / Engineer_ / Consultant_
- Scroll down: About text reveals, stat counters roll up
- Ventures cards slide in from their respective sides
- Expertise pillars stagger in, tags pop in
- Contact form and links render correctly
- Nav hides on scroll down, reappears on scroll up

Stop server with Ctrl+C once satisfied.

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: `✓ Compiled successfully` with no errors or warnings that block build.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble homepage with all sections"
```

---

## Task 15: Privacy policy page

**Files:**
- Create: `app/privacy/page.tsx`

- [ ] **Step 1: Create `app/privacy/` directory and `page.tsx`**

```bash
mkdir -p app/privacy
```

```typescript
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — Asif Mohtesham",
  description:
    "Privacy policy for all mobile applications published by Asif Mohtesham.",
}

const EFFECTIVE_DATE = "22 May 2026"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm mb-12 font-mono"
        >
          ← Back to mohtesham.com
        </Link>

        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-text-muted mb-12 font-mono text-sm">
          Effective date: {EFFECTIVE_DATE}
        </p>

        <div className="space-y-10 text-text-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy applies to all mobile applications ("the Apps") published by
              Asif Mohtesham ("we", "us", "our"), available on the Apple App Store and Google
              Play Store. By downloading or using any of the Apps, you agree to the collection
              and use of information described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              2. Information We Collect
            </h2>
            <p className="mb-3">We may collect the following categories of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Account information:</strong> Name, email
                address, and a securely hashed password when you register an account.
              </li>
              <li>
                <strong className="text-text-primary">Payment information:</strong> Payments are
                processed by PCI-DSS compliant third-party payment processors. We do not store
                full card numbers or sensitive payment credentials on our servers.
              </li>
              <li>
                <strong className="text-text-primary">Order and transaction history:</strong>{" "}
                Records of purchases made through the Apps.
              </li>
              <li>
                <strong className="text-text-primary">Device identifiers:</strong> Device tokens
                used to deliver push notifications, collected only with your permission.
              </li>
              <li>
                <strong className="text-text-primary">Usage analytics:</strong> Anonymous,
                aggregated data about how you interact with the Apps (screens visited, features
                used). This data cannot identify you individually.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process and fulfil your orders</li>
              <li>To manage your account and provide customer support</li>
              <li>To send transactional notifications (order confirmations, shipping updates)</li>
              <li>
                To send marketing communications — only with your explicit opt-in consent, and you
                may opt out at any time
              </li>
              <li>To detect and prevent fraud and abuse</li>
              <li>To improve the Apps based on aggregated usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">4. Data Sharing</h2>
            <p className="mb-3">
              We do not sell your personal data. We share data only as necessary to operate the
              Apps:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Payment processors</strong> to handle
                transactions securely
              </li>
              <li>
                <strong className="text-text-primary">Shipping and logistics providers</strong> to
                deliver your orders
              </li>
              <li>
                <strong className="text-text-primary">Analytics platforms</strong> (anonymous data
                only) to understand usage trends
              </li>
            </ul>
            <p className="mt-3">
              All third-party service providers are contractually required to handle your data
              securely and only for the purposes we specify.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">5. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active. If you request
              deletion of your account, we will delete or anonymise your personal data within 90
              days, except where we are required by law to retain certain records.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">6. Your Rights</h2>
            <p className="mb-3">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your data ("right to be forgotten")</li>
              <li>Request a portable copy of your data</li>
              <li>Withdraw consent for marketing communications at any time</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at the address in Section 10.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">7. Security</h2>
            <p>
              All data transmitted between the Apps and our servers is encrypted using TLS. Data
              at rest is encrypted using industry-standard methods. Payment data is handled
              exclusively by PCI-DSS compliant processors and never stored on our servers. While
              we take every reasonable precaution, no method of electronic transmission or
              storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              8. Children's Privacy
            </h2>
            <p>
              The Apps are not directed at children under the age of 13. We do not knowingly
              collect personal information from children under 13. If you believe a child under
              13 has provided us with personal information, please contact us and we will delete
              it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the
              effective date at the top of this page. For significant changes, we will notify you
              via the email address associated with your account or via an in-app notification.
              Continued use of the Apps after changes constitutes acceptance of the updated
              policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to exercise your data
              rights, please contact:
            </p>
            <address className="mt-3 not-italic space-y-1">
              <p className="text-text-primary font-semibold">Asif Mohtesham</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:asifmohtesham@gmail.com"
                  className="text-accent-purple hover:underline"
                >
                  asifmohtesham@gmail.com
                </a>
              </p>
              <p>Dubai, United Arab Emirates</p>
            </address>
          </section>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify the page renders at /privacy**

```bash
npm run dev
```

Open http://localhost:3000/privacy. Check that all 10 sections render, text is readable, and the back link works. Stop server.

- [ ] **Step 3: Verify TypeScript and build**

```bash
npx tsc --noEmit && npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/privacy/page.tsx
git commit -m "feat: generic privacy policy page covering all 10 App Store/Play Store sections"
```

---

## Task 16: GitHub repository and Vercel deployment

**Files:** no code files — infrastructure only.

- [ ] **Step 1: Create GitHub repository**

Using the GitHub CLI:

```bash
gh repo create mohtesham.com --public --source=. --remote=origin --push
```

If you prefer a private repo:
```bash
gh repo create mohtesham.com --private --source=. --remote=origin --push
```

Expected: repository created and all commits pushed to `main` branch.

- [ ] **Step 2: Verify all commits are on GitHub**

```bash
gh repo view --web
```

Open the GitHub page and confirm all commits appear.

- [ ] **Step 3: Deploy to Vercel**

Install the Vercel CLI if you haven't already (`npm i -g vercel`), then:

```bash
vercel --yes
```

When prompted:
- Link to existing project? **No** (create new)
- Project name: `mohtesham-com`
- Framework: **Next.js** (auto-detected)

This creates a preview deployment. Note the preview URL printed at the end.

- [ ] **Step 4: Add `RESEND_API_KEY` environment variable on Vercel**

Go to https://resend.com, sign up, and create an API key. Then:

```bash
vercel env add RESEND_API_KEY production
```

Paste your Resend API key when prompted. Also add it to preview:

```bash
vercel env add RESEND_API_KEY preview
```

- [ ] **Step 5: Deploy to production**

```bash
vercel --prod
```

Expected: production deployment URL printed (e.g. `https://mohtesham-com.vercel.app`).

- [ ] **Step 6: Connect custom domain**

In the Vercel dashboard → your project → Settings → Domains, add `mohtesham.com`. Vercel will show you DNS records to add. In your domain registrar's DNS settings, add:

- An **A record** pointing `@` to `76.76.21.21`
- A **CNAME record** pointing `www` to `cname.vercel-dns.com`

DNS propagation takes up to 24 hours. Once active, https://mohtesham.com will serve the site.

- [ ] **Step 7: (Optional) Verify Resend sender domain**

Once `mohtesham.com` DNS is live, go to https://resend.com/domains, add `mohtesham.com`, and follow the DNS verification steps. After verification, update the `from` address in `app/api/contact/route.ts`:

```typescript
from: "mohtesham.com <contact@mohtesham.com>",
```

Then commit and push — Vercel auto-deploys on push to `main`.

```bash
git add app/api/contact/route.ts
git commit -m "chore: update contact form sender to verified domain"
git push
```

- [ ] **Step 8: Set the privacy policy URL in App Store Connect and Google Play Console**

Use: `https://mohtesham.com/privacy`

---

## Self-Review Notes

- All 5 homepage sections covered: Hero ✓, About ✓, Ventures ✓, Expertise ✓, Contact ✓
- Privacy page covers all 10 Apple/Google required sections ✓
- Contact API route has 5 tests covering validation and success ✓
- GSAP plugins registered once in `lib/gsap.ts`, re-exported — no double-registration ✓
- All animated components are `"use client"` — no SSR conflicts ✓
- `.env.local` excluded from git via `.gitignore` ✓
- Resend `from` address uses `onboarding@resend.dev` initially (works without domain verification) with a comment to update after domain is verified ✓
