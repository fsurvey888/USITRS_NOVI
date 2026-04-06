import type React from "react"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"
import { Geist, Geist_Mono, Inter } from "next/font/google"

const _geistSans = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Удружење шумарских инжењера и техничара Републике Српске",
  description: "Удружење посвеећено развоју шумарства и заштити шумских ресурса.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr">
      <body className="bg-gray-50 font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
