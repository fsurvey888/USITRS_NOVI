"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogIn } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Верификуј креденцијале - администраторови подаци
      const correctUsername = "predsjednika"
      const correctPassword = "usit2025"
      
      if (username === correctUsername && password === correctPassword) {
        // Постави логин статус
        localStorage.setItem("adminLoggedIn", "true")
        localStorage.setItem("adminLoginTime", Date.now().toString())
        
        // Преусмери на админ панел
        router.push("/admin")
      } else {
        setError("Неиспрaвно корисничко име или лозинка")
      }
    } catch (err) {
      setError("Грешка приликом логирања. Молимо покушајте поново.")
    } finally {
      setLoading(false)
      setPassword("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
            <LogIn className="w-8 h-8 text-green-900" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Админ панел</h1>
          <p className="text-green-100">Приступите управљању садржајем</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Корисничко име
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                placeholder="Унесите корисничко име"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Лозинка
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                placeholder="Унесите лозинку"
                disabled={loading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-800 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Логирам..." : "Логирање"}
            </button>
          </form>

          {/* Footer Note */}
          <p className="text-center text-gray-500 text-xs mt-6">
            Ово је заштићена страница. Само овлашћени администратори имају приступ.
          </p>
        </div>
      </div>
    </div>
  )
}
