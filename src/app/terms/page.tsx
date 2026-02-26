import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Venom DLS",
  description: "Read the Terms & Conditions governing your use of the Venom DLS music platform.",
};

export default function TermsPage() {
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
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Terms & Conditions</h1>
            <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
          </div>

          {/* Intro */}
          <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 mb-8">
            <p className="text-gray-300 leading-relaxed">
              Welcome to <strong className="text-white">Venom DLS</strong>. By accessing or using our platform — including
              music generation, publishing, games, and web builder features — you agree to be bound by these Terms &
              Conditions. If you do not agree to these terms, please do not use our platform.
            </p>
          </div>

          <div className="space-y-10 text-gray-300 leading-relaxed">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">1</span>
                Acceptance of Terms
              </h2>
              <div className="pl-10 space-y-4">
                <p>By creating an account or using any part of the Venom DLS platform, you confirm that you are at least 13 years of age, have read and understood these Terms & Conditions, and agree to be legally bound by them.</p>
                <p>We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms.</p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">2</span>
                Platform Description
              </h2>
              <div className="pl-10 space-y-4">
                <p>Venom DLS provides the following services:</p>
                <ul className="space-y-2 list-disc list-inside marker:text-[#00ff88]">
                  <li><strong className="text-white">AI Music Generation:</strong> Create original music tracks using artificial intelligence based on your prompts and parameters</li>
                  <li><strong className="text-white">Music Publishing:</strong> Upload, distribute, and monetise your music across streaming platforms</li>
                  <li><strong className="text-white">Music Games:</strong> Interactive music-based games and challenges</li>
                  <li><strong className="text-white">Web Builder:</strong> Build and customise your own music artist website</li>
                </ul>
                <p>Features and availability may change over time. We reserve the right to modify, suspend, or discontinue any part of the platform with reasonable notice.</p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">3</span>
                Intellectual Property & Music Ownership
              </h2>
              <div className="pl-10 space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">Your Original Music</h3>
                  <p>Music you create independently and upload to Venom DLS remains your intellectual property. By uploading, you grant us a non-exclusive, royalty-free licence to host, display, and distribute your content as part of the platform&apos;s services.</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">AI-Generated Music</h3>
                  <p>Music generated using our AI tools is granted to you under a licence tied to your subscription plan:</p>
                  <ul className="mt-2 space-y-2 list-disc list-inside marker:text-[#00ff88]">
                    <li><strong className="text-white">Free Plan:</strong> Personal, non-commercial use only. Attribution to Venom DLS required.</li>
                    <li><strong className="text-white">Creator Plan:</strong> Commercial use permitted for tracks generated under this plan.</li>
                    <li><strong className="text-white">Pro Plan:</strong> Full commercial rights including sync licensing and distribution.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Platform Content</h3>
                  <p>All platform software, design, branding, and non-user content is owned by Venom DLS and protected by copyright law. You may not reproduce, distribute, or create derivative works without our written permission.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">4</span>
                Acceptable Use Policy
              </h2>
              <div className="pl-10 space-y-4">
                <p>You agree not to use Venom DLS to:</p>
                <ul className="space-y-2 list-disc list-inside marker:text-[#00ff88]">
                  <li>Generate, upload, or distribute music that infringes on third-party copyrights or trademarks</li>
                  <li>Create content that is defamatory, obscene, hateful, or promotes violence or discrimination</li>
                  <li>Impersonate any person, artist, or entity</li>
                  <li>Attempt to reverse-engineer, scrape, or extract our AI models or platform code</li>
                  <li>Use automated bots or scripts to access the platform without authorisation</li>
                  <li>Circumvent any access controls, subscription limits, or security measures</li>
                  <li>Upload malware, viruses, or any harmful code</li>
                  <li>Engage in any activity that violates applicable laws or regulations</li>
                </ul>
                <p>Violation of this policy may result in immediate account suspension or termination.</p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">5</span>
                Music Publishing & Distribution
              </h2>
              <div className="pl-10 space-y-4">
                <p>When using our publishing and distribution features, you confirm that:</p>
                <ul className="space-y-2 list-disc list-inside marker:text-[#00ff88]">
                  <li>You own or have the necessary rights to distribute the music you submit</li>
                  <li>The music does not infringe on any third-party copyrights, including samples, interpolations, or cover songs without proper licensing</li>
                  <li>You have obtained all necessary mechanical, synchronisation, and master licences where applicable</li>
                  <li>You are solely responsible for any royalty payments owed to co-writers, producers, or rights holders</li>
                </ul>
                <p>Venom DLS acts as a distribution facilitator and is not liable for copyright disputes arising from content you submit for distribution.</p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">6</span>
                Payments & Subscriptions
              </h2>
              <div className="pl-10 space-y-4">
                <p>Certain features of Venom DLS require a paid subscription or credits. By subscribing, you agree to:</p>
                <ul className="space-y-2 list-disc list-inside marker:text-[#00ff88]">
                  <li>Pay all applicable fees as described at the time of purchase</li>
                  <li>Provide accurate and complete billing information</li>
                  <li>Authorise recurring charges for subscription plans until cancelled</li>
                </ul>
                <p>Subscriptions auto-renew unless cancelled before the renewal date. Refunds are handled on a case-by-case basis. Contact <a href="mailto:venommacllinx@gmail.com" className="text-[#00ff88] hover:underline">venommacllinx@gmail.com</a> for billing disputes.</p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">7</span>
                DMCA & Copyright Takedowns
              </h2>
              <div className="pl-10 space-y-4">
                <p>We respect intellectual property rights. If you believe content on Venom DLS infringes your copyright, please send a DMCA takedown notice to <a href="mailto:venommacllinx@gmail.com" className="text-[#00ff88] hover:underline">venommacllinx@gmail.com</a> including:</p>
                <ul className="space-y-2 list-disc list-inside marker:text-[#00ff88]">
                  <li>Identification of the copyrighted work claimed to be infringed</li>
                  <li>Identification of the infringing material and its location on our platform</li>
                  <li>Your contact information (name, address, email, phone)</li>
                  <li>A statement of good faith belief that the use is not authorised</li>
                  <li>A statement under penalty of perjury that the information is accurate and you are the rights holder or authorised to act on their behalf</li>
                  <li>Your physical or electronic signature</li>
                </ul>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">8</span>
                Disclaimer of Warranties
              </h2>
              <div className="pl-10 space-y-4">
                <p>Venom DLS is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not warrant that:</p>
                <ul className="space-y-2 list-disc list-inside marker:text-[#00ff88]">
                  <li>The platform will be uninterrupted, error-free, or secure</li>
                  <li>AI-generated music will meet your specific requirements or expectations</li>
                  <li>Results from music generation will be unique or free from similarity to existing works</li>
                  <li>The platform will be available in all geographic locations</li>
                </ul>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">9</span>
                Limitation of Liability
              </h2>
              <div className="pl-10">
                <p>To the maximum extent permitted by law, Venom DLS and its affiliates, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform, including but not limited to loss of revenue, loss of data, or loss of music content. Our total liability shall not exceed the amount you paid to us in the 12 months preceding the claim.</p>
              </div>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">10</span>
                Account Termination
              </h2>
              <div className="pl-10 space-y-4">
                <p>You may delete your account at any time by contacting us. We reserve the right to suspend or terminate your account without notice if you violate these Terms & Conditions or engage in conduct harmful to the platform or other users.</p>
                <p>Upon termination, your right to use the platform ceases immediately. Content you have published to external platforms via our distribution service will remain unless you separately request removal from those platforms.</p>
              </div>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs font-black">11</span>
                Governing Law
              </h2>
              <div className="pl-10">
                <p>These Terms & Conditions are governed by and construed in accordance with applicable law. Any disputes arising from these terms or your use of the platform shall be resolved through good-faith negotiation, and if unresolved, through binding arbitration or the courts of competent jurisdiction.</p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-3">Questions?</h2>
              <p className="mb-4">If you have any questions about these Terms & Conditions, please reach out:</p>
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
                href="/privacy"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#00ff88] transition-colors"
              >
                View Privacy Policy
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
