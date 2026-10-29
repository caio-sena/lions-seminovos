import { WHATSAPP_NUMERO } from "../config";

const mensagem = encodeURIComponent(
  "Olá! Vim pelo site e gostaria de saber mais sobre os veículos.",
);
const href = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensagem}`;

export default function WhatsAppFlutuante() {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp (abre em nova aba)"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-2xl shadow-lg transition hover:scale-110"
    >
      <span aria-hidden="true">💬</span>
    </a>
  );
}