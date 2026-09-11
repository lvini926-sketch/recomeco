"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  LayoutDashboard,
  LogOut,
  Presentation,
  UsersRound,
  Waypoints,
} from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

export default function OnboardingPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoadingUser(false);
    }

    checkUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    window.location.reload();
  };

  const handleSelectPerfil = (perfil: "familiar" | "egresso") => {
    localStorage.setItem("recomeco:perfil", perfil);
    router.push("/atendo");
  };

  return (
    <main className="min-h-dvh bg-[#F8FAFC] text-[#1E293B]">
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/recomeco-symbol.png"
              alt="Símbolo RECOMEÇO"
              width={38}
              height={38}
              priority
              className="h-9 w-9 object-contain"
            />
            <span className="text-sm font-extrabold tracking-[0.14em] text-[#1E293B]">
              RECOMEÇO
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!loadingUser && user && (
              <>
                <Link
                  href="/painel"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-[#1E293B]/10 bg-white px-4 text-xs font-bold text-[#1E293B] transition hover:border-[#0F766E]/30 hover:text-[#0F766E]"
                >
                  <LayoutDashboard size={15} />
                  <span className="hidden sm:inline">Meu Recomeço</span>
                </Link>

                <button
                  onClick={handleLogout}
                  aria-label="Sair"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1E293B]/10 bg-white text-[#1E293B]/60 transition hover:text-[#1E293B]"
                >
                  <LogOut size={16} />
                </button>
              </>
            )}

            <Link
              href="/apresentacao"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#1E293B] px-4 text-xs font-bold text-white transition hover:bg-[#0F766E]"
            >
              <Presentation size={15} />
              <span className="hidden sm:inline">Apresentar projeto</span>
            </Link>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div className="max-w-xl">
            <div className="mb-8 flex items-center gap-4">
              <Image
                src="/recomeco-symbol.png"
                alt=""
                width={92}
                height={92}
                className="h-20 w-20 object-contain sm:h-24 sm:w-24"
              />
              <div className="h-px flex-1 bg-[#1E293B]/10" />
            </div>

            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.22em] text-[#0F766E]">
              Plataforma de reintegração social
            </p>

            <h1 className="max-w-lg text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#1E293B] sm:text-5xl lg:text-6xl">
              Existe um caminho depois daqui.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-[#1E293B]/65 sm:text-lg">
              Informação clara, orientação e ferramentas para pessoas em
              reintegração e suas famílias seguirem para o próximo passo com
              mais autonomia.
            </p>

            <p className="mt-5 text-sm font-semibold text-[#1E293B]">
              Você não precisa descobrir tudo sozinho.
            </p>
          </div>

          <div className="w-full">
            <div className="mb-4">
              <p className="text-sm font-bold text-[#1E293B]">
                Como o RECOMEÇO pode te ajudar hoje?
              </p>
              <p className="mt-1 text-sm text-[#1E293B]/50">
                Escolha o caminho que mais combina com o que você precisa.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleSelectPerfil("familiar")}
                className="group flex w-full items-center justify-between rounded-[24px] border border-[#1E293B]/10 bg-white p-5 text-left shadow-[0_8px_30px_rgba(30,41,59,0.06)] transition hover:-translate-y-0.5 hover:border-[#0F766E]/35"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
                    <UsersRound size={22} />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold tracking-wide text-[#1E293B]">
                      SOU FAMILIAR
                    </h2>
                    <p className="mt-1 text-sm text-[#1E293B]/55">
                      Visitas, documentos, orientação e apoio.
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={19}
                  className="text-[#0F766E] transition group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={() => handleSelectPerfil("egresso")}
                className="group flex w-full items-center justify-between rounded-[24px] border border-[#1E293B]/10 bg-white p-5 text-left shadow-[0_8px_30px_rgba(30,41,59,0.06)] transition hover:-translate-y-0.5 hover:border-[#1E293B]/25"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E293B]/7 text-[#1E293B]">
                    <Waypoints size={22} />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold tracking-wide text-[#1E293B]">
                      SOU EGRESSO
                    </h2>
                    <p className="mt-1 text-sm text-[#1E293B]/55">
                      Autonomia, currículo, trabalho e novos caminhos.
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={19}
                  className="text-[#1E293B] transition group-hover:translate-x-1"
                />
              </button>

              <Link
                href="/trabalho"
                className="group flex w-full items-center justify-between rounded-[24px] border border-[#0F766E]/15 bg-[#0F766E]/5 p-5 text-left transition hover:border-[#0F766E]/35"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0F766E]">
                    <BriefcaseBusiness size={21} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#1E293B]">
                      Preciso de trabalho
                    </h2>
                    <p className="mt-1 text-sm text-[#1E293B]/55">
                      Currículo, oportunidades e capacitação.
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={19}
                  className="text-[#0F766E] transition group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t border-[#1E293B]/8 py-5 text-xs text-[#1E293B]/45 sm:flex-row sm:items-center sm:justify-between">
          <p>RECOMEÇO · autonomia, dignidade e reconstrução de caminhos.</p>
          <p>Um ponto de apoio para famílias e pessoas em reintegração.</p>
        </footer>
      </div>
    </main>
  );
}

