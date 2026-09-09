"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProgressBar from "@/components/ui/ProgressBar";
import PilarCard from "@/components/painel/PilarCard";
import { PILARES, PilarData, progressoGeral } from "@/lib/constants";

export default function PainelPage() {
  const [pilares, setPilares] = useState<PilarData[]>(PILARES);
  const [titulo, setTitulo] = useState("Meu Recomeço");

  // O mesmo Painel serve às duas pontas — só muda o título e,
  // futuramente, os pilares/itens carregados da API.
  useEffect(() => {
    const perfil = window.localStorage.getItem("recomeco:perfil");
    setTitulo(perfil === "familiar" ? "Minha Família" : "Meu Recomeço");
  }, []);

  const alternarItem = (pilarId: string, itemId: string) => {
    setPilares((atual) =>
      atual.map((pilar) =>
        pilar.id !== pilarId
          ? pilar
          : {
              ...pilar,
              itens: pilar.itens.map((item) =>
                item.id !== itemId
                  ? item
                  : { ...item, concluido: !item.concluido }
              ),
            }
      )
    );
  };

  const progresso = progressoGeral(pilares);

  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-areia-50">
      <header className="bg-petroleo-950 px-5 pb-8 pt-6">
        <Link
          href="/atendo"
          className="mb-4 inline-flex items-center gap-1 text-sm text-petroleo-300 hover:text-areia-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Voltar ao Atendo
        </Link>

        <p className="font-display text-2xl font-medium text-areia-50">
          {titulo}
        </p>
        <p className="mt-1 text-sm text-petroleo-300">
          Cada passo marcado aqui é um passo real na sua vida.
        </p>

        <div className="mt-6 rounded-acolhedor bg-petroleo-900/60 p-4">
          <ProgressBar value={progresso} label="Progresso geral" />
        </div>
      </header>

      <main className="flex-1 space-y-4 px-5 py-6">
        {pilares.map((pilar, i) => (
          <PilarCard
            key={pilar.id}
            titulo={pilar.titulo}
            descricao={pilar.descricao}
            itens={pilar.itens}
            onToggleItem={(itemId) => alternarItem(pilar.id, itemId)}
            abertoPorPadrao={i === 0}
          />
        ))}
      </main>
    </div>
  );
}
