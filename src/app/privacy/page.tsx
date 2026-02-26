import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Venom DLS",
  description: "Learn how Venom DLS collects, uses, and protects your personal information and music data.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "February 26, 2025";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-[#00ff88] rounded-full" />
              <span className="text-xs font-semibold tracking-widest text-[#00ff88] uppercase">Legal</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
          </div>

          {/* Intro */}
          <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 mb-8">
            <p className="text-gray-300 leading-relaxed">
              At <strong className="text-white">Venom DLS</strong>, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you use our music generation,
              publishing, games, and web builder platform. Please read this policy carefully. If you disagree with its
              terms, please discontinue use of the platform.
            </p>
          </div>

          <div className="space-y-10 text-gray-300 leading-relaxed">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">1</span>
                Information We Collect
              </h2>
              <div className="space-y-4 pl-10">
                <div>
                  <h3 className="text-white font-semibold mb-2">Personal Information</h3>
                  <p>When you register for an account, we may collect your name, email address, username, and payment information (processed securely via third-party providers).</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Music & Creative Content</h3>
                  <p>We collect the music tracks, lyrics, prompts, and other creative content you generate, upload, or publish through our platform. This includes AI-generated music, metadata (title, genre, BPM, key), and any associated artwork.</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Usage Data</h3>
                  <p>We automatically collect information about how you interact with our platform, including pages visited, features used, tracks played, game scores, and time spent on the platform.</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Device & Technical Data</h3>
                  <p>We collect IP address, browser type, operating system, device identifiers, and cookies to ensure the platform functions correctly and to improve your experience.</p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">2</span>
                How We Use Your Information
              </h2>
              <ul className="pl-10 space-y-2 list-disc list-inside marker:text-[#00ff88]">
                <li>Provide, operate, and maintain the Venom DLS platform and its features</li>
                <li>Process AI music generation requests and deliver results to you</li>
                <li>Enable music publishing, distribution, and discovery features</li>
                <li>Personalise your experience and recommend music, games, and tools</li>
                <li>Process payments and manage your subscription or credits</li>
                <li>Send transactional emails (account confirmations, receipts, security alerts)</li>
                <li>Send promotional communications (with your consent; you may opt out at any time)</li>
                <li>Detect, prevent, and address technical issues, fraud, and abuse</li>
                <li>Comply with legal obligations and enforce our Terms & Conditions</li>
                <li>Improve our AI models and platform features using aggregated, anonymised data</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">3</span>
                Music Content & Intellectual Property
              </h2>
              <div className="pl-10 space-y-4">
                <p>Music you generate using our AI tools is subject to our <Link href="/terms" className="text-[#00ff88] hover:underline">Terms & Conditions</Link> regarding ownership and licensing. We do not claim ownership of original music you upload to the platform.</p>
                <p>AI-generated tracks created on Venom DLS may be used by you for personal and commercial purposes as outlined in your subscription plan. We retain the right to use anonymised, aggregated generation data to improve our AI models.</p>
                <p>We do not sell your individual music tracks or creative content to third parties without your explicit consent.</p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">4</span>
                Sharing Your Information
              </h2>
              <div className="pl-10 space-y-4">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
                <ul className="space-y-2 list-disc list-inside marker:text-[#00ff88]">
                  <li><strong className="text-white">Service Providers:</strong> Trusted third parties who assist in operating our platform (cloud hosting, payment processors, analytics, email delivery)</li>
                  <li><strong className="text-white">Music Distribution Partners:</strong> If you opt in to distribution services, your music metadata and profile information will be shared with relevant streaming platforms</li>
                  <li><strong className="text-white">Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
                  <li><strong className="text-white">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">5</span>
                Cookies & Tracking Technologies
              </h2>
              <div className="pl-10 space-y-4">
                <p>We use cookies and similar tracking technologies to enhance your experience on Venom DLS. These include:</p>
                <ul className="space-y-2 list-disc list-inside marker:text-[#00ff88]">
                  <li><strong className="text-white">Essential Cookies:</strong> Required for the platform to function (authentication, session management)</li>
                  <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how users interact with the platform</li>
                  <li><strong className="text-white">Preference Cookies:</strong> Remember your settings (audio quality, theme, language)</li>
                </ul>
                <p>You can control cookie settings through your browser. Disabling certain cookies may affect platform functionality.</p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">6</span>
                Data Retention
              </h2>
              <div className="pl-10 space-y-4">
                <p>We retain your personal information for as long as your account is active or as needed to provide services. We will retain and use your information as necessary to comply with legal obligations, resolve disputes, and enforce our agreements.</p>
                <p>Music tracks and generated content are retained for the duration of your account. Upon account deletion, your personal data will be removed within 30 days, though anonymised usage data may be retained for analytics purposes.</p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">7</span>
                Your Rights
              </h2>
              <div className="pl-10 space-y-4">
                <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                <ul className="space-y-2 list-disc list-inside marker:text-[#00ff88]">
                  <li><strong className="text-white">Access:</strong> Request a copy of the personal data we hold about you</li>
                  <li><strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete data</li>
                  <li><strong className="text-white">Deletion:</strong> Request deletion of your personal data (&quot;right to be forgotten&quot;)</li>
                  <li><strong className="text-white">Portability:</strong> Request your data in a portable, machine-readable format</li>
                  <li><strong className="text-white">Objection:</strong> Object to processing of your data for marketing purposes</li>
                  <li><strong className="text-white">Withdrawal of Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
                </ul>
                <p>To exercise any of these rights, contact us at <a href="mailto:venommacllinx@gmail.com" className="text-[#00ff88] hover:underline">venommacllinx@gmail.com</a>.</p>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">8</span>
                Security
              </h2>
              <div className="pl-10">
                <p>We implement industry-standard security measures including encryption in transit (TLS/HTTPS), encrypted storage for sensitive data, and regular security audits. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.</p>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">9</span>
                Children&apos;s Privacy
              </h2>
              <div className="pl-10">
                <p>Venom DLS is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately at <a href="mailto:venommacllinx@gmail.com" className="text-[#00ff88] hover:underline">venommacllinx@gmail.com</a>.</p>
              </div>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">10</span>
                Changes to This Policy
              </h2>
              <div className="pl-10">
                <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically.</p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-3">Contact Us</h2>
              <p className="mb-4">If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:venommacllinx@gmail.com" className="text-[#00ff88] hover:underline font-medium">
                  venommacllinx@gmail.com
                </a>
              </div>
            </section>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#00ff88] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
              <Link
                href="/terms"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#00ff88] transition-colors"
              >
                View Terms & Conditions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
