import { NextRequest, NextResponse } from "next/server";
import { runSwarmOrchestration } from "@/lib/swarm-engine";
import { getRecentSwarmRuns } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { goal } = body;

    if (!goal || typeof goal !== "string") {
      return NextResponse.json({ error: "Goal string is required" }, { status: 400 });
    }

    const result = await runSwarmOrchestration(goal);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (err: any) {
    console.error("[API /api/swarm] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const runs = getRecentSwarmRuns(15);
    return NextResponse.json({ runs });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
