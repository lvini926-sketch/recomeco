import Link from "next/link";
import EntryCard from "@/components/onboarding/EntryCard";

export default function OnboardingPage() {
  return (
    <main className="flex min-h-dvh flex-1 flex-col justify-between bg-petroleo-950 px-6 py-10">
      <header className="text-center">
        <span className="font-display text-3xl font-semibold tracking-tight text-areia-50">
          RECOMEÇO
        </span>
      </header>

      <div className="flex flex-1 flex-col justify-center py-10">
        <EntryCard />

        <div className="mt-6">
          <Link
            href="/trabalho"
            className="block rounded-2xl border border-areia-50/20 bg-white/10 px-5 py-4 text-center text-sm font-medium text-areia-50 transition hover:bg-white/20"
          >
            💼 Preciso de trabalho
          </Link>
        </div>
      </div>

      <footer className="text-center text-xs text-petroleo-300">
        Um ponto de apoio para famílias e pessoas em reintegração.
      </footer>
    </main>
  );
}