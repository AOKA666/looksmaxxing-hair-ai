import type { Metadata } from "next"
import "./globals.css"
import { SiteChrome } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "Looksmaxxing Hair AI | Face Shape, Haircut, Rating & Beard Analysis for Men",
  description:
    "Looksmaxxing Hair AI helps men analyze face shape, looksmaxxing hair potential, jawline and chin structure, and get a practical looksmaxxing rating with haircut, beard, and grooming direction.",
  metadataBase: new URL("https://looksmaxxing-hair-ai.vercel.app"),
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="FSm0Yx2GIliobhdyEOMcXQ"
          async
        />
      </head>
      <body className="font-sans">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
