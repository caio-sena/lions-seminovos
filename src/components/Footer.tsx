import { Link } from "react-router-dom";
import { SITE_OFICIAL } from "../config";

export default function Footer() {
  return (
    <footer className="border-t border-borda bg-black">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-3xl font-extrabold italic tracking-tight">Lions</p>
          <p className="mt-2 text-sm text-zinc-400">
            Projeto de teste técnico inspirado no site da Lions Seminovos. Dados e
            textos ilustrativos.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <p className="mb-2 text-sm font-semibold">Navegação</p>
          <ul className="space-y-1 text-sm text-zinc-400">
            <li>
              <Link to="/" className="hover:text-white">
                Página inicial
              </Link>
            </li>
            <li>
              <Link to="/catalogo" className="hover:text-white">
                Catálogo
              </Link>
            </li>
            <li>
              <Link to="/agendar" className="hover:text-white">
                Agende uma visita
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="mb-2 text-sm font-semibold">Site oficial</p>
          <a
            href={SITE_OFICIAL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border border-zinc-600 px-4 py-2 text-sm font-semibold transition hover:border-destaque hover:text-destaque"
          >
            Visitar lionsseminovos.com.br ↗
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
      </div>

      <p className="border-t border-borda py-4 text-center text-xs text-zinc-500">
        Desenvolvido por Caio Sena Pereira · Teste técnico front-end
      </p>
    </footer>
  );
}