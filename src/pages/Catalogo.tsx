import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CardVeiculo from "../components/CardVeiculo";
import { categorias, formatarPreco, veiculos, type Veiculo } from "../data/veiculos";

const campo =
  "w-full rounded-lg border border-borda bg-superficie px-3 py-2 text-sm text-white focus:border-destaque focus:outline-none";

const marcas = [...new Set(veiculos.map((v) => v.marca))].sort();
const faixas = [60000, 90000, 120000, 150000];

const ordenadores: Record<string, (a: Veiculo, b: Veiculo) => number> = {
  relevancia: () => 0,
  "preco-asc": (a, b) => a.preco - b.preco,
  "preco-desc": (a, b) => b.preco - a.preco,
  "km-asc": (a, b) => a.km - b.km,
  "ano-desc": (a, b) => b.ano - a.ano,
};

export default function Catalogo() {
  const [params, setParams] = useSearchParams();

  const busca = params.get("q") ?? "";
  const categoria = params.get("categoria") ?? "";
  const marca = params.get("marca") ?? "";
  const precoMax = Number(params.get("precoMax") ?? 0);
  const ordem = params.get("ordem") ?? "relevancia";
  const temFiltro = Array.from(params.keys()).length > 0;

  function atualizar(chave: string, valor: string) {
    const novo = new URLSearchParams(params);
    if (valor) novo.set(chave, valor);
    else novo.delete(chave);
    setParams(novo, { replace: true });
  }

  const lista = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return veiculos
      .filter(
        (v) =>
          !termo || `${v.marca} ${v.modelo} ${v.versao}`.toLowerCase().includes(termo),
      )
      .filter((v) => !categoria || v.categoria === categoria)
      .filter((v) => !marca || v.marca === marca)
      .filter((v) => !precoMax || v.preco <= precoMax)
      .sort(ordenadores[ordem] ?? ordenadores.relevancia);
  }, [busca, categoria, marca, precoMax, ordem]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Catálogo</h1>
      <p className="mt-1 text-zinc-400">Encontre o seminovo ideal para você.</p>

      {/* Categorias rápidas */}
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Categorias">
        {["", ...categorias].map((c) => (
          <button
            key={c || "todas"}
            type="button"
            onClick={() => atualizar("categoria", c)}
            aria-pressed={categoria === c}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
              categoria === c
                ? "border-marca bg-marca text-white"
                : "border-borda text-zinc-300 hover:border-white"
            }`}
          >
            {c || "Todas"}
          </button>
        ))}
      </div>

      {/* Filtros */}
      <div className="mt-6 grid gap-4 rounded-xl border border-borda bg-superficie p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="q" className="mb-1 block text-sm font-medium">
            Buscar
          </label>
          <input
            id="q"
            type="search"
            value={busca}
            onChange={(e) => atualizar("q", e.target.value)}
            placeholder="Marca, modelo ou versão"
            className={campo}
          />
        </div>

        <div>
          <label htmlFor="marca" className="mb-1 block text-sm font-medium">
            Marca
          </label>
          <select
            id="marca"
            value={marca}
            onChange={(e) => atualizar("marca", e.target.value)}
            className={campo}
          >
            <option value="">Todas</option>
            {marcas.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="precoMax" className="mb-1 block text-sm font-medium">
            Preço máximo
          </label>
          <select
            id="precoMax"
            value={precoMax ? String(precoMax) : ""}
            onChange={(e) => atualizar("precoMax", e.target.value)}
            className={campo}
          >
            <option value="">Qualquer valor</option>
            {faixas.map((f) => (
              <option key={f} value={f}>
                Até {formatarPreco(f)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ordem" className="mb-1 block text-sm font-medium">
            Ordenar por
          </label>
          <select
            id="ordem"
            value={ordem}
            onChange={(e) => atualizar("ordem", e.target.value)}
            className={campo}
          >
            <option value="relevancia">Relevância</option>
            <option value="preco-asc">Menor preço</option>
            <option value="preco-desc">Maior preço</option>
            <option value="km-asc">Menor quilometragem</option>
            <option value="ano-desc">Mais novos</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-zinc-400" aria-live="polite">
          {lista.length} {lista.length === 1 ? "veículo encontrado" : "veículos encontrados"}
        </p>
        {temFiltro && (
          <button
            type="button"
            onClick={() => setParams({}, { replace: true })}
            className="text-sm font-semibold text-destaque hover:underline"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {lista.length === 0 ? (
        <div className="mt-8 rounded-xl border border-borda p-10 text-center">
          <p className="text-lg font-semibold">Nenhum veículo encontrado</p>
          <p className="mt-1 text-zinc-400">Tente ajustar ou limpar os filtros.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((v) => (
            <CardVeiculo key={v.id} veiculo={v} />
          ))}
        </div>
      )}
    </div>
  );
}