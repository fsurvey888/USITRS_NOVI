"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getAllFunFacts, getFunFactBySlug, type FunFact } from "@/lib/fun-facts-data"

export default function ZanimljivostPage({ params }: { params: { slug: string } }) {
  const [fact, setFact] = useState<FunFact | null>(null)
  const [allFacts, setAllFacts] = useState<FunFact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const all = getAllFunFacts()
      setAllFacts(all)

      const found = getFunFactBySlug(params.slug)
      setFact(found)
    } catch (error) {
      console.error("Грешка при учитавању занимљивости:", error)
    } finally {
      setLoading(false)
    }
  }, [params.slug])

  if (loading) return <div className="text-center py-12">Учитавање...</div>
  if (!fact) return <div className="text-center py-12">Занимљивост није пронађена</div>

  const currentIndex = allFacts.findIndex((f) => f.slug === params.slug)
  const prevFact = currentIndex > 0 ? allFacts[currentIndex - 1] : null
  const nextFact = currentIndex < allFacts.length - 1 ? allFacts[currentIndex + 1] : null

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
            <Link href="/zanimljivosti" className="text-gray-600 hover:text-green-700">
              Занимљивости
            </Link>
            <span className="text-gray-400">→</span>
            <span className="text-green-700 font-semibold">{fact.title}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <article className="bg-white rounded-xl shadow-lg p-8">
            {fact.image && (
              <img
                src={fact.image || "/placeholder.svg"}
                alt={fact.title}
                className="w-full h-96 object-cover rounded-lg mb-8"
              />
            )}

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="text-sm text-gray-600">{fact.date}</span>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                {fact.categoryLabel}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{fact.title}</h1>

            <div className="prose max-w-none text-gray-600 mb-8">
              <p className="text-lg leading-relaxed mb-6">{fact.fact}</p>
            </div>

            {fact.source && <p className="text-gray-400 italic">Извор: {fact.source}</p>}
          </article>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 gap-4">
            {prevFact ? (
              <Link
                href={`/zanimljivosti/${prevFact.slug}`}
                className="flex items-center gap-2 px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Претходна
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/zanimljivosti"
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Назад
            </Link>

            {nextFact ? (
              <Link
                href={`/zanimljivosti/${nextFact.slug}`}
                className="flex items-center gap-2 px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 transition-colors"
              >
                Следећа
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
