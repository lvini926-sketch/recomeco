import { createClient } from "@/lib/supabase/browser";

export async function criarConversa(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("conversations")
    .insert({
      user_id: userId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function salvarMensagem(
  conversationId: string,
  autor: "usuario" | "atendo",
  texto: string
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      autor,
      texto,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function buscarMensagens(conversationId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}