"use client"

import { useState, useEffect } from "react"
import { FileText, ImageIcon, Download, Search, Filter } from "lucide-react"
import { getAllDokumenti } from "@/lib/supabase-client"

const documentCategories = [
  { value: "statut", label: "Статут" },
  { value: "izvjestaj", label: "Извјештај" },
  { value: "plan", label: "План" },
  { value: "fotografije", label: "Фотографије" },
  { value: "ostalo", label: "Остало" },
]

export default function DokumentiPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("sve")
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    async function load() {
      const data = await getAllDokumenti()
      setDocuments(data)
    }
    load()
  }, [])

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "sve" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="flex-1 bg-gray-50">
      {/* Hero секција */}
      <section className="bg-green-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Документи</h1>
          <p className="text-xl text-green-100">Преузмите статуте, извјештаје, планове и фотографије</p>
        </div>
      </section>

      {/* Филтери и претрага */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Претрага */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Претражи документе..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 focus:ring-1 focus:ring-green-800"
              />
            </div>

            {/* Категорије */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 focus:ring-1 focus:ring-green-800 appearance-none bg-white"
              >
                <option value="sve">Све категорије</option>
                {documentCategories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Резултати */}
        <div className="mb-4 text-gray-600">
          Пронађено: <span className="font-semibold">{filteredDocuments.length}</span> докумената
        </div>

        {/* Листа докумената */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Икона или слика */}
              <div className="h-48 bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center">
                {(doc.type || doc.file_type) === "pdf" ? (
                  <FileText className="w-20 h-20 text-white" />
                ) : (
                  <ImageIcon className="w-20 h-20 text-white" />
                )}
              </div>

              {/* Садржај картице */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    {doc.category_label || doc.categoryLabel}
                  </span>
                  <span className="text-xs text-gray-500">{doc.upload_date || doc.uploadDate}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{doc.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doc.description}</p>

                {doc.size && <p className="text-xs text-gray-500 mb-4">Величина: {doc.size}</p>}

                <a
                  href={doc.url || doc.file_url}
                  download={doc.title}
                  onClick={(e) => {
                    if ((doc.type || doc.file_type) === "pdf") {
                      e.preventDefault()
                      window.open(doc.url || doc.file_url, "_blank")
                      setTimeout(() => {
                        window.location.href = "/dokumenti"
                      }, 100)
                    }
                  }}
                  className="flex items-center justify-center gap-2 w-full bg-green-800 text-white font-semibold py-2 rounded-lg hover:bg-green-900 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Преузми
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Порука ако нема резултата */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Нису пронађени документи који одговарају вашој претрази.</p>
          </div>
        )}
      </section>
    </main>
  )
}
