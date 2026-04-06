"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Edit, Plus, FileText, Sparkles, FolderOpen, Settings, Calendar } from "lucide-react"
import { ADMIN_CONFIG } from "@/lib/admin-config"
import {
  getAllVijesti,
  createVijest,
  updateVijest,
  deleteVijest,
  getAllZanimljivosti,
  createZanimljivost,
  updateZanimljivost,
  deleteZanimljivost,
  getAllDokumenti,
  createDokument,
  deleteDokument,
} from "@/lib/supabase-client"

export default function AdminPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const [activeTab, setActiveTab] = useState<"news" | "funfacts" | "documents" | "manage">("news")
  const [saving, setSaving] = useState(false)

  // Вијести форма
  const [newsForm, setNewsForm] = useState({
    title: "",
    excerpt: "",
    date: "",
    category: "edukacija",
    image: "",
    content: "",
    gallery: "",
    views: 0,
  })
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null)

  // Занимљивости форма
  const [funFactForm, setFunFactForm] = useState({
    title: "",
    fact: "",
    date: "",
    category: "drvo",
    image: "",
    icon: "trees",
  })
  const [editingFactId, setEditingFactId] = useState<number | null>(null)

  // Документи форма
  const [documentForm, setDocumentForm] = useState({
    title: "",
    description: "",
    category: "pravilnici",
    fileUrl: "",
    fileType: "pdf",
  })

  // Сачуване ставке за управљање
  const [savedNews, setSavedNews] = useState<any[]>([])
  const [savedFunFacts, setSavedFunFacts] = useState<any[]>([])
  const [savedDocuments, setSavedDocuments] = useState<any[]>([])

  const [message, setMessage] = useState("")

  // Проверка логина
  useEffect(() => {
    if (typeof window !== "undefined") {
      const logged = localStorage.getItem("adminLoggedIn") === "true"
      setIsLoggedIn(logged)
      if (!logged) {
        router.push("/admin-login")
      }
    }
  }, [router])

  // Учитавање из Supabase
  useEffect(() => {
    if (!isLoggedIn) return
    async function loadAll() {
      const [news, facts, docs] = await Promise.all([
        getAllVijesti(),
        getAllZanimljivosti(),
        getAllDokumenti(),
      ])
      setSavedNews(news)
      setSavedFunFacts(facts)
      setSavedDocuments(docs)
    }
    loadAll()
  }, [isLoggedIn])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    if (username === ADMIN_CONFIG.username && ADMIN_CONFIG.checkPassword(password)) {
      localStorage.setItem("adminLoggedIn", "true")
      setIsLoggedIn(true)
      setPassword("")
    } else {
      setLoginError("Неиспрaвно корисничко ime или лозинка")
      setPassword("")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    setIsLoggedIn(false)
  }

  const categoryLabels: Record<string, string> = {
    edukacija: "Едукација",
    projekti: "Пројекти",
    dogadjaji: "Догађаји",
    saopstenja: "Саопштења",
    istrazivanje: "Истраживање",
    tehnologija: "Технологија",
    zastita: "Заштита",
    drvo: "Дрвеће",
    zivotinje: "Животиње",
    ekologija: "Екологија",
    istorija: "Историја",
    nauka: "Наука",
    pravilnici: "Правилници",
    zapisnici: "Записници",
    izvjestaji: "Извјештаји",
    obrasci: "Обрасци",
  }

  const formatDate = (dateString: string): string => {
    if (!dateString) return new Date().toLocaleDateString("sr-RS")
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return new Date().toLocaleDateString("sr-RS")
      const day = date.getDate().toString().padStart(2, "0")
      const month = (date.getMonth() + 1).toString().padStart(2, "0")
      const year = date.getFullYear()
      return `${day}.${month}.${year}`
    } catch {
      return new Date().toLocaleDateString("sr-RS")
    }
  }

  const makeSlug = (title: string) =>
    (title || "vijest")
      .toLowerCase()
      .replace(/[čćžšđ]/g, (c: string) => ({ č: "c", ć: "c", ž: "z", š: "s", đ: "d" }[c] || c))
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")

  const handleAddNews = async () => {
    if (!newsForm.title) { setMessage("⚠ Унесите наслов вијести."); return }
    setSaving(true)
    const formattedDate = newsForm.date ? formatDate(newsForm.date) : new Date().toLocaleDateString("sr-RS")
    const payload = {
      title: newsForm.title,
      excerpt: newsForm.excerpt || "",
      date: formattedDate,
      category: newsForm.category,
      category_label: categoryLabels[newsForm.category] || newsForm.category,
      image: newsForm.image || "/forestry-news.jpg",
      slug: makeSlug(newsForm.title) + "-" + Date.now(),
      content_html: newsForm.content
        ? newsForm.content.split("\n").filter((p) => p.trim()).map((p) => `<p>${p}</p>`).join("")
        : `<p>${newsForm.excerpt || "Нема садржаја"}</p>`,
      gallery: newsForm.gallery
        ? newsForm.gallery.split(",").map((u) => u.trim()).filter(Boolean).slice(0, 6)
        : [],
      comments: 0,
      views: Number(newsForm.views) || 0,
      author: "Редакција",
    }

    let result
    if (editingNewsId) {
      result = await updateVijest(editingNewsId, payload)
      if (result) {
        setSavedNews((prev) => prev.map((n) => (n.id === editingNewsId ? result : n)))
        setMessage("✓ Вијест је измијењена!")
      } else {
        setMessage("⚠ Грешка при измјени вијести.")
      }
      setEditingNewsId(null)
    } else {
      result = await createVijest(payload)
      if (result) {
        setSavedNews((prev) => [result, ...prev])
        setMessage("✓ Вијест је додата!")
      } else {
        setMessage("⚠ Грешка при додавању вијести.")
      }
    }

    setNewsForm({ title: "", excerpt: "", date: "", category: "edukacija", image: "", content: "", gallery: "", views: 0 })
    setSaving(false)
  }

  const handleAddFunFact = async () => {
    if (!funFactForm.title) { setMessage("⚠ Унесите наслов занимљивости."); return }
    setSaving(true)
    const formattedDate = funFactForm.date ? formatDate(funFactForm.date) : new Date().toLocaleDateString("sr-RS")
    const payload = {
      title: funFactForm.title,
      fact: funFactForm.fact || "",
      date: formattedDate,
      category: funFactForm.category,
      category_label: categoryLabels[funFactForm.category] || funFactForm.category,
      image: funFactForm.image || "",
      icon: funFactForm.icon,
      slug: makeSlug(funFactForm.title) + "-" + Date.now(),
    }

    let result
    if (editingFactId) {
      result = await updateZanimljivost(editingFactId, payload)
      if (result) {
        setSavedFunFacts((prev) => prev.map((f) => (f.id === editingFactId ? result : f)))
        setMessage("✓ Занимљивост је измијењена!")
      } else {
        setMessage("⚠ Грешка при измјени занимљивости.")
      }
      setEditingFactId(null)
    } else {
      result = await createZanimljivost(payload)
      if (result) {
        setSavedFunFacts((prev) => [result, ...prev])
        setMessage("✓ Занимљивост је додата!")
      } else {
        setMessage("⚠ Грешка при додавању занимљивости.")
      }
    }

    setFunFactForm({ title: "", fact: "", date: "", category: "drvo", image: "", icon: "trees" })
    setSaving(false)
  }

  const handleAddDocument = async () => {
    if (!documentForm.title) { setMessage("⚠ Унесите назив документа."); return }
    if (!documentForm.fileUrl) { setMessage("⚠ Унесите URL фајла."); return }
    setSaving(true)
    const payload = {
      title: documentForm.title,
      description: documentForm.description || "",
      category: documentForm.category,
      category_label: categoryLabels[documentForm.category] || documentForm.category,
      url: documentForm.fileUrl,
      type: documentForm.fileType,
      upload_date: new Date().toLocaleDateString("sr-RS"),
    }
    const result = await createDokument(payload)
    if (result) {
      setSavedDocuments((prev) => [result, ...prev])
      setMessage("✓ Документ је додат!")
    } else {
      setMessage("⚠ Грешка при додавању документа.")
    }
    setDocumentForm({ title: "", description: "", category: "pravilnici", fileUrl: "", fileType: "pdf" })
    setSaving(false)
  }

  const handleDeleteNews = async (id: number) => {
    const ok = await deleteVijest(id)
    if (ok) {
      setSavedNews((prev) => prev.filter((n) => n.id !== id))
      setMessage("Вијест је обрисана!")
    } else {
      setMessage("⚠ Грешка при брисању вијести.")
    }
  }

  const handleDeleteFunFact = async (id: number) => {
    const ok = await deleteZanimljivost(id)
    if (ok) {
      setSavedFunFacts((prev) => prev.filter((f) => f.id !== id))
      setMessage("Занимљивост је обрисана!")
    } else {
      setMessage("⚠ Грешка при брисању занимљивости.")
    }
  }

  const handleDeleteDocument = async (id: number) => {
    const ok = await deleteDokument(id)
    if (ok) {
      setSavedDocuments((prev) => prev.filter((d) => d.id !== id))
      setMessage("Документ је обрисан!")
    } else {
      setMessage("⚠ Грешка при брисању документа.")
    }
  }

  const handleEditNews = (item: any) => {
    const dateParts = (item.date || "").split(".")
    const dateForInput =
      dateParts.length >= 3
        ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
        : new Date().toISOString().split("T")[0]

    setNewsForm({
      title: item.title || "",
      excerpt: item.excerpt || "",
      date: dateForInput,
      category: item.category || "edukacija",
      image: item.image || "",
      content: item.content_html ? item.content_html.replace(/<\/?p>/g, "\n").trim() : "",
      gallery: Array.isArray(item.gallery) ? item.gallery.join(", ") : "",
      views: item.views || 0,
    })
    setEditingNewsId(item.id)
    setActiveTab("news")
    setMessage("Измијените вијест и кликните Сачувај измјене.")
  }

  const handleEditFunFact = (item: any) => {
    const dateParts = (item.date || "").split(".")
    const dateForInput =
      dateParts.length >= 3
        ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
        : new Date().toISOString().split("T")[0]

    setFunFactForm({
      title: item.title || "",
      fact: item.fact || "",
      date: dateForInput,
      category: item.category || "drvo",
      image: item.image || "",
      icon: item.icon || "trees",
    })
    setEditingFactId(item.id)
    setActiveTab("funfacts")
    setMessage("Измијените занимљивост и кликните Сачувај измјене.")
  }

  if (isLoggedIn === null) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Учитавање...</p>
      </main>
    )
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">Админ пријава</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Корисничко ime</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Лозинка</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Пријави се
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Админ панел</h1>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Одјава
          </button>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
            {message}
            <button onClick={() => setMessage("")} className="ml-4 text-green-600 hover:text-green-800">
              ×
            </button>
          </div>
        )}

        {/* Табови */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab("news")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "news" ? "bg-green-800 text-white" : "bg-white text-gray-700 hover:bg-green-100"
            }`}
          >
            <FileText className="w-4 h-4" />
            {editingNewsId ? "Измијени вијест" : "Додај вијест"}
          </button>
          <button
            onClick={() => setActiveTab("funfacts")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "funfacts" ? "bg-green-800 text-white" : "bg-white text-gray-700 hover:bg-green-100"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {editingFactId ? "Измијени занимљивост" : "Додај занимљивост"}
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "documents" ? "bg-green-800 text-white" : "bg-white text-gray-700 hover:bg-green-100"
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            Додај документ
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "manage" ? "bg-green-800 text-white" : "bg-white text-gray-700 hover:bg-green-100"
            }`}
          >
            <Settings className="w-4 h-4" />
            Управљај садржајем
          </button>
        </div>

        {/* Форма за вијести */}
        {activeTab === "news" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-green-800 mb-4">
              {editingNewsId ? "Измијени вијест" : "Додај нову вијест"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Наслов</label>
                <input
                  type="text"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Унесите наслов вијести"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Кратак опис</label>
                <textarea
                  value={newsForm.excerpt}
                  onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  rows={2}
                  placeholder="Кратак опис вијести"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Датум (календар)</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={newsForm.date}
                      onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Категорија</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="edukacija">Едукација</option>
                    <option value="projekti">Пројекти</option>
                    <option value="dogadjaji">Догађаји</option>
                    <option value="saopstenja">Саопштења</option>
                    <option value="istrazivanje">Истраживање</option>
                    <option value="tehnologija">Технологија</option>
                    <option value="zastita">Заштита</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL слике вијести</label>
                <input
                  type="text"
                  value={newsForm.image}
                  onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="/images/slika.jpg или https://example.com/slika.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Примјер: <code className="bg-gray-100 px-1 rounded">/images/vijest.jpg</code> (слика у GitHub /public/images/)
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Садржај вијести</label>
                <textarea
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  rows={6}
                  placeholder="Комплетан текст вијести (сваки ред = нови параграф)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Галерија слика (до 6 слика)</label>
                <textarea
                  value={newsForm.gallery}
                  onChange={(e) => setNewsForm({ ...newsForm, gallery: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  rows={2}
                  placeholder="URL слике раздвојене зарезом&#10;Пример: https://slika1.jpg, https://slika2.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">Пасте URL-ове слика раздвојене зарезом (максимално 6 слика)</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Број прегледа</label>
                <input
                  type="number"
                  value={newsForm.views}
                  onChange={(e) => setNewsForm({ ...newsForm, views: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddNews}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
                >
                  <Plus className="w-5 h-5" />
                  {saving ? "Снима..." : editingNewsId ? "Сачувај измјене" : "Додај вијест"}
                </button>
                {editingNewsId && (
                  <button
                    onClick={() => {
                      setEditingNewsId(null)
                      setNewsForm({ title: "", excerpt: "", date: "", category: "edukacija", image: "", content: "", gallery: "", views: 0 })
                      setMessage("")
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold"
                  >
                    Откажи
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Форма за занимљивости */}
        {activeTab === "funfacts" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-green-800 mb-4">
              {editingFactId ? "Измијени занимљивост" : "Додај нову занимљивост"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Наслов</label>
                <input
                  type="text"
                  value={funFactForm.title}
                  onChange={(e) => setFunFactForm({ ...funFactForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Занимљивост</label>
                <textarea
                  value={funFactForm.fact}
                  onChange={(e) => setFunFactForm({ ...funFactForm, fact: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Датум (календар)</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={funFactForm.date}
                      onChange={(e) => setFunFactForm({ ...funFactForm, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Категорија</label>
                  <select
                    value={funFactForm.category}
                    onChange={(e) => setFunFactForm({ ...funFactForm, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="drvo">Дрвеће</option>
                    <option value="zivotinje">Животиње</option>
                    <option value="ekologija">Екологија</option>
                    <option value="istorija">Историја</option>
                    <option value="nauka">Наука</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL слике (thumbnail)</label>
                <input
                  type="text"
                  value={funFactForm.image}
                  onChange={(e) => setFunFactForm({ ...funFactForm, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="/images/slika.jpg"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddFunFact}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
                >
                  <Plus className="w-5 h-5" />
                  {saving ? "Снима..." : editingFactId ? "Сачувај измјене" : "Додај занимљивост"}
                </button>
                {editingFactId && (
                  <button
                    onClick={() => {
                      setEditingFactId(null)
                      setFunFactForm({ title: "", fact: "", date: "", category: "drvo", image: "", icon: "trees" })
                      setMessage("")
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold"
                  >
                    Откажи
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Форма за документе */}
        {activeTab === "documents" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-green-800 mb-4">Додај нови документ</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Назив документа</label>
                <input
                  type="text"
                  value={documentForm.title}
                  onChange={(e) => setDocumentForm({ ...documentForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Опис</label>
                <textarea
                  value={documentForm.description}
                  onChange={(e) => setDocumentForm({ ...documentForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Категорија</label>
                  <select
                    value={documentForm.category}
                    onChange={(e) => setDocumentForm({ ...documentForm, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="pravilnici">Правилници</option>
                    <option value="zapisnici">Записници</option>
                    <option value="izvjestaji">Извјештаји</option>
                    <option value="obrasci">Обрасци</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Тип фајла</label>
                  <select
                    value={documentForm.fileType}
                    onChange={(e) => setDocumentForm({ ...documentForm, fileType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="pdf">PDF</option>
                    <option value="image">Слика</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL фајла (Google Drive)</label>
                <input
                  type="text"
                  value={documentForm.fileUrl}
                  onChange={(e) => setDocumentForm({ ...documentForm, fileUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="https://drive.google.com/..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  За Google Drive: Копирај линк за дијељење и замијени /view са /export?format=pdf
                </p>
              </div>
              <button
                onClick={handleAddDocument}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
              >
                <Plus className="w-5 h-5" />
                {saving ? "Снима..." : "Додај документ"}
              </button>
            </div>
          </div>
        )}

        {/* Управљање садржајем */}
        {activeTab === "manage" && (
          <div className="space-y-8">
            {/* Вијести */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-green-800 mb-4">Вијести у бази ({savedNews.length})</h2>
              {savedNews.length === 0 ? (
                <p className="text-gray-500">Нема вијести у бази.</p>
              ) : (
                <div className="space-y-3">
                  {savedNews.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">
                          {item.date} | {item.category_label || item.categoryLabel}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditNews(item)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                          title="Измијени"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteNews(item.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                          title="Обриши"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Занимљивости */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-green-800 mb-4">Занимљивости у бази ({savedFunFacts.length})</h2>
              {savedFunFacts.length === 0 ? (
                <p className="text-gray-500">Нема занимљивости у бази.</p>
              ) : (
                <div className="space-y-3">
                  {savedFunFacts.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">
                          {item.date} | {item.category_label || item.categoryLabel}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditFunFact(item)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                          title="Измијени"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteFunFact(item.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                          title="Обриши"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Документи */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-green-800 mb-4">Документи у бази ({savedDocuments.length})</h2>
              {savedDocuments.length === 0 ? (
                <p className="text-gray-500">Нема докумената у бази.</p>
              ) : (
                <div className="space-y-3">
                  {savedDocuments.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.category_label || item.categoryLabel}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteDocument(item.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                        title="Обриши"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
