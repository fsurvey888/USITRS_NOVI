export interface Document {
  id: number
  title: string
  description: string
  type: "pdf" | "image"
  url: string
  category: string
  categoryLabel: string
  uploadDate: string
  size?: string
}

export const documents: Document[] = [
  {
    id: 1,
    title: "Статут Удружења",
    description: "Званични статут Удружења шумарских инжењера и техничара Републике Српске",
    type: "pdf",
    url: "https://drive.google.com/uc?export=download&id=150ASJXKKf4r81o2l8Lxx9yG1_A9hV9fw",
    category: "pravilnici",
    categoryLabel: "Правилници",
    uploadDate: "15. Децембар 2025.",
    size: "2.4 MB",
  },
]

export const documentCategories = [
  { value: "pravilnici", label: "Правилници" },
  { value: "planovi", label: "Планови" },
  { value: "izvjestaji", label: "Извјештаји" },
  { value: "fotografije", label: "Фотографије" },
  { value: "ostalo", label: "Остало" },
]

export function getDocumentsFromStorage(): Document[] {
  let combined = [...documents]

  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("customDocuments")
      if (stored && stored !== "[]" && stored.length > 2) {
        try {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed) && parsed.length > 0) {
            const formattedDocuments = parsed.map((item: any) => ({
              id: item.id,
              title: item.title || "Без назива",
              description: item.description || "",
              type: item.fileType || "pdf",
              url: item.fileUrl || item.url || "",
              category: item.category || "ostalo",
              categoryLabel: item.categoryLabel || "Остало",
              uploadDate: item.date || new Date().toLocaleDateString('sr-RS'),
              size: item.size || "",
            }))
            combined = [...formattedDocuments, ...combined]
          }
        } catch (parseError) {
          console.error("[v0] Error parsing documents:", parseError)
        }
      }
    } catch (error) {
      console.error("[v0] Error loading documents:", error)
    }
  }

  // Уклони дупликате по ID-у и сортирај по датуму (најновије прво)
  const unique = Array.from(new Map(combined.map((item) => [item.id, item])).values())
  return unique.sort((a, b) => {
    const dateA = new Date(a.uploadDate || 0).getTime()
    const dateB = new Date(b.uploadDate || 0).getTime()
    return dateB - dateA
  })
}
