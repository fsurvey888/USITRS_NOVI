"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, MessageCircle, Eye } from "lucide-react"
import { getAllVijesti } from "@/lib/supabase-client"

const ITEMS_PER_PAGE = 6

export default function NewsPage() {
  const [allNews, setAllNews] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const parseDate = (dateStr: string): number => {
    if (!dateStr) return 0
    // Format DD.MM.YYYY
    const parts = dateStr.split(".")
    if (parts.length === 3) {
      return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime()
    }
    return new Date(dateStr).getTime() || 0
  }

  const applyFiltersAndSort = (news: any[], category: string, sort: string) => {
    let result = category === "all" ? [...news] : news.filter((item) => item.category === category)
    if (sort === "oldest") {
      result.sort((a, b) => parseDate(a.date) - parseDate(b.date))
    } else if (sort === "category") {
      result.sort((a, b) => (a.category || "").localeCompare(b.category || ""))
    } else {
      // newest (default)
      result.sort((a, b) => parseDate(b.date) - parseDate(a.date))
    }
    return result
  }

  useEffect(() => {
    async function load() {
      const data = await getAllVijesti()
      setAllNews(data)
      setFiltered(applyFiltersAndSort(data, "all", "newest"))
      setLoading(false)
    }
    load()
  }, [])

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    setFiltered(applyFiltersAndSort(allNews, category, sortBy))
  }

  const handleSort = (sort: string) => {
    setSortBy(sort)
    setCurrentPage(1)
    setFiltered(applyFiltersAndSort(allNews, selectedCategory, sort))
  }

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE)

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxButtons = 3

    if (totalPages <= maxButtons + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push("...")

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i)
      }

      if (currentPage < totalPages - 2) pages.push("...")
      if (!pages.includes(totalPages)) pages.push(totalPages)
    }

    return pages
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-green-800">
              Почетна
            </Link>
            <span className="text-gray-400">→</span>
            <span className="text-green-800 font-semibold">Вијести</span>
          </div>
        </div>
      </section>

      {/* Page Header */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-3">Све вијести</h1>
          <p className="text-lg text-gray-600">
            Останите информисани о активностима удружења и новостима из области шумарства
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-green-50 border-b border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-6 md:items-center flex-wrap">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <label className="text-sm font-semibold text-green-800">Филтер по категорији:</label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm"
              >
                <option value="all">Све категорије</option>
                <option value="edukacija">Едукација</option>
                <option value="projekti">Пројекти</option>
                <option value="istrazivanje">Истраживање</option>
                <option value="dogadjaji">Догађаји</option>
                <option value="tehnologija">Технологија</option>
                <option value="zastita">Заштита</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <label className="text-sm font-semibold text-green-800">Сортирај по:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm"
              >
                <option value="newest">Најновије</option>
                <option value="oldest">Најстарије</option>
                <option value="category">Категорији</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {loading && (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <div className="space-y-6">
            {!loading && paginatedItems.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex flex-row gap-4 p-4">
                  <div className="relative w-28 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500">{item.date}</span>
                      <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-semibold">
                        {item.category_label || item.categoryLabel}
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-gray-900 mb-1 hover:text-green-800 transition-colors line-clamp-1">
                      {item.title}
                    </h2>

                    <p className="text-gray-600 text-xs mb-2 line-clamp-1">{item.excerpt}</p>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{item.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{item.views}</span>
                      </div>
                      <Link
                        href={`/news/${item.slug}`}
                        className="ml-auto text-green-800 font-semibold hover:translate-x-1 transition-transform"
                      >
                        Опширније →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-600 hover:bg-green-800 hover:text-white hover:border-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600 disabled:hover:border-gray-300"
              >
                <ChevronLeft className="w-4 h-4" />
                Претходна
              </button>

              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, idx) => (
                  <button
                    key={idx}
                    onClick={() => typeof page === "number" && handlePageClick(page)}
                    disabled={typeof page === "string"}
                    className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                      page === currentPage
                        ? "bg-green-800 text-white"
                        : typeof page === "string"
                          ? "text-gray-600 cursor-default"
                          : "border border-gray-300 bg-white text-gray-600 hover:bg-green-800 hover:text-white hover:border-green-800"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-600 hover:bg-green-800 hover:text-white hover:border-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600 disabled:hover:border-gray-300"
              >
                Следећа
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
