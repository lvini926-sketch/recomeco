"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import ChecklistItem from "@/components/painel/ChecklistItem";
import { ChecklistItemData, progressoDoPilar } from "@/lib/constants";

interface PilarCardProps {
  titulo: string;
  descricao: string;
  itens: ChecklistItemData[];
  onToggleItem: (itemId: string) => void;
  abertoPorPadrao?: boolean;
}

export default function PilarCard({
  titulo,
  descricao,
  itens,
  onToggleItem,
  abertoPorPadrao = false,
}: PilarCardProps) {
  const [aberto, setAberto] = useState(abertoPorPadrao);
  const progresso = progressoDoPilar({
  id: "trabalho",
  titulo,
  descricao,
  itens,
});

  return (
    <Card className="p-5">
      <button
        onClick={() => setAberto((a) => !a)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={aberto}
      >
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-medium text-petroleo-950">
            {titulo}
          </p>
          <p className="truncate text-xs text-carvao-600">{descricao}</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-5 w-5 shrink-0 text-petroleo-700 transition-transform ${
            aberto ? "rotate-180" : ""
          }`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div className="mt-3">
        <ProgressBar value={progresso} size="sm" />
      </div>

      {aberto && (
        <ul className="mt-3 divide-y divide-petroleo-100/70 border-t border-petroleo-100/70">
          {itens.map((item) => (
            <ChecklistItem
              key={item.id}
              titulo={item.titulo}
              concluido={item.concluido}
              onToggle={() => onToggleItem(item.id)}
            />
          ))}
        </ul>
      )}
    </Card>
  );
}
