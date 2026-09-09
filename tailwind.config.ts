import type { Config } from "tailwindcss";

// Sistema de tokens do RECOMEÇO
// Paleta pensada para transmitir segurança e dignidade, sem estética
// carcerária ou institucional-fria. O petróleo profundo ancora a marca
// (confiança, estabilidade); o âmbar quebra o peso e traz a ideia de
// "recomeço/amanhecer"; o sálvia é usado só para progresso/conquista.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        petroleo: {
          950: "#0A2E33", // fundo escuro / headers
          900: "#0E3A41",
          700: "#175361",
          500: "#2C7A82", // ações primárias
          300: "#7FADB2",
          100: "#DCEAEC",
        },
        aurora: {
          // acento quente — "amanhecer", não é o terracota-clichê
          600: "#C97B3D",
          500: "#DDA24C",
          200: "#F3DFB8",
        },
        salvia: {
          600: "#5F8B7A", // progresso / conquistas
          200: "#D9E6DE",
        },
        areia: {
          50: "#FBF8F3", // fundo base, quente, não é o cream-padrão
          100: "#F4EEE3",
          200: "#E9E0D0",
        },
        carvao: {
          900: "#22282A", // texto principal, preto suavizado
          600: "#565F60",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        acolhedor: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
