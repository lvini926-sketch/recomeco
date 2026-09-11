import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const FALLBACK =
  "Ainda não encontrei essa orientação com segurança na minha base oficial. Posso te ajudar por um destes caminhos: carteira de visitante, visitas, documentos digitais ou Escritório Social.";

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
    "nao", "não",
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

  if (
    pergunta &&
    (mensagemNormalizada.includes(pergunta) || pergunta.includes(mensagemNormalizada))
  ) {
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

function perguntaGenericaDeDocumentos(mensagem: string): boolean {
  const texto = normalizar(mensagem);
  const formasGenericas = new Set([
    "documentos",
    "documentacao",
    "como tirar documentos",
    "como tirar documento",
    "preciso de documentos",
    "quero tirar documentos",
  ]);

  return formasGenericas.has(texto);
}

function querDocumentos(mensagem: string): boolean {
  const texto = normalizar(mensagem);
  return /\b(documento|documentos|documentacao|levar|precisa)\b/.test(texto);
}

function querPassos(mensagem: string): boolean {
  const texto = normalizar(mensagem);
  return /\b(como|passo|passos|fazer|tirar|solicitar|pedir)\b/.test(texto);
}

function primeiraParte(texto: string): string {
  const limpa = texto.trim();
  if (!limpa) return "";

  const partes = limpa.split(/\n\s*\n/).filter(Boolean);
  return (partes[0] || limpa).trim();
}

function construirResposta(item: Conhecimento, mensagem: string): string {
  const respostaBase = primeiraParte(item.resposta || "");

  if (!respostaBase) return FALLBACK;

  const blocos: string[] = [respostaBase];

  if (querDocumentos(mensagem)) {
    const documentos = (item.documentos || [])
      .filter((item) => typeof item === "string" && item.trim())
      .slice(0, 5)
      .map((item) => `• ${item.trim()}`);

    if (documentos.length) {
      blocos.push(`Documentos:\n${documentos.join("\n")}`);
    }
  }

  if (querPassos(mensagem)) {
    const passos = (item.passos || [])
      .filter((item) => typeof item === "string" && item.trim())
      .slice(0, 3)
      .map((item, index) => `${index + 1}. ${item.trim()}`);

    if (passos.length) {
      blocos.push(`Próximos passos:\n${passos.join("\n")}`);
    } else if (item.proximo_passo?.trim()) {
      blocos.push(`Próximo passo: ${item.proximo_passo.trim()}`);
    }
  }

  return blocos.join("\n\n").trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const mensagem = String(body?.mensagem || "").trim();

    if (!mensagem) {
      return NextResponse.json({ error: "Mensagem não informada." }, { status: 400 });
    }

    if (perguntaGenericaDeDocumentos(mensagem)) {
      return NextResponse.json({
        resposta:
          "Posso te ajudar com documentação. Qual situação você quer resolver: documentos pessoais, carteira de visitante ou documentos para visita?",
        fonte: null,
      });
    }

    const supabase = await createClient();

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
      console.error("Erro ao consultar base do Atendo:", error);
      return NextResponse.json({ resposta: FALLBACK, fonte: null });
    }

    const conhecimento = (data || []) as Conhecimento[];

    const resultados = conhecimento
      .map((item) => ({
        item,
        relevancia: calcularRelevancia(mensagem, item),
      }))
      .filter((resultado) => resultado.relevancia > 0)
      .sort((a, b) => {
        if (b.relevancia !== a.relevancia) {
          return b.relevancia - a.relevancia;
        }

        return (a.item.prioridade ?? 100) - (b.item.prioridade ?? 100);
      });

    if (!resultados.length) {
      return NextResponse.json({ resposta: FALLBACK, fonte: null });
    }

    const item = resultados[0].item;
    const resposta = construirResposta(item, mensagem);
    const fonte = item.atendo_fontes?.length ? item.atendo_fontes[0] : null;

    return NextResponse.json({
      resposta,
      fonte: fonte
        ? {
            nome: fonte.nome,
            orgao: fonte.orgao,
            url: fonte.url,
            revisada_em: fonte.revisada_em,
          }
        : null,
    });
  } catch (error) {
    console.error("Erro no endpoint /api/atendo/chat:", error);

    return NextResponse.json(
      {
        resposta:
          "Não consegui consultar a base oficial agora. Tente novamente em alguns instantes.",
        fonte: null,
      },
      { status: 500 }
    );
  }
}
