import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  MessageCircleMore,
  Route,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const modulos = [
  {
    titulo: "Atendo",
    texto: "Orientação objetiva apoiada em base estruturada e fontes oficiais.",
    icone: MessageCircleMore,
    href: "/atendo",
  },
  {
    titulo: "Trabalho e currículo",
    texto: "Ferramentas para organizar experiência, currículo e próximos passos profissionais.",
    icone: BriefcaseBusiness,
    href: "/trabalho",
  },
  {
    titulo: "Meu Recomeço",
    texto: "Acompanhamento simples da jornada de autonomia por pilares.",
    icone: Route,
    href: "/painel",
  },
];

export default function ApresentacaoPage() {
  return (
    <main className="min-h-dvh bg-[#F8FAFC] text-[#1E293B]">
      <header className="sticky top-0 z-20 border-b border-[#1E293B]/[0.08] bg-[#F8FAFC]/95 backdrop-blur">
        <div className="recomeco-shell flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Image src="/recomeco-symbol.png" alt="" width={38} height={38} className="h-9 w-9 object-contain" />
            <span className="text-sm font-extrabold tracking-[0.14em]">RECOMEÇO</span>
            <span className="hidden h-4 w-px bg-[#1E293B]/15 sm:block" />
            <span className="hidden text-xs font-semibold text-[#1E293B]/45 sm:block">Modo apresentação</span>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-[#1E293B]/10 bg-white px-4 py-2 text-xs font-bold">
            <ArrowLeft size={14} />
            Voltar ao app
          </Link>
        </div>
      </header>

      <section className="recomeco-shell grid min-h-[calc(100dvh-73px)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="recomeco-eyebrow">Plataforma digital de impacto social</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Existe um caminho depois daqui.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#1E293B]/62 sm:text-xl">
            O RECOMEÇO conecta informação, orientação e ferramentas práticas para apoiar pessoas em reintegração social e suas famílias.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#problema" className="inline-flex items-center gap-2 rounded-full bg-[#1E293B] px-5 py-3 text-sm font-bold text-white">
              Conhecer a proposta
              <ArrowRight size={16} />
            </a>
            <Link href="/atendo" className="inline-flex items-center gap-2 rounded-full border border-[#1E293B]/12 bg-white px-5 py-3 text-sm font-bold">
              Abrir demonstração
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="flex aspect-square w-full max-w-[430px] items-center justify-center rounded-[48px] border border-[#1E293B]/[0.08] bg-white shadow-[0_24px_80px_rgba(30,41,59,0.08)]">
            <Image src="/recomeco-symbol.png" alt="Símbolo RECOMEÇO" width={310} height={310} priority className="h-auto w-[64%] object-contain" />
          </div>
        </div>
      </section>

      <section id="problema" className="border-y border-[#1E293B]/[0.08] bg-white">
        <div className="recomeco-shell py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="recomeco-eyebrow">O problema</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
                Recomeçar exige resolver muitas coisas ao mesmo tempo.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Informações ficam espalhadas entre diferentes órgãos e canais.",
                "Famílias precisam compreender regras, documentos, visitas e serviços.",
                "Pessoas egressas precisam reorganizar documentação, trabalho e autonomia.",
                "A burocracia transforma dúvidas simples em barreiras reais.",
              ].map((texto) => (
                <div key={texto} className="rounded-[24px] border border-[#1E293B]/[0.08] bg-[#F8FAFC] p-5">
                  <CheckCircle2 className="mb-4 text-[#0F766E]" size={20} />
                  <p className="text-sm leading-6 text-[#1E293B]/68">{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="recomeco-shell py-20">
        <p className="recomeco-eyebrow">A solução</p>
        <div className="mt-4 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
            Transformar dúvidas em próximos passos claros.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-[#1E293B]/60">
            O RECOMEÇO organiza duas jornadas — família e egresso — dentro de uma mesma plataforma, com linguagem humana, orientação prática e transparência sobre as fontes usadas.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Link href="/familia" className="rounded-[28px] bg-[#1E293B] p-7 text-white">
            <UsersRound size={28} className="text-[#5DCAA5]" />
            <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.18em] text-[#5DCAA5]">Família</p>
            <h3 className="mt-3 text-2xl font-extrabold">Orientação e apoio.</h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/65">
              Visitas, documentos, serviços, direitos e caminhos oficiais organizados de forma compreensível.
            </p>
          </Link>

          <Link href="/egresso" className="rounded-[28px] bg-[#0F766E] p-7 text-white">
            <Route size={28} className="text-[#5DCAA5]" />
            <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.18em] text-[#5DCAA5]">Pessoa egressa</p>
            <h3 className="mt-3 text-2xl font-extrabold">Autonomia e reconstrução.</h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/72">
              Documentação, trabalho, apoio, moradia, saúde e acompanhamento de próximos passos.
            </p>
          </Link>
        </div>
      </section>

      <section className="bg-[#1E293B] text-white">
        <div className="recomeco-shell py-20">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#5DCAA5]">MVP demonstrável</p>
          <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <h2 className="max-w-2xl text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              A plataforma já pode ser apresentada em funcionamento.
            </h2>
            <p className="max-w-lg text-sm leading-6 text-white/60">
              Os módulos abaixo são partes de uma mesma jornada e podem ser abertos ao vivo durante uma reunião.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {modulos.map(({ titulo, texto, icone: Icone, href }) => (
              <Link key={titulo} href={href} className="group rounded-[26px] border border-white/10 bg-white/[0.04] p-6 transition hover:border-[#5DCAA5]/40 hover:bg-white/[0.07]">
                <Icone size={24} className="text-[#5DCAA5]" />
                <h3 className="mt-8 text-xl font-extrabold">{titulo}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{texto}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-[#5DCAA5]">
                  Abrir módulo <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="recomeco-shell py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="recomeco-eyebrow">Princípio de confiança</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              A fonte oficial decide. O RECOMEÇO orienta.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#1E293B]/60">
              Conteúdo factual importante deve permanecer rastreável à fonte responsável. A plataforma não deve inventar documentos, prazos, direitos ou critérios.
            </p>
          </div>

          <div className="recomeco-card p-7">
            <ShieldCheck className="text-[#0F766E]" size={24} />
            <h3 className="mt-5 text-lg font-extrabold">Pronto para piloto controlado</h3>
            <p className="mt-3 text-sm leading-6 text-[#1E293B]/58">
              O próximo passo institucional é validar a experiência com um grupo pequeno de usuários e parceiros, medir dúvidas resolvidas, jornadas concluídas e pontos de abandono.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Clareza", "Acesso", "Próximo passo"].map((item) => (
                <div key={item} className="rounded-2xl bg-[#F8FAFC] p-4 text-center text-xs font-extrabold">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#1E293B]/[0.08] bg-white">
        <div className="recomeco-shell grid gap-8 py-16 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="recomeco-eyebrow">Convite</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em]">
              Vamos validar o RECOMEÇO em um piloto?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#1E293B]/58">
              O projeto foi desenhado para evoluir com organizações, profissionais e usuários reais sem perder sua identidade humana.
            </p>
          </div>
          <Link href="/sobre" className="inline-flex items-center gap-2 rounded-full bg-[#0F766E] px-5 py-3 text-sm font-bold text-white">
            Ver princípios da plataforma
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#1E293B]/[0.08] bg-[#F8FAFC]">
        <div className="recomeco-shell flex flex-col gap-4 py-7 text-xs text-[#1E293B]/45 sm:flex-row sm:items-center sm:justify-between">
          <span>RECOMEÇO · Plataforma digital de impacto social</span>
          <Link href="/" className="font-bold text-[#0F766E]">Entrar no aplicativo</Link>
        </div>
      </footer>
    </main>
  );
}
