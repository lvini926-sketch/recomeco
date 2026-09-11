import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpenCheck,
  Database,
  Eye,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

export default function SobrePage() {
  return (
    <main className="min-h-dvh bg-[#F8FAFC] text-[#1E293B]">
      <div className="mx-auto w-full max-w-4xl px-5 py-6 sm:px-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1E293B]/10 bg-white" aria-label="Voltar">
            <ArrowLeft size={17} />
          </Link>
          <div className="flex items-center gap-2">
            <Image src="/recomeco-symbol.png" alt="" width={30} height={30} className="h-7 w-7 object-contain" />
            <span className="text-xs font-extrabold tracking-[0.14em]">RECOMEÇO</span>
          </div>
        </header>

        <section className="pt-12">
          <p className="recomeco-eyebrow">Sobre a plataforma</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-[-0.04em] sm:text-5xl">
            Tecnologia para organizar caminhos, não para decidir pela pessoa.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#1E293B]/60">
            O RECOMEÇO é uma plataforma digital de impacto social voltada a familiares de pessoas privadas de liberdade e pessoas em processo de reintegração social.
          </p>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            { icon: BookOpenCheck, title: "Fonte oficial primeiro", text: "Informações sensíveis devem apontar para a fonte responsável e para a data de revisão." },
            { icon: Database, title: "Dados organizados", text: "A base estruturada controla o conteúdo factual; a interface transforma isso em orientação compreensível." },
            { icon: Eye, title: "Transparência", text: "Quando não há informação segura, a plataforma deve dizer isso claramente em vez de inventar." },
            { icon: ShieldCheck, title: "Privacidade e dignidade", text: "A experiência evita exposição desnecessária, linguagem estigmatizante e estética carcerária." },
          ].map(({icon: Icon, title, text}) => (
            <div key={title} className="recomeco-card p-6">
              <Icon className="text-[#0F766E]" size={22} />
              <h2 className="mt-5 text-lg font-extrabold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#1E293B]/58">{text}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-[30px] bg-[#1E293B] p-7 text-white sm:p-9">
          <HeartHandshake className="text-[#5DCAA5]" size={26} />
          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-[#5DCAA5]">Princípio</p>
          <h2 className="mt-3 text-2xl font-extrabold">Você não precisa descobrir tudo sozinho.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65">
            O papel da plataforma é reduzir fricção, organizar informação e tornar o próximo passo mais visível — sem substituir órgãos públicos, profissionais especializados ou decisões individuais.
          </p>
        </section>
      </div>
    </main>
  );
}
