"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function CurriculoPage() {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [formacao, setFormacao] = useState("");
  const [habilidades, setHabilidades] = useState("");

  const [mostrarCurriculo, setMostrarCurriculo] = useState(false);
  const [curriculoMelhorado, setCurriculoMelhorado] = useState(false);
  const [melhorando, setMelhorando] = useState(false);
  const [erro, setErro] = useState("");

  const gerarCurriculo = () => {
    setErro("");
    setMostrarCurriculo(true);
  };

  const melhorarComIA = async () => {
    setMelhorando(true);
    setErro("");

    try {
      const resposta = await fetch("/api/curriculo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          objetivo,
          experiencia,
          formacao,
          habilidades,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro || "Não foi possível melhorar o currículo.");
      }

      setObjetivo(dados.objetivo || objetivo);
      setExperiencia(dados.experiencia || experiencia);
      setFormacao(dados.formacao || formacao);
      setHabilidades(dados.habilidades || habilidades);

      setCurriculoMelhorado(true);
    } catch (error) {
      console.error(error);
      setErro(
        "Não foi possível conectar à IA agora. Verifique a configuração da API e tente novamente."
      );
    } finally {
      setMelhorando(false);
    }
  };

  if (mostrarCurriculo) {
    return (
      <main className="min-h-dvh bg-areia-50">
        <header className="flex items-center gap-3 border-b border-petroleo-100 bg-white px-5 py-4">
          <button
            onClick={() => setMostrarCurriculo(false)}
            aria-label="Voltar"
            className="flex h-9 w-9 items-center justify-center rounded-full text-petroleo-900 hover:bg-petroleo-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div>
            <h1 className="font-display text-lg font-medium text-petroleo-950">
              {curriculoMelhorado ? "Currículo melhorado" : "Seu currículo"}
            </h1>

            <p className="text-xs text-carvao-600">
              {curriculoMelhorado
                ? "Versão profissional gerada pelo Gemini"
                : "Confira suas informações"}
            </p>
          </div>
        </header>

        <section className="px-5 py-8">
          {curriculoMelhorado && (
            <div className="mb-5 rounded-3xl bg-petroleo-950 p-6 text-areia-50">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                  <Sparkles className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-medium text-petroleo-200">
                    CURRÍCULO MELHORADO
                  </p>

                  <h2 className="mt-1 font-display text-xl font-semibold">
                    Pronto para sua próxima oportunidade
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-petroleo-100">
                O Gemini reorganizou suas informações para deixar o currículo
                mais claro, profissional e objetivo.
              </p>
            </div>
          )}

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="border-b border-petroleo-100 pb-5">
              <h2 className="font-display text-2xl font-bold text-petroleo-950">
                {nome || "Seu Nome"}
              </h2>

              <div className="mt-2 space-y-1 text-sm text-carvao-600">
                {cidade && <p>{cidade}</p>}
                {telefone && <p>{telefone}</p>}
              </div>
            </div>

            {objetivo && (
              <div className="mt-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-petroleo-800">
                  Objetivo profissional
                </h3>

                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-carvao-700">
                  {objetivo}
                </p>
              </div>
            )}

            {experiencia && (
              <div className="mt-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-petroleo-800">
                  Experiência profissional
                </h3>

                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-carvao-700">
                  {experiencia}
                </p>
              </div>
            )}

            {formacao && (
              <div className="mt-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-petroleo-800">
                  Formação
                </h3>

                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-carvao-700">
                  {formacao}
                </p>
              </div>
            )}

            {habilidades && (
              <div className="mt-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-petroleo-800">
                  Habilidades
                </h3>

                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-carvao-700">
                  {habilidades}
                </p>
              </div>
            )}
          </div>

          {erro && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-800">
              {erro}
            </div>
          )}

          {!curriculoMelhorado && (
            <div className="mt-5 rounded-2xl bg-petroleo-100 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-petroleo-800" />

                <p className="text-sm text-petroleo-950">
                  Seu currículo está preenchido. Agora podemos pedir ao Gemini
                  para melhorar automaticamente o texto.
                </p>
              </div>

              <button
                type="button"
                onClick={melhorarComIA}
                disabled={melhorando}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-petroleo-900 px-5 py-4 text-sm font-semibold text-white hover:bg-petroleo-800 disabled:opacity-60"
              >
                <Sparkles className="h-4 w-4" />

                {melhorando
                  ? "O Gemini está melhorando..."
                  : "Melhorar meu currículo com IA"}
              </button>
            </div>
          )}

          {curriculoMelhorado && (
            <div className="mt-5 rounded-2xl bg-petroleo-100 p-4">
              <p className="text-sm font-semibold text-petroleo-950">
                ✓ Currículo melhorado pelo Gemini
              </p>

              <p className="mt-2 text-sm leading-relaxed text-carvao-700">
                A versão acima foi gerada a partir das informações fornecidas
                por você.
              </p>
            </div>
          )}

          <button
            onClick={() => setMostrarCurriculo(false)}
            className="mt-5 w-full rounded-2xl border border-petroleo-200 bg-white px-5 py-4 text-sm font-semibold text-petroleo-900 hover:bg-petroleo-50"
          >
            Editar currículo
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-areia-50">
      <header className="flex items-center gap-3 border-b border-petroleo-100 bg-white px-5 py-4">
        <Link
          href="/trabalho"
          aria-label="Voltar"
          className="flex h-9 w-9 items-center justify-center rounded-full text-petroleo-900 hover:bg-petroleo-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-petroleo-100 text-petroleo-900">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <h1 className="font-display text-lg font-medium text-petroleo-950">
              Montar meu currículo
            </h1>

            <p className="text-xs text-carvao-600">
              Preencha seus dados passo a passo
            </p>
          </div>
        </div>
      </header>

      <section className="px-5 py-8">
        <div className="rounded-3xl bg-petroleo-950 p-6 text-areia-50">
          <p className="text-sm font-medium text-petroleo-200">
            SEU PRÓXIMO PASSO
          </p>

          <h2 className="mt-2 font-display text-2xl font-semibold">
            Vamos montar seu currículo
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-petroleo-100">
            Não precisa ter experiência com currículo. Preencha o que souber e
            podemos melhorar depois.
          </p>
        </div>

        <form className="mt-6 space-y-5">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-petroleo-950">
              <User className="h-4 w-4" />
              Nome completo
            </label>

            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              className="w-full rounded-2xl border border-petroleo-100 bg-white px-4 py-3 text-sm outline-none focus:border-petroleo-500"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-petroleo-950">
              <MapPin className="h-4 w-4" />
              Cidade e estado
            </label>

            <input
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Ex.: Cabo Frio - RJ"
              className="w-full rounded-2xl border border-petroleo-100 bg-white px-4 py-3 text-sm outline-none focus:border-petroleo-500"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-petroleo-950">
              <Phone className="h-4 w-4" />
              Telefone
            </label>

            <input
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(00) 00000-0000"
              className="w-full rounded-2xl border border-petroleo-100 bg-white px-4 py-3 text-sm outline-none focus:border-petroleo-500"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-petroleo-950">
              <Briefcase className="h-4 w-4" />
              Objetivo profissional
            </label>

            <textarea
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              placeholder="Ex.: Procuro uma oportunidade na área administrativa."
              rows={3}
              className="w-full resize-none rounded-2xl border border-petroleo-100 bg-white px-4 py-3 text-sm outline-none focus:border-petroleo-500"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-petroleo-950">
              <Briefcase className="h-4 w-4" />
              Experiência profissional
            </label>

            <textarea
              value={experiencia}
              onChange={(e) => setExperiencia(e.target.value)}
              placeholder="Conte onde trabalhou e quais atividades fazia."
              rows={4}
              className="w-full resize-none rounded-2xl border border-petroleo-100 bg-white px-4 py-3 text-sm outline-none focus:border-petroleo-500"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-petroleo-950">
              <GraduationCap className="h-4 w-4" />
              Formação
            </label>

            <textarea
              value={formacao}
              onChange={(e) => setFormacao(e.target.value)}
              placeholder="Ex.: Ensino Médio completo."
              rows={3}
              className="w-full resize-none rounded-2xl border border-petroleo-100 bg-white px-4 py-3 text-sm outline-none focus:border-petroleo-500"
            />
          </div>

          <div>
            <label className="mb-2 text-sm font-medium text-petroleo-950">
              Habilidades
            </label>

            <textarea
              value={habilidades}
              onChange={(e) => setHabilidades(e.target.value)}
              placeholder="Ex.: Atendimento ao cliente, informática, vendas..."
              rows={3}
              className="w-full resize-none rounded-2xl border border-petroleo-100 bg-white px-4 py-3 text-sm outline-none focus:border-petroleo-500"
            />
          </div>

          <button
            type="button"
            onClick={gerarCurriculo}
            className="w-full rounded-2xl bg-petroleo-900 px-5 py-4 text-sm font-semibold text-white hover:bg-petroleo-800"
          >
            Gerar meu currículo
          </button>
        </form>
      </section>
    </main>
  );
}
