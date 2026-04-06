import Link from "next/link"
import { getVijestBySlug, getAllVijesti } from "@/lib/supabase-client"
import NewsArticleClient from "./client"

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params

  const [article, allNews] = await Promise.all([
    getVijestBySlug(slug),
    getAllVijesti(),
  ])

  if (!article) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Чланак није пронађен</h1>
          <Link href="/news" className="text-green-800 hover:underline">
            ← Назад на вијести
          </Link>
        </div>
      </main>
    )
  }

  // Normalize field names for the client component
  const normalized = {
    ...article,
    categoryLabel: article.category_label || article.categoryLabel,
    contentHtml: article.content_html || article.contentHtml,
  }

  return <NewsArticleClient article={normalized} allNews={allNews} slug={slug} />
}
