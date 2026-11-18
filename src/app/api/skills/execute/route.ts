import { NextRequest, NextResponse } from "next/server";
import { skillRegistry } from "@/lib/skill-registry";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toolName, args } = body;

    if (!toolName) {
      return NextResponse.json({ error: "Missing toolName" }, { status: 400 });
    }

    const result = await skillRegistry.executeTool(toolName, args || {});
    return NextResponse.json({
      toolName,
      status: "success",
      result,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
