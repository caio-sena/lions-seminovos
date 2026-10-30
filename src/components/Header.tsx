import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FIPE_URL } from "../config";

const UTILITARIOS = "/catalogo?categoria=Utilit%C3%A1rio";

const estiloBase = "px-3 py-2 text-base font-semibold transition";

const estiloLink = ({ isActive }: { isActive: boolean }) =>
  `${estiloBase} ${isActive ? "text-marca-clara" : "text-white hover:text-marca-clara"}`;

const estiloNeutro = `${estiloBase} text-white hover:text-marca-clara`;

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const [semLogo, setSemLogo] = useState(false);

  const fechar = () => setAberto(false);

  const itens = (aoClicar?: () => void) => (
    <>
      <NavLink to="/" end className={estiloLink} onClick={aoClicar}>
        Página inicial
      </NavLink>
      <NavLink to="/catalogo" className={estiloLink} onClick={aoClicar}>
        Catálogo
      </NavLink>
      <Link to={UTILITARIOS} className={estiloNeutro} onClick={aoClicar}>
        Utilitários
      </Link>
      <NavLink to="/agendar" className={estiloLink} onClick={aoClicar}>
        Agende uma visita
      </NavLink>
      <a href={FIPE_URL} target="_blank" rel="noopener noreferrer" className={estiloNeutro}>
        Fipe ↗<span className="sr-only"> (abre em nova aba)</span>
      </a>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-borda bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link to="/" onClick={fechar} className="flex items-center justify-self-start">
          {semLogo ? (
            <span className="text-3xl font-extrabold italic tracking-tight">Lions</span>
          ) : (
            <img
              src="/logo.webp"
              alt="Lions Seminovos"
              className="h-9 w-auto"
              onError={() => setSemLogo(true)}
            />
          )}
        </Link>

        <nav className="hidden items-center md:flex" aria-label="Principal">
          {itens()}
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

        {/* espaço à direita para manter o menu centralizado no desktop */}
        <div className="hidden md:block" aria-hidden="true" />
      </div>

      {aberto && (
        <nav
          id="menu-mobile"
          className="flex flex-col border-t border-borda px-4 py-2 md:hidden"
          aria-label="Principal (celular)"
        >
          {itens(fechar)}
        </nav>
      )}
    </header>
  );
}