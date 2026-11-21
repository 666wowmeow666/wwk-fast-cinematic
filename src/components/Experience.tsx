"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import LogisticsScene from "./scene/LogisticsScene";
import CameraController from "./scene/CameraController";

gsap.registerPlugin(ScrollTrigger);

const TEXTS = {
  ru: {
    hero: "WWK FAST",
    subtitle: "ЛОГИСТИКА БЕЗ КОМПРОМИССОВ",
    line1: "Скорость.",
    line2: "Надёжность.",
    line3: "Гарантии.",
    anyCargo: "ЛЮБОЙ ГРУЗ",
    anyCargoDesc: "От документов до негабарита.\nЕвропа ↔ Россия",
    services: "УСЛУГИ",
    road: "Автоперевозки",
    rail: "Ж/Д перевозки",
    air: "Авиаперевозки",
    sea: "Морские перевозки",
    guarantee: "ГАРАНТИЯ СРОКОВ",
    guaranteeDesc: "Мы несём ответственность за каждый день доставки",
    cta: "РАССЧИТАТЬ ПЕРЕВОЗКУ",
    contact: "СВЯЗАТЬСЯ",
  },
  en: {
    hero: "WWK FAST",
    subtitle: "LOGISTICS WITHOUT COMPROMISE",
    line1: "Speed.",
    line2: "Reliability.",
    line3: "Guarantees.",
    anyCargo: "ANY CARGO",
    anyCargoDesc: "From documents to oversized.\nEurope ↔ Russia",
    services: "SERVICES",
    road: "Road freight",
    rail: "Rail freight",
    air: "Air freight",
    sea: "Sea freight",
    guarantee: "ON-TIME GUARANTEE",
    guaranteeDesc: "We take responsibility for every day of delivery",
    cta: "GET A QUOTE",
    contact: "CONTACT US",
  },
  pl: {
    hero: "WWK FAST",
    subtitle: "LOGISTYKA BEZ KOMPROMISÓW",
    line1: "Szybkość.",
    line2: "Niezawodność.",
    line3: "Gwarancje.",
    anyCargo: "KAŻDY ŁADUNEK",
    anyCargoDesc: "Od dokumentów po ponadgabaryt.\nEuropa ↔ Rosja",
    services: "USŁUGI",
    road: "Transport drogowy",
    rail: "Transport kolejowy",
    air: "Transport lotniczy",
    sea: "Transport morski",
    guarantee: "GWARANCJA TERMINÓW",
    guaranteeDesc: "Bierzemy odpowiedzialność za każdy dzień dostawy",
    cta: "OBLICZ PRZEWÓZ",
    contact: "KONTAKT",
  },
};

type Lang = "ru" | "en" | "pl";

export default function Experience() {
  const [progress, setProgress] = useState(0);
  const [lang, setLang] = useState<Lang>("ru");
  const progressBarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = TEXTS[lang];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        setProgress(self.progress);
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${self.progress})`;
        }
      },
    });

    return () => {
      st.kill();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "600vh" }}>
      <div ref={progressBarRef} className="scroll-progress" />

      <div className="fixed inset-0 z-0">
        <Canvas
          shadows
          camera={{ position: [8, 6, 55], fov: 45, near: 0.1, far: 300 }}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#0a0a0a"]} />
          <Suspense fallback={null}>
            <LogisticsScene scrollProgress={progress} />
            <CameraController progress={progress} />
          </Suspense>
        </Canvas>
      </div>

      <div className="fixed top-6 right-6 z-50 flex gap-2">
        {(["ru", "en", "pl"] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`lang-btn px-3 py-1 text-sm font-medium rounded border border-white/20 ${
              lang === l ? "active" : "bg-black/40 backdrop-blur"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="relative z-10 pointer-events-none">
        <section className="h-screen flex flex-col items-center justify-center px-6">
          <h1 className="overlay-text text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter red-glow">
            {t.hero}
          </h1>
          <p className="mt-4 text-lg md:text-2xl tracking-[0.3em] uppercase opacity-80">
            {t.subtitle}
          </p>
        </section>

        <section className="h-screen flex flex-col items-start justify-center px-8 md:px-20">
          <div className="space-y-2">
            <h2 className="overlay-text text-5xl md:text-7xl font-bold">{t.line1}</h2>
            <h2 className="overlay-text text-5xl md:text-7xl font-bold text-[#e11d2e]">{t.line2}</h2>
            <h2 className="overlay-text text-5xl md:text-7xl font-bold">{t.line3}</h2>
          </div>
        </section>

        <section className="h-screen flex flex-col items-end justify-center px-8 md:px-20 text-right">
          <h2 className="overlay-text text-5xl md:text-7xl font-black tracking-tight">
            {t.anyCargo}
          </h2>
          <p className="mt-6 text-xl md:text-2xl opacity-80 whitespace-pre-line max-w-md">
            {t.anyCargoDesc}
          </p>
        </section>

        <section className="h-screen flex flex-col items-center justify-center px-6">
          <h2 className="overlay-text text-4xl md:text-6xl font-bold mb-12 tracking-widest">
            {t.services}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {[t.road, t.rail, t.air, t.sea].map((s, i) => (
              <div
                key={i}
                className="border border-white/20 bg-black/30 backdrop-blur-md px-6 py-8 text-center min-w-[140px]"
              >
                <div className="text-3xl mb-3 text-[#e11d2e]">0{i + 1}</div>
                <div className="text-sm md:text-base uppercase tracking-wider">{s}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="h-screen flex flex-col items-center justify-center px-6 text-center">
          <h2 className="overlay-text text-4xl md:text-6xl font-black red-glow mb-6">
            {t.guarantee}
          </h2>
          <p className="text-lg md:text-xl opacity-80 max-w-xl mb-12">
            {t.guaranteeDesc}
          </p>
          <div className="pointer-events-auto flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:sales@wwkfast.com"
              className="px-10 py-4 bg-[#e11d2e] text-white font-bold tracking-wider uppercase hover:bg-[#b01522] transition"
            >
              {t.cta}
            </a>
            <a
              href="tel:+48739263210"
              className="px-10 py-4 border border-white/40 font-bold tracking-wider uppercase hover:bg-white/10 transition"
            >
              {t.contact}
            </a>
          </div>
          <p className="mt-10 text-sm opacity-50">
            +48 739 26 32 10 · sales@wwkfast.com · Warszawa
          </p>
        </section>
      </div>
    </div>
  );
}
