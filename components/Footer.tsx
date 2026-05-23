import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-text-muted text-sm">
        <p>© {new Date().getFullYear()} Muhammad Asif Mohtesham · Dubai, UAE</p>
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
