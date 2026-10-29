import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import FotoVeiculo from "../components/FotoVeiculo";
import { HORARIOS, LOJAS } from "../config";
import { formatarPreco, veiculos } from "../data/veiculos";

type Campos = {
  nome: string;
  telefone: string;
  email: string;
  loja: string;
  veiculo: string;
  data: string;
  horario: string;
  observacao: string;
};

type Erros = Partial<Record<keyof Campos, string>>;

const vazio: Campos = {
  nome: "",
  telefone: "",
  email: "",
  loja: "",
  veiculo: "",
  data: "",
  horario: "",
  observacao: "",
};

const estiloCampo =
  "w-full rounded-lg border border-borda bg-superficie px-3 py-2 text-sm text-white focus:border-destaque focus:outline-none aria-[invalid=true]:border-red-500";

function dataLocalISO(d: Date) {
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

function mascaraTelefone(valor: string) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validar(c: Campos, hoje: string): Erros {
  const e: Erros = {};
  if (c.nome.trim().length < 3) e.nome = "Informe seu nome completo.";
  const digitos = c.telefone.replace(/\D/g, "");
  if (digitos.length < 10) e.telefone = "Informe um telefone com DDD.";
  if (!/^\S+@\S+\.\S+$/.test(c.email)) e.email = "Informe um e-mail válido.";
  if (!c.loja) e.loja = "Selecione uma loja.";
  if (!c.data) e.data = "Escolha uma data.";
  else if (c.data < hoje) e.data = "Escolha uma data a partir de hoje.";
  if (!c.horario) e.horario = "Escolha um horário.";
  return e;
}

function Campo({
  id,
  rotulo,
  erro,
  children,
}: {
  id: string;
  rotulo: string;
  erro?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {rotulo}
      </label>
      {children}
      {erro && (
        <p id={`${id}-erro`} role="alert" className="mt-1 text-sm text-red-400">
          {erro}
        </p>
      )}
    </div>
  );
}

export default function Agendar() {
  const [params] = useSearchParams();
  const idInicial = params.get("veiculo") ?? "";

  const [campos, setCampos] = useState<Campos>({
    ...vazio,
    veiculo: veiculos.some((v) => v.id === idInicial) ? idInicial : "",
  });
  const [erros, setErros] = useState<Erros>({});
  const [enviado, setEnviado] = useState<Campos | null>(null);

  const hoje = dataLocalISO(new Date());
  const selecionado = veiculos.find((v) => v.id === campos.veiculo);

  const alterar =
    (campo: keyof Campos) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const valor = campo === "telefone" ? mascaraTelefone(e.target.value) : e.target.value;
      setCampos((atual) => ({ ...atual, [campo]: valor }));
    };

  // propriedades comuns de cada campo (valor, evento e acessibilidade do erro)
  const base = (campo: keyof Campos) => ({
    id: campo,
    name: campo,
    value: campos[campo],
    onChange: alterar(campo),
    "aria-invalid": erros[campo] ? true : undefined,
    "aria-describedby": erros[campo] ? `${campo}-erro` : undefined,
    className: estiloCampo,
  });

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const novos = validar(campos, hoje);
    setErros(novos);
    if (Object.keys(novos).length === 0) {
      setEnviado(campos);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function novoAgendamento() {
    setEnviado(null);
    setErros({});
    setCampos(vazio);
  }

  if (enviado) {
    const v = veiculos.find((x) => x.id === enviado.veiculo);
    const dataBr = enviado.data.split("-").reverse().join("/");

    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-5xl" aria-hidden="true">
          ✅
        </p>
        <h1 className="mt-4 text-3xl font-extrabold">Visita agendada!</h1>
        <p className="mt-2 text-zinc-300">
          Obrigado, {enviado.nome.split(" ")[0]}. Entraremos em contato para confirmar.
        </p>

        <dl className="mt-8 grid gap-3 rounded-xl border border-borda bg-superficie p-6 text-left text-sm sm:grid-cols-2">
          <div>
            <dt className="text-zinc-400">Loja</dt>
            <dd className="font-semibold">{enviado.loja}</dd>
          </div>
          <div>
            <dt className="text-zinc-400">Data e horário</dt>
            <dd className="font-semibold">
              {dataBr} às {enviado.horario}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-400">Veículo</dt>
            <dd className="font-semibold">
              {v ? `${v.marca} ${v.modelo} ${v.versao}` : "Ainda não decidi"}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-400">Contato</dt>
            <dd className="font-semibold">
              {enviado.telefone} · {enviado.email}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={novoAgendamento}
          className="mt-8 rounded-lg bg-destaque px-8 py-3 font-bold text-black transition hover:bg-destaque-escuro"
        >
          Fazer outro agendamento
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Agende uma visita</h1>
      <p className="mt-1 text-zinc-400">
        Escolha a loja, o dia e o horário. Nossa equipe confirma com você.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_24rem]">
        <form
          onSubmit={enviar}
          noValidate
          className="grid gap-4 rounded-xl border border-borda bg-superficie p-6 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <Campo id="nome" rotulo="Nome completo" erro={erros.nome}>
              <input type="text" autoComplete="name" {...base("nome")} />
            </Campo>
          </div>

          <Campo id="telefone" rotulo="Telefone (WhatsApp)" erro={erros.telefone}>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(21) 99999-9999"
              {...base("telefone")}
            />
          </Campo>

          <Campo id="email" rotulo="E-mail" erro={erros.email}>
            <input type="email" autoComplete="email" {...base("email")} />
          </Campo>

          <Campo id="loja" rotulo="Loja" erro={erros.loja}>
            <select {...base("loja")}>
              <option value="">Selecione uma loja</option>
              {LOJAS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </Campo>

          <Campo id="veiculo" rotulo="Veículo de interesse">
            <select {...base("veiculo")}>
              <option value="">Ainda não decidi</option>
              {veiculos.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.marca} {v.modelo} {v.versao} ({v.ano})
                </option>
              ))}
            </select>
          </Campo>

          <Campo id="data" rotulo="Data" erro={erros.data}>
            <input type="date" min={hoje} {...base("data")} />
          </Campo>

          <Campo id="horario" rotulo="Horário" erro={erros.horario}>
            <select {...base("horario")}>
              <option value="">Selecione</option>
              {HORARIOS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </Campo>

          <div className="sm:col-span-2">
            <Campo id="observacao" rotulo="Observações (opcional)">
              <textarea rows={3} {...base("observacao")} />
            </Campo>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full rounded-lg bg-destaque px-8 py-3 font-bold text-black transition hover:bg-destaque-escuro sm:w-auto"
            >
              Agendar visita
            </button>
            <p className="mt-3 text-xs text-zinc-500">
              Demonstração: nenhum dado é enviado ou armazenado.
            </p>
          </div>
        </form>

        <aside className="h-fit rounded-xl border border-borda bg-superficie p-6">
          {selecionado ? (
            <>
              <h2 className="mb-3 font-bold">Veículo selecionado</h2>
              <FotoVeiculo
                src={selecionado.imagem}
                alt={`${selecionado.marca} ${selecionado.modelo}`}
                className="aspect-[4/3] w-full rounded-lg"
              />
              <p className="mt-3 text-lg font-bold">
                {selecionado.marca} {selecionado.modelo}
              </p>
              <p className="text-sm text-zinc-400">
                {selecionado.versao} · {selecionado.ano}
              </p>
              <p className="mt-2 text-2xl font-extrabold">{formatarPreco(selecionado.preco)}</p>
            </>
          ) : (
            <>
              <h2 className="mb-3 font-bold">Como funciona</h2>
              <ol className="list-decimal space-y-2 pl-5 text-sm text-zinc-300">
                <li>Preencha seus dados e escolha o melhor horário.</li>
                <li>Nossa equipe confirma o agendamento com você.</li>
                <li>Você conhece o carro de perto e faz o test drive.</li>
              </ol>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}