"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export function Hero() {
  const [phase, setPhase] = useState<"still" | "jumping" | "flyoff" | "gone">("still")

  useEffect(() => {
    const run = () => {
      setPhase("still")
      const t1 = setTimeout(() => setPhase("jumping"), 2000)   // čeka 2s pa skakuće
      const t2 = setTimeout(() => setPhase("flyoff"), 5500)    // nakon skakanja odleti
      const t3 = setTimeout(() => setPhase("gone"), 6200)      // nestane
      const t4 = setTimeout(run, 18000)                        // ponovi za 18s
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
    }
    const cleanup = run()
    return cleanup
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
            right: "100px",
            zIndex: 20,
            userSelect: "none",
            pointerEvents: "none",
            width: "90px",
            height: "90px",
            animation:
              phase === "still"   ? "squirrelAppear 2s ease-out forwards" :
              phase === "jumping" ? "squirrelJump 3.5s ease-in-out forwards" :
              phase === "flyoff"  ? "squirrelFlyoff 0.25s ease-in forwards" :
              "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/vjeverica.png"
            alt=""
            style={{ width: "90px", height: "90px", objectFit: "contain" }}
          />
        </div>
      )}

      <style>{`
        @keyframes squirrelAppear {
          0%   { transform: translateY(40px); opacity: 0; }
          60%  { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0px);  opacity: 1; }
        }

        @keyframes squirrelJump {
          0%   { transform: translateY(0px)   scaleY(1);    }
          10%  { transform: translateY(0px)   scaleY(0.85); }
          20%  { transform: translateY(-45px) scaleY(1.1);  }
          30%  { transform: translateY(0px)   scaleY(0.85); }
          40%  { transform: translateY(0px)   scaleY(1);    }
          50%  { transform: translateY(0px)   scaleY(0.85); }
          60%  { transform: translateY(-45px) scaleY(1.1);  }
          70%  { transform: translateY(0px)   scaleY(0.85); }
          80%  { transform: translateY(0px)   scaleY(1);    }
          90%  { transform: translateY(0px)   scaleY(0.85); }
          95%  { transform: translateY(-45px) scaleY(1.1);  }
          100% { transform: translateY(0px)   scaleY(0.85); }
        }

        @keyframes squirrelFlyoff {
          0%   { transform: translateY(0px) translateX(0px);   opacity: 1; }
          100% { transform: translateY(0px) translateX(600px); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
