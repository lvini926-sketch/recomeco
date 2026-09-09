"use client";

import { FormEvent, useState } from "react";

interface ChatInputProps {
  onEnviar: (mensagem: string) => void;
}

export default function ChatInput({ onEnviar }: ChatInputProps) {
  const [valor, setValor] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const texto = valor.trim();
    if (!texto) return;
    onEnviar(texto);
    setValor("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <label htmlFor="mensagem" className="sr-only">
        Escreva sua mensagem para o Atendo
      </label>
      <textarea
        id="mensagem"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            handleSubmit(e);
          }
        }}
        rows={1}
        placeholder="Escreva sua dúvida..."
        className="max-h-28 flex-1 resize-none rounded-acolhedor border border-petroleo-100 bg-white px-4 py-3 text-sm text-carvao-900 placeholder:text-carvao-600/60 focus:border-petroleo-300"
      />
      <button
        type="submit"
        disabled={!valor.trim()}
        aria-label="Enviar mensagem"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-petroleo-900 text-areia-50 transition-colors disabled:cursor-not-allowed disabled:bg-petroleo-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </button>
    </form>
  );
}
