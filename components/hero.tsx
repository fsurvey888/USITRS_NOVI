"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export function Hero() {
  const [phase, setPhase] = useState<"eating" | "running" | "gone">("eating")

  useEffect(() => {
    // Jede 3 sekunde, pa trči
    const t1 = setTimeout(() => setPhase("running"), 3000)
    // Nestane nakon što pretrči (4 sekunde trčanja)
    const t2 = setTimeout(() => setPhase("gone"), 7000)
    // Ponovi animaciju svakih 20 sekundi
    const t3 = setTimeout(() => {
      setPhase("eating")
      const r1 = setTimeout(() => setPhase("running"), 3000)
      const r2 = setTimeout(() => setPhase("gone"), 7000)
      return () => { clearTimeout(r1); clearTimeout(r2) }
    }, 20000)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <section
      className="bg-cover bg-center text-white py-24 md:py-32 text-center relative overflow-hidden"
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

      {/* Vjeverica animacija */}
      {phase !== "gone" && (
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            fontSize: "2rem",
            zIndex: 20,
            userSelect: "none",
            pointerEvents: "none",
            ...(phase === "eating"
              ? {
                  right: "60px",
                  animation: "squirrelEat 0.4s ease-in-out infinite alternate",
                }
              : {
                  right: "-80px",
                  animation: "squirrelRun 4s linear forwards",
                }),
          }}
        >
          {phase === "eating" ? "🐿️" : "🐿️"}
        </div>
      )}

      <style>{`
        @keyframes squirrelEat {
          0%   { transform: translateY(0px) rotate(-5deg); }
          100% { transform: translateY(-6px) rotate(5deg); }
        }

        @keyframes squirrelRun {
          0%   { right: 60px;   transform: scaleX(-1) translateY(0px); }
          10%  { transform: scaleX(-1) translateY(-4px); }
          20%  { transform: scaleX(-1) translateY(0px); }
          30%  { transform: scaleX(-1) translateY(-4px); }
          40%  { transform: scaleX(-1) translateY(0px); }
          50%  { transform: scaleX(-1) translateY(-4px); }
          60%  { transform: scaleX(-1) translateY(0px); }
          70%  { transform: scaleX(-1) translateY(-4px); }
          80%  { transform: scaleX(-1) translateY(0px); }
          90%  { transform: scaleX(-1) translateY(-4px); }
          100% { right: calc(100% + 80px); transform: scaleX(-1) translateY(0px); }
        }
      `}</style>
    </section>
  )
}
