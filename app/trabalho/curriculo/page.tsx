"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
ArrowLeft,
BriefcaseBusiness,
CheckCircle2,
FileText,
GraduationCap,
Loader2,
Plus,
Sparkles,
Trash2,
X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

type Experiencia = {
empresa: string;
cargo: string;
descricao: string;
inicio: string;
fim: string;
};

type Formacao = {
instituicao: string;
curso: string;
inicio: string;
fim: string;
};

type SugestaoIA = {
objetivo_melhorado?: string;
experiencias_melhoradas?: {
empresa?: string;
cargo?: string;
descricao_melhorada?: string;
}[];
habilidades_sugeridas?: string[];
resumo_profissional?: string;
};

type RascunhoCurriculo = {
nome: string;
objetivo: string;
experiencias: Experiencia[];
formacoes: Formacao[];
habilidades: string[];
salvoEm: string;
};

const RASCUNHO_PREFIXO = "recomeco:curriculo:rascunho:";

const experienciaVazia = (): Experiencia => ({
empresa: "",
cargo: "",
descricao: "",
inicio: "",
fim: "",
});

const formacaoVazia = (): Formacao => ({
instituicao: "",
curso: "",
inicio: "",
fim: "",
});

export default function CurriculoPage() {
const supabase = useMemo(() => createClient(), []);

const [usuarioId, setUsuarioId] = useState("");
const [nome, setNome] = useState("");
const [objetivo, setObjetivo] = useState("");

const [experiencias, setExperiencias] = useState<Experiencia[]>([
experienciaVazia(),
]);

const [formacoes, setFormacoes] = useState<Formacao[]>([
formacaoVazia(),
]);

const [habilidades, setHabilidades] = useState<string[]>([""]);

const [inicializado, setInicializado] = useState(false);
const [salvando, setSalvando] = useState(false);
const [mensagem, setMensagem] = useState("");

const [statusRascunho, setStatusRascunho] = useState<
"carregando" | "salvando" | "salvo" | "nenhum"

> ("carregando");

const [melhorandoIA, setMelhorandoIA] = useState(false);
const [sugestaoIA, setSugestaoIA] = useState<SugestaoIA | null>(null);

const chaveRascunho = usuarioId
? `${RASCUNHO_PREFIXO}${usuarioId}`
: "";

useEffect(() => {
async function carregarUsuario() {
try {
const {
data: { user },
} = await supabase.auth.getUser();

    if (!user) {
      setStatusRascunho("nenhum");
      setInicializado(true);
      return;
    }

    setUsuarioId(user.id);

    const nomeUsuario =
      user.user_metadata?.nome ||
      user.user_metadata?.name ||
      user.email ||
      "";

    setNome(nomeUsuario);

    const chave = `${RASCUNHO_PREFIXO}${user.id}`;
    const rascunhoSalvo = localStorage.getItem(chave);

    if (rascunhoSalvo) {
      try {
        const rascunho: RascunhoCurriculo =
          JSON.parse(rascunhoSalvo);

        setNome(rascunho.nome || nomeUsuario);
        setObjetivo(rascunho.objetivo || "");

        setExperiencias(
          rascunho.experiencias?.length
            ? rascunho.experiencias
            : [experienciaVazia()]
        );

        setFormacoes(
          rascunho.formacoes?.length
            ? rascunho.formacoes
            : [formacaoVazia()]
        );

        setHabilidades(
          rascunho.habilidades?.length
            ? rascunho.habilidades
            : [""]
        );

        setStatusRascunho("salvo");
      } catch (erro) {
        console.error(
          "Erro ao recuperar rascunho:",
          erro
        );

        localStorage.removeItem(chave);
        setStatusRascunho("nenhum");
      }
    } else {
      setStatusRascunho("nenhum");
    }
  } catch (erro) {
    console.error(
      "Erro ao carregar usuário:",
      erro
    );

    setStatusRascunho("nenhum");
  } finally {
    setInicializado(true);
  }
}

carregarUsuario();

}, [supabase]);

useEffect(() => {
if (
!inicializado ||
!usuarioId ||
!chaveRascunho
) {
return;
}

setStatusRascunho("salvando");

const timer = window.setTimeout(() => {
  const rascunho: RascunhoCurriculo = {
    nome,
    objetivo,
    experiencias,
    formacoes,
    habilidades,
    salvoEm: new Date().toISOString(),
  };

  localStorage.setItem(
    chaveRascunho,
    JSON.stringify(rascunho)
  );

  setStatusRascunho("salvo");
}, 700);

return () => {
  window.clearTimeout(timer);
};

}, [
inicializado,
usuarioId,
chaveRascunho,
nome,
objetivo,
experiencias,
formacoes,
habilidades,
]);

function adicionarExperiencia() {
setExperiencias((atual) => [
...atual,
experienciaVazia(),
]);
}

function removerExperiencia(index: number) {
setExperiencias((atual) => {
if (atual.length === 1) {
return atual;
}

  return atual.filter((_, i) => i !== index);
});

}

function atualizarExperiencia(
index: number,
campo: keyof Experiencia,
valor: string
) {
setExperiencias((atual) =>
atual.map((experiencia, i) =>
i === index
? {
...experiencia,
[campo]: valor,
}
: experiencia
)
);
}

function adicionarFormacao() {
setFormacoes((atual) => [
...atual,
formacaoVazia(),
]);
}

function removerFormacao(index: number) {
setFormacoes((atual) => {
if (atual.length === 1) {
return atual;
}

  return atual.filter((_, i) => i !== index);
});

}

function atualizarFormacao(
index: number,
campo: keyof Formacao,
valor: string
) {
setFormacoes((atual) =>
atual.map((formacao, i) =>
i === index
? {
...formacao,
[campo]: valor,
}
: formacao
)
);
}

function adicionarHabilidade() {
setHabilidades((atual) => [
...atual,
"",
]);
}

function removerHabilidade(index: number) {
setHabilidades((atual) => {
if (atual.length === 1) {
return atual;
}

  return atual.filter((_, i) => i !== index);
});

}

function atualizarHabilidade(
index: number,
valor: string
) {
setHabilidades((atual) =>
atual.map((habilidade, i) =>
i === index ? valor : habilidade
)
);
}

async function melhorarComIA() {
setMensagem("");
setSugestaoIA(null);
setMelhorandoIA(true);

try {
  const response = await fetch(
    "/api/curriculo/melhorar",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        objetivo,
        experiencia: experiencias,
        formacao: formacoes,
        habilidades:
          habilidades.filter(Boolean),
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    setMensagem(
      data.erro ||
        "Não foi possível usar a IA agora."
    );
    return;
  }

  setSugestaoIA(data.resultado);
} catch (erro) {
  console.error(
    "Erro ao chamar IA:",
    erro
  );

  setMensagem(
    "Não foi possível conectar com a IA agora."
  );
} finally {
  setMelhorandoIA(false);
}

}

function aplicarSugestoes() {
if (!sugestaoIA) {
return;
}

if (sugestaoIA.objetivo_melhorado) {
  setObjetivo(
    sugestaoIA.objetivo_melhorado
  );
}

if (
  sugestaoIA.experiencias_melhoradas?.length
) {
  setExperiencias((atuais) =>
    atuais.map(
      (experiencia, index) => {
        const sugestao =
          sugestaoIA.experiencias_melhoradas?.[
            index
          ];

        if (
          !sugestao?.descricao_melhorada
        ) {
          return experiencia;
        }

        return {
          ...experiencia,
          descricao:
            sugestao.descricao_melhorada,
        };
      }
    )
  );
}

setSugestaoIA(null);
setMensagem(
  "Sugestões aplicadas ao currículo."
);

}

function limparRascunho() {
if (!chaveRascunho) {
return;
}

const confirmar = window.confirm(
  "Deseja realmente limpar o rascunho deste currículo?"
);

if (!confirmar) {
  return;
}

localStorage.removeItem(chaveRascunho);

setObjetivo("");
setExperiencias([
  experienciaVazia(),
]);
setFormacoes([
  formacaoVazia(),
]);
setHabilidades([""]);
setSugestaoIA(null);
setMensagem("");
setStatusRascunho("nenhum");

}

async function salvarCurriculo() {
setSalvando(true);
setMensagem("");

try {
  const response = await fetch(
    "/api/curriculo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        objetivo,
        experiencia: experiencias,
        formacao: formacoes,
        habilidades:
          habilidades.filter(Boolean),
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    setMensagem(
      data.erro ||
        "Não foi possível salvar o currículo."
    );
    return;
  }

  if (chaveRascunho) {
    localStorage.removeItem(
      chaveRascunho
    );
  }

  setStatusRascunho("nenhum");
  setMensagem(
    "Currículo salvo com sucesso."
  );
} catch (erro) {
  console.error(
    "Erro ao salvar currículo:",
    erro
  );

  setMensagem(
    "Erro de conexão ao salvar currículo."
  );
} finally {
  setSalvando(false);
}

}

return ( <main className="min-h-dvh bg-[#F8FAFC] text-[#1E293B] flex justify-center"> <div className="w-full max-w-md min-h-dvh bg-[#F8FAFC] sm:min-h-[844px] sm:rounded-3xl sm:shadow-xl overflow-hidden border border-slate-200/60">

    <header className="flex items-center gap-3 border-b border-slate-100 bg-white px-5 py-4">
      <Link
        href="/trabalho"
        aria-label="Voltar"
        className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E]">
        <FileText className="h-5 w-5" />
      </div>

      <div>
        <h1 className="text-sm font-bold">
          Meu currículo
        </h1>

        <p className="text-[11px] text-[#0F766E] font-medium">
          Construa seu próximo passo
        </p>
      </div>
    </header>

    <div className="space-y-6 px-5 py-6">

      <section className="rounded-2xl bg-[#1E293B] p-5 text-white shadow-md">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
          Currículo profissional
        </p>

        <h2 className="mt-1 text-xl font-bold">
          Apresente o melhor de você.
        </h2>

        <p className="mt-2 text-xs leading-relaxed text-slate-300">
          Preencha aos poucos. Seu rascunho fica salvo neste dispositivo.
        </p>
      </section>

      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          {statusRascunho === "salvando" ? (
            <Loader2 className="h-4 w-4 animate-spin text-[#0F766E]" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-[#0F766E]" />
          )}

          <span className="text-xs font-medium text-slate-600">
            {statusRascunho ===
            "carregando"
              ? "Carregando..."
              : statusRascunho ===
                "salvando"
              ? "Salvando rascunho..."
              : statusRascunho ===
                "salvo"
              ? "Rascunho salvo"
              : "Sem rascunho local"}
          </span>
        </div>

        {statusRascunho ===
          "salvo" && (
          <button
            type="button"
            onClick={limparRascunho}
            className="text-[11px] font-semibold text-slate-400 hover:text-red-500"
          >
            Limpar
          </button>
        )}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="text-sm font-bold">
            Informações profissionais
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Comece pelo que você já sabe fazer.
          </p>
        </div>

        <label className="block text-xs font-semibold text-slate-600">
          Nome
        </label>

        <input
          value={nome}
          readOnly
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-600 outline-none"
        />

        <label className="mt-4 block text-xs font-semibold text-slate-600">
          Objetivo profissional
        </label>

        <textarea
          value={objetivo}
          onChange={(e) =>
            setObjetivo(e.target.value)
          }
          placeholder="Ex.: Busco uma oportunidade na área administrativa..."
          rows={4}
          className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="h-5 w-5 text-[#0F766E]" />

            <h2 className="text-sm font-bold">
              Experiência profissional
            </h2>
          </div>

          <button
            type="button"
            onClick={
              adicionarExperiencia
            }
            className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-[11px] font-semibold text-[#0F766E] hover:bg-[#0F766E]/10"
          >
            <Plus className="h-4 w-4" />
            Adicionar
          </button>
        </div>

        <div className="mt-4 space-y-5">
          {experiencias.map(
            (
              experiencia,
              index
            ) => (
              <div
                key={index}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Experiência{" "}
                    {index + 1}
                  </span>

                  {experiencias.length >
                    1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removerExperiencia(
                          index
                        )
                      }
                      className="text-slate-400 hover:text-red-500"
                      aria-label="Remover experiência"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <input
                  value={
                    experiencia.empresa
                  }
                  onChange={(e) =>
                    atualizarExperiencia(
                      index,
                      "empresa",
                      e.target.value
                    )
                  }
                  placeholder="Empresa"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#0F766E]"
                />

                <input
                  value={
                    experiencia.cargo
                  }
                  onChange={(e) =>
                    atualizarExperiencia(
                      index,
                      "cargo",
                      e.target.value
                    )
                  }
                  placeholder="Cargo"
                  className="mt-2.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#0F766E]"
                />

                <textarea
                  value={
                    experiencia.descricao
                  }
                  onChange={(e) =>
                    atualizarExperiencia(
                      index,
                      "descricao",
                      e.target.value
                    )
                  }
                  placeholder="Descreva suas principais atividades..."
                  rows={4}
                  className="mt-2.5 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#0F766E]"
                />

                <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                  <input
                    type="month"
                    value={
                      experiencia.inicio
                    }
                    onChange={(e) =>
                      atualizarExperiencia(
                        index,
                        "inicio",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#0F766E]"
                  />

                  <input
                    type="month"
                    value={
                      experiencia.fim
                    }
                    onChange={(e) =>
                      atualizarExperiencia(
                        index,
                        "fim",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#0F766E]"
                  />
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-[#0F766E]" />

            <h2 className="text-sm font-bold">
              Formação
            </h2>
          </div>

          <button
            type="button"
            onClick={
              adicionarFormacao
            }
            className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-[11px] font-semibold text-[#0F766E] hover:bg-[#0F766E]/10"
          >
            <Plus className="h-4 w-4" />
            Adicionar
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {formacoes.map(
            (formacao, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Formação{" "}
                    {index + 1}
                  </span>

                  {formacoes.length >
                    1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removerFormacao(
                          index
                        )
                      }
                      className="text-slate-400 hover:text-red-500"
                      aria-label="Remover formação"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <input
                  value={
                    formacao.instituicao
                  }
                  onChange={(e) =>
                    atualizarFormacao(
                      index,
                      "instituicao",
                      e.target.value
                    )
                  }
                  placeholder="Instituição"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#0F766E]"
                />

                <input
                  value={
                    formacao.curso
                  }
                  onChange={(e) =>
                    atualizarFormacao(
                      index,
                      "curso",
                      e.target.value
                    )
                  }
                  placeholder="Curso"
                  className="mt-2.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#0F766E]"
                />

                <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                  <input
                    type="month"
                    value={
                      formacao.inicio
                    }
                    onChange={(e) =>
                      atualizarFormacao(
                        index,
                        "inicio",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#0F766E]"
                  />

                  <input
                    type="month"
                    value={
                      formacao.fim
                    }
                    onChange={(e) =>
                      atualizarFormacao(
                        index,
                        "fim",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#0F766E]"
                  />
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold">
              Habilidades
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Adicione competências que você realmente possui.
            </p>
          </div>

          <button
            type="button"
            onClick={
              adicionarHabilidade
            }
            className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-[11px] font-semibold text-[#0F766E] hover:bg-[#0F766E]/10"
          >
            <Plus className="h-4 w-4" />
            Adicionar
          </button>
        </div>

        <div className="mt-4 space-y-2.5">
          {habilidades.map(
            (habilidade, index) => (
              <div
                key={index}
                className="flex gap-2"
              >
                <input
                  value={habilidade}
                  onChange={(e) =>
                    atualizarHabilidade(
                      index,
                      e.target.value
                    )
                  }
                  placeholder="Ex.: Atendimento ao cliente"
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#0F766E]"
                />

                {habilidades.length >
                  1 && (
                  <button
                    type="button"
                    onClick={() =>
                      removerHabilidade(
                        index
                      )
                    }
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-red-500"
                    aria-label="Remover habilidade"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            )
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-[#0F766E]/20 bg-[#0F766E]/5 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0F766E] shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-sm font-bold">
              Melhorar com IA
            </h2>

            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              A IA pode melhorar a apresentação do seu currículo sem inventar informações.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={melhorarComIA}
          disabled={melhorandoIA}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 py-3.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#0F766E]/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {melhorandoIA ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analisando...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Melhorar meu currículo
            </>
          )}
        </button>
      </section>

      {sugestaoIA && (
        <section className="rounded-2xl border border-[#D97706]/30 bg-white p-5 shadow-md">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#D97706]" />

                <h2 className="text-sm font-bold">
                  Sugestões da IA
                </h2>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Revise tudo antes de aplicar.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSugestaoIA(null)
              }
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
              aria-label="Fechar sugestões"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {sugestaoIA.resumo_profissional && (
            <div className="mt-4 rounded-xl bg-slate-50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Resumo profissional
              </p>

              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {
                  sugestaoIA.resumo_profissional
                }
              </p>
            </div>
          )}

          {sugestaoIA.objetivo_melhorado && (
            <div className="mt-3 rounded-xl border border-slate-100 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#0F766E]">
                Objetivo sugerido
              </p>

              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {
                  sugestaoIA.objetivo_melhorado
                }
              </p>
            </div>
          )}

          {sugestaoIA.experiencias_melhoradas?.map(
            (experiencia, index) => {
              if (
                !experiencia.descricao_melhorada
              ) {
                return null;
              }

              return (
                <div
                  key={index}
                  className="mt-3 rounded-xl border border-slate-100 p-4"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#0F766E]">
                    {experiencia.cargo ||
                      experiencias[index]
                        ?.cargo ||
                      `Experiência ${
                        index + 1
                      }`}
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {
                      experiencia.descricao_melhorada
                    }
                  </p>
                </div>
              );
            }
          )}

          {sugestaoIA.habilidades_sugeridas &&
            sugestaoIA
              .habilidades_sugeridas
              .length > 0 && (
              <div className="mt-3 rounded-xl border border-slate-100 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#0F766E]">
                  Habilidades identificadas
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {sugestaoIA.habilidades_sugeridas.map(
                    (habilidade) => (
                      <span
                        key={habilidade}
                        className="rounded-full bg-[#0F766E]/10 px-3 py-1.5 text-[11px] font-medium text-[#0F766E]"
                      >
                        {habilidade}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() =>
                setSugestaoIA(null)
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              <X className="h-4 w-4" />
              Cancelar
            </button>

            <button
              type="button"
              onClick={aplicarSugestoes}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-4 py-3 text-xs font-bold text-white hover:bg-[#0F766E]/90"
            >
              <CheckCircle2 className="h-4 w-4" />
              Aplicar
            </button>
          </div>
        </section>
      )}

      {mensagem && (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-600">
          {mensagem}
        </div>
      )}

      <button
        type="button"
        onClick={salvarCurriculo}
        disabled={salvando}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E293B] px-5 py-4 text-sm font-bold text-white shadow-md transition hover:bg-[#1E293B]/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {salvando ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Salvando...
          </>
        ) : (
          <>
            <CheckCircle2 className="h-4 w-4" />
            Salvar currículo
          </>
        )}
      </button>

      <div className="h-4" />
    </div>
  </div>
</main>

);
}
