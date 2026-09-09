import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      nome,
      objetivo,
      experiencia,
      formacao,
      habilidades,
    } = body;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { erro: "Chave do Gemini não configurada no servidor." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
Você é um especialista em recrutamento e elaboração de currículos no Brasil.

Sua tarefa é melhorar o currículo abaixo para deixá-lo mais profissional, claro e objetivo.

REGRAS IMPORTANTES:
- NÃO invente experiências, cargos, empresas, cursos, formação, habilidades ou resultados.
- Preserve os fatos fornecidos pelo candidato.
- Apenas reorganize, corrija e profissionalize a redação.
- Use português brasileiro.
- Não faça referência à situação prisional do candidato.
- Não crie informações que não estejam no texto original.
- Retorne SOMENTE um JSON válido.
- O JSON deve conter exatamente estes campos:
  objetivo
  experiencia
  formacao
  habilidades

DADOS DO CANDIDATO:

Nome: ${nome || ""}

Objetivo:
${objetivo || ""}

Experiência:
${experiencia || ""}

Formação:
${formacao || ""}

Habilidades:
${habilidades || ""}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const texto = response.text;

    if (!texto) {
      return NextResponse.json(
        { erro: "O Gemini não retornou uma resposta." },
        { status: 500 }
      );
    }

    const resultado = JSON.parse(texto);

    return NextResponse.json(resultado);
  } catch (error) {
    console.error("Erro ao melhorar currículo:", error);

    return NextResponse.json(
      { erro: "Não foi possível melhorar o currículo." },
      { status: 500 }
    );
  }
}


