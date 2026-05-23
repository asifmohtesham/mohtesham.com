import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — Muhammad Asif Mohtesham",
  description: "Privacy policy for all mobile applications published by Muhammad Asif Mohtesham.",
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
              Muhammad Asif Mohtesham ("we", "us", "our"), available on the Apple App Store and Google
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
              <p className="text-text-primary font-semibold">Muhammad Asif Mohtesham</p>
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
