import Link from "next/link";
import EntryCard from "@/components/onboarding/EntryCard";

export default function OnboardingPage() {
  return (
    <main className="flex min-h-dvh flex-1 flex-col bg-[#F8FAFC] px-5 py-8 text-[#1E293B]">
      <header className="flex flex-col items-center pt-6 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#0F766E]/10 text-3xl">
          🌱
        </div>

        <span className="font-display text-3xl font-bold tracking-tight text-[#1E293B]">
          RECOMEÇO
        </span>

        <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
          Você não precisa descobrir tudo sozinho.
        </p>
      </header>

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
        <EntryCard />

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium text-slate-400">ou</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <Link
          href="/trabalho"
          className="group flex items-center justify-center gap-3 rounded-2xl border border-[#D97706]/25 bg-white px-5 py-4 text-center text-sm font-semibold text-[#1E293B] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className="text-lg">💼</span>
          <span>
            Preciso de trabalho
            <span className="mt-0.5 block text-xs font-normal text-slate-500">
              Currículo, oportunidades e capacitação
            </span>
          </span>
        </Link>
      </div>

      <footer className="mx-auto max-w-sm px-4 pb-3 text-center text-xs leading-5 text-slate-400">
        Um ponto de apoio para famílias e pessoas em reintegração.
      </footer>
    </main>
  );
}
