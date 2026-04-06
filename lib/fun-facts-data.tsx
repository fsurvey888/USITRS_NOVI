"use client"

export interface FunFact {
  id: number
  title: string
  fact: string
  date: string
  dateSort: number
  category: string
  categoryLabel: string
  source?: string
  image?: string
  icon?: string
  slug: string
  contentHtml?: string
}

export const funFactsItems: FunFact[] = []

export function getAllFunFacts(): FunFact[] {
  let combined = [...funFactsItems]

  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("customFunFacts")
      if (stored && stored.length > 2) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          combined = [...parsed, ...combined]
        }
      }
    } catch (error) {
      console.error("[v0] Error loading fun facts:", error)
    }
  }

  const unique = Array.from(new Map(combined.map((item) => [item.id, item])).values())
  return unique.sort((a, b) => (b.dateSort || 0) - (a.dateSort || 0))
}

export function getFunFactBySlug(slug: string): FunFact | null {
  return getAllFunFacts().find((fact) => fact.slug === slug) || null
}
