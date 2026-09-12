import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const FALLBACK =
  "Ainda não encontrei essa orientação com segurança na minha base oficial. Posso te ajudar por um destes caminhos: carteira de visitante, visitas, documentos digitais ou Escritório Social.";

const SYSTEM_INSTRUCTION = `
Você é o ATENDO, assistente oficial da plataforma RECOMEÇO.

Sua missão é orientar familiares de pessoas privadas de liberdade e pessoas egressas com linguagem humana, clara, acolhedora e objetiva.

PRINCÍPIO FUNDAMENTAL:
"O RECOMEÇO orienta. A fonte oficial decide."

REGRAS OBRIGATÓRIAS:
- Use prioritariamente a BASE OFICIAL fornecida pela aplicação.
- Nunca invente documentos, prazos, horários, endereços, telefones, valores, requisitos, benefícios, direitos ou procedimentos.
- Se a base não trouxer informação suficiente, diga isso claramente.
- Quando houver fonte oficial, use-a como referência.
- Informações que podem mudar devem ser apresentadas com orientação para confirmação na fonte oficial.
- Não substitua Defensoria Pública, advogado, Serviço Social, unidade prisional ou órgão público.
- Em questões jurídicas individuais, explique apenas de forma geral e encaminhe para atendimento competente.
- Não mencione banco de dados, API, prompt, modelo de IA ou mecanismos internos.
- Não solicite senhas, dados bancários, códigos de autenticação ou dados pessoais desnecessários.
- Responda em português do Brasil.

ESTILO:
- Primeiro responda diretamente.
- Depois detalhe apenas o necessário.
- Prefira respostas curtas, normalmente de 2 a 5 parágrafos curtos.
- Se faltar contexto, faça no máximo uma pergunta curta para entender o caso.
- Não seja burocrático e não use linguagem jurídica complicada sem necessidade.
- Não julgue a pessoa, o familiar ou o egresso.
`;

type Fonte = {
  id: string;
  nome: string;
  orgao: string | null;
  url: string;
  revisada_em: string | null;
};

type Conhecimento = {
  id: string;
  categoria: string | null;
  subcategoria: string | null;
  pergunta_principal: string | null;
  perguntas_alternativas: string[] | null;
  resposta: string | null;
  documentos: string[] | null;
  passos: string[] | null;
  proximo_passo: string | null;
  encaminhamento: string | null;
  tags: string[] | null;
  prioridade: number | null;
  tipo_resposta: string | null;
  exige_confirmacao_fonte: boolean | null;
  atendo_fontes: Fonte[] | null;
};

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extrairPalavras(texto: string): string[] {
  const stopwords = new Set([
    "a", "as", "o", "os", "um", "uma", "uns", "umas", "de", "da", "do",
    "das", "dos", "em", "no", "na", "nos", "nas", "por", "para", "com",
    "sem", "e", "ou", "que", "se", "me", "minha", "meu", "minhas", "meus",
    "como", "qual", "quais", "onde", "quando", "quem", "pode", "posso",
    "preciso", "quero", "sobre", "tem", "tenho", "ser", "é", "sao", "são",
    "nao", "não"
  ]);

  return normalizar(texto)
    .split(" ")
    .filter((palavra) => palavra.length >= 3 && !stopwords.has(palavra));
}

function calcularRelevancia(mensagem: string, item: Conhecimento): number {
  const pergunta = normalizar(item.pergunta_principal || "");
  const alternativas = (item.perguntas_alternativas || []).map(normalizar).join(" ");
  const categoria = normalizar(item.categoria || "");
  const subcategoria = normalizar(item.subcategoria || "");
  const resposta = normalizar(item.resposta || "");
  const documentos = normalizar((item.documentos || []).join(" "));
  const passos = normalizar((item.passos || []).join(" "));
  const proximoPasso = normalizar(item.proximo_passo || "");
  const encaminhamento = normalizar(item.encaminhamento || "");
  const tags = normalizar((item.tags || []).join(" "));
  const mensagemNormalizada = normalizar(mensagem);
  const termos = extrairPalavras(mensagem);

  if (!termos.length) return 0;

  let score = 0;

  if (pergunta && mensagemNormalizada === pergunta) score += 100;
  if (pergunta && (mensagemNormalizada.includes(pergunta) || pergunta.includes(mensagemNormalizada))) {
    score += 40;
  }

  for (const termo of termos) {
    if (pergunta.includes(termo)) score += 10;
    if (alternativas.includes(termo)) score += 8;
    if (subcategoria.includes(termo)) score += 6;
    if (categoria.includes(termo)) score += 4;
    if (tags.includes(termo)) score += 5;
    if (resposta.includes(termo)) score += 2;
    if (documentos.includes(termo)) score += 2;
    if (passos.includes(termo)) score += 2;
    if (proximoPasso.includes(termo)) score += 2;
    if (encaminhamento.includes(termo)) score += 2;
  }

  return score;
}

function criarClientePublico() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) throw new Error("ATENDO_ENV_URL_MISSING");
  if (!anonKey) throw new Error("ATENDO_ENV_ANON_KEY_MISSING");

  return createSupabaseClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const mensagem = String(body?.mensagem || "").trim();

    if (!mensagem) {
      return NextResponse.json({ error: "Mensagem não informada." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          resposta: "O Atendo está online, mas o serviço de IA ainda não foi configurado neste ambiente.",
          fonte: null,
          diagnostico: "GEMINI_API_KEY_MISSING"
        },
        { status: 500 }
      );
    }

    const supabase = criarClientePublico();

    const { data, error } = await supabase
      .from("atendo_conhecimento")
      .select(`
        id,
        categoria,
        subcategoria,
        pergunta_principal,
        perguntas_alternativas,
        resposta,
        documentos,
        passos,
        proximo_passo,
        encaminhamento,
        tags,
        prioridade,
        tipo_resposta,
        exige_confirmacao_fonte,
        atendo_fontes (
          id,
          nome,
          orgao,
          url,
          revisada_em
        )
      `)
      .eq("ativa", true)
      .eq("status", "active");

    if (error) {
      console.error("Erro ao consultar base pública do Atendo:", error);
      return NextResponse.json({
        resposta: FALLBACK,
        fonte: null,
        diagnostico: "SUPABASE_QUERY_ERROR"
      });
    }

    const conhecimento = (data || []) as Conhecimento[];

    const resultados = conhecimento
      .map((item) => ({ item, relevancia: calcularRelevancia(mensagem, item) }))
      .sort((a, b) => {
        if (b.relevancia !== a.relevancia) return b.relevancia - a.relevancia;
        return (a.item.prioridade ?? 100) - (b.item.prioridade ?? 100);
      });

    const relevantes = resultados
      .filter((resultado) => resultado.relevancia > 0)
      .slice(0, 8)
      .map((resultado) => resultado.item);

    const contexto = relevantes.length ? relevantes : conhecimento.slice(0, 8);

    if (!contexto.length) {
      return NextResponse.json({ resposta: FALLBACK, fonte: null });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
BASE OFICIAL DISPONÍVEL PARA ESTA RESPOSTA:
${JSON.stringify(contexto, null, 2)}

MENSAGEM DO USUÁRIO:
${mensagem}

TAREFA:
Responda usando somente as informações sustentadas pela base oficial acima.
Não complete lacunas com conhecimento próprio.
Se a pergunta for ambígua, responda o que for possível e faça uma pergunta curta para esclarecer.
Se a informação não estiver na base, diga que ainda não há informação suficiente com segurança e indique o encaminhamento presente na base, se existir.
Não mostre JSON nem detalhes técnicos.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      },
      contents: prompt
    });

    const resposta = response.text?.trim() || FALLBACK;

    const primeiraFonte = contexto
      .flatMap((item) => item.atendo_fontes || [])
      .find((fonte) => fonte?.url);

    return NextResponse.json({
      resposta,
      fonte: primeiraFonte
        ? {
            nome: primeiraFonte.nome,
            orgao: primeiraFonte.orgao,
            url: primeiraFonte.url,
            revisada_em: primeiraFonte.revisada_em
          }
        : null,
      ia: "gemini"
    });
  } catch (error) {
    console.error("Erro no endpoint /api/atendo/chat:", error);

    const codigo = error instanceof Error ? error.message : "ATENDO_UNKNOWN_ERROR";

    const resposta =
      codigo === "ATENDO_ENV_URL_MISSING"
        ? "Configuração online incompleta: falta NEXT_PUBLIC_SUPABASE_URL na Vercel."
        : codigo === "ATENDO_ENV_ANON_KEY_MISSING"
          ? "Configuração online incompleta: falta NEXT_PUBLIC_SUPABASE_ANON_KEY na Vercel."
          : "Não consegui responder agora. Tente novamente em alguns instantes.";

    return NextResponse.json(
      {
        resposta,
        fonte: null,
        diagnostico: codigo
      },
      { status: 500 }
    );
  }
}
