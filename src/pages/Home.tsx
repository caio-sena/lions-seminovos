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

// Se não existir a imagem em /public/banners, aparece só o degradê
function Slide({ titulo, texto, cta, imagem, variante }: SlideProps) {
  return (
    <div
      className="bg-marca-escura"
      style={{
        backgroundImage: `${sobreposicao[variante]}, url('${imagem}')`,
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
    imagem="/banners/1.jpg"
    variante="vermelho"
  />,
  <Slide
    key="2"
    titulo="Financiamento facilitado."
    texto="Escolha o carro, simule e saia dirigindo."
    cta={{ to: "/agendar", rotulo: "Agende uma visita" }}
    imagem="/banners/2.jpg"
    variante="escuro"
  />,
  <Slide
    key="3"
    titulo="Aceitamos seu usado na troca."
    texto="Avaliação rápida do seu carro como parte do pagamento."
    cta={{ to: "/agendar", rotulo: "Agendar avaliação" }}
    imagem="/banners/3.jpg"
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
  Hatch: "/categorias/hatch.jpg",
  Sedan: "/categorias/sedan.jpg",
  SUV: "/categorias/suv.jpg",
  Utilitário: "/categorias/utilitario.jpg",
};

const beneficios = [
  {
    icone: "🔍",
    titulo: "Procedência verificada",
    texto: "Veículos avaliados e com histórico conferido antes de chegar ao pátio.",
  },
  {
    icone: "💳",
    titulo: "Financiamento facilitado",
    texto: "Simulação rápida e condições para caber no seu orçamento.",
  },
  {
    icone: "🔄",
    titulo: "Aceitamos seu usado",
    texto: "Avaliação do seu carro como parte do pagamento.",
  },
  {
    icone: "🤝",
    titulo: "Atendimento próximo",
    texto: "Uma equipe pronta para tirar dúvidas, do primeiro contato à entrega.",
  },
];

export default function Home() {
  const destaques = veiculos.filter((v) => v.destaque).slice(0, 3);

  return (
    <>
      <h1 className="sr-only">Lions Seminovos: página inicial</h1>

      <Carrossel slides={slides} />

      {/* Categorias */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((c) => (
            <div
              key={c}
              className="relative isolate flex min-h-64 flex-col items-center justify-end overflow-hidden rounded-xl bg-superficie p-6 text-center"
            >
              <FotoVeiculo
                src={imagensCategoria[c]}
                alt={rotulosCategoria[c]}
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
                <p className="text-3xl" aria-hidden="true">
                  {b.icone}
                </p>
                <h3 className="mt-3 font-semibold">{b.titulo}</h3>
                <p className="mt-1 text-sm text-zinc-400">{b.texto}</p>
              </div>
            ))}
          </div>
        </div>
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