import type { Metadata } from "next"
import "./globals.css"
import { SiteChrome } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "Looksmaxxing Hair AI | Face Shape, Haircut & Beard Analysis for Men",
  description:
    "Looksmaxxing Hair AI helps men analyze face shape and get stronger haircut, beard, and grooming direction from a premium AI-style experience.",
  metadataBase: new URL("https://looksmaxxing-hair-ai.vercel.app"),
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
