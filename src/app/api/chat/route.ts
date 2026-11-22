import { NextRequest, NextResponse } from "next/server";
import { getPersonaById } from "@/lib/personas";
import { saveMessage, getConversationMessages } from "@/lib/db";
import { generatePersonaResponse, ChatMessage } from "@/lib/llm-providers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { personaId, message, conversationId } = body;

    if (!personaId || !message) {
      return NextResponse.json(
        { error: "Missing required fields: personaId, message" },
        { status: 400 }
      );
    }

    const persona = getPersonaById(personaId);
    const convId = conversationId || `conv_${personaId}_${Date.now()}`;

    // Save user message in SQLite
    saveMessage({
      conversationId: convId,
      senderId: "user",
      senderName: "User",
      role: "user",
      content: message,
    });

    // Fetch conversation history
    const history = getConversationMessages(convId);
    const chatMessages: ChatMessage[] = history.map((m) => ({
      role: m.role as any,
      content: m.content,
      name: m.sender_name,
    }));

    // Generate persona response with tools
    const response = await generatePersonaResponse(persona, chatMessages);

    // Save persona response in SQLite
    const savedAssistantMsg = saveMessage({
      conversationId: convId,
      senderId: persona.id,
      senderName: persona.name,
      role: "assistant",
      content: response.content,
      toolCalls: response.toolCalls,
    });

    return NextResponse.json({
      conversationId: convId,
      message: savedAssistantMsg,
      modelUsed: response.modelUsed,
      provider: response.provider,
      isMock: response.isMock,
    });
  } catch (err: any) {
    console.error("[API /api/chat] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
