"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  FileText,
  Search,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

const acoes = [
  {
    titulo: "Montar meu currículo",
    descricao: "Crie seu currículo passo a passo.",
    icone: FileText,
    href: "/trabalho/curriculo",
  },
  {
    titulo: "Procurar vagas",
    descricao: "Encontre oportunidades de trabalho.",
    icone: Search,
    href: "#vagas",
  },
  {
    titulo: "Buscar cursos",
    descricao: "Veja opções para melhorar sua qualificação.",
    icone: GraduationCap,
    href: "#cursos",
  },
];

const passos = [
  "Montar ou atualizar seu currículo",
  "Cadastrar-se em serviços de emprego",
  "Procurar vagas compatíveis com seu perfil",
  "Fazer cursos e desenvolver novas habilidades",
];

export default function TrabalhoPage() {
  return (
    <main className="min-h-dvh bg-[#F8FAFC] text-[#1E293B] flex justify-center items-center">
      <div className="w-full max-w-md bg-[#F8FAFC] min-h-dvh sm:min-h-[844px] sm:rounded-3xl shadow-xl flex flex-col relative overflow-hidden border border-slate-200/60">
        
        {/* Header Redesenhado */}
        <header className="flex items-center gap-3 border-b border-slate-100 bg-white px-5 py-4 shadow-xs">
          <Link
            href="/"
            aria-label="Voltar"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:text-[#1E293B] hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E]">
              <Briefcase className="h-5 w-5 stroke-[2]" />
            </div>

            <div>
              <h1 className="font-bold text-[#1E293B] text-sm tracking-tight">
                Trabalho
              </h1>
              <p className="text-[11px] text-[#0F766E] font-medium">
                Seu próximo passo profissional
              </p>
            </div>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          
          {/* Card Banner de Destaque */}
          <div className="rounded-2xl bg-[#1E293B] p-6 text-white shadow-md relative overflow-hidden">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] bg-white/90 px-2.5 py-0.5 rounded-full inline-block mb-2">
              Vamos começar
            </p>

            <h2 className="text-xl font-bold tracking-tight text-white">
              O que você quer fazer agora?
            </h2>

            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Escolha uma ação. Você pode voltar depois e continuar de onde parou.
            </p>
          </div>

          {/* Cards de Ação */}
          <div className="space-y-3">
            {acoes.map((acao) => {
              const Icone = acao.icone;

              return (
                <Link
                  key={acao.titulo}
                  href={acao.href}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs transition-all duration-200 hover:border-[#0F766E]/50 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E] transition-colors group-hover:bg-[#0F766E] group-hover:text-white">
                      <Icone className="h-5 w-5 stroke-[2]" />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#1E293B]">
                        {acao.titulo}
                      </h3>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {acao.descricao}
                      </p>
                    </div>
                  </div>

                  <ChevronRight size={18} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#0F766E]" />
                </Link>
              );
            })}
          </div>

          {/* Seção: Seu Caminho */}
          <div className="pt-2">
            <h2 className="text-base font-bold text-[#1E293B]">
              Seu caminho
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Pequenos passos também são progresso.
            </p>

            <div className="mt-3.5 space-y-2.5">
              {passos.map((passo, index) => (
                <div
                  key={passo}
                  className="flex items-center gap-3.5 rounded-2xl border border-slate-200/70 bg-white p-3.5 shadow-2xs"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0F766E]/10 text-xs font-bold text-[#0F766E]">
                    {index + 1}
                  </div>

                  <p className="flex-1 text-xs font-medium text-[#1E293B]">{passo}</p>

                  {index === 0 && (
                    <CheckCircle2 className="h-4 w-4 text-[#0F766E]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Botão Conversar com o Atendo */}
          <Link
            href="/atendo"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 py-3.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0F766E]/90 transition-all active:scale-98"
          >
            Conversar com o Atendo
          </Link>

        </div>

      </div>
    </main>
  );
}