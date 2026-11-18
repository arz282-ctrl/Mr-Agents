"use client";

import React, { useState, useEffect, useRef } from "react";
import { PERSONAS, getPersonaById, Persona } from "@/lib/personas";
import { PersonaIcon } from "./PersonaIcon";
import {
  Zap,
  Play,
  CheckCircle2,
  Terminal,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  RotateCw,
  Sparkles,
  Layers,
  Clock,
  Shield,
} from "lucide-react";

interface SwarmStepItem {
  stepIndex: number;
  fromPersona: string;
  toPersona: string;
  role: string;
  content: string;
  toolCall?: {
    name: string;
    args: any;
    result: any;
  };
}

export function SwarmRoom() {
  const [goalInput, setGoalInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [personasInvolved, setPersonasInvolved] = useState<string[]>([]);
  const [steps, setSteps] = useState<SwarmStepItem[]>([]);
  const [finalOutput, setFinalOutput] = useState<string | null>(null);
  const [expandedTools, setExpandedTools] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [recentRuns, setRecentRuns] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchRecentRuns();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [steps, isRunning]);

  const fetchRecentRuns = async () => {
    try {
      const res = await fetch("/api/swarm");
      const data = await res.json();
      if (data.runs) {
        setRecentRuns(data.runs);
      }
    } catch (e) {
      console.warn("Failed to fetch recent swarm runs", e);
    }
  };

  const handleLaunchSwarm = async (customGoal?: string) => {
    const goalToRun = customGoal || goalInput;
    if (!goalToRun.trim() || isRunning) return;

    setIsRunning(true);
    setSteps([]);
    setFinalOutput(null);
    setPersonasInvolved(["orchestrator"]);

    try {
      const res = await fetch("/api/swarm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: goalToRun }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Swarm execution failed");

      setActiveRunId(data.swarmRunId);
      setPersonasInvolved(data.personasInvolved || []);

      // Simulate real-time progressive steps reveal for visceral conversational experience
      if (data.steps && data.steps.length > 0) {
        for (let i = 0; i < data.steps.length; i++) {
          await new Promise((r) => setTimeout(r, 650));
          setSteps((prev) => [...prev, data.steps[i]]);
        }
      }

      setFinalOutput(data.finalOutput);
      fetchRecentRuns();
    } catch (err: any) {
      setSteps((prev) => [
        ...prev,
        {
          stepIndex: 1,
          fromPersona: "orchestrator",
          toPersona: "user",
          role: "assistant",
          content: `⚠️ Swarm Execution Failure: ${err.message}`,
        },
      ]);
    } finally {
      setIsRunning(false);
    }
  };

  const toggleTool = (id: string) => {
    setExpandedTools((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyDeliverable = () => {
    if (!finalOutput) return;
    navigator.clipboard.writeText(finalOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exampleBigTasks = [
    "Build a production SaaS dashboard with real-time SQLite analytics and dark mode React components",
    "Scrape GitHub repository stats for AI agents, analyze market SEO trends, and format launch copy",
    "Architect enterprise API endpoints with Zod schema validation, Vitest test suite, and Docker container",
  ];

  return (
    <div className="flex-1 flex flex-col h-screen bg-[#08090E] overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#1F2336] bg-[#0C0E1A]/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Zap className="h-5 w-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-wide">
                SWARM ROOM
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                TEAM COLLABORATION
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Autonomous multi-agent task state machine passing JSON & tool results
            </p>
          </div>
        </div>

        {/* Squad Status Overview */}
        <div className="flex items-center gap-1.5">
          {PERSONAS.map((p) => {
            const isTagged = personasInvolved.includes(p.id);
            return (
              <div
                key={p.id}
                title={`${p.name} (${p.role})`}
                className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ${
                  isTagged
                    ? "scale-110 shadow-lg"
                    : "opacity-40 hover:opacity-80"
                }`}
                style={{
                  backgroundColor: `${p.color}25`,
                  color: p.color,
                  border: isTagged
                    ? `2px solid ${p.color}`
                    : `1px solid ${p.color}30`,
                }}
              >
                <PersonaIcon name={p.iconName} className="h-4 w-4" />
              </div>
            );
          })}
        </div>
      </header>

      {/* Main Workspace Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Big Task Input Card */}
        <div className="rounded-2xl border border-[#23273D] bg-[#111322] p-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-violet-400 font-bold">
            <Sparkles className="h-4 w-4" />
            <span>Launch Multi-Agent Swarm Mission</span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLaunchSwarm();
            }}
            className="space-y-3"
          >
            <textarea
              rows={2}
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              placeholder="Submit a 'Big Task' for the Eight-Packer fleet (e.g. 'Build an AI SaaS platform with SQLite persistence, React UI, and test suites')..."
              disabled={isRunning}
              className="w-full bg-[#090A12] border border-[#23273D] focus:border-violet-500 rounded-xl p-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all resize-none shadow-inner"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Example Task Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono text-zinc-500">Presets:</span>
                {exampleBigTasks.map((t, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setGoalInput(t);
                      handleLaunchSwarm(t);
                    }}
                    disabled={isRunning}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-[#181B2E] hover:bg-[#232845] text-zinc-300 hover:text-white border border-[#2A304F] transition text-left"
                  >
                    Task #{idx + 1}
                  </button>
                ))}
              </div>

              {/* Launch Button */}
              <button
                type="submit"
                disabled={!goalInput.trim() || isRunning}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-violet-600/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed ml-auto"
              >
                {isRunning ? (
                  <>
                    <RotateCw className="h-4 w-4 animate-spin" />
                    <span>Agents Debating...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-white" />
                    <span>Launch Autonomous Swarm</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Live Autonomous Discussion Feed */}
        {steps.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-violet-400" />
                <span>AUTONOMOUS AGENT DISCUSSION THREAD</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/20 text-violet-300">
                {steps.length} Turns Completed
              </span>
            </div>

            {steps.map((step) => {
              const sender = getPersonaById(step.fromPersona);
              const receiver =
                step.toPersona === "team"
                  ? { name: "Squad Team", color: "#A855F7" }
                  : step.toPersona === "user"
                  ? { name: "User", color: "#10B981" }
                  : getPersonaById(step.toPersona);

              const toolKey = `step_${step.stepIndex}`;
              const isToolExpanded = !!expandedTools[toolKey];

              return (
                <div
                  key={step.stepIndex}
                  className="rounded-2xl border border-[#1E2338] bg-[#101221] p-5 shadow-xl transition-all"
                  style={{
                    borderLeft: `4px solid ${sender.color}`,
                  }}
                >
                  {/* Step Header: Sender -> Receiver */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#1C2033]">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-7 w-7 rounded-lg flex items-center justify-center text-xs"
                        style={{
                          backgroundColor: `${sender.color}20`,
                          color: sender.color,
                        }}
                      >
                        <PersonaIcon name={sender.iconName} className="h-4 w-4" />
                      </div>

                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="font-bold text-white">
                          {sender.name}
                        </span>
                        <ArrowRight className="h-3 w-3 text-zinc-500" />
                        <span
                          className="font-medium text-[11px] px-2 py-0.5 rounded-full border"
                          style={{
                            color: receiver.color,
                            borderColor: `${receiver.color}40`,
                            backgroundColor: `${receiver.color}15`,
                          }}
                        >
                          @{receiver.name}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      TURN #{step.stepIndex}
                    </span>
                  </div>

                  {/* Message Body */}
                  <div className="mt-3 text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">
                    {step.content}
                  </div>

                  {/* Executed Tool Card */}
                  {step.toolCall && (
                    <div className="mt-4 rounded-xl border border-[#23273D] bg-[#090B14] overflow-hidden text-xs font-mono">
                      <button
                        onClick={() => toggleTool(toolKey)}
                        className="w-full px-3 py-2 flex items-center justify-between bg-[#131626] hover:bg-[#1A1F36] transition text-left"
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                          <span className="text-violet-400 font-bold">
                            Tool Call: {step.toolCall.name}()
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-zinc-400">
                          <span>inspect arguments & output</span>
                          {isToolExpanded ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )}
                        </div>
                      </button>

                      {isToolExpanded && (
                        <div className="p-3 space-y-2 border-t border-[#1C2033] bg-[#07090F]">
                          <div>
                            <div className="text-[10px] text-zinc-500 mb-1">
                              INPUT PARAMETERS:
                            </div>
                            <pre className="p-2 bg-black/60 rounded text-zinc-300 text-[11px] overflow-x-auto">
                              {JSON.stringify(step.toolCall.args, null, 2)}
                            </pre>
                          </div>
                          <div>
                            <div className="text-[10px] text-emerald-400 mb-1">
                              OUTPUT VALUE:
                            </div>
                            <pre className="p-2 bg-black/60 rounded text-emerald-200/90 text-[11px] overflow-x-auto">
                              {JSON.stringify(step.toolCall.result, null, 2)}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Final Master Output Deliverable */}
        {finalOutput && (
          <div className="rounded-2xl border-2 border-amber-500/50 bg-gradient-to-b from-[#14121F] to-[#0D0B14] p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    Final Compiled Deliverable
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Orchestrated and synthesized by The Orchestrator
                  </p>
                </div>
              </div>

              <button
                onClick={copyDeliverable}
                className="px-3 py-1.5 rounded-lg bg-[#1F1C2E] border border-amber-500/30 hover:border-amber-400 text-amber-300 text-xs flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied" : "Copy Output"}</span>
              </button>
            </div>

            <div className="text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">
              {finalOutput}
            </div>
          </div>
        )}

        {/* Empty State */}
        {steps.length === 0 && !isRunning && (
          <div className="py-16 text-center max-w-lg mx-auto space-y-3">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-violet-600/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Layers className="h-8 w-8" />
            </div>
            <h3 className="text-base font-bold text-white">
              Swarm Mode is Ready for Deployment
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Submit an ambitious multi-step task above. The Orchestrator will analyze your objective, select specialized personas, and orchestrate real-time inter-agent debate and tool execution until the mission is accomplished.
            </p>
          </div>
        )}

        <div ref={scrollRef} />
      </div>
    </div>
  );
}
