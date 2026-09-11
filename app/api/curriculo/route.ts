import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Experiencia = {
  empresa?: string;
  cargo?: string;
  descricao?: string;
  inicio?: string;
  fim?: string;
};

type Formacao = {
  instituicao?: string;
  curso?: string;
  inicio?: string;
  fim?: string;
};

// ==========================================
// GET — CARREGAR CURRÍCULO DO USUÁRIO
// ==========================================
export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { erro: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const { data: curriculo, error: curriculoError } = await supabase
      .from("curriculos")
      .select("id, objetivo, created_at, updated_at")
      .eq("user_id", user.id)
      .maybeSingle();

    if (curriculoError) {
      console.error("Erro ao buscar currículo:", curriculoError);

      return NextResponse.json(
        { erro: "Não foi possível carregar seu currículo." },
        { status: 500 }
      );
    }

    if (!curriculo) {
      return NextResponse.json({
        encontrado: false,
        curriculo: null,
        experiencia: [],
        formacao: [],
        habilidades: [],
      });
    }

    const [
      experienciasResult,
      formacoesResult,
      habilidadesResult,
    ] = await Promise.all([
      supabase
        .from("experiencias")
        .select("id, empresa, cargo, descricao, inicio, fim")
        .eq("curriculo_id", curriculo.id)
        .order("inicio", { ascending: false }),

      supabase
        .from("formacoes")
        .select("id, instituicao, curso, inicio, fim")
        .eq("curriculo_id", curriculo.id)
        .order("inicio", { ascending: false }),

      supabase
        .from("habilidades")
        .select("id, nome")
        .eq("curriculo_id", curriculo.id)
        .order("created_at", { ascending: true }),
    ]);

    if (
      experienciasResult.error ||
      formacoesResult.error ||
      habilidadesResult.error
    ) {
      console.error("Erro ao carregar dados do currículo:", {
        experiencias: experienciasResult.error,
        formacoes: formacoesResult.error,
        habilidades: habilidadesResult.error,
      });

      return NextResponse.json(
        { erro: "Não foi possível carregar todos os dados do currículo." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      encontrado: true,
      curriculo,
      experiencia: experienciasResult.data || [],
      formacao: formacoesResult.data || [],
      habilidades: (habilidadesResult.data || []).map(
        (habilidade) => habilidade.nome
      ),
    });
  } catch (error) {
    console.error("Erro ao carregar currículo:", error);

    return NextResponse.json(
      { erro: "Erro interno ao carregar currículo." },
      { status: 500 }
    );
  }
}

// ==========================================
// POST — SALVAR / ATUALIZAR CURRÍCULO
// ==========================================
export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { erro: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const objetivo =
      typeof body.objetivo === "string" ? body.objetivo.trim() : "";

    const experiencias: Experiencia[] = Array.isArray(body.experiencia)
      ? body.experiencia
      : [];

    const formacoes: Formacao[] = Array.isArray(body.formacao)
      ? body.formacao
      : [];

    const habilidades: string[] = Array.isArray(body.habilidades)
      ? body.habilidades
          .filter((habilidade: unknown) => typeof habilidade === "string")
          .map((habilidade: string) => habilidade.trim())
          .filter(Boolean)
      : [];

    // 1. Procurar currículo existente
    const { data: curriculoExistente, error: buscaError } = await supabase
      .from("curriculos")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (buscaError) {
      console.error("Erro ao buscar currículo:", buscaError);

      return NextResponse.json(
        { erro: "Não foi possível localizar seu currículo." },
        { status: 500 }
      );
    }

    let curriculoId: string;

    // 2. Criar ou atualizar currículo
    if (curriculoExistente) {
      curriculoId = curriculoExistente.id;

      const { error: updateError } = await supabase
        .from("curriculos")
        .update({
          objetivo,
          updated_at: new Date().toISOString(),
        })
        .eq("id", curriculoId);

      if (updateError) {
        console.error("Erro ao atualizar currículo:", updateError);

        return NextResponse.json(
          { erro: "Não foi possível atualizar seu currículo." },
          { status: 500 }
        );
      }
    } else {
      const { data: novoCurriculo, error: insertError } = await supabase
        .from("curriculos")
        .insert({
          user_id: user.id,
          objetivo,
        })
        .select("id")
        .single();

      if (insertError || !novoCurriculo) {
        console.error("Erro ao criar currículo:", insertError);

        return NextResponse.json(
          { erro: "Não foi possível criar seu currículo." },
          { status: 500 }
        );
      }

      curriculoId = novoCurriculo.id;
    }

    // 3. Limpar dados relacionados antigos
    const { error: experienciasDeleteError } = await supabase
      .from("experiencias")
      .delete()
      .eq("curriculo_id", curriculoId);

    if (experienciasDeleteError) {
      console.error(
        "Erro ao limpar experiências:",
        experienciasDeleteError
      );

      return NextResponse.json(
        { erro: "Não foi possível atualizar suas experiências." },
        { status: 500 }
      );
    }

    const { error: formacoesDeleteError } = await supabase
      .from("formacoes")
      .delete()
      .eq("curriculo_id", curriculoId);

    if (formacoesDeleteError) {
      console.error("Erro ao limpar formações:", formacoesDeleteError);

      return NextResponse.json(
        { erro: "Não foi possível atualizar sua formação." },
        { status: 500 }
      );
    }

    const { error: habilidadesDeleteError } = await supabase
      .from("habilidades")
      .delete()
      .eq("curriculo_id", curriculoId);

    if (habilidadesDeleteError) {
      console.error("Erro ao limpar habilidades:", habilidadesDeleteError);

      return NextResponse.json(
        { erro: "Não foi possível atualizar suas habilidades." },
        { status: 500 }
      );
    }

    // 4. Salvar experiências
    const experienciasValidas = experiencias
      .filter(
        (experiencia) =>
          experiencia.empresa?.trim() ||
          experiencia.cargo?.trim() ||
          experiencia.descricao?.trim()
      )
      .map((experiencia) => ({
        curriculo_id: curriculoId,
        empresa: experiencia.empresa?.trim() || null,
        cargo: experiencia.cargo?.trim() || null,
        descricao: experiencia.descricao?.trim() || null,
        inicio: experiencia.inicio || null,
        fim: experiencia.fim || null,
      }));

    if (experienciasValidas.length > 0) {
      const { error } = await supabase
        .from("experiencias")
        .insert(experienciasValidas);

      if (error) {
        console.error("Erro ao salvar experiências:", error);

        return NextResponse.json(
          { erro: "Não foi possível salvar suas experiências." },
          { status: 500 }
        );
      }
    }

    // 5. Salvar formações
    const formacoesValidas = formacoes
      .filter(
        (formacao) =>
          formacao.instituicao?.trim() || formacao.curso?.trim()
      )
      .map((formacao) => ({
        curriculo_id: curriculoId,
        instituicao: formacao.instituicao?.trim() || null,
        curso: formacao.curso?.trim() || null,
        inicio: formacao.inicio || null,
        fim: formacao.fim || null,
      }));

    if (formacoesValidas.length > 0) {
      const { error } = await supabase
        .from("formacoes")
        .insert(formacoesValidas);

      if (error) {
        console.error("Erro ao salvar formações:", error);

        return NextResponse.json(
          { erro: "Não foi possível salvar sua formação." },
          { status: 500 }
        );
      }
    }

    // 6. Salvar habilidades
    const habilidadesValidas = habilidades.map((nome) => ({
      curriculo_id: curriculoId,
      nome,
    }));

    if (habilidadesValidas.length > 0) {
      const { error } = await supabase
        .from("habilidades")
        .insert(habilidadesValidas);

      if (error) {
        console.error("Erro ao salvar habilidades:", error);

        return NextResponse.json(
          { erro: "Não foi possível salvar suas habilidades." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      sucesso: true,
      mensagem: "Currículo salvo com sucesso.",
      curriculo_id: curriculoId,
    });
  } catch (error) {
    console.error("Erro na API de currículo:", error);

    return NextResponse.json(
      { erro: "Erro interno ao salvar currículo." },
      { status: 500 }
    );
  }
}
