# mohtesham.com — Personal Site Design Spec

**Date:** 2026-05-22  
**Owner:** Asif Mohtesham  
**Domain:** mohtesham.com  
**Status:** Approved for implementation

---

## 1. Purpose & Goals

A personal brand site and venture hub for **Asif Mohtesham** — Founder, Consultant, and Engineer based in Dubai, UAE. The site serves two equally weighted purposes:

1. **Personal brand portfolio** — establish Asif's identity, expertise, and consulting presence
2. **Venture hub** — surface and link to his two primary businesses: BeautyRe and Milano Leather

Secondary requirement: host legally compliant **privacy policy pages** for both companies' iOS and Android apps (App Store and Play Store submission).

---

## 2. Target Audience

- Potential consulting clients and business partners
- Investors or collaborators exploring Asif's ventures
- App store reviewers validating privacy policy URLs
- General visitors discovering either brand through Asif

---

## 3. Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — full scroll story |
| `/privacy/beautyre` | Privacy policy for BeautyRe app |
| `/privacy/milanoleather` | Privacy policy for Milano Leather app |

---

## 4. Visual Design

### 4.1 Aesthetic
**Bold Tech** — deep near-black canvas with purple-to-pink gradient accents. High energy, startup-forward, emphasises the engineering dimension while remaining premium enough for the leather/beauty brands.

### 4.2 Colour Palette

| Token | Value | Usage |
|-------|-------|-------|
| `bg-base` | `#0d0d14` | Page background |
| `bg-surface` | `#1a1a2e` | Card/section backgrounds |
| `accent-purple` | `#6c3de8` | Primary accent, borders |
| `accent-pink` | `#e83d87` | Secondary accent, hover states |
| `gradient` | `linear-gradient(135deg, #6c3de8, #e83d87)` | CTAs, highlights, decorative |
| `text-primary` | `#ffffff` | Headings |
| `text-muted` | `#aaaaaa` | Body text, labels |
| `border` | `#1a1a2e` / `#2a2a4e` | Dividers, card borders |

### 4.3 Typography
- **Display / Hero**: `Plus Jakarta Sans` — heavy weight (800), tight letter-spacing (`-0.03em`)
- **Body**: `Plus Jakarta Sans`, regular weight (400), relaxed line-height (1.7)
- **Mono accents**: `JetBrains Mono` — used sparingly for labels and code-like decorative text

### 4.4 Navigation
Fixed glass-blur top bar (`backdrop-filter: blur(12px)`, semi-transparent `bg-base/80`):
- Left: "AM" monogram in gradient
- Right: anchor links → About · Ventures · Expertise · Contact
- Far right: "Get in Touch" pill button with gradient background
- Hides on scroll down, reappears on scroll up (GSAP-driven)

---

## 5. Homepage Sections

### 5.1 Hero
- **Full-screen** (`100dvh`)
- **Background**: animated canvas particle field (tsParticles) — small dots drifting, connected by faint lines, with a subtle radial gradient glow at center
- **Content (centered)**:
  - Small label above: `DUBAI · UAE` in mono, letter-spaced, gradient colour
  - Name: `Asif Mohtesham` — each word staggers in from below (GSAP `from y:60, opacity:0, stagger:0.1`)
  - Roles typewriter: cycles through `Founder_ / Engineer_ / Consultant_` with blinking cursor (GSAP TextPlugin)
  - Two CTA buttons below: "Explore Ventures" (gradient fill) + "Get in Touch" (ghost border)
- **Scroll cue**: animated chevron-down, fades out on first scroll

### 5.2 About
- **2-column layout** (stacks to 1-col on mobile)
- **Left column**: Short bio paragraph — Asif's story as a Dubai-based founder with a dual focus on consumer commerce (BeautyRe) and premium manufacturing (Milano Leather), with engineering and consulting practice threading both.
- **Right column**: Animated stat counters that roll up when scrolled into view:
  - `2` Ventures
  - `2017` Year Founded (BeautyRe)
  - `30+` Years of Legacy (Milano Leather)
  - `2` App Platforms
- **Section entrance**: bio text reveals with GSAP SplitText (word-by-word, stagger 0.02s); stats roll from 0 to target on ScrollTrigger enter

### 5.3 Ventures
- **Full-width section**, dark surface background
- **BeautyRe card** — slides in from left on scroll:
  - Gradient accent border (purple side)
  - Logo / wordmark area
  - Tagline: "Premium Beauty Products · Dubai, UAE · Since 2017"
  - Brief description: multi-category beauty e-commerce platform offering genuine skincare, haircare, and cosmetics with UAE-wide delivery
  - CTA: "Visit BeautyRe ↗" links to `beautyre.com`
- **Milano Leather card** — slides in from right on scroll:
  - Gradient accent border (pink side)
  - Logo / wordmark area
  - Tagline: "Quality Above All · Dubai, UAE · Est. 1980s"
  - Brief description: premium leather goods manufacturer supplying belts, wallets, bags across UAE and MENA — 4 brands, multiple factory-owned
  - CTA: "Visit Milano Leather ↗" links to `milanoleather.ae`
- Cards have a subtle hover parallax (mouse-tracking tilt, GSAP quickTo)

### 5.4 Expertise
- **3-pillar layout** (equal columns, stacks on mobile)
- Each pillar fades and slides up on ScrollTrigger, staggered 0.15s apart:

| Pillar | Icon | Description |
|--------|------|-------------|
| **Founder** | Rocket / spark | Building consumer products and marketplace businesses from zero to live, across beauty and premium goods verticals |
| **Engineer** | Code brackets | Full-stack and mobile engineering — iOS, Android, and web — powering the platforms behind both ventures |
| **Consultant** | Network graph | Strategic and technical advisory for digital commerce, product architecture, and go-to-market in the UAE/MENA region |

- Below pillars: staggered tag cloud of skills (`iOS` · `Android` · `Next.js` · `E-commerce` · `Product Strategy` · `UAE Market` · `Leather Goods` · `Beauty Tech` · `MENA` · `App Store` · `Play Store` · etc.) — tags pop in with scale+opacity stagger

### 5.5 Contact
- **Two-part layout**:
  - **Form** (left/top): Name · Email · Message fields, each animates in sequentially on scroll. "Send Message" gradient button. Submitted via POST to `/api/contact` → Resend email API → delivers to Asif's inbox.
  - **Links** (right/bottom): icon + text links for Email · LinkedIn · BeautyRe · Milano Leather — each with hover gradient underline animation
- Form validation: client-side required field check, server-side validation in API route, success/error toast notification

### 5.6 Footer
- Minimal single row: `© 2026 Asif Mohtesham · Dubai, UAE`
- Right: "Privacy" dropdown or two links → Privacy (BeautyRe) · Privacy (Milano Leather)
- Faint gradient line above

---

## 6. Privacy Policy Pages (`/privacy/beautyre` and `/privacy/milanoleather`)

### 6.1 Shared structure
Both pages follow the same template, with company-specific names, app names, and contact details substituted. Styled minimally (dark bg, readable prose) — no animations, fast to load, easy for app reviewers to parse.

### 6.2 Sections covered (required for App Store / Play Store)
1. **Introduction** — what the app is, who operates it, effective date
2. **Information We Collect**:
   - Account registration: name, email, password (hashed)
   - Payment information: processed via third-party gateway (PCI-compliant); card details never stored on our servers
   - Order/transaction history
   - Device identifiers (push notifications)
   - Usage analytics (anonymous)
3. **How We Use Your Information** — order fulfillment, account management, customer support, marketing (opt-in only), fraud prevention
4. **Data Sharing** — payment processors, shipping providers, analytics platforms; no sale of personal data
5. **Data Retention** — account data retained while account is active; deleted within 90 days of account deletion request
6. **Your Rights** — access, correction, deletion, portability; contact email provided
7. **Security** — TLS in transit, encrypted at rest, payment data handled by PCI-DSS compliant processor
8. **Children's Privacy** — apps not directed at children under 13
9. **Changes to This Policy** — update notification process
10. **Contact Us** — email address and mailing address (Dubai, UAE)

### 6.3 URL format
- `https://mohtesham.com/privacy/beautyre` — submitted to Apple App Store and Google Play as the privacy policy URL for BeautyRe app
- `https://mohtesham.com/privacy/milanoleather` — submitted for Milano Leather app

---

## 7. Animations Reference

| Element | GSAP API | Trigger |
|---------|----------|---------|
| Nav hide/show | `gsap.to(nav, {y: -100})` | ScrollTrigger on scroll direction |
| Hero name | `gsap.from(chars, {y:60, opacity:0, stagger:0.08})` | Page load |
| Roles typewriter | TextPlugin cycling | After name reveal completes |
| Hero particles | tsParticles canvas | Page load, continuous |
| About text | SplitText word reveal | ScrollTrigger enter |
| Stat counters | Custom counter tween | ScrollTrigger enter, once |
| Venture cards | `gsap.from({x:±120, opacity:0})` | ScrollTrigger enter |
| Card hover tilt | `gsap.quickTo(card, "rotateX/Y")` | mousemove |
| Expertise pillars | `gsap.from({y:40, opacity:0, stagger:0.15})` | ScrollTrigger enter |
| Skill tags | `gsap.from({scale:0.7, opacity:0, stagger:0.04})` | ScrollTrigger enter |
| Contact fields | `gsap.from({y:20, opacity:0, stagger:0.1})` | ScrollTrigger enter |

All ScrollTrigger animations use `once: true` — they fire once and stay visible. No jank on scroll-back.

---

## 8. Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 15 (App Router) | Vercel-native, SSG pages, API route for contact form |
| Language | TypeScript | Type safety, better DX |
| Styling | Tailwind CSS v4 | Utility-first, fast iteration |
| Animations | GSAP 3 + ScrollTrigger + TextPlugin + SplitText | Best-in-class web animation; SplitText free since GSAP 3.12 |
| Particles | tsParticles / @tsparticles/react | Canvas particle system, configurable |
| Email | Resend + `@react-email/components` | Simple API, generous free tier, Vercel-friendly |
| Fonts | Google Fonts (Plus Jakarta Sans + JetBrains Mono) | via `next/font` |
| VCS | GitHub | Auto-deploy to Vercel on push |
| Hosting | Vercel | Free tier, custom domain, HTTPS, edge CDN |

---

## 9. Project Structure

```
mohtesham.com/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Homepage (imports all sections)
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        # POST handler → Resend
│   └── privacy/
│       ├── beautyre/
│       │   └── page.tsx        # BeautyRe privacy policy
│       └── milanoleather/
│           └── page.tsx        # Milano Leather privacy policy
├── components/
│   ├── Nav.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Ventures.tsx
│   │   ├── Expertise.tsx
│   │   └── Contact.tsx
│   ├── Footer.tsx
│   └── ParticleBackground.tsx  # tsParticles wrapper (client component)
├── lib/
│   └── gsap.ts                 # GSAP plugin registration
├── public/
│   └── images/                 # Venture logos, any photos
├── .env.local                  # RESEND_API_KEY
└── .gitignore                  # includes .env.local, .superpowers/
```

---

## 10. Deployment

1. GitHub repo: `asifmohtesham/mohtesham.com` (or existing repo name)
2. Connect repo to Vercel project — auto-deploys on push to `main`
3. Add environment variable in Vercel dashboard: `RESEND_API_KEY`
4. Point `mohtesham.com` custom domain to Vercel (CNAME/A record)
5. Privacy policy URLs are static-generated at build time — no runtime dependency

---

## 11. Out of Scope

- Blog / articles section
- CMS integration
- Authentication or user accounts on mohtesham.com itself
- Multi-language (Arabic) — can be added later
- Dark/light mode toggle
