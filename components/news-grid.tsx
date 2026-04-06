"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { getLatestNews, type NewsItem } from "@/lib/news-data"

export function NewsGrid() {
  const [cards, setCards] = useState<NewsItem[]>([])
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const news = getLatestNews(6)
    setCards(news)
  }, [])

  useEffect(() => {
    if (cards.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleCards((prev) => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const cardElements = document.querySelectorAll(".news-card-item")
    cardElements.forEach((card) => {
      observerRef.current?.observe(card)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [cards])

  if (cards.length === 0) {
    return (
      <section id="vijesti" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-4">Најновије вијести</h2>
            <p className="text-lg text-gray-600">
              Останите информисани о активностима удружења и новостима из области шумарства
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500">Тренутно нема објављених вијести.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="vijesti" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-800 mb-4">Најновије вијести</h2>
          <p className="text-lg text-gray-600">
            Останите информисани о активностима удружења и новостима из области шумарства
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((item, index) => (
            <article
              key={item.id}
              data-index={index}
              className={`news-card-item bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ${
                visibleCards.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex gap-4 mb-3 text-sm">
                  <span className="text-gray-600">{item.date}</span>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                    {item.categoryLabel}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                <Link
                  href={`/news/${item.slug}`}
                  className="inline-flex text-green-800 font-semibold hover:translate-x-1 transition-transform"
                >
                  Опширније →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
