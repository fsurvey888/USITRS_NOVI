"use client"

import type React from "react"

export interface NewsItem {
  id: number
  title: string
  excerpt: string
  date: string
  dateSort: number
  category: string
  categoryLabel: string
  image: string
  slug: string
  content: React.ReactNode
  contentHtml: string
  comments: number
  views: number
  gallery?: string[]
}

export const newsItems: NewsItem[] = []

export function getAllNews(): NewsItem[] {
  let combined = [...newsItems]

  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("customNews")
      if (stored && stored.length > 2) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          const withContent = parsed.map((item: any) => {
            // Раздвоји галерију строку на низ
            const gallery = item.gallery 
              ? (typeof item.gallery === "string" 
                ? item.gallery.split(",").map((url: string) => url.trim()).filter((url: string) => url)
                : item.gallery)
              : []
            
            return {
              ...item,
              gallery: gallery,
              content: <div dangerouslySetInnerHTML={{ __html: item.contentHtml || "" }} />,
            }
          })
          combined = [...withContent, ...combined]
        }
      }
    } catch (error) {
      console.error("[v0] Error loading news:", error)
    }
  }

  const unique = Array.from(new Map(combined.map((item) => [item.id, item])).values())
  return unique.sort((a, b) => (b.dateSort || 0) - (a.dateSort || 0))
}

export function getLatestNews(count = 6): NewsItem[] {
  return getAllNews().slice(0, count)
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return getAllNews().find((item) => item.slug === slug)
}

export function getNewsFromStorage(): NewsItem[] {
  return getAllNews()
}

export function getNewsFromStorageWithHardcoded(): NewsItem[] {
  return getAllNews()
}
