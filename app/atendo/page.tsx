"use client";

import { useState } from "react";
import Link from "next/link";
import ChatBubble from "@/components/chat/ChatBubble";
import QuickSuggestions from "@/components/chat/QuickSuggestions";
import ChatInput from "@/components/chat/ChatInput";
import { SUGESTOES_RAPIDAS } from "@/lib/constants";

interface Mensagem {
  id: string;
  autor: "atendo" | "usuario";
  texto: string;
}

const MENSAGEM_INICIAL: Mensagem = {
  id: "inicial",
  autor: "atendo",
  texto:
    "Olá, eu sou o Atendo. Conte o que você precisa — posso ajudar a encontrar o próximo passo.",
};

export default function AtendoPage() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([MENSAGEM_INICIAL]);

  const enviarMensagem = (texto: string) => {
    const doUsuario: Mensagem = {
      id: crypto.randomUUID(),
      autor: "usuario",
      texto,
    };

    // Resposta de exemplo para o protótipo — no produto real, o texto
    // do usuário vai para o backend/IA e a resposta chega de lá.
    const resposta: Mensagem = {
      id: crypto.randomUUID(),
      autor: "atendo",
      texto:
        "Entendi. Estou juntando as informações mais atualizadas sobre isso para você — um instante.",
    };

    setMensagens((atual) => [...atual, doUsuario, resposta]);
  };

  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-areia-50">
      <header className="flex items-center gap-3 border-b border-petroleo-100 bg-white px-5 py-4">
        <Link
          href="/"
          aria-label="Voltar"
          className="flex h-9 w-9 items-center justify-center rounded-full text-petroleo-900 hover:bg-petroleo-100"
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
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
        <div>
          <p className="font-display text-lg font-medium leading-none text-petroleo-950">
            Atendo
          </p>
          <p className="text-xs text-carvao-600">Assistente do RECOMEÇO</p>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-6">
        {mensagens.map((m) => (
          <ChatBubble key={m.id} autor={m.autor}>
            {m.texto}
          </ChatBubble>
        ))}
      </div>

      <div className="space-y-3 border-t border-petroleo-100 bg-areia-50 px-5 py-4">
        <QuickSuggestions
          sugestoes={SUGESTOES_RAPIDAS}
          onEscolher={enviarMensagem}
        />
        <ChatInput onEnviar={enviarMensagem} />
      </div>
    </div>
  );
}
