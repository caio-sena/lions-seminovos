import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FIPE_URL } from "../config";

const links = [
  { to: "/", rotulo: "Página inicial" },
  { to: "/catalogo", rotulo: "Catálogo" },
  { to: "/agendar", rotulo: "Agende uma visita" },
];

const estiloLink = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm font-semibold transition ${
    isActive ? "text-destaque" : "text-white hover:text-destaque"
  }`;

const estiloExterno = "px-3 py-2 text-sm font-semibold text-white transition hover:text-destaque";

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const [semLogo, setSemLogo] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-borda bg-black">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" onClick={() => setAberto(false)} className="flex items-center">
          {semLogo ? (
            <span className="text-3xl font-extrabold italic tracking-tight">Lions</span>
          ) : (
            <img
              src="/logo.png"
              alt="Lions Seminovos"
              className="h-9 w-auto"
              onError={() => setSemLogo(true)}
            />
          )}
        </Link>

        <nav className="hidden items-center md:flex" aria-label="Principal">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={estiloLink}>
              {l.rotulo}
            </NavLink>
          ))}
          <a href={FIPE_URL} target="_blank" rel="noopener noreferrer" className={estiloExterno}>
            Tabela Fipe ↗<span className="sr-only"> (abre em nova aba)</span>
          </a>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 md:hidden"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          onClick={() => setAberto(!aberto)}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {aberto ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {aberto && (
        <nav
          id="menu-mobile"
          className="flex flex-col border-t border-borda px-4 py-2 md:hidden"
          aria-label="Principal (celular)"
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={estiloLink}
              onClick={() => setAberto(false)}
            >
              {l.rotulo}
            </NavLink>
          ))}
          <a href={FIPE_URL} target="_blank" rel="noopener noreferrer" className={estiloExterno}>
            Tabela Fipe ↗<span className="sr-only"> (abre em nova aba)</span>
          </a>
        </nav>
      )}
    </header>
  );
}