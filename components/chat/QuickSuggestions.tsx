interface QuickSuggestionsProps {
  sugestoes: readonly string[];
  onEscolher: (sugestao: string) => void;
}

export default function QuickSuggestions({
  sugestoes,
  onEscolher,
}: QuickSuggestionsProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1"
      style={{ scrollbarWidth: "none" }}
      aria-label="Sugestões rápidas de pergunta"
    >
      {sugestoes.map((sugestao) => (
        <button
          key={sugestao}
          onClick={() => onEscolher(sugestao)}
          className="shrink-0 whitespace-nowrap rounded-full border border-petroleo-300 bg-white px-4 py-2 text-sm font-medium text-petroleo-900 transition-colors hover:bg-petroleo-100 active:bg-petroleo-100"
        >
          {sugestao}
        </button>
      ))}
    </div>
  );
}
