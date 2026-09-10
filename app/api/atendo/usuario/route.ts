import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json(
      { autenticado: false },
      { status: 401 }
    );
  }

  return NextResponse.json({
    autenticado: true,
    usuario: {
      id: user.id,
      email: user.email,
    },
  });
}