"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export default function AuthPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [modo, setModo] = useState<"entrar" | "criar">("entrar");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviar() {
    setCarregando(true);
    setMensagem("");

    if (modo === "criar") {
      const { error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            nome,
          },
        },
      });

      if (error) {
        setMensagem(error.message);
      } else {
        setMensagem(
          "Cadastro realizado. Verifique seu e-mail para confirmar a conta."
        );
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) {
        setMensagem(error.message);
      } else {
        window.location.href = "/painel";
      }
    }

    setCarregando(false);
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-petroleo-950 px-5 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold text-petroleo-950">
            RECOMEÇO
          </h1>

          <p className="mt-2 text-sm text-carvao-600">
            {modo === "entrar"
              ? "Entre para continuar seu caminho."
              : "Crie sua conta para guardar seu progresso."}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {modo === "criar" && (
            <div>
              <label className="text-sm font-medium text-carvao-700">
                Seu nome
              </label>

              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Como podemos te chamar?"
                className="mt-1 w-full rounded-xl border border-petroleo-200 px-4 py-3 outline-none focus:border-petroleo-600"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-carvao-700">
              E-mail
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="mt-1 w-full rounded-xl border border-petroleo-200 px-4 py-3 outline-none focus:border-petroleo-600"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-carvao-700">
              Senha
            </label>

            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Sua senha"
              className="mt-1 w-full rounded-xl border border-petroleo-200 px-4 py-3 outline-none focus:border-petroleo-600"
            />
          </div>

          <button
            type="button"
            onClick={enviar}
            disabled={carregando}
            className="w-full rounded-xl bg-petroleo-900 px-5 py-3 font-semibold text-white transition hover:bg-petroleo-800 disabled:opacity-60"
          >
            {carregando
              ? "Aguarde..."
              : modo === "entrar"
                ? "Entrar"
                : "Criar minha conta"}
          </button>

          {mensagem && (
            <div className="rounded-xl bg-petroleo-50 p-4 text-sm text-petroleo-900">
              {mensagem}
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setModo(modo === "entrar" ? "criar" : "entrar");
              setMensagem("");
            }}
            className="w-full py-2 text-sm font-medium text-petroleo-700"
          >
            {modo === "entrar"
              ? "Ainda não tenho uma conta"
              : "Já tenho uma conta"}
          </button>
        </div>
      </div>
    </main>
  );
}