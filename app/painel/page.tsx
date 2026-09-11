"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, ArrowLeft, CheckCircle2 } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import PilarCard from "@/components/painel/PilarCard";
import { PilarData, progressoGeral } from "@/lib/constants";
import { createClient } from "@/lib/supabase/browser";

interface ChecklistRow {
  id: string;
  concluido: boolean;
  concluido_em: string | null;
  checklist_items: {
    id: string;
    titulo: string;
    descricao: string | null;
    ordem: number;
    pilar_id: string;
    pilares: {
      id: string;
      codigo: string;
      titulo: string;
      descricao: string;
      ordem: number;
    };
  };
}

export default function PainelPage() {
  const [pilares, setPilares] = useState<PilarData[]>([]);
  const [titulo, setTitulo] = useState("Meu Recomeço");
  const [carregando, setCarregando] = useState(true);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    async function carregarPainel() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/auth";
        return;
      }

      const { error: inicializacaoError } = await supabase.rpc(
        "inicializar_checklist_usuario",
        {
          p_user_id: user.id,
        }
      );

      if (inicializacaoError) {
        console.error(
          "Erro ao inicializar checklist:",
          inicializacaoError
        );
      }

      const { data: perfil, error: perfilError } = await supabase
        .from("profiles")
        .select("nome, tipo")
        .eq("id", user.id)
        .single();

      if (perfilError) {
        console.error("Erro ao carregar perfil:", perfilError);
      }

      if (perfil?.tipo === "familiar") {
        setTitulo("Minha Família");
      } else {
        setTitulo("Meu Recomeço");
      }

      const { data, error } = await supabase
        .from("user_checklist")
        .select(`
          id,
          concluido,
          concluido_em,
          checklist_items (
            id,
            titulo,
            descricao,
            ordem,
            pilar_id,
            pilares (
              id,
              codigo,
              titulo,
              descricao,
              ordem
            )
          )
        `)
        .eq("user_id", user.id);

      if (error) {
        console.error("Erro ao carregar progresso:", error);
        setCarregando(false);
        return;
      }

      const registros = (data || []) as unknown as ChecklistRow[];

      const mapa = new Map<string, PilarData>();

      registros.forEach((registro) => {
        const item = registro.checklist_items;
        const pilar = item.pilares;

        if (!mapa.has(pilar.codigo)) {
          mapa.set(pilar.codigo, {
            id: pilar.codigo as PilarData["id"],
            titulo: pilar.titulo,
            descricao: pilar.descricao,
            itens: [],
          });
        }

        mapa.get(pilar.codigo)?.itens.push({
          id: item.id,
          titulo: item.titulo,
          concluido: registro.concluido,
        });
      });

      const resultado = Array.from(mapa.values())
        .sort((a, b) => a.titulo.localeCompare(b.titulo))
        .map((pilar) => ({
          ...pilar,
          itens: pilar.itens.sort((a, b) =>
            a.titulo.localeCompare(b.titulo)
          ),
        }));

      setPilares(resultado);
      setCarregando(false);
    }

    carregarPainel();
  }, []);

  async function alternarItem(
    pilarId: string,
    itemId: string
  ) {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/auth";
      return;
    }

    const pilarAtual = pilares.find(
      (pilar) => pilar.id === pilarId
    );

    const itemAtual = pilarAtual?.itens.find(
      (item) => item.id === itemId
    );

    if (!itemAtual) {
      return;
    }

    const novoEstado = !itemAtual.concluido;

    setPilares((atual) =>
      atual.map((pilar) =>
        pilar.id !== pilarId
          ? pilar
          : {
              ...pilar,
              itens: pilar.itens.map((item) =>
                item.id !== itemId
                  ? item
                  : {
                      ...item,
                      concluido: novoEstado,
                    }
              ),
            }
      )
    );

    const { error } = await supabase
      .from("user_checklist")
      .upsert(
        {
          user_id: user.id,
          checklist_item_id: itemId,
          concluido: novoEstado,
          concluido_em: novoEstado
            ? new Date().toISOString()
            : null,
        },
        {
          onConflict: "user_id,checklist_item_id",
        }
      );

    if (error) {
      console.error(
        "Erro ao salvar progresso:",
        error
      );
    }
  }

  async function sair() {
    setSaindo(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erro ao sair:", error);
      setSaindo(false);
      return;
    }

    window.location.href = "/auth";
  }

  const progresso = progressoGeral(pilares);

  if (carregando) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0F766E] border-t-transparent" />
          <p className="text-sm font-medium text-slate-500">
            Carregando seu progresso...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-[#F8FAFC] text-[#1E293B] flex justify-center items-center">
      <div className="w-full max-w-md bg-[#F8FAFC] min-h-dvh sm:min-h-[844px] sm:rounded-3xl shadow-xl flex flex-col relative overflow-hidden border border-slate-200/60">
        
        {/* Header Redesenhado */}
        <header className="bg-[#1E293B] px-5 pb-6 pt-5 text-white shadow-md">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Link
              href="/atendo"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar ao Atendo
            </Link>

            <button
              type="button"
              onClick={sair}
              disabled={saindo}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10 disabled:opacity-60 active:scale-95"
            >
              <LogOut className="h-3.5 w-3.5" />
              {saindo ? "Saindo..." : "Sair"}
            </button>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white">
            {titulo}
          </h1>

          <p className="mt-1 text-xs leading-relaxed text-slate-300 font-medium">
            Cada passo marcado aqui é um passo real na sua vida.
          </p>

          {/* Card de Progresso Geral Estilizado */}
          <div className="mt-5 rounded-2xl bg-white/10 backdrop-blur-sm p-4 border border-white/10 shadow-inner">
            <ProgressBar
              value={progresso}
              label="Progresso geral da trilha"
            />
          </div>
        </header>

        {/* Lista de Pilares */}
        <div className="flex-1 space-y-3.5 px-5 py-6 overflow-y-auto">
          {pilares.map((pilar, i) => (
            <PilarCard
              key={pilar.id}
              titulo={pilar.titulo}
              descricao={pilar.descricao}
              itens={pilar.itens}
              onToggleItem={(itemId) =>
                alternarItem(pilar.id, itemId)
              }
              abertoPorPadrao={i === 0}
            />
          ))}
        </div>

      </div>
    </main>
  );
}