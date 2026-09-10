import { createClient } from "@/lib/supabase/browser";

export async function buscarProgressoUsuario(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_checklist")
    .select(`
      id,
      concluido,
      concluido_em,
      checklist_items (
        id,
        titulo,
        descricao,
        ordem,
        pilar_id,
        pilares (
          id,
          codigo,
          titulo,
          descricao,
          ordem
        )
      )
    `)
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data;
}