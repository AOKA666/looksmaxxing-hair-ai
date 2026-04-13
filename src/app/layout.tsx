import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteChrome } from "@/components/site-chrome"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Looksmaxxing Hair AI | Face Shape, Haircut & Beard Analysis for Men",
  description:
    "Looksmaxxing Hair AI helps men analyze face shape and get stronger haircut, beard, and grooming direction from a premium AI-style experience.",
  metadataBase: new URL("https://looksmaxxing-hair-ai.vercel.app"),
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
