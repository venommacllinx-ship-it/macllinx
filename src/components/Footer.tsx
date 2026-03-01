import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#00ff88] flex items-center justify-center">
                <span className="text-black font-black text-sm">V</span>
              </div>
              <span className="text-xl font-black tracking-wider gradient-text">VENOM</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The ultimate music platform. Generate, publish, play, and build — all powered by AI.
              Created and owned by <span className="text-gray-400 font-semibold">Venom DLS</span>.
            </p>
            <a
              href="https://www.venom.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xs text-[#00ff88] hover:underline"
            >
              www.venom.com
            </a>
            <div className="flex gap-4 mt-4">
              {["Twitter", "Discord", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs text-gray-600 hover:text-[#00ff88] transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {[
                { href: "#generate", label: "Music Generation" },
                { href: "#publish", label: "Music Publishing" },
                { href: "#games", label: "Music Games" },
                { href: "#builder", label: "Web Builder" },
                { href: "/chat", label: "Venomous Chat" },
                { href: "/code", label: "Code Studio" },
                { href: "/subscription", label: "Pricing" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-500 hover:text-[#00ff88] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-gray-500 hover:text-[#00ff88] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-[#00ff88] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-[#00ff88] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="mailto:venommacllinx@gmail.com"
                  className="text-sm text-gray-500 hover:text-[#00ff88] transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-[#00ff88] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-[#00ff88] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Venom DLS. All rights reserved. |{" "}
            <a href="https://www.venom.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ff88] transition-colors">www.venom.com</a>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-600 hover:text-[#00ff88] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-700">·</span>
            <Link href="/terms" className="text-xs text-gray-600 hover:text-[#00ff88] transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
