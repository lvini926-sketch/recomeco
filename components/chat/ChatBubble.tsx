interface ChatBubbleProps {
  autor: "atendo" | "usuario";
  children: React.ReactNode;
}

export default function ChatBubble({ autor, children }: ChatBubbleProps) {
  const doAtendo = autor === "atendo";

  return (
    <div className={`flex ${doAtendo ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] rounded-acolhedor px-4 py-3 text-sm leading-relaxed ${
          doAtendo
            ? "rounded-tl-sm bg-white text-carvao-900 shadow-sm"
            : "rounded-tr-sm bg-petroleo-900 text-areia-50"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
