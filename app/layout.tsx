import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Providers } from "@/components/providers"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "PAIB - Pakistan Artificial Intelligence Bureau",
  description: "Leading Pakistan into the AI revolution with cutting-edge solutions and innovation",
  generator: "PAIB",
  keywords: ["AI", "Artificial Intelligence", "Pakistan", "Machine Learning", "Technology"],
  authors: [{ name: "PAIB Team" }],
  openGraph: {
    title: "PAIB - Pakistan Artificial Intelligence Bureau",
    description: "Leading Pakistan into the AI revolution with cutting-edge solutions and innovation",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased `}>
        <Suspense fallback={null}>
          <Providers>
            {children}
          </Providers>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
