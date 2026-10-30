import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import CardVeiculo from "../components/CardVeiculo";
import Carrossel from "../components/Carrossel";
import FotoVeiculo from "../components/FotoVeiculo";
import { SITE_OFICIAL } from "../config";
import { categorias, veiculos, type Categoria } from "../data/veiculos";

type SlideProps = {
  titulo: string;
  texto: string;
  cta: { to: string; rotulo: string };
  imagem: string;
  variante: "vermelho" | "escuro";
};

const sobreposicao = {
  vermelho: "linear-gradient(to right, rgba(179,15,15,.95), rgba(225,29,29,.55))",
  escuro: "linear-gradient(to right, rgba(10,10,10,.95), rgba(10,10,10,.5))",
};

// Fundo listrado: aparece quando a imagem do banner não existe
const padroes = {
  vermelho: "repeating-linear-gradient(135deg, #b30f0f 0 28px, #a50d0d 28px 56px)",
  escuro: "repeating-linear-gradient(135deg, #131313 0 28px, #0d0d0d 28px 56px)",
};

function Slide({ titulo, texto, cta, imagem, variante }: SlideProps) {
  return (
    <div
      style={{
        backgroundImage: `${sobreposicao[variante]}, url('${imagem}'), ${padroes[variante]}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto flex min-h-[26rem] max-w-6xl flex-col justify-center px-4 py-16 md:min-h-[32rem]">
        <h2 className="max-w-2xl text-4xl font-black leading-tight text-balance md:text-6xl">
          {titulo}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-zinc-100">{texto}</p>
        <div className="mt-8">
          <Link
            to={cta.to}
            className="inline-block rounded-lg bg-destaque px-8 py-3 font-bold text-black transition hover:bg-destaque-escuro"
          >
            {cta.rotulo}
          </Link>
        </div>
      </div>
    </div>
  );
}

const slides = [
  <Slide
    key="1"
    titulo="Seu próximo seminovo está aqui."
    texto="Carros selecionados, com procedência e preço justo."
    cta={{ to: "/catalogo", rotulo: "Ver catálogo" }}
    imagem="/banners/banner1.webp"
    variante="vermelho"
  />,
  <Slide
    key="2"
    titulo="Financiamento facilitado."
    texto="Escolha o carro, simule e saia dirigindo."
    cta={{ to: "/agendar", rotulo: "Agende uma visita" }}
    imagem="/banners/banner2.webp"
    variante="escuro"
  />,
  <Slide
    key="3"
    titulo="Aceitamos seu usado na troca."
    texto="Avaliação rápida do seu carro como parte do pagamento."
    cta={{ to: "/agendar", rotulo: "Agendar avaliação" }}
    imagem="/banners/banner3.webp"
    variante="vermelho"
  />,
];

const rotulosCategoria: Record<Categoria, string> = {
  Hatch: "Hatch",
  Sedan: "Sedan",
  SUV: "SUV",
  Utilitário: "Utilitários",
};

const imagensCategoria: Record<Categoria, string> = {
  Hatch: "/categorias/CatHatch.jpeg",
  Sedan: "/categorias/CatSedan.jpeg",
  SUV: "/categorias/CatSuv.jpeg",
  Utilitário: "/categorias/CatUtil.jpeg",
};

function Icone({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const beneficios = [
  {
    icone: (
      <Icone>
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </Icone>
    ),
    titulo: "Procedência verificada",
    texto: "Veículos avaliados e com histórico conferido antes de chegar ao pátio.",
  },
  {
    icone: (
      <Icone>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18M7 15h3" />
      </Icone>
    ),
    titulo: "Financiamento facilitado",
    texto: "Simulação rápida e condições para caber no seu orçamento.",
  },
  {
    icone: (
      <Icone>
        <path d="M17 4l3 3-3 3M20 7H8a4 4 0 0 0-4 4M7 20l-3-3 3-3M4 17h12a4 4 0 0 0 4-4" />
      </Icone>
    ),
    titulo: "Aceitamos seu usado",
    texto: "Avaliação do seu carro como parte do pagamento.",
  },
  {
    icone: (
      <Icone>
        <path d="M4 5h16v11H9l-5 4V5z" />
      </Icone>
    ),
    titulo: "Atendimento próximo",
    texto: "Uma equipe pronta para tirar dúvidas, do primeiro contato à entrega.",
  },
];

const passos = [
  { n: 1, titulo: "Escolha", texto: "Navegue pelo catálogo e filtre por marca, modelo, cor e combustível." },
  { n: 2, titulo: "Agende", texto: "Reserve o melhor dia e horário para conhecer o carro de perto." },
  { n: 3, titulo: "Visite", texto: "Faça o test drive, tire suas dúvidas e feche negócio com segurança." },
];

export default function Home() {
  const destaques = veiculos.filter((v) => v.destaque).slice(0, 3);

  return (
    <>
      <h1 className="sr-only">Lions Seminovos: página inicial</h1>

      <Carrossel slides={slides} />

      {/* Categorias */}
      <section className="mx-auto max-w-6xl px-4 py-12" aria-label="Categorias">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((c) => (
            <div
              key={c}
              className="relative isolate flex min-h-64 flex-col items-center justify-end overflow-hidden rounded-xl bg-superficie p-6 text-center"
            >
              <FotoVeiculo
                src={imagensCategoria[c]}
                alt={rotulosCategoria[c]}
                legenda={false}
                className="absolute inset-0 -z-10 h-full w-full"
              />
              <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
              <h2 className="text-2xl font-bold">{rotulosCategoria[c]}</h2>
              <Link
                to={`/catalogo?categoria=${encodeURIComponent(c)}`}
                className="mt-3 border-2 border-white px-8 py-2 font-semibold transition hover:bg-white hover:text-black"
              >
                Conferir
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Destaques */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Destaques</h2>
            <p className="text-zinc-400">Alguns dos veículos que acabaram de chegar.</p>
          </div>
          <Link
            to="/catalogo"
            className="shrink-0 text-sm font-semibold text-destaque hover:underline"
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((v) => (
            <CardVeiculo key={v.id} veiculo={v} />
          ))}
        </div>
      </section>

      {/* Benefícios */}
      <section className="border-y border-borda bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
            Por que comprar com a gente
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {beneficios.map((b) => (
              <div key={b.titulo} className="rounded-xl border border-borda bg-fundo p-5">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-marca/15 text-marca-clara">
                  {b.icone}
                </span>
                <h3 className="mt-4 font-semibold">{b.titulo}</h3>
                <p className="mt-1 text-sm text-zinc-400">{b.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">Como funciona</h2>
        <ol className="grid gap-8 md:grid-cols-3">
          {passos.map((p) => (
            <li key={p.n} className="text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-marca text-2xl font-black">
                {p.n}
              </span>
              <h3 className="mt-4 text-lg font-bold">{p.titulo}</h3>
              <p className="mx-auto mt-1 max-w-xs text-sm text-zinc-400">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Chamada final */}
      <section className="bg-marca">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-2xl font-extrabold md:text-3xl">
            Pronto para conhecer seu próximo carro?
          </h2>
          <p className="mx-auto mt-2 max-w-xl">
            Escolha o dia e o horário e nossa equipe te recebe.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/agendar"
              className="rounded-lg bg-destaque px-8 py-3 font-bold text-black transition hover:bg-destaque-escuro"
            >
              Agende uma visita
            </Link>
            <a
              href={SITE_OFICIAL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border-2 border-white px-8 py-3 font-bold transition hover:bg-white hover:text-black"
            >
              Visitar o site oficial ↗
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}