import { NextRequest, NextResponse } from "next/server";
import { skillRegistry } from "@/lib/skill-registry";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const personaId = searchParams.get("personaId");

    const tools = personaId
      ? skillRegistry.getToolsForPersona(personaId)
      : skillRegistry.getAllTools();

    return NextResponse.json({
      total: tools.length,
      tools: tools.map((t) => ({
        name: t.name,
        personaId: t.personaId,
        category: t.category,
        description: t.description,
        parameters: t.parameters,
        isCustom: !!t.isCustom,
        sourcePath: t.sourcePath,
      })),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST triggers reload/scan of /skills folder
export async function POST() {
  try {
    skillRegistry.reload();
    const allTools = skillRegistry.getAllTools();
    return NextResponse.json({
      message: "Skill registry reloaded successfully.",
      total: allTools.length,
      tools: allTools.map((t) => ({
        name: t.name,
        personaId: t.personaId,
        category: t.category,
        isCustom: !!t.isCustom,
      })),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
