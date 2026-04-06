import { Hero } from "@/components/hero"
import { NewsGrid } from "@/components/news-grid"

export const metadata = {
  title: "Udruženje šumarskih inženjera i tehničara Republike Srpske",
  description: "Profesionalna organizacija šumarske struke posvećena održivom razvoju šumarstva.",
}

export default function Home() {
  return (
    <main>
      <Hero />
      <NewsGrid />
    </main>
  )
}
