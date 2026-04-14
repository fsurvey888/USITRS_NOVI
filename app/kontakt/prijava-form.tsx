"use client"

import { useState } from "react"
import { UserPlus, CheckCircle } from "lucide-react"
import { createClanPrijava } from "@/lib/supabase-client"

const strukeOptions = [
  "Дипломирани инжењер шумарства",
  "Инжењер шумарства",
  "Шумарски техничар",
  "Дипломирани инжењер заштите животне средине",
  "Инжењер заштите животне средине",
  "Остало",
]

export default function PrijavaForm() {
  const [form, setForm] = useState({
    ime: "",
    prezime: "",
    email: "",
    telefon: "",
    struka: "",
    napomena: "",
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!form.ime || !form.prezime || !form.email || !form.struka) {
      setError("Молимо попуните сва обавезна поља.")
      return
    }
    setSending(true)
    const result = await createClanPrijava(form)
    setSending(false)
    if (result) {
      setSent(true)
    } else {
      setError("Дошло је до грешке. Молимо покушајте поново или нас контактирајте директно.")
    }
  }

  if (sent) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">Пријава примљена!</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Хвала на интересовању за чланство у УШИТ-у. Контактираћемо вас у најкраћем могућем року.
        </p>
        <button
          onClick={() => { setSent(false); setForm({ ime: "", prezime: "", email: "", telefon: "", struka: "", napomena: "" }) }}
          className="mt-6 text-green-700 underline text-sm hover:text-green-900"
        >
          Поднеси нову пријаву
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Ime <span className="text-red-500">*</span>
          </label>
          <input
            name="ime"
            value={form.ime}
            onChange={handleChange}
            placeholder="Нпр. Јован"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Презиме <span className="text-red-500">*</span>
          </label>
          <input
            name="prezime"
            value={form.prezime}
            onChange={handleChange}
            placeholder="Нпр. Петровић"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Е-маил <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ime@primjer.ba"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Телефон</label>
          <input
            name="telefon"
            value={form.telefon}
            onChange={handleChange}
            placeholder="+387 6x xxx xxx"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Струка / занимање <span className="text-red-500">*</span>
        </label>
        <select
          name="struka"
          value={form.struka}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm bg-white"
        >
          <option value="">— Одаберите —</option>
          {strukeOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Напомена (необавезно)</label>
        <textarea
          name="napomena"
          value={form.napomena}
          onChange={handleChange}
          rows={3}
          placeholder="Додатне информације или питања..."
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm resize-none"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full bg-green-800 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <UserPlus className="w-5 h-5" />
        {sending ? "Слање..." : "Пошаљи пријаву"}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Поља означена са <span className="text-red-500">*</span> су обавезна.
      </p>
    </form>
  )
}
