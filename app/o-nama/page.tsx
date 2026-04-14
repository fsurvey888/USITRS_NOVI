import { Mail, Phone, MapPin } from "lucide-react"

export const metadata = {
  title: "О нама - Удружење ШТ РС",
  description: "Сазнајте више о Удружењу шумарских инжењера и техничара Републике Српске",
}

export default function AboutPage() {
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
            <span className="text-green-800 font-semibold">О нама</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-green-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">О удружењу</h1>
          <p className="text-xl text-green-100">Удружење посвећено развоју шумарства и заштити шумских ресурса</p>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-800 mb-2">500+</div>
              <p className="text-gray-600">Активних чланова</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-800 mb-2">25+</div>
              <p className="text-gray-600">Година искуства</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-800 mb-2">50+</div>
              <p className="text-gray-600">Успјешних пројеката</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-4">Наша мисија</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Удружење шумарских инжењера и техничара Републике Српске је професионална организација која окупља
                стручњаке из области шумарства, заштите природе и одрживог развоја.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Наша мисија је промовисање савремених пракси у шумарству, професионални развој чланова, и допринос
                очувању и унапређењу шумских екосистема.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-4">Наше вриједности</h2>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-green-800 font-bold">✓</span>
                  <span className="text-gray-600">Одржива шумска привреда</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-800 font-bold">✓</span>
                  <span className="text-gray-600">Професионални развој и едукација</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-800 font-bold">✓</span>
                  <span className="text-gray-600">Заштита природе и биодиверзитета</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-800 font-bold">✓</span>
                  <span className="text-gray-600">Научни и технолошки напредак</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Historijat */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-green-800 mb-10 text-center">Историјат УШИТ-а од оснивања</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex gap-5">
              <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold text-lg">
                1998
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Оснивање ДИТ-а</h3>
                <p className="text-gray-600 leading-relaxed">
                  Удружење је prvобитно основано у јануару 1998. године под називом ДИТ (Друштво инжењера и техничара).
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex gap-5">
              <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold text-lg">
                2004
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Оснивачка скупштина УШИТ-а</h3>
                <p className="text-gray-600 leading-relaxed">
                  Оснивачка скупштина УШИТ-а одржана је 27.12.2004. године, када друштво добија садашњи назив
                  „Удружење шумарских инжењера и техничара Републике Српске". Од 2004. године, функцију prvог
                  предсједника Управног одбора обављао је Споменко Стојановић.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex gap-5">
              <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold text-lg">
                UO
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Предсједници Управног одбора</h3>
                <p className="text-gray-600 leading-relaxed">
                  Након Споменка Стојановића, ту дужност су обављали Милан Матарауга и Срђан Кашић. На посљедњој
                  Скупштини одржаној 23.05.2025. године, за предсједника Управног одбора изабран је{" "}
                  <strong className="text-green-800">Срђан Дражић</strong>.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex gap-5">
              <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold text-lg">
                SK
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Предсједници Скупштине</h3>
                <p className="text-gray-600 leading-relaxed">
                  Предсједник Скупштине bio је Милорад Јагодић све до посљедње Скупштине, када је на ту функцију
                  изабран <strong className="text-green-800">Немања Милинковић</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-green-800 mb-12 text-center">Наше активности</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Семинари и обуке", desc: "Редовне едукативне активности за професионални развој" },
              { title: "Терeнска истраживања", desc: "Научни пројекти и студије у шумама" },
              { title: "Конференције", desc: "Окупљање стручњака и размјена искустава" },
              { title: "Публикације", desc: "Издавање стручних радова и извештаја" },
              { title: "Консултантске услуге", desc: "Помоћ у планирању и имплементацији пројеката" },
              { title: "Умрежавање", desc: "Развој партнерских веза на националном и међународном нивоу" },
            ].map((activity, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-800 mb-2">{activity.title}</h3>
                <p className="text-gray-600">{activity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-green-800 mb-12 text-center">Контактирајте нас</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-green-800 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Адреса</h3>
                  <p className="text-gray-600">Романијска 1, Соколац, Република Српска, БиХ</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-green-800 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Телефон</h3>
                  <p className="text-gray-600">
                    +387 57/400-630
                    <br />
                    Факс: +387 57/400-631
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-green-800 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Е-маил</h3>
                  <p className="text-gray-600">
                    <a href="mailto:usitrs@teol.net" className="hover:text-green-800">
                      usitrs@teol.net
                    </a>
                  </p>
                  <p className="text-gray-600 mt-1">
                    <a href="mailto:usitrepublikesrpske@gmail.com" className="hover:text-green-800">
                      usitrepublikesrpske@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-green-800 mb-4">Регистарски подаци</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <strong>Матични број:</strong> 1895354
                </p>
                <p>
                  <strong>ЈИБ:</strong> 4401597110005
                </p>
                <p>
                  <strong>Жиро рачун:</strong> 562-001-00000-337-17
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
