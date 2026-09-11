import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { erro: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const nome = typeof body.nome === "string" ? body.nome.trim() : "";
    const objetivo =
      typeof body.objetivo === "string" ? body.objetivo.trim() : "";

    const experiencia = Array.isArray(body.experiencia)
      ? body.experiencia
      : [];

    const formacao = Array.isArray(body.formacao) ? body.formacao : [];

    const habilidades = Array.isArray(body.habilidades)
      ? body.habilidades.filter(
          (habilidade: unknown) => typeof habilidade === "string"
        )
      : [];

    if (!objetivo && experiencia.length === 0 && habilidades.length === 0) {
      return NextResponse.json(
        {
          erro: "Preencha pelo menos uma parte do currículo antes de usar a IA.",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY não configurada.");

      return NextResponse.json(
        { erro: "Serviço de IA temporariamente indisponível." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const prompt = `
Você é um assistente de empregabilidade do projeto RECOMEÇO.

Sua função é melhorar a apresentação profissional de um currículo.

REGRAS OBRIGATÓRIAS:
- Não invente experiências profissionais.
- Não invente empresas, cargos, cursos ou habilidades.
- Não crie datas que não foram informadas.
- Não altere fatos fornecidos pelo usuário.
- Não mencione prisão, sistema prisional, antecedentes ou situação jurídica.
- Use português do Brasil.
- Seja profissional, claro, positivo e realista.
- Valorize competências que já aparecem nas informações fornecidas.
- Se uma informação estiver ausente, mantenha-a ausente.
- O objetivo é melhorar a forma de apresentação, não criar informações novas.

DADOS DO CURRÍCULO:

Nome: ${nome}

Objetivo profissional:
${objetivo}

Experiências:
${JSON.stringify(experiencia, null, 2)}

Formações:
${JSON.stringify(formacao, null, 2)}

Habilidades:
${JSON.stringify(habilidades, null, 2)}

Retorne SOMENTE um JSON válido neste formato:

{
  "objetivo_melhorado": "texto",
  "experiencias_melhoradas": [
    {
      "empresa": "texto original",
      "cargo": "texto original",
      "descricao_melhorada": "texto"
    }
  ],
  "habilidades_sugeridas": [
    "habilidade já identificada ou claramente derivada das informações fornecidas"
  ],
  "resumo_profissional": "texto"
}

Não inclua markdown, explicações ou texto fora do JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
    });

    const texto = response.text?.trim();

    if (!texto) {
      return NextResponse.json(
        { erro: "A IA não retornou uma resposta válida." },
        { status: 500 }
      );
    }

    let resultado;

    try {
      resultado = JSON.parse(texto);
    } catch {
      console.error("Resposta inválida da IA:", texto);

      return NextResponse.json(
        { erro: "Não foi possível interpretar a resposta da IA." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      sucesso: true,
      resultado,
    });
  } catch (error) {
    console.error("Erro ao melhorar currículo com IA:", error);

    return NextResponse.json(
      { erro: "Não foi possível melhorar seu currículo agora." },
      { status: 500 }
    );
  }
}