"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false)

    if (pathname === "/") {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      router.push("/")
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const regularLinks = [
    { href: "/", label: "Почетна" },
    { href: "/news", label: "Вијести" },
    { href: "/zanimljivosti", label: "Занимљивости" },
    { href: "/dokumenti", label: "Документи" },
    { href: "/o-nama", label: "О нама" },
    { href: "/kontakt", label: "Контакт" }, // додат линк на контакт страницу уместо hash линка
  ]

  const hashLinks = []

  return (
    <header className="sticky top-0 z-50 bg-green-900 border-b border-green-950 shadow-md">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
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
            {regularLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-sm font-semibold text-green-100 hover:text-white py-2 px-2 border-b border-green-800"
              >
                {link.label}
              </Link>
            ))}

          </nav>
        )}
      </div>
    </header>
  )
}
