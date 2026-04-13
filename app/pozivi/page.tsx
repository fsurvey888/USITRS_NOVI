"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Calendar, ChevronDown, ChevronUp } from "lucide-react"
import { getAllPozivi } from "@/lib/supabase-client"

const categories = [
  { value: "all",      label: "Све категорије" },
  { value: "projekti", label: "Пројекти" },
  { value: "clanci",   label: "Научни чланци" },
  { value: "studije",  label: "Студије" },
  { value: "ostalo",   label: "Остало" },
]

export default function PoziviPage() {
  const [allPozivi, setAllPozivi] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await getAllPozivi()
      setAllPozivi(data)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = allPozivi.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const isExpired = (deadline: string) => {
    if (!deadline) return false
    const parts = deadline.split(".")
    if (parts.length === 3) {
      const d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
      return d < new Date()
    }
    return false
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-green-700">Почетна</Link>
            <span className="text-gray-400">→</span>
            <span className="text-green-700 font-semibold">Позиви</span>
          </div>
        </div>
      </section>

      {/* Header */}
      <section className="bg-green-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Позиви за достављање</h1>
          <p className="text-xl text-green-100">Позиви за пројекте, научне чланке и студије у области шумарства</p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Претражи позиве..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700"
          >
            {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
      </section>

      {/* List */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">Нема позива за одабране критеријуме.</div>
        )}

        <div className="space-y-4">
          {filtered.map((poziv) => {
            const isExpanded = expandedId === poziv.id
            const expired = isExpired(poziv.deadline)

            return (
              <article key={poziv.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-semibold">
                          {poziv.category_label || poziv.category}
                        </span>
                        {expired ? (
                          <span className="inline-block px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-semibold">
                            Истекао рок
                          </span>
                        ) : poziv.deadline ? (
                          <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-semibold flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Рок: {poziv.deadline}
                          </span>
                        ) : null}
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">{poziv.title}</h2>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{poziv.date}</span>
                  </div>

                  <p className={`text-gray-600 text-sm leading-relaxed ${!isExpanded ? "line-clamp-2" : ""}`}>
                    {poziv.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    {poziv.link && (
                      <a href={poziv.link} target="_blank" rel="noopener noreferrer"
                        className="text-green-700 font-semibold text-sm hover:text-green-900">
                        Детаљи →
                      </a>
                    )}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : poziv.id)}
                      className="ml-auto flex items-center gap-1 text-sm text-gray-500 hover:text-green-700"
                    >
                      {isExpanded ? <><ChevronUp className="w-4 h-4" /> Сакриј</> : <><ChevronDown className="w-4 h-4" /> Прикажи више</>}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
