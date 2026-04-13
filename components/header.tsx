"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { getAllVijesti, getAllZanimljivosti, getAllDokumenti } from "@/lib/supabase-client"

function useUnreadCounts(pathname: string) {
  const [counts, setCounts] = useState({ news: 0, zanimljivosti: 0, dokumenti: 0 })

  useEffect(() => {
    async function calculate() {
      const lastNews   = parseInt(localStorage.getItem("lastVisit_news") || "0")
      const lastZanim  = parseInt(localStorage.getItem("lastVisit_zanimljivosti") || "0")
      const lastDoks   = parseInt(localStorage.getItem("lastVisit_dokumenti") || "0")

      const parseDate = (d: string) => {
        if (!d) return 0
        const p = d.split(".")
        if (p.length === 3) return new Date(`${p[2]}-${p[1]}-${p[0]}`).getTime()
        return new Date(d).getTime() || 0
      }

      const [vijesti, zanim, doks] = await Promise.all([
        getAllVijesti(),
        getAllZanimljivosti(),
        getAllDokumenti(),
      ])

      setCounts({
        news:          vijesti.filter(v => parseDate(v.date) > lastNews).length,
        zanimljivosti: zanim.filter(z => parseDate(z.date) > lastZanim).length,
        dokumenti:     doks.filter(d => parseDate(d.upload_date) > lastDoks).length,
      })
    }
    calculate()
  }, [pathname])

  // Kad korisnik posjeti stranicu, resetuj brojač
  useEffect(() => {
    const now = Date.now().toString()
    if (pathname === "/news")          localStorage.setItem("lastVisit_news", now)
    if (pathname === "/zanimljivosti") localStorage.setItem("lastVisit_zanimljivosti", now)
    if (pathname === "/dokumenti")     localStorage.setItem("lastVisit_dokumenti", now)

    setCounts(prev => ({
      news:          pathname === "/news"          ? 0 : prev.news,
      zanimljivosti: pathname === "/zanimljivosti" ? 0 : prev.zanimljivosti,
      dokumenti:     pathname === "/dokumenti"    ? 0 : prev.dokumenti,
    }))
  }, [pathname])

  return counts
}

function Badge({ count }: { count: number }) {
  if (count === 0) return null
  return (
    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none">
      {count > 99 ? "99+" : count}
    </span>
  )
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const unread = useUnreadCounts(pathname)

  const badgeMap: Record<string, number> = {
    "/news":          unread.news,
    "/zanimljivosti": unread.zanimljivosti,
    "/dokumenti":     unread.dokumenti,
  }

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false)
    if (pathname === "/") {
      const element = document.getElementById(sectionId)
      if (element) element.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push("/")
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) element.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  const handleLinkClick = () => setIsOpen(false)

  const regularLinks = [
    { href: "/", label: "Почетна" },
    { href: "/news", label: "Вијести" },
    { href: "/zanimljivosti", label: "Занимљивости" },
    { href: "/dokumenti", label: "Документи" },
    { href: "/o-nama", label: "О нама" },
    { href: "/kontakt", label: "Контакт" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-green-900 border-b border-green-950 shadow-md">
      <div className="w-full px-4">
        <div className="flex justify-between items-start pt-2 pb-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={50} height={50} className="w-12 h-12 object-contain" />
            <h1 className="text-white font-bold text-lg leading-tight hidden sm:block">
              Удружење шумарских инжењера и техничара
              <br />
              Републике Српске
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {regularLinks.map((link) => {
              const isActive =
                (link.href === "/" && pathname === "/") || (link.href !== "/" && pathname.startsWith(link.href))
              const badge = badgeMap[link.href] || 0

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors relative pb-2 ${
                    isActive ? "text-white" : "text-green-100 hover:text-white"
                  } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:transition-all after:duration-200 ${
                    isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.label}
                  <Badge count={badge} />
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            {regularLinks.map((link) => {
              const badge = badgeMap[link.href] || 0
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-sm font-semibold text-green-100 hover:text-white py-2 px-2 border-b border-green-800 flex items-center gap-2"
                >
                  {link.label}
                  {badge > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {badge > 99 ? "99+" : badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        )}
      </div>
    </header>
  )
}
