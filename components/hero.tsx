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
            bottom: "-30px",
            zIndex: 20,
            userSelect: "none",
            pointerEvents: "none",
            width: "90px",
            height: "90px",
            ...(phase === "eating"
              ? {
                  right: "80px",
                  animation: "squirrelEat 1.2s ease-in-out infinite alternate",
                }
              : {
                  right: "-100px",
                  animation: "squirrelRun 8s linear forwards",
                }),
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/vjeverica.png"
            alt="vjeverica"
            style={{
              width: "90px",
              height: "90px",
              objectFit: "contain",
              ...(phase === "running" ? { transform: "scaleX(-1)" } : {}),
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes squirrelEat {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }

        @keyframes squirrelRun {
          0%   { right: 80px; }
          15%  { bottom: -26px; }
          30%  { bottom: -30px; }
          45%  { bottom: -26px; }
          60%  { bottom: -30px; }
          75%  { bottom: -26px; }
          90%  { bottom: -30px; }
          100% { right: calc(100% + 100px); bottom: -30px; }
        }
      `}</style>
    </section>
  )
}
