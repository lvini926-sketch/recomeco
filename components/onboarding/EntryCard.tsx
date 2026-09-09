"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function EntryCard() {
  const router = useRouter();

  const escolher = (perfil: "familiar" | "egresso") => {
    // Guarda a escolha para personalizar o Atendo e o Painel a seguir.
    if (typeof window !== "undefined") {
      window.localStorage.setItem("recomeco:perfil", perfil);
    }
    router.push("/atendo");
  };

  return (
    <Card className="text-center">
      <p className="font-display text-2xl font-medium leading-snug text-petroleo-950">
        Você não precisa descobrir tudo sozinho
      </p>
      <p className="mt-3 text-sm leading-relaxed text-carvao-600">
        O RECOMEÇO reúne, em um só lugar, o passo a passo prático para quem
        tem alguém preso ou está reconstruindo a vida depois de sair.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <Button variant="primary" onClick={() => escolher("familiar")}>
          Sou Familiar
        </Button>
        <Button variant="secondary" onClick={() => escolher("egresso")}>
          Sou Egresso
        </Button>
      </div>

      <p className="mt-6 text-xs text-carvao-600">
        Você pode trocar isso depois. Nenhum dado seu é compartilhado sem
        sua autorização.
      </p>
    </Card>
  );
}
