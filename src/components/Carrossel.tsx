import { useEffect, useState, type ReactNode } from "react";

type Props = {
  slides: ReactNode[];
  intervalo?: number;
};

export default function Carrossel({ slides, intervalo = 6000 }: Props) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = slides.length;

  // troca automática, respeitando "reduzir movimento" e pausando com mouse/foco
  useEffect(() => {
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pausado || reduzir || total < 2) return;
    const id = window.setInterval(() => setAtual((i) => (i + 1) % total), intervalo);
    return () => window.clearInterval(id);
  }, [pausado, total, intervalo]);

  const ir = (i: number) => setAtual((i + total) % total);

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Destaques"
      className="relative overflow-hidden"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${atual * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="w-full shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${total}`}
            inert={i !== atual}
          >
            {slide}
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Slide anterior"
        onClick={() => ir(atual - 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 pb-1 text-3xl leading-none transition hover:bg-black/80"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Próximo slide"
        onClick={() => ir(atual + 1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 pb-1 text-3xl leading-none transition hover:bg-black/80"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para o slide ${i + 1}`}
            aria-current={i === atual}
            onClick={() => setAtual(i)}
            className={`h-2.5 w-2.5 rounded-full ${i === atual ? "bg-marca" : "bg-white/70"}`}
          />
        ))}
      </div>
    </section>
  );
}