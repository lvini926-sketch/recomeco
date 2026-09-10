"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
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
      <main className="flex min-h-dvh items-center justify-center bg-areia-50">
        <p className="text-sm text-carvao-600">
          Carregando seu progresso...
        </p>
      </main>
    );
  }

  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-areia-50">
      <header className="bg-petroleo-950 px-5 pb-8 pt-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/atendo"
            className="text-sm text-petroleo-300 hover:text-areia-50"
          >
            ← Voltar ao Atendo
          </Link>

          <button
            type="button"
            onClick={sair}
            disabled={saindo}
            className="inline-flex items-center gap-2 rounded-xl border border-areia-50/20 px-3 py-2 text-sm font-medium text-areia-50 transition hover:bg-white/10 disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            {saindo ? "Saindo..." : "Sair"}
          </button>
        </div>

        <p className="mt-5 font-display text-2xl font-medium text-areia-50">
          {titulo}
        </p>

        <p className="mt-1 text-sm text-petroleo-300">
          Cada passo marcado aqui é um passo real na sua vida.
        </p>

        <div className="mt-6 rounded-acolhedor bg-petroleo-900/60 p-4">
          <ProgressBar
            value={progresso}
            label="Progresso geral"
          />
        </div>
      </header>

      <main className="flex-1 space-y-4 px-5 py-6">
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
      </main>
    </div>
  );
}
