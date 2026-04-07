"use client"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function NewsArticleClient({ article, allNews, slug }: any) {
  const [views, setViews] = useState(article.views || 0)

  useEffect(() => {
    // Инкрементирај број прегледа при учитавању странице
    const viewKey = `news-view-${slug}`
    const lastView = localStorage.getItem(viewKey)
    const now = Date.now()

    // Допусти само један преглед по часу по браузеру
    if (!lastView || now - parseInt(lastView) > 3600000) {
      localStorage.setItem(viewKey, now.toString())
      
      // Ажурирај вијест у localStorage
      try {
        const customNews = localStorage.getItem("customNews")
        if (customNews) {
          const parsed = JSON.parse(customNews)
          const updated = parsed.map((item: any) => 
            item.slug === slug 
              ? { ...item, views: (item.views || 0) + 1 }
              : item
          )
          localStorage.setItem("customNews", JSON.stringify(updated))
          setViews((prev: number) => prev + 1)
        }
      } catch (error) {
        console.error("[v0] Error updating views:", error)
      }
    }
  }, [slug])

  const currentIndex = allNews.findIndex((item: any) => item.slug === slug)
  const prevArticle = currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : null
  const nextArticle = currentIndex > 0 ? allNews[currentIndex - 1] : null

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-gray-600 hover:text-green-800">
              Почетна
            </Link>
            <span className="text-gray-400">→</span>
            <Link href="/news" className="text-gray-600 hover:text-green-800">
              Вијести
            </Link>
            <span className="text-gray-400">→</span>
            <span className="text-green-800 font-semibold">{article.title}</span>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative w-full h-96 bg-gray-200 overflow-hidden">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
          <div className="text-white">
            <p className="text-sm mb-2">{article.date}</p>
            <span className="inline-block px-3 py-1 bg-green-800 text-white rounded text-xs font-semibold">
              {article.categoryLabel}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h1 className="text-4xl font-bold text-green-800 mb-6">{article.title}</h1>

            <div className="flex gap-4 mb-8 pb-8 border-b border-gray-200 text-sm text-gray-600">
              <span>{article.date}</span>
              <span>{article.comments || 0} коментара</span>
              <span>{views} прегледа</span>
            </div>

            {article.contentHtml ? (
              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              />
            ) : (
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>{article.excerpt || "Садржај није доступан."}</p>
              </div>
            )}

            {/* Gallery */}
            {article.gallery && article.gallery.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-green-800 mb-6">Галерија</h2>
                <GalleryGrid images={article.gallery} />
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-4 mt-12 pt-8 border-t border-gray-200 flex-col md:flex-row">
              {prevArticle ? (
                <Link
                  href={`/news/${prevArticle.slug}`}
                  className="flex items-center gap-2 px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Претходна вијест
                </Link>
              ) : (
                <div></div>
              )}

              <Link
                href="/news"
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors md:mx-auto"
              >
                ← Назад на вијести
              </Link>

              {nextArticle ? (
                <Link
                  href={`/news/${nextArticle.slug}`}
                  className="flex items-center gap-2 px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors md:ml-auto"
                >
                  Слиједећа вијест
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}

function GalleryGrid({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Галерија слика ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <div className="relative w-full max-w-5xl aspect-video">
            <Image src={selectedImage || "/placeholder.svg"} alt="Увећана слика" fill className="object-contain" />
          </div>
        </div>
      )}
    </>
  )
}
