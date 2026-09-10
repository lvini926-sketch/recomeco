"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { jsPDF } from "jspdf";

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
  const [carregandoGemini, setCarregandoGemini] = useState(false);
  const [erro, setErro] = useState("");

  async function melhorarCurriculo() {
    setErro("");
    setCarregandoGemini(true);

    try {
      const response = await fetch("/api/curriculo", {
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

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.erro || "Erro ao melhorar currículo.");
      }

      setObjetivo(resultado.objetivo || objetivo);
      setExperiencia(resultado.experiencia || experiencia);
      setFormacao(resultado.formacao || formacao);
      setHabilidades(resultado.habilidades || habilidades);
      setCurriculoMelhorado(true);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível melhorar o currículo."
      );
    } finally {
      setCarregandoGemini(false);
    }
  }

  function gerarPDF() {
    const pdf = new jsPDF();
    const margem = 20;
    const largura = 170;
    let y = 20;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text(nome || "Currículo", margem, y);

    y += 9;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    const contato = [cidade, telefone].filter(Boolean).join(" • ");

    if (contato) {
      pdf.text(contato, margem, y);
      y += 12;
    } else {
      y += 5;
    }

    function secao(titulo: string, texto: string) {
      if (!texto.trim()) return;

      y += 5;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text(titulo, margem, y);

      y += 7;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);

      const linhas = pdf.splitTextToSize(texto, largura);

      for (const linha of linhas) {
        if (y > 275) {
          pdf.addPage();
          y = 20;
        }

        pdf.text(linha, margem, y);
        y += 5;
      }
    }

    secao("OBJETIVO PROFISSIONAL", objetivo);
    secao("EXPERIÊNCIA PROFISSIONAL", experiencia);
    secao("FORMAÇÃO", formacao);
    secao("HABILIDADES", habilidades);

    pdf.save(
      `curriculo-${(nome || "recomeco")
        .toLowerCase()
        .replace(/[^a-z0-9]+/gi, "-")
        .replace(/^-|-$/g, "")}.pdf`
    );
  }

  async function compartilhar() {
    const texto = `Olá! Estou compartilhando meu currículo pelo RECOMEÇO.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Currículo - ${nome || "RECOMEÇO"}`,
          text: texto,
        });
        return;
      } catch {
        return;
      }
    }

    const whatsapp = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(whatsapp, "_blank");
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

        <div>
          <h1 className="font-display text-lg font-medium text-petroleo-950">
            Meu currículo
          </h1>
          <p className="text-xs text-carvao-600">
            Prepare seu próximo passo profissional
          </p>
        </div>
      </header>

      <section className="px-5 py-8">
        {!mostrarCurriculo ? (
          <>
            <div className="rounded-3xl bg-petroleo-950 p-6 text-areia-50">
              <p className="text-sm font-medium text-petroleo-200">
                SEU CURRÍCULO
              </p>

              <h2 className="mt-2 font-display text-2xl font-semibold">
                Vamos montar seu currículo
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-petroleo-100">
                Preencha com suas informações. Depois, o RECOMEÇO poderá
                ajudar a melhorar a apresentação do seu currículo.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome completo"
                className="w-full rounded-2xl border border-petroleo-100 bg-white px-4 py-4 text-sm outline-none focus:border-petroleo-400"
              />

              <input
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                placeholder="Cidade / Estado"
                className="w-full rounded-2xl border border-petroleo-100 bg-white px-4 py-4 text-sm outline-none focus:border-petroleo-400"
              />

              <input
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="Telefone / WhatsApp"
                className="w-full rounded-2xl border border-petroleo-100 bg-white px-4 py-4 text-sm outline-none focus:border-petroleo-400"
              />

              <textarea
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                placeholder="Objetivo profissional"
                rows={4}
                className="w-full rounded-2xl border border-petroleo-100 bg-white px-4 py-4 text-sm outline-none focus:border-petroleo-400"
              />

              <textarea
                value={experiencia}
                onChange={(e) => setExperiencia(e.target.value)}
                placeholder="Experiência profissional"
                rows={5}
                className="w-full rounded-2xl border border-petroleo-100 bg-white px-4 py-4 text-sm outline-none focus:border-petroleo-400"
              />

              <textarea
                value={formacao}
                onChange={(e) => setFormacao(e.target.value)}
                placeholder="Formação"
                rows={4}
                className="w-full rounded-2xl border border-petroleo-100 bg-white px-4 py-4 text-sm outline-none focus:border-petroleo-400"
              />

              <textarea
                value={habilidades}
                onChange={(e) => setHabilidades(e.target.value)}
                placeholder="Habilidades"
                rows={4}
                className="w-full rounded-2xl border border-petroleo-100 bg-white px-4 py-4 text-sm outline-none focus:border-petroleo-400"
              />
            </div>

            <button
              type="button"
              onClick={() => setMostrarCurriculo(true)}
              className="mt-6 w-full rounded-2xl bg-petroleo-900 px-5 py-4 text-sm font-semibold text-white hover:bg-petroleo-800"
            >
              Visualizar meu currículo
            </button>
          </>
        ) : (
          <>
            <div className="rounded-3xl border border-petroleo-100 bg-white p-6">
              <h2 className="font-display text-2xl font-semibold text-petroleo-950">
                {nome || "Seu currículo"}
              </h2>

              {(cidade || telefone) && (
                <p className="mt-2 text-sm text-carvao-600">
                  {[cidade, telefone].filter(Boolean).join(" • ")}
                </p>
              )}

              {objetivo && (
                <div className="mt-6">
                  <h3 className="font-semibold text-petroleo-950">
                    Objetivo profissional
                  </h3>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-carvao-700">
                    {objetivo}
                  </p>
                </div>
              )}

              {experiencia && (
                <div className="mt-6">
                  <h3 className="font-semibold text-petroleo-950">
                    Experiência profissional
                  </h3>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-carvao-700">
                    {experiencia}
                  </p>
                </div>
              )}

              {formacao && (
                <div className="mt-6">
                  <h3 className="font-semibold text-petroleo-950">
                    Formação
                  </h3>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-carvao-700">
                    {formacao}
                  </p>
                </div>
              )}

              {habilidades && (
                <div className="mt-6">
                  <h3 className="font-semibold text-petroleo-950">
                    Habilidades
                  </h3>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-carvao-700">
                    {habilidades}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-3">
              {!curriculoMelhorado && (
                <button
                  type="button"
                  onClick={melhorarCurriculo}
                  disabled={carregandoGemini}
                  className="w-full rounded-2xl bg-petroleo-900 px-5 py-4 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {carregandoGemini
                    ? "O Gemini está melhorando..."
                    : "Melhorar currículo com IA"}
                </button>
              )}

              {erro && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {erro}
                </div>
              )}

              {curriculoMelhorado && (
                <div className="rounded-2xl border border-petroleo-200 bg-petroleo-50 p-4 text-sm text-petroleo-900">
                  ✓ Versão profissional gerada pelo Gemini
                </div>
              )}

              <button
                type="button"
                onClick={gerarPDF}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-petroleo-900 px-5 py-4 text-sm font-semibold text-white hover:bg-petroleo-800"
              >
                <Download className="h-5 w-5" />
                Baixar currículo em PDF
              </button>

              <button
                type="button"
                onClick={compartilhar}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-petroleo-200 bg-white px-5 py-4 text-sm font-semibold text-petroleo-900 hover:bg-petroleo-50"
              >
                <Share2 className="h-5 w-5" />
                Compartilhar currículo
              </button>

              <button
                type="button"
                onClick={() => setMostrarCurriculo(false)}
                className="w-full rounded-2xl px-5 py-3 text-sm font-medium text-carvao-600 hover:bg-white"
              >
                Editar currículo
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
