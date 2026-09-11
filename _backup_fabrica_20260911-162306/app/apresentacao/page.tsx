import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CircleCheck,
  FileText,
  MessageCircleMore,
  Route,
  UsersRound,
} from "lucide-react";

const modulos = [
  {
    titulo: "Atendo",
    texto:
      "Orientação objetiva baseada em fontes oficiais para transformar dúvidas em próximos passos.",
    icone: MessageCircleMore,
    href: "/atendo",
  },
  {
    titulo: "Trabalho e currículo",
    texto:
      "Ferramentas para organizar experiência, fortalecer o currículo e apoiar a busca por oportunidades.",
    icone: BriefcaseBusiness,
    href: "/trabalho",
  },
  {
    titulo: "Meu Recomeço",
    texto:
      "Uma visão de progresso por pilares de autonomia, com acompanhamento simples e individual.",
    icone: Route,
    href: "/painel",
  },
];

export default function ApresentacaoPage() {
  return (
    <main className="min-h-dvh bg-[#F8FAFC] text-[#1E293B]">
      <header className="sticky top-0 z-20 border-b border-[#1E293B]/8 bg-[#F8FAFC]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/recomeco-symbol.png"
              alt="Símbolo RECOMEÇO"
              width={38}
              height={38}
              className="h-9 w-9 object-contain"
            />
            <span className="text-sm font-extrabold tracking-[0.14em]">
              RECOMEÇO
            </span>
            <span className="hidden h-4 w-px bg-[#1E293B]/15 sm:block" />
            <span className="hidden text-xs font-semibold text-[#1E293B]/45 sm:block">
              Modo apresentação
            </span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#1E293B]/10 bg-white px-4 py-2 text-xs font-bold transition hover:border-[#0F766E]/30 hover:text-[#0F766E]"
          >
            <ArrowLeft size={14} />
            Voltar ao app
          </Link>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100dvh-73px)] w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#0F766E]">
            Plataforma digital de impacto social
          </p>

          <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Existe um caminho depois daqui.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#1E293B]/62 sm:text-xl">
            O RECOMEÇO conecta informação, orientação e ferramentas práticas
            para apoiar pessoas em reintegração social e suas famílias.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#proposta"
              className="inline-flex items-center gap-2 rounded-full bg-[#1E293B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0F766E]"
            >
              Conhecer a proposta
              <ArrowRight size={16} />
            </a>

            <Link
              href="/atendo"
              className="inline-flex items-center gap-2 rounded-full border border-[#1E293B]/12 bg-white px-5 py-3 text-sm font-bold transition hover:border-[#0F766E]/30 hover:text-[#0F766E]"
            >
              Ver demonstração
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative flex aspect-square w-full max-w-[430px] items-center justify-center rounded-[48px] border border-[#1E293B]/8 bg-white shadow-[0_24px_80px_rgba(30,41,59,0.08)]">
            <Image
              src="/recomeco-symbol.png"
              alt="Símbolo RECOMEÇO"
              width={310}
              height={310}
              priority
              className="h-auto w-[64%] object-contain"
            />
          </div>
        </div>
      </section>

      <section id="proposta" className="border-y border-[#1E293B]/8 bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#0F766E]">
                O problema
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
                Recomeçar exige resolver muitas coisas ao mesmo tempo.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Informações importantes ficam espalhadas em diferentes órgãos e canais.",
                "Famílias precisam entender regras, documentos, visitas e onde buscar apoio.",
                "Quem sai do sistema precisa reorganizar documentação, trabalho e autonomia.",
                "A complexidade burocrática transforma pequenas dúvidas em barreiras reais.",
              ].map((texto) => (
                <div
                  key={texto}
                  className="rounded-[24px] border border-[#1E293B]/8 bg-[#F8FAFC] p-5"
                >
                  <CircleCheck className="mb-4 text-[#0F766E]" size={20} />
                  <p className="text-sm leading-6 text-[#1E293B]/68">{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#0F766E]">
            A proposta
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
            Transformar dúvidas em próximos passos claros.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#1E293B]/60">
            A plataforma organiza jornadas diferentes para os dois públicos do
            projeto sem reduzir nenhuma delas a uma experiência burocrática.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-[28px] bg-[#1E293B] p-7 text-white">
            <UsersRound size={28} className="text-[#5DCAA5]" />
            <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.18em] text-[#5DCAA5]">
              Para familiares
            </p>
            <h3 className="mt-3 text-2xl font-extrabold">Orientação e apoio.</h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/65">
              Visitas, documentos, serviços, direitos e caminhos oficiais
              organizados de forma compreensível.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#0F766E] p-7 text-white">
            <Route size={28} className="text-[#5DCAA5]" />
            <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.18em] text-[#5DCAA5]">
              Para pessoas egressas
            </p>
            <h3 className="mt-3 text-2xl font-extrabold">Autonomia e reconstrução.</h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/72">
              Ferramentas para organizar a retomada da vida civil, do trabalho
              e das próximas decisões.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#1E293B] text-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#5DCAA5]">
            MVP em funcionamento
          </p>

          <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <h2 className="max-w-2xl text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
              Uma plataforma que já pode ser demonstrada.
            </h2>
            <p className="max-w-lg text-sm leading-6 text-white/60">
              Os módulos trabalham como partes de uma mesma jornada e podem ser
              apresentados diretamente durante reuniões com parceiros.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {modulos.map(({ titulo, texto, icone: Icone, href }) => (
              <Link
                key={titulo}
                href={href}
                className="group rounded-[26px] border border-white/10 bg-white/[0.04] p-6 transition hover:border-[#5DCAA5]/40 hover:bg-white/[0.07]"
              >
                <Icone size={24} className="text-[#5DCAA5]" />
                <h3 className="mt-8 text-xl font-extrabold">{titulo}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{texto}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-[#5DCAA5]">
                  Abrir módulo
                  <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Image
              src="/recomeco-symbol.png"
              alt=""
              width={120}
              height={120}
              className="h-24 w-24 object-contain"
            />
            <h2 className="mt-7 text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
              Dois caminhos que se cruzam e se tornam um só.
            </h2>
          </div>

          <div className="rounded-[30px] border border-[#1E293B]/8 bg-white p-7 sm:p-9">
            <div className="flex items-start gap-4">
              <FileText className="mt-1 shrink-0 text-[#0F766E]" size={22} />
              <div>
                <p className="text-sm font-extrabold">Princípio do produto</p>
                <p className="mt-2 text-base leading-7 text-[#1E293B]/62">
                  A tecnologia organiza o caminho. A informação oficial
                  sustenta as orientações. A pessoa continua no centro da
                  decisão.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-[#1E293B]/8 pt-8">
              <p className="text-sm font-extrabold">Direção criativa</p>
              <p className="mt-2 text-base leading-7 text-[#1E293B]/62">
                Esperança sem infantilizar, tecnologia sem parecer IA, impacto
                social sem parecer órgão público e profissionalismo sem perder
                humanidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1E293B]/8 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-7 text-xs text-[#1E293B]/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>RECOMEÇO · Plataforma digital de impacto social</span>
          <Link href="/" className="font-bold text-[#0F766E]">
            Entrar no aplicativo
          </Link>
        </div>
      </footer>
    </main>
  );
}

