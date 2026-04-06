import Link from "next/link"

export function Hero() {
  return (
    <section
      className="bg-cover bg-center text-white py-24 md:py-32 text-center relative"
      style={{
        backgroundImage: 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PXL_20251028_093319828.RAW-01.COVER~2-U4wIws5IXH7b2OKxFz1mBMYOkkeGRi.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 animate-float-3d drop-shadow-lg">Заједно за одрживо шумарство</h1>
        <p className="text-lg md:text-xl mb-10 opacity-95 leading-relaxed">
          Удружење посвећено развоју шумарства и заштити шумских ресурса
        </p>
        <Link
          href="/news"
          className="inline-block bg-white text-emerald-700 font-semibold px-8 py-3 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          Сазнај више
        </Link>
      </div>
    </section>
  )
}
