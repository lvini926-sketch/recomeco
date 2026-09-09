export const SUGESTOES_RAPIDAS = [
  "Como tirar documentos?",
  "Achar Escritório Social",
  "Ajuda com visitas",
  "Direitos da família",
] as const;

export type PilarId =
  | "documentacao"
  | "trabalho"
  | "assistencia"
  | "moradia"
  | "saude";

export interface ChecklistItemData {
  id: string;
  titulo: string;
  concluido: boolean;
}

export interface PilarData {
  id: PilarId;
  titulo: string;
  descricao: string;
  itens: ChecklistItemData[];
}

// Conteúdo de exemplo para o protótipo — em produção viria da API,
// possivelmente variando conforme o perfil (familiar / egresso).
export const PILARES: PilarData[] = [
  {
    id: "documentacao",
    titulo: "Documentação",
    descricao: "RG, CPF, certidões e comprovantes",
    itens: [
      { id: "doc-1", titulo: "Emitir 2ª via do RG", concluido: true },
      { id: "doc-2", titulo: "Regularizar CPF na Receita", concluido: true },
      { id: "doc-3", titulo: "Solicitar certidão de antecedentes", concluido: false },
      { id: "doc-4", titulo: "Atualizar comprovante de residência", concluido: false },
    ],
  },
  {
    id: "trabalho",
    titulo: "Trabalho",
    descricao: "Qualificação e recolocação profissional",
    itens: [
      { id: "trab-1", titulo: "Cadastrar currículo no Sine", concluido: true },
      { id: "trab-2", titulo: "Buscar vagas para egressos", concluido: false },
      { id: "trab-3", titulo: "Inscrever-se em curso profissionalizante", concluido: false },
    ],
  },
  {
    id: "assistencia",
    titulo: "Assistência",
    descricao: "Suporte social, jurídico e psicológico",
    itens: [
      { id: "ass-1", titulo: "Conhecer o Escritório Social da região", concluido: true },
      { id: "ass-2", titulo: "Agendar atendimento no CRAS", concluido: false },
      { id: "ass-3", titulo: "Buscar apoio jurídico gratuito", concluido: false },
    ],
  },
  {
    id: "moradia",
    titulo: "Moradia",
    descricao: "Onde morar com segurança e estabilidade",
    itens: [
      { id: "mor-1", titulo: "Levantar programas de auxílio-moradia", concluido: false },
      { id: "mor-2", titulo: "Organizar documentos para locação", concluido: false },
    ],
  },
];

export function progressoDoPilar(pilar: PilarData): number {
  if (pilar.itens.length === 0) return 0;
  const feitos = pilar.itens.filter((i) => i.concluido).length;
  return Math.round((feitos / pilar.itens.length) * 100);
}

export function progressoGeral(pilares: PilarData[]): number {
  const todos = pilares.flatMap((p) => p.itens);
  if (todos.length === 0) return 0;
  const feitos = todos.filter((i) => i.concluido).length;
  return Math.round((feitos / todos.length) * 100);
}
