"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  FileText,
  Search,
  GraduationCap,
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
    <main className="min-h-dvh bg-areia-50">
      <header className="flex items-center gap-3 border-b border-petroleo-100 bg-white px-5 py-4">
        <Link
          href="/"
          aria-label="Voltar"
          className="flex h-9 w-9 items-center justify-center rounded-full text-petroleo-900 hover:bg-petroleo-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-petroleo-100 text-petroleo-900">
            <Briefcase className="h-5 w-5" />
          </div>

          <div>
            <h1 className="font-display text-lg font-medium text-petroleo-950">
              Trabalho
            </h1>
            <p className="text-xs text-carvao-600">
              Seu próximo passo profissional
            </p>
          </div>
        </div>
      </header>

      <section className="px-5 py-8">
        <div className="rounded-3xl bg-petroleo-950 p-6 text-areia-50">
          <p className="text-sm font-medium text-petroleo-200">
            VAMOS COMEÇAR
          </p>

          <h2 className="mt-2 font-display text-2xl font-semibold">
            O que você quer fazer agora?
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-petroleo-100">
            Escolha uma ação. Você pode voltar depois e continuar de onde
            parou.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {acoes.map((acao) => {
            const Icone = acao.icone;

            return (
              <Link
                key={acao.titulo}
                href={acao.href}
                className="flex items-center gap-4 rounded-2xl border border-petroleo-100 bg-white p-5 transition hover:border-petroleo-300 hover:bg-petroleo-50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-petroleo-100 text-petroleo-900">
                  <Icone className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-petroleo-950">
                    {acao.titulo}
                  </h3>

                  <p className="mt-1 text-sm text-carvao-600">
                    {acao.descricao}
                  </p>
                </div>

                <span className="text-xl text-petroleo-400">›</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8">
          <h2 className="font-display text-xl font-semibold text-petroleo-950">
            Seu caminho
          </h2>

          <p className="mt-1 text-sm text-carvao-600">
            Pequenos passos também são progresso.
          </p>

          <div className="mt-4 space-y-3">
            {passos.map((passo, index) => (
              <div
                key={passo}
                className="flex items-center gap-3 rounded-2xl border border-petroleo-100 bg-white p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-petroleo-100 text-sm font-semibold text-petroleo-900">
                  {index + 1}
                </div>

                <p className="flex-1 text-sm text-carvao-700">{passo}</p>

                {index === 0 && (
                  <CheckCircle2 className="h-5 w-5 text-petroleo-700" />
                )}
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/atendo"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-petroleo-900 px-5 py-4 text-sm font-semibold text-white hover:bg-petroleo-800"
        >
          Conversar com o Atendo
        </Link>
      </section>
    </main>
  );
}