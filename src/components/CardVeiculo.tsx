import { Link } from "react-router-dom";
import FotoVeiculo from "./FotoVeiculo";
import { formatarKm, formatarPreco, type Veiculo } from "../data/veiculos";

export default function CardVeiculo({ veiculo: v }: { veiculo: Veiculo }) {
  return (
    <article className="overflow-hidden rounded-xl border border-borda bg-superficie transition hover:-translate-y-1 hover:border-marca">
      <div className="relative">
        <FotoVeiculo
          src={v.imagem}
          alt={`${v.marca} ${v.modelo} ${v.versao}`}
          className="aspect-[4/3] w-full"
        />
        <span className="absolute left-3 top-3 rounded bg-marca px-2 py-1 text-xs font-bold uppercase">
          {v.categoria}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-400">{v.marca}</p>
          <h3 className="text-lg font-bold">{v.modelo}</h3>
          <p className="text-sm text-zinc-400">{v.versao}</p>
        </div>

        <ul className="flex flex-wrap gap-2 text-xs text-zinc-300">
          <li className="rounded-full bg-zinc-800 px-2 py-1">{v.ano}</li>
          <li className="rounded-full bg-zinc-800 px-2 py-1">{formatarKm(v.km)}</li>
          <li className="rounded-full bg-zinc-800 px-2 py-1">{v.cambio}</li>
          <li className="rounded-full bg-zinc-800 px-2 py-1">{v.combustivel}</li>
        </ul>

        <p className="text-2xl font-extrabold">{formatarPreco(v.preco)}</p>

        <Link
          to={`/agendar?veiculo=${v.id}`}
          className="block rounded-lg bg-destaque px-4 py-2 text-center font-bold text-black transition hover:bg-destaque-escuro"
        >
          Agendar visita
        </Link>
      </div>
    </article>
  );
}