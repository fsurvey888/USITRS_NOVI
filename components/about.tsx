"use client"

import { Mail, Phone, MapPin } from "lucide-react"

export function About() {
  return (
    <>
      <section id="o-nama" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-emerald-700 mb-8">О удружењу</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            Удружење шумарске струке је удружење која окупља стручњаке из области шумарства, заштите
            природе и одрживог развоја. Наша мисија је промовисање савремених пракси у шумарству, професионални развој
            чланова и допринос очувању шумских екосистема.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: "500+", label: "Чланова" },
              { number: "25+", label: "Година рада" },
              { number: "50+", label: "Пројеката" },
            ].map((stat, idx) => (
              <div key={idx} className="p-6 bg-emerald-50 rounded-lg">
                <div className="text-4xl md:text-5xl font-bold text-emerald-700 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="clanstvo" className="py-24 bg-emerald-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-emerald-700 mb-12 text-center">Чланство</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-emerald-700 mb-4">Редовно чланство</h3>
              <p className="text-gray-600 mb-6">
                Редовно чланство је доступно дипломираним инжењерима шумарства, инжењерским техничарима и другим
                стручњацима са релевантним квалификацијама из области шумарства.
              </p>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>Приступ стручним савјетима и семинарима</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>Учешће у теренским огледима и конференцијама</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>Публиковање радова у стручним часописима</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>Умрежавање са професионалцима из струке</span>
                </li>
              </ul>
              <button className="w-full bg-emerald-700 text-white font-semibold py-2 rounded-lg hover:bg-emerald-800 transition-colors">
                Сазнај више
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-emerald-700 mb-4">Студентско чланство</h3>
              <p className="text-gray-600 mb-6">
                Студентско чланство је доступно студентима релевантних студијских програма на факултетима и високим
                школама са акредитованим програмима из области шумарства.
              </p>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>Погодности у цијенама за све манифестације</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>Могућност стажирања код чланова удружења</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>Приступ библиотекарским ресурсима</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>Менторство од искусних професионалаца</span>
                </li>
              </ul>
              <button className="w-full bg-emerald-700 text-white font-semibold py-2 rounded-lg hover:bg-emerald-800 transition-colors">
                Сазнај више
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="kontakt" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-emerald-700 mb-12 text-center">Контакт</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-emerald-700 mb-8">Информације</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 rounded-lg mt-1">
                    <MapPin className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Адреса</h4>
                    <p className="text-gray-600">
                      Романијска 1<br />
                      Соколац
                      <br />
                      Република Српска, БиХ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 rounded-lg mt-1">
                    <Phone className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Телефон</h4>
                    <p className="text-gray-600">
                      +387 57/400-630
                      <br />
                      Факс: +387 57/400-631
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 rounded-lg mt-1">
                    <Mail className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Е-маил</h4>
                    <p className="text-gray-600">
                      <a href="mailto:usitrs@teol.net" className="hover:text-emerald-700 transition-colors">
                        usitrs@teol.net
                      </a>
                    </p>
                    <p className="text-gray-600 mt-1">
                      <a href="mailto:usitrepublikesrpske@gmail.com" className="hover:text-emerald-700 transition-colors">
                        usitrepublikesrpske@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 rounded-lg mt-1">
                    <MapPin className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Детаљи регистрације</h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Матични број (МБ):</strong> 1895354
                      <br />
                      <strong>Јединствени идентификациони број (ЈИБ):</strong> 4401597110005
                      <br />
                      <strong>Жиро рачун (Ж.Р.):</strong> 562-001-00000-337-17
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-emerald-700 mb-8">Пошаљи нам поруку</h3>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Име и презиме</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                    placeholder="Ваше име"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Е-маил адреса</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                    placeholder="vasa.email@primer.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Наслов</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                    placeholder="Наслов поруке"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Порука</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 resize-none"
                    placeholder="Ваша порука..."
                    rows={5}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-700 text-white font-semibold py-2 rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  Пошаљи поруку
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
