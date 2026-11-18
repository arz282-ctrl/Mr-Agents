"use client";

import React, { useState, useRef, useEffect } from "react";
import { Persona } from "@/lib/personas";
import { PersonaIcon } from "./PersonaIcon";
import {
  ArrowUp,
  Plus,
  Paperclip,
  Wrench,
  Blocks,
  Plug,
  X,
  Check,
  Copy,
  ChevronDown,
  ChevronRight,
  Terminal,
  FileText,
} from "lucide-react";

interface ActiveWorkspaceProps {
  persona: Persona;
  onOpenSkills: () => void;
}

interface MessageItem {
  id: string;
  role: "user" | "assistant";
  senderName: string;
  content: string;
  toolCalls?: {
    name: string;
    args: unknown;
    result?: unknown;
  }[];
  timestamp: number;
}

interface AttachedFile {
  id: string;
  name: string;
  size: number;
}

const MCP_SERVERS = [
  { id: "filesystem", label: "Filesystem" },
  { id: "github", label: "GitHub" },
  { id: "supabase", label: "Supabase" },
  { id: "playwright", label: "Playwright" },
  { id: "context7", label: "Context7 Docs" },
];

const CONNECTORS = [
  { id: "google-drive", label: "Google Drive" },
  { id: "gmail", label: "Gmail" },
  { id: "slack", label: "Slack" },
  { id: "notion", label: "Notion" },
  { id: "linear", label: "Linear" },
];

export function ActiveWorkspace({
  persona,
  onOpenSkills,
}: ActiveWorkspaceProps) {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedTools, setExpandedTools] = useState<Record<string, boolean>>({});

  // Agentic '+' composer menu state
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const [plusSubmenu, setPlusSubmenu] = useState<"root" | "mcp" | "connectors">("root");
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [activeMcps, setActiveMcps] = useState<string[]>([]);
  const [activeConnectors, setActiveConnectors] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const plusMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setConversationId(`conv_${persona.id}_${Date.now()}`);
    setMessages([]);
  }, [persona.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        plusMenuRef.current &&
        !plusMenuRef.current.contains(e.target as Node)
      ) {
        setIsPlusOpen(false);
        setPlusSubmenu("root");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const next: AttachedFile[] = Array.from(files).map((f) => ({
      id: `${f.name}_${Date.now()}_${Math.random()}`,
      name: f.name,
      size: f.size,
    }));
    setAttachedFiles((prev) => [...prev, ...next]);
    e.target.value = "";
    setIsPlusOpen(false);
    setPlusSubmenu("root");
  };

  const toggleMcp = (id: string) => {
    setActiveMcps((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleConnector = (id: string) => {
    setActiveConnectors((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const contextTags: string[] = [];
    if (attachedFiles.length > 0) {
      contextTags.push(`Files: ${attachedFiles.map((f) => f.name).join(", ")}`);
    }
    if (activeMcps.length > 0) {
      contextTags.push(`MCP: ${activeMcps.join(", ")}`);
    }
    if (activeConnectors.length > 0) {
      contextTags.push(`Connectors: ${activeConnectors.join(", ")}`);
    }

    const displayContent = inputValue.trim();
    const payloadMessage =
      contextTags.length > 0
        ? `${displayContent}\n\n[Attached Context: ${contextTags.join(" | ")}]`
        : displayContent;

    const userMsg: MessageItem = {
      id: `usr_${Date.now()}`,
      role: "user",
      senderName: "You",
      content: displayContent,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setAttachedFiles([]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personaId: persona.id,
          message: payloadMessage,
          conversationId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate response");

      const assistantMsg: MessageItem = {
        id: data.message?.id || `ast_${Date.now()}`,
        role: "assistant",
        senderName: persona.name,
        content: data.message?.content || "Task processed.",
        toolCalls: data.message?.toolCalls
          ? JSON.parse(
              typeof data.message.toolCalls === "string"
                ? data.message.toolCalls
                : JSON.stringify(data.message.toolCalls)
            )
          : undefined,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Execution failed";
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: "assistant",
          senderName: persona.name,
          content: `Failed to execute: ${message}`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const hasContextChips =
    attachedFiles.length > 0 ||
    activeMcps.length > 0 ||
    activeConnectors.length > 0;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#08090A] overflow-hidden">
      {/* Clean Input / Output Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-3xl mx-auto h-full flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center select-none">
              <div
                className="h-11 w-11 rounded-2xl flex items-center justify-center mb-3"
                style={{
                  backgroundColor: `${persona.color}18`,
                  color: persona.color,
                  border: `1px solid ${persona.color}35`,
                }}
              >
                <PersonaIcon name={persona.iconName} className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-zinc-200">{persona.name}</p>
            </div>
          ) : (
            <div className="space-y-6 pb-4">
              {messages.map((msg) => {
                const isUser = msg.role === "user";

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUser && (
                      <div
                        className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          backgroundColor: `${persona.color}1A`,
                          color: persona.color,
                          border: `1px solid ${persona.color}35`,
                        }}
                      >
                        <PersonaIcon
                          name={persona.iconName}
                          className="h-3.5 w-3.5"
                        />
                      </div>
                    )}

                    <div
                      className={`group relative max-w-2xl text-[13.5px] leading-relaxed ${
                        isUser
                          ? "rounded-2xl rounded-tr-sm bg-[#181920] border border-white/[0.08] px-4 py-2.5 text-zinc-100"
                          : "flex-1 text-zinc-200 pt-0.5"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>

                      {!isUser && (
                        <button
                          type="button"
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="mt-2 inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      )}

                      {msg.toolCalls && msg.toolCalls.length > 0 && (
                        <div className="mt-3 space-y-1.5">
                          {msg.toolCalls.map((tc, idx) => {
                            const expandKey = `${msg.id}_tool_${idx}`;
                            const isExpanded = !!expandedTools[expandKey];

                            return (
                              <div
                                key={expandKey}
                                className="rounded-lg bg-[#101116] border border-white/[0.06] overflow-hidden text-xs font-mono"
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedTools((prev) => ({
                                      ...prev,
                                      [expandKey]: !prev[expandKey],
                                    }))
                                  }
                                  className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-white/[0.03] transition-colors text-left cursor-pointer"
                                >
                                  <span className="flex items-center gap-2 text-zinc-300 text-[11px]">
                                    <Terminal className="h-3 w-3 text-zinc-500" />
                                    {tc.name}()
                                  </span>
                                  {isExpanded ? (
                                    <ChevronDown className="h-3 w-3 text-zinc-500" />
                                  ) : (
                                    <ChevronRight className="h-3 w-3 text-zinc-500" />
                                  )}
                                </button>

                                {isExpanded && (
                                  <div className="p-3 space-y-2 border-t border-white/[0.06] bg-[#0B0C10]">
                                    <pre className="text-[11px] text-zinc-400 overflow-x-auto">
                                      {JSON.stringify(tc.args, null, 2)}
                                    </pre>
                                    {tc.result !== undefined && (
                                      <pre className="text-[11px] text-emerald-300/90 overflow-x-auto">
                                        {JSON.stringify(tc.result, null, 2)}
                                      </pre>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <div
                    className="h-7 w-7 rounded-lg flex items-center justify-center animate-pulse"
                    style={{
                      backgroundColor: `${persona.color}1A`,
                      color: persona.color,
                    }}
                  >
                    <PersonaIcon
                      name={persona.iconName}
                      className="h-3.5 w-3.5"
                    />
                  </div>
                  <span>Thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Minimal Chat Input with '+' Agentic Menu */}
      <div className="px-6 pb-6 pt-2">
        <div className="max-w-3xl mx-auto relative" ref={plusMenuRef}>
          {/* Origin-Aware '+' Popover */}
          {isPlusOpen && (
            <div
              className="absolute bottom-full left-0 mb-2 w-64 rounded-xl border border-white/[0.08] bg-[#121318] shadow-2xl p-1.5 z-50 origin-bottom-left transition-all duration-150 ease-out"
            >
              {plusSubmenu === "root" && (
                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-3 py-2 rounded-lg text-left text-xs text-zinc-200 hover:bg-white/[0.06] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Paperclip className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Files</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsPlusOpen(false);
                      onOpenSkills();
                    }}
                    className="w-full px-3 py-2 rounded-lg text-left text-xs text-zinc-200 hover:bg-white/[0.06] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Wrench className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Skills</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlusSubmenu("mcp")}
                    className="w-full px-3 py-2 rounded-lg text-left text-xs text-zinc-200 hover:bg-white/[0.06] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Blocks className="h-3.5 w-3.5 text-zinc-400" />
                      <span>MCP</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlusSubmenu("connectors")}
                    className="w-full px-3 py-2 rounded-lg text-left text-xs text-zinc-200 hover:bg-white/[0.06] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Plug className="h-3.5 w-3.5 text-zinc-400" />
                      <span>Connectors</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
                  </button>
                </div>
              )}

              {plusSubmenu === "mcp" && (
                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => setPlusSubmenu("root")}
                    className="w-full px-2.5 py-1.5 text-[11px] font-mono text-zinc-400 hover:text-zinc-200 text-left cursor-pointer"
                  >
                    ← MCP Servers
                  </button>
                  {MCP_SERVERS.map((mcp) => {
                    const active = activeMcps.includes(mcp.id);
                    return (
                      <button
                        key={mcp.id}
                        type="button"
                        onClick={() => toggleMcp(mcp.id)}
                        className="w-full px-3 py-1.5 rounded-lg text-left text-xs text-zinc-200 hover:bg-white/[0.06] flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>{mcp.label}</span>
                        {active && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {plusSubmenu === "connectors" && (
                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => setPlusSubmenu("root")}
                    className="w-full px-2.5 py-1.5 text-[11px] font-mono text-zinc-400 hover:text-zinc-200 text-left cursor-pointer"
                  >
                    ← Connectors
                  </button>
                  {CONNECTORS.map((conn) => {
                    const active = activeConnectors.includes(conn.id);
                    return (
                      <button
                        key={conn.id}
                        type="button"
                        onClick={() => toggleConnector(conn.id)}
                        className="w-full px-3 py-1.5 rounded-lg text-left text-xs text-zinc-200 hover:bg-white/[0.06] flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>{conn.label}</span>
                        {active && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="rounded-2xl border border-white/[0.08] bg-[#121318] focus-within:border-white/[0.16] transition-colors"
          >
            {/* Active Files / MCP / Connector Chips */}
            {hasContextChips && (
              <div className="px-3.5 pt-2.5 flex flex-wrap gap-1.5">
                {attachedFiles.map((file) => (
                  <span
                    key={file.id}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-[11px] text-zinc-300"
                  >
                    <FileText className="h-3 w-3 text-zinc-400" />
                    <span className="max-w-[140px] truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setAttachedFiles((prev) =>
                          prev.filter((f) => f.id !== file.id)
                        )
                      }
                      className="text-zinc-500 hover:text-white cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}

                {activeMcps.map((id) => (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-[11px] font-mono text-zinc-300"
                  >
                    <Blocks className="h-3 w-3 text-zinc-400" />
                    <span>{id}</span>
                    <button
                      type="button"
                      onClick={() => toggleMcp(id)}
                      className="text-zinc-500 hover:text-white cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}

                {activeConnectors.map((id) => (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-[11px] font-mono text-zinc-300"
                  >
                    <Plug className="h-3 w-3 text-zinc-400" />
                    <span>{id}</span>
                    <button
                      type="button"
                      onClick={() => toggleConnector(id)}
                      className="text-zinc-500 hover:text-white cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-end gap-2 p-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsPlusOpen((prev) => !prev);
                  setPlusSubmenu("root");
                }}
                className="h-8 w-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-zinc-300 hover:text-white flex items-center justify-center flex-shrink-0 transition-all duration-150 active:scale-95 cursor-pointer"
                title="Add files, skills, MCP, or connectors"
              >
                <Plus className="h-4 w-4" />
              </button>

              <textarea
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={`Message ${persona.name}...`}
                disabled={isLoading}
                className="flex-1 bg-transparent py-1.5 px-1 text-[13.5px] text-zinc-100 placeholder-zinc-500 focus:outline-none resize-none max-h-36"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                style={{
                  backgroundColor:
                    inputValue.trim() && !isLoading ? persona.color : "#27272A",
                }}
                className="h-8 w-8 rounded-xl text-white flex items-center justify-center flex-shrink-0 transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                title="Send message"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
