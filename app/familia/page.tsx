import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeHelp,
  CalendarDays,
  FileText,
  HeartHandshake,
  Landmark,
  MapPin,
  ShieldCheck,
  UsersRound,
  WalletCards,
} from "lucide-react";

const itens = [
  { titulo: "Carteira de visitante", texto: "Entenda por onde começar e quais informações consultar.", icone: BadgeHelp },
  { titulo: "Visitas", texto: "Orientações sobre credenciamento, regras e próximos passos.", icone: CalendarDays },
  { titulo: "Localizar uma pessoa", texto: "Encontre o canal oficial indicado para localização.", icone: MapPin },
  { titulo: "Documentos", texto: "Saiba onde consultar documentos e exigências do atendimento.", icone: FileText },
  { titulo: "Visita íntima", texto: "Acesse orientação geral e confirme as regras atuais na fonte oficial.", icone: HeartHandshake },
  { titulo: "Benefícios", texto: "Entenda onde buscar informação oficial sobre benefícios sociais.", icone: WalletCards },
  { titulo: "Apoio à família", texto: "Encontre caminhos de atendimento social e orientação.", icone: UsersRound },
  { titulo: "Direitos e serviços", texto: "Organize a dúvida e descubra qual órgão ou serviço procurar.", icone: Landmark },
];

export default function FamiliaPage() {
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

        <section className="pt-12">
          <p className="recomeco-eyebrow">Família</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight tracking-[-0.04em] sm:text-5xl">
            Você não precisa descobrir tudo sozinho.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#1E293B]/60">
            Escolha o assunto que você precisa resolver. O Atendo organiza a orientação e mostra a fonte oficial quando houver informação disponível.
          </p>
        </section>

        <section className="mt-10 grid gap-3 sm:grid-cols-2">
          {itens.map(({ titulo, texto, icone: Icone }) => (
            <Link
              key={titulo}
              href="/atendo"
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

        <section className="mt-10 rounded-[28px] bg-[#1E293B] p-6 text-white sm:p-8">
          <ShieldCheck className="text-[#5DCAA5]" size={24} />
          <h2 className="mt-5 text-xl font-extrabold">Orientação com fonte, não com adivinhação.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
            O RECOMEÇO organiza informações para facilitar sua jornada. Quando a regra depender de órgão público, unidade ou procedimento atualizado, confirme sempre na fonte oficial antes de se deslocar.
          </p>
          <Link
            href="/atendo"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#1E293B]"
          >
            Falar com o Atendo
            <ArrowRight size={15} />
          </Link>
        </section>
      </div>
    </main>
  );
}
