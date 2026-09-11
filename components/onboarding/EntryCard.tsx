"use client";

import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";

export default function EntryCard() {
  const router = useRouter();

  const escolher = (perfil: "familiar" | "egresso") => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("recomeco:perfil", perfil);
    }

    router.push("/atendo");
  };

  return (
    <Card className="border-0 bg-transparent p-0 shadow-none">
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
          Por onde começamos?
        </p>

        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#1E293B]">
          Escolha o caminho que combina com você
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
          Vamos orientar você com informações práticas e próximos passos.
        </p>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => escolher("familiar")}
          className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#0F766E]/30 hover:shadow-md active:translate-y-0"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0F766E]/10 text-2xl">
            🤝
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-bold text-[#1E293B]">
              Sou Familiar
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Orientações, visitas, documentos e apoio
            </p>
          </div>

          <span className="text-xl text-slate-300 transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </button>

        <button
          type="button"
          onClick={() => escolher("egresso")}
          className="group flex w-full items-center gap-4 rounded-2xl border border-[#D97706]/20 bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#D97706]/40 hover:shadow-md active:translate-y-0"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D97706]/10 text-2xl">
            🌱
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-bold text-[#1E293B]">
              Sou Egresso
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Autonomia, currículo, trabalho e novos caminhos
            </p>
          </div>

          <span className="text-xl text-slate-300 transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>

      <p className="mt-5 text-center text-[11px] leading-5 text-slate-400">
        Você poderá mudar essa escolha depois.
      </p>
    </Card>
  );
}
