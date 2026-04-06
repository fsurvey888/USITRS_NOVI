import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-emerald-50 border-t border-gray-200 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="text-lg font-bold text-emerald-700 mb-3">
              Удружење шумарских инжењера и техничара Републике Српске
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Удружење посвећено развоју шумарства и заштити шумских ресурса.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-emerald-700 mb-4">Брзи линкови</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Почетна" },
                { href: "/news", label: "Вијести" },
                { href: "/zanimljivosti", label: "Занимљивости" },
                { href: "/dokumenti", label: "Документи" },
                { href: "/#kontakt", label: "Контакт" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-600 hover:text-emerald-700 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-emerald-700 mb-4">Контакт</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <a href="mailto:usitrs@teol.net" className="text-gray-600 hover:text-emerald-700 transition-colors">
                  usitrs@teol.net
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <a href="mailto:usitrepublikesrpske@gmail.com" className="text-gray-600 hover:text-emerald-700 transition-colors">
                  usitrepublikesrpske@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span className="text-gray-600">+387 57/400-630</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span className="text-gray-600">Романијска 1, Соколац</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>© 2026 Удружење шумарских инжењера и техничара Републике Српске. Сва права задржана.</p>
        </div>
      </div>
    </footer>
  )
}
