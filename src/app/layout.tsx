import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NetworkStatus } from "@/components/NetworkStatus";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Venom — Music Generation, Publishing & Games | www.venom.com",
  description:
    "Venom is the ultimate music platform created and owned by Venom DLS. Generate AI-powered music, publish your tracks, play music games, and build your own music website — all in one place at www.venom.com.",
  keywords: ["music generation", "music publishing", "music games", "web builder", "AI music", "venom", "venom dls", "www.venom.com"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        <Providers>
          <NetworkStatus>{children}</NetworkStatus>
        </Providers>
      </body>
    </html>
  );
}
