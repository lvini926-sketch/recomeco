interface ChecklistItemProps {
  titulo: string;
  concluido: boolean;
  onToggle: () => void;
}

export default function ChecklistItem({
  titulo,
  concluido,
  onToggle,
}: ChecklistItemProps) {
  return (
    <li>
      <button
        onClick={onToggle}
        aria-pressed={concluido}
        className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-petroleo-100/60"
      >
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            concluido
              ? "border-salvia-600 bg-salvia-600"
              : "border-petroleo-300 bg-white"
          }`}
        >
          {concluido && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
        </span>
        <span
          className={`text-sm ${
            concluido
              ? "text-carvao-600 line-through decoration-carvao-600/40"
              : "text-carvao-900"
          }`}
        >
          {titulo}
        </span>
      </button>
    </li>
  );
}
