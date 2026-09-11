import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  FileBadge2,
  HeartPulse,
  Home,
  LayoutDashboard,
  MessageCircleMore,
  Route,
  UsersRound,
} from "lucide-react";

const trilha = [
  { titulo: "Documentação", texto: "Organize os documentos essenciais para retomar sua vida civil.", icone: FileBadge2, href: "/atendo" },
  { titulo: "Trabalho e renda", texto: "Monte currículo, organize experiências e prepare sua busca por oportunidades.", icone: BriefcaseBusiness, href: "/trabalho" },
  { titulo: "Assistência e apoio", texto: "Entenda onde buscar orientação social e serviços de apoio.", icone: UsersRound, href: "/atendo" },
  { titulo: "Moradia", texto: "Organize necessidades e identifique caminhos de apoio quando disponíveis.", icone: Home, href: "/atendo" },
  { titulo: "Saúde", texto: "Encontre o próximo passo para acessar cuidado e serviços públicos.", icone: HeartPulse, href: "/atendo" },
];

export default function EgressoPage() {
  return (
    <main className="min-h-dvh bg-[#F8FAFC] text-[#1E293B]">
      <div className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-8">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1E293B]/10 bg-white"
            aria-label="Voltar"
          >
            <ArrowLeft size={17} />
          </Link>

          <div className="flex items-center gap-2">
            <Image src="/recomeco-symbol.png" alt="" width={30} height={30} className="h-7 w-7 object-contain" />
            <span className="text-xs font-extrabold tracking-[0.14em]">RECOMEÇO</span>
          </div>
        </header>

        <section className="grid gap-8 pt-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="recomeco-eyebrow">Meu caminho</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight tracking-[-0.04em] sm:text-5xl">
              Recomeçar também pode ser organizado por etapas.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#1E293B]/60">
              Use a plataforma para transformar pendências em próximos passos e acompanhar sua construção de autonomia.
            </p>
          </div>

          <Link
            href="/painel"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#1E293B] px-5 py-3 text-sm font-bold text-white"
          >
            <LayoutDashboard size={16} />
            Meu Recomeço
          </Link>
        </section>

        <section className="mt-10 grid gap-3 sm:grid-cols-2">
          {trilha.map(({ titulo, texto, icone: Icone, href }) => (
            <Link
              key={titulo}
              href={href}
              className="group recomeco-card flex items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:border-[#0F766E]/30"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
                <Icone size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-extrabold">{titulo}</h2>
                <p className="mt-1 text-sm leading-6 text-[#1E293B]/55">{texto}</p>
              </div>
              <ArrowRight size={17} className="mt-1 shrink-0 text-[#0F766E] transition group-hover:translate-x-1" />
            </Link>
          ))}
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link href="/trabalho" className="rounded-[28px] bg-[#0F766E] p-6 text-white">
            <BriefcaseBusiness className="text-[#5DCAA5]" size={24} />
            <h2 className="mt-5 text-xl font-extrabold">Trabalho pode ser o próximo passo.</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Monte seu currículo e organize sua jornada profissional.
            </p>
          </Link>

          <Link href="/atendo" className="rounded-[28px] bg-[#1E293B] p-6 text-white">
            <MessageCircleMore className="text-[#5DCAA5]" size={24} />
            <h2 className="mt-5 text-xl font-extrabold">Tem uma dúvida específica?</h2>
            <p className="mt-3 text-sm leading-6 text-white/65">
              Explique sua situação ao Atendo e encontre um próximo passo.
            </p>
          </Link>
        </section>

        <div className="mt-8 flex items-center gap-3 text-xs text-[#1E293B]/45">
          <Route size={15} />
          <span>Autonomia é construída passo a passo.</span>
        </div>
      </div>
    </main>
  );
}
