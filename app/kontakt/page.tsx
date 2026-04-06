import { Mail, Phone, MapPin } from "lucide-react"

export const metadata = {
  title: "Контакт - Удружење ШТ РС",
  description: "Контакт информације Удружења шумарских инжењера и техничара Републике Српске",
}

export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-green-800">
              Почетна
            </a>
            <span className="text-gray-400">→</span>
            <span className="text-green-800 font-semibold">Контакт</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-green-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Контактирајте нас</h1>
          <p className="text-xl text-green-100">Спремни смо да одговоримо на ваша питања и захтјеве</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-8">Контакт подаци</h2>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-green-800 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Адреса</h3>
                  <p className="text-gray-600">Романијска 1</p>
                  <p className="text-gray-600">Соколац</p>
                  <p className="text-gray-600">Република Српска, БиХ</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-green-800 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Телефон</h3>
                  <p className="text-gray-600">
                    <a href="tel:+38757400630" className="hover:text-green-800 font-semibold">
                      +387 57/400-630
                    </a>
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Факс:</strong>{" "}
                    <a href="tel:+38757400631" className="hover:text-green-800">
                      +387 57/400-631
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-green-800 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Е-маил</h3>
                  <p className="text-gray-600">
                    <a href="mailto:usitrs@teol.net" className="hover:text-green-800 font-semibold">
                      usitrs@teol.net
                    </a>
                  </p>
                  <p className="text-gray-600 mt-1">
                    <a href="mailto:usitrepublikesrpske@gmail.com" className="hover:text-green-800 font-semibold">
                      usitrepublikesrpske@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Data */}
            <div className="bg-green-50 p-8 rounded-xl border border-green-200 h-fit">
              <h3 className="text-2xl font-bold text-green-800 mb-8">Регистарски подаци</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Матични број</p>
                  <p className="text-lg font-semibold text-gray-900">1895354</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">ЈИБ (Јединствени идентификациони број)</p>
                  <p className="text-lg font-semibold text-gray-900">4401597110005</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Жиро рачун</p>
                  <p className="text-lg font-semibold text-gray-900">562-001-00000-337-17</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Радно време</h2>
          <div className="bg-white rounded-xl p-8 shadow-md max-w-2xl mx-auto">
            <div className="space-y-4 text-lg">
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-900">Понедељак - Петак:</span>
                <span className="text-gray-600">08:00 - 16:00</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-900">Субота:</span>
                <span className="text-gray-600">Затворено</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Недеља:</span>
                <span className="text-gray-600">Затворено</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
