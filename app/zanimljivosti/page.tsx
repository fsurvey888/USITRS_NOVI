"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Trees, Leaf, Bird, Globe, FlaskConical, BookOpen, Search } from "lucide-react"
import { getAllZanimljivosti } from "@/lib/supabase-client"

const iconMap: Record<string, any> = {
  trees: Trees,
  leaf: Leaf,
  bird: Bird,
  globe: Globe,
  flask: FlaskConical,
  book: BookOpen,
}

const categories = [
  { value: "all", label: "Све категорије" },
  { value: "drvo", label: "Дрвеће" },
  { value: "zivotinje", label: "Животиње" },
  { value: "ekologija", label: "Екологија" },
  { value: "istorija", label: "Историја" },
  { value: "nauka", label: "Наука" },
]

export default function ZanimljivostiPage() {
  const [allFacts, setAllFacts] = useState<any[]>([])

  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function load() {
      const facts = await getAllZanimljivosti()
      setAllFacts(facts)
    }
    load()
  }, [])

  const filteredFacts = allFacts.filter((fact) => {
    const matchesCategory = selectedCategory === "all" || fact.category === selectedCategory
    const matchesSearch =
      fact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fact.fact.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-green-700">
              Поčетна
            </Link>
            <span className="text-gray-400">→</span>
            <span className="text-green-700 font-semibold">Занимљивости</span>
          </div>
        </div>
      </section>

      {/* Page Header */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-green-900 mb-3">Занимљивости о шумама</h1>
          <p className="text-lg text-gray-600">Откријте ѕанимљиве чињенице о шумама, дрвећу и шумарству</p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-green-50 border-b border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Претражи занимљивости..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-green-700">Категорија:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Facts Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          {filteredFacts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacts.map((fact) => {
                const IconComponent = iconMap[fact.icon || "trees"] || Trees
                return (
                  <article
                    key={fact.id}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Слика као thumbnail */}
                    {fact.image && (
                      <div className="mb-4 -mx-6 -mt-6">
                        <img
                          src={fact.image || "/placeholder.svg"}
                          alt={fact.title}
                          className="w-full h-40 object-cover rounded-t-xl"
                        />
                      </div>
                    )}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-green-700" />
                      </div>
                      <div>
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold mb-2">
                          {fact.category_label || fact.categoryLabel}
                        </span>
                        <h2 className="text-lg font-bold text-gray-900">{fact.title}</h2>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{fact.fact}</p>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">{fact.date}</span>
                      {/* Замена "Опширније" линка са линком на Lana Lana вијести умјесто детаљне странице занимљивости */}
                      <Link href="/news" className="text-green-700 hover:text-green-800 font-semibold text-sm">
                        Види вијести →
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Нема пронађених занимљивости за одабране критеријуме.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
