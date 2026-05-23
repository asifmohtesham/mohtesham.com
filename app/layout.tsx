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
  metadataBase: new URL("https://mohtesham.com"),
  title: "Muhammad Asif Mohtesham — Founder, Engineer, Consultant",
  description:
    "Dubai-based founder, engineer, and consultant. Building BeautyRe and Milano Leather.",
  openGraph: {
    title: "Muhammad Asif Mohtesham — Founder, Engineer, Consultant",
    description:
      "Dubai-based founder, engineer, and consultant. Building BeautyRe and Milano Leather. Helping MENA businesses scale their digital operations.",
    url: "https://mohtesham.com",
    siteName: "Muhammad Asif Mohtesham",
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
