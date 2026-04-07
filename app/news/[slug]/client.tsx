"use client"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { updateVijest } from "@/lib/supabase-client"

export default function NewsArticleClient({ article, allNews, slug }: any) {
  const [views, setViews] = useState(article.views || 0)

  useEffect(() => {
    const viewKey = `news-view-${slug}`
    const lastView = localStorage.getItem(viewKey)
    const now = Date.now()

    // Jedan pregled po browseru na sat
    if (!lastView || now - parseInt(lastView) > 3600000) {
      localStorage.setItem(viewKey, now.toString())
      const newViews = (article.views || 0) + 1
      setViews(newViews)
      updateVijest(article.id, { views: newViews })
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

            {/* Share dugmad */}
            <ShareButtons title={article.title} />

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

function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const getUrl = () => typeof window !== "undefined" ? window.location.href : ""

  const handleCopy = () => {
    navigator.clipboard.writeText(getUrl())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const share = {
    facebook: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`, "_blank"),
    whatsapp: () => window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + getUrl())}`, "_blank"),
    viber:    () => window.open(`viber://forward?text=${encodeURIComponent(title + " " + getUrl())}`, "_blank"),
    telegram: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(title)}`, "_blank"),
    email:    () => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(getUrl())}`, "_blank"),
  }

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <p className="text-sm font-semibold text-gray-600 mb-3">Подијелите ову вијест:</p>
      <div className="flex flex-wrap gap-2">
        <button onClick={share.facebook}
          className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          Facebook
        </button>

        <button onClick={share.whatsapp}
          className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </button>

        <button onClick={share.viber}
          className="flex items-center gap-2 px-4 py-2 bg-[#7360F2] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.4 0C5.5.3.9 5.2 1 11.1c0 2.1.6 4.1 1.7 5.9L1 24l7.2-1.7c1.7.9 3.5 1.3 5.4 1.3 5.9 0 10.7-4.8 10.7-10.7S17.4-.3 11.4 0zm5.8 16.2c-.3.8-1.5 1.5-2.1 1.6-.5.1-1.2.1-3.8-1.6-3.2-1.9-5.1-5.2-5.3-5.4-.2-.3-1.4-1.9-1.4-3.6s.9-2.5 1.2-2.8c.3-.3.7-.4 1-.4h.7c.3 0 .5.1.8.6.3.6 1 2.5 1.1 2.7.1.2.2.4 0 .7-.1.2-.2.4-.4.6-.2.2-.4.4-.5.6-.2.2-.4.4-.2.8.2.3 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.8.4.2.6.1.8-.1.2-.2.9-1.1 1.2-1.4.3-.4.5-.3.9-.2.4.1 2.3 1.1 2.7 1.3.4.2.6.3.7.5.2.4-.1 1.7-.5 2.5z"/></svg>
          Viber
        </button>

        <button onClick={share.telegram}
          className="flex items-center gap-2 px-4 py-2 bg-[#229ED9] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          Telegram
        </button>

        <button onClick={share.email}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          Email
        </button>

        <button onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          {copied ? "✓ Kopirano!" : "Kopiraj link"}
        </button>
      </div>
    </div>
  )
}
