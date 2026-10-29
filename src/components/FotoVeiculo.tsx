import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function FotoVeiculo({ src, alt, className = "" }: Props) {
  const [erro, setErro] = useState(false);

  if (erro) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`grid place-items-center bg-zinc-800 text-zinc-500 ${className}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-12 w-12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 16v-3l2-5a2 2 0 0 1 1.9-1.4h10.2A2 2 0 0 1 19 8l2 5v3" />
          <path d="M3 16h18" />
          <circle cx="7.5" cy="16.5" r="1.5" />
          <circle cx="16.5" cy="16.5" r="1.5" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setErro(true)}
      className={`object-cover ${className}`}
    />
  );
}