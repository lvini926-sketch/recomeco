import EntryCard from "@/components/onboarding/EntryCard";

export default function OnboardingPage() {
  return (
    <main className="flex min-h-dvh flex-1 flex-col justify-between bg-petroleo-950 px-6 py-10">
      {/* Cabeçalho simples — sem brasão, grade ou qualquer elemento que
         remeta a farda/instituição penal. Só a marca e um respiro. */}
      <header className="text-center">
        <span className="font-display text-3xl font-semibold tracking-tight text-areia-50">
          RECOMEÇO
        </span>
      </header>

      <div className="flex flex-1 flex-col justify-center py-10">
        <EntryCard />
      </div>

      <footer className="text-center text-xs text-petroleo-300">
        Um ponto de apoio para famílias e pessoas em reintegração.
      </footer>
    </main>
  );
}
