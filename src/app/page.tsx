"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PERSONAS, Persona } from "@/lib/personas";
import { PersonaIcon } from "@/components/PersonaIcon";
import {
  Zap,
  ArrowRight,
  Terminal,
  Cpu,
  ShieldCheck,
  Code2,
  Layers,
  Sparkles,
  Bot,
  Github,
  CheckCircle2,
  Copy,
  Check,
  Boxes,
  ExternalLink,
  ChevronRight,
  Play,
  Sliders,
  Database,
  Globe,
  Flame,
  LineChart,
} from "lucide-react";

export default function LandingPage() {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [activeTab, setActiveTab] = useState<"swarm" | "skills" | "models">("swarm");
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>("orchestrator");

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("npx create-mr-agents@latest");
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const selectedPersona = PERSONAS.find((p) => p.id === selectedPersonaId) || PERSONAS[0];

  return (
    <div className="landing relative isolate min-h-screen bg-[#09090b] text-[#fafafa] selection:bg-white/20 selection:text-white font-sans overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════════════
          BACKGROUND EFFECTS (Gradients, Noise, Grid Lines)
          ═══════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 grid-bg opacity-70" />

        {/* Ambient Top Glow (Vercel-style radial spotlight) */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[550px] rounded-full blur-[140px] opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(236, 72, 153, 0.3) 50%, transparent 80%)",
          }}
        />

        {/* Noise overlay */}
        <div className="landing-noise" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          TOP ANNOUNCEMENT BANNER
          ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-30 border-b border-[#27272a] bg-[#0c0d12]/90 backdrop-blur-md px-4 py-2 text-center text-xs text-zinc-400">
        <div className="inline-flex items-center gap-2 flex-wrap justify-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-2 py-0.5 text-[11px] font-medium text-violet-400 border border-violet-500/20">
            <Sparkles className="h-3 w-3" /> New
          </span>
          <span className="text-zinc-300 font-medium">
            Swarm Mode 2.0: 8-Agent Mesh Collaboration & Autonomous Execution
          </span>
          <Link
            href="/workspace"
            className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 font-semibold underline underline-offset-2 ml-1"
          >
            Launch Live Workspace <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          NAVIGATION HEADER
          ═══════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 border-b border-[#27272a]/80 bg-[#09090b]/80 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-700 flex items-center justify-center shadow-md shadow-violet-600/30 group-hover:scale-105 transition-transform">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-zinc-300 font-mono">
                mr. agents
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                v1.2
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#agents" className="hover:text-white transition">
              Agents
            </a>
            <a href="#swarm" className="hover:text-white transition">
              Swarm Mesh
            </a>
            <a href="#skills" className="hover:text-white transition">
              Skills Registry
            </a>
            <a href="#architecture" className="hover:text-white transition">
              Architecture
            </a>
            <a
              href="https://github.com/arz282-ctrl/Mr-Agents"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </nav>

          {/* Header Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/arz282-ctrl/Mr-Agents"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 transition"
            >
              <Github className="h-3.5 w-3.5" />
              <span>Star on GitHub</span>
            </a>

            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs transition shadow-lg shadow-white/10"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Release Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 mb-8 shadow-inner animate-fade-in">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
            Autonomous Multi-Agent Workspace
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-violet-400 font-medium">8 Specialized Personas</span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white max-w-5xl leading-[1.08] mb-6">
          Your Autonomous AI Workforce.{" "}
          <span className="text-gradient">Assembled.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10 font-normal">
          Deploy an elite 8-agent swarm across Claude 3.5 Sonnet, GPT-4o, Gemini 1.5,
          and LLaMA 3.3. Solve full-stack engineering, web scraping, growth marketing, and
          code auditing in real-time.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <Link
            href="/workspace"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 transition shadow-xl shadow-white/10 group"
          >
            <span>Open Desktop Workspace</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#swarm"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 font-semibold text-sm flex items-center justify-center gap-2 transition"
          >
            <Zap className="h-4 w-4 text-violet-400" />
            <span>Explore Swarm Mesh</span>
          </a>
        </div>

        {/* One-Line Command Box */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#0c0d14] border border-[#27272a] text-xs font-mono text-zinc-400 max-w-md shadow-2xl">
          <span className="text-violet-400">$</span>
          <span className="text-zinc-200">git clone mr-agents && npm run dev</span>
          <button
            onClick={handleCopyInstall}
            className="p-1 rounded hover:bg-zinc-800 text-zinc-500 hover:text-white transition ml-2"
            title="Copy command"
          >
            {copiedInstall ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            HERO VISUAL / APP PREVIEW
            ═══════════════════════════════════════════════════════════════ */}
        <div className="w-full mt-16 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-2 shadow-2xl shadow-violet-950/20 backdrop-blur-xl relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600/20 via-pink-600/10 to-cyan-600/20 opacity-30 blur-xl group-hover:opacity-50 transition duration-1000 -z-10" />

          {/* Browser / OS Window Frame */}
          <div className="rounded-xl border border-zinc-800/80 bg-[#0a0c14] overflow-hidden">
            {/* Titlebar mockup */}
            <div className="h-9 px-4 bg-[#0e101a] border-b border-zinc-800/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F56] inline-block opacity-80" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E] inline-block opacity-80" />
                <span className="h-3 w-3 rounded-full bg-[#27C93F] inline-block opacity-80" />
                <span className="text-xs font-mono text-zinc-500 ml-2">
                  mr-agents.local — 8-Agent Swarm Runtime
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>MESH ONLINE</span>
              </div>
            </div>

            {/* Split Mockup Content: 8 Agents Sidebar + Swarm Room */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px] text-left">
              {/* Mini Sidebar */}
              <div className="md:col-span-4 border-r border-zinc-800/60 bg-[#080910] p-4 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-zinc-500 mb-3 tracking-wider flex items-center justify-between">
                    <span>ACTIVE PERSONAS (8/8)</span>
                    <span className="text-violet-400">LIVE</span>
                  </div>
                  <div className="space-y-1.5">
                    {PERSONAS.slice(0, 5).map((p) => (
                      <div
                        key={p.id}
                        className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                          p.id === "orchestrator"
                            ? "bg-violet-950/30 border-violet-500/40 text-white"
                            : "bg-zinc-900/30 border-zinc-800/50 text-zinc-400"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="h-6 w-6 rounded flex items-center justify-center text-xs"
                            style={{
                              backgroundColor: `${p.color}20`,
                              color: p.color,
                            }}
                          >
                            <PersonaIcon name={p.iconName} className="h-3 w-3" />
                          </div>
                          <div>
                            <div className="font-semibold text-[11px]">{p.name}</div>
                            <div className="text-[9px] text-zinc-500">{p.role}</div>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                          {p.model.split("-")[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/60">
                  <div className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="h-3 w-3 text-violet-400" />
                      Dynamic Tools
                    </span>
                    <span className="font-mono text-violet-400 font-bold">26 loaded</span>
                  </div>
                </div>
              </div>

              {/* Mini Swarm Mesh Output */}
              <div className="md:col-span-8 p-6 flex flex-col justify-between bg-[#0b0d16]">
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-violet-950/20 border border-violet-500/30 text-xs">
                    <div className="text-[10px] font-mono text-violet-400 uppercase mb-1">
                      Objective Delegated by User:
                    </div>
                    <div className="text-zinc-200 font-medium">
                      "Deploy a production Next.js SaaS pricing table with SQLite billing telemetry and Vitest assertions."
                    </div>
                  </div>

                  {/* Progressive Agent Discussion Trace */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-zinc-300">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 flex-shrink-0 mt-0.5">
                        Orchestrator
                      </span>
                      <span>Deconstructing requirements: Assigned Figma tokens to UI Architect, SQLite schema to Backend Builder.</span>
                    </div>

                    <div className="flex items-start gap-2 text-zinc-300">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 flex-shrink-0 mt-0.5">
                        Architect
                      </span>
                      <span>Generated dark-mode pricing grid with responsive glassmorphism and WCAG AAA contrast ratio.</span>
                    </div>

                    <div className="flex items-start gap-2 text-zinc-300">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 flex-shrink-0 mt-0.5">
                        Backend
                      </span>
                      <span>Created database migration schema with indexed tenant IDs and Stripe webhook idempotency keys.</span>
                    </div>

                    <div className="flex items-start gap-2 text-zinc-300">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-lime-500/20 text-lime-300 flex-shrink-0 mt-0.5">
                        QA Tester
                      </span>
                      <span>Ran Vitest suite. 14 test cases verified, 0 CVEs detected. Ready for production compilation.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Consensus reached in 1.4s
                  </span>
                  <Link
                    href="/workspace"
                    className="text-xs text-violet-400 hover:text-white font-semibold flex items-center gap-1 transition"
                  >
                    Open Live Session <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          MODEL PROVIDER FOUNDATION BAR
          ═══════════════════════════════════════════════════════════════ */}
      <section className="border-y border-zinc-800/80 bg-zinc-950/80 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              STATE-OF-THE-ART FOUNDATION
            </div>
            <div className="text-sm font-semibold text-zinc-300 mt-1">
              Hybrid Multi-Model Agent Orchestration
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-zinc-400 text-xs font-mono">
            <div className="flex items-center gap-2 hover:text-white transition">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              <span>Anthropic Claude 3.5 Sonnet</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>OpenAI GPT-4o</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>Google Gemini 1.5 Pro</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span>Groq LLaMA 3.3 70B</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: 8-AGENT SHOWCASE GRID
          ═══════════════════════════════════════════════════════════════ */}
      <section id="agents" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono text-violet-400 uppercase tracking-widest mb-4">
            <Boxes className="h-3 w-3" />
            The 8-Pack Core
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 max-w-3xl">
            Eight Specialized Agents. One Unified Swarm.
          </h2>
          <p className="text-zinc-400 text-base max-w-xl">
            Each persona is paired with custom system instructions, dynamic tools, and
            the LLM best suited for its cognitive role.
          </p>
        </div>

        {/* 8 Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PERSONAS.map((persona) => {
            return (
              <div
                key={persona.id}
                className="group relative rounded-2xl border border-zinc-800 bg-[#0e1019]/70 hover:bg-[#131624] hover:border-zinc-700 p-5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top: Icon & Model Tag */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-md"
                      style={{
                        backgroundColor: `${persona.color}18`,
                        color: persona.color,
                        border: `1px solid ${persona.color}35`,
                      }}
                    >
                      <PersonaIcon name={persona.iconName} className="h-5 w-5" />
                    </div>

                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded border"
                      style={{
                        color: persona.color,
                        borderColor: `${persona.color}35`,
                        backgroundColor: `${persona.color}10`,
                      }}
                    >
                      {persona.model.split("-")[0]}
                    </span>
                  </div>

                  {/* Name & Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-white transition-colors">
                    {persona.name}
                  </h3>
                  <div className="text-xs font-medium text-zinc-400 mb-3">
                    {persona.title}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-5">
                    {persona.description}
                  </p>
                </div>

                {/* Bottom: Skills & Action */}
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                    {persona.skillPack.category}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {persona.skillPack.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/workspace"
                    className="w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white flex items-center justify-between transition"
                  >
                    <span>Engage Persona</span>
                    <ArrowRight className="h-3.5 w-3.5 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: SWARM MODE (SPLIT SECTION)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="swarm" className="py-28 px-6 border-t border-zinc-800/80 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono text-violet-400 uppercase tracking-widest">
              <Zap className="h-3 w-3" />
              Autonomous Mesh Protocol
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              From Single Prompting to Autonomous Mesh Debate.
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              When a task is too complex for a single agent, trigger <strong>Swarm Mode</strong>.
              The Orchestrator evaluates your mission, breaks it into specialized sub-tasks,
              and coordinates autonomous inter-agent debate and tool execution until completion.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/20">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Zero Context Exhaustion
                  </div>
                  <div className="text-xs text-zinc-400">
                    Sub-tasks run in modular, sandboxed scopes — preventing context window overflow.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-md bg-violet-500/10 text-violet-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-violet-500/20">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Multi-Model Consensus
                  </div>
                  <div className="text-xs text-zinc-400">
                    Claude reasons, GPT-4o synthesizes data, Groq scrapes at 300 tps, and Gemini checks multimodal logic.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-md bg-cyan-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-cyan-500/20">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Strict JSON Deliverables
                  </div>
                  <div className="text-xs text-zinc-400">
                    Handoffs between agents adhere to rigid schemas, eliminating hallucinations.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/workspace"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/25 transition"
              >
                <span>Launch Swarm Room</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Terminal Visual */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-800 bg-[#0c0e18] shadow-2xl overflow-hidden font-mono text-xs">
              {/* Terminal Titlebar */}
              <div className="px-4 py-3 bg-[#111320] border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-zinc-500 text-[11px] ml-2">
                    swarm-execution.log — Node.js Mesh Engine
                  </span>
                </div>
                <span className="text-[10px] text-zinc-500">JSON-RPC 2.0</span>
              </div>

              {/* Code/Logs Body */}
              <div className="p-5 space-y-4 text-[12px] leading-relaxed bg-[#080910]">
                <div>
                  <span className="text-zinc-500">[00:00.12] </span>
                  <span className="text-violet-400 font-bold">DISPATCH: </span>
                  <span className="text-zinc-300">
                    Orchestrator initiated swarm mission: "Audit SaaS repository, extract dead code, write Vitest suite"
                  </span>
                </div>

                <div className="pl-4 border-l border-violet-500/40 space-y-1">
                  <div>
                    <span className="text-zinc-500">[00:00.34] </span>
                    <span className="text-pink-400">CALL: </span>
                    <span className="text-zinc-400">The UI/UX Architect → dom_parsing({'{'} target: "PricingTable.tsx" {'}'})</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">[00:00.61] </span>
                    <span className="text-emerald-400">CALL: </span>
                    <span className="text-zinc-400">The Backend Builder → db_schema_gen({'{'} dialect: "sqlite", table: "subscriptions" {'}'})</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">[00:00.89] </span>
                    <span className="text-lime-400">CALL: </span>
                    <span className="text-zinc-400">The QA Tester → unit_testing({'{'} coverage: true, framework: "vitest" {'}'})</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-[11px]">
                  <div className="text-emerald-400 font-bold mb-1">
                    ✓ SYNTHESIS COMPLETE (3 steps, 0 failures):
                  </div>
                  <pre className="text-zinc-300 text-[11px] overflow-x-auto">
{`{
  "status": "APPROVED",
  "deliverables": [
    "PricingCard.tsx (Tailwind v4 tokens applied)",
    "schema.sql (Idempotent SQLite indexes created)",
    "pricing.test.ts (14/14 tests passing)"
  ],
  "latencyMs": 842
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: SKILLS REGISTRY
          ═══════════════════════════════════════════════════════════════ */}
      <section id="skills" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-4">
            <Terminal className="h-3 w-3" />
            Dynamic Skill Registry
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 max-w-3xl">
            26+ Built-in Tools. Hot-Reloaded.
          </h2>
          <p className="text-zinc-400 text-base max-w-xl">
            Drop new custom skills into the <code className="text-zinc-200">skills/</code> folder.
            The runtime auto-discovers parameter schemas and grants execution rights to matching agents.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0d0f19] p-6 hover:border-zinc-700 transition">
            <div className="h-10 w-10 rounded-xl bg-violet-600/15 text-violet-400 border border-violet-500/30 flex items-center justify-center mb-4">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Code & Architecture
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Figma design token parsers, Tailwind component generators, and TypeScript schema validators.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                react_tailwind_gen
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                figma_api_read
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                dom_parsing
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0d0f19] p-6 hover:border-zinc-700 transition">
            <div className="h-10 w-10 rounded-xl bg-emerald-600/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Backend & Automation
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              SQLite/Postgres schema generation, Puppeteer web crawlers, and sandboxed Bash execution.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                db_schema_gen
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                puppeteer_playwright_ctrl
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                bash_terminal_commands
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0d0f19] p-6 hover:border-zinc-700 transition">
            <div className="h-10 w-10 rounded-xl bg-cyan-600/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-4">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Growth, SEO & Multimodal
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Vision inspection for UI screens, viral short-form copy formatting, and CRM lead scoring.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                vision_image_analysis
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                seo_keyword_extraction
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                lead_qualification_logic
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: ARCHITECTURE HIGHLIGHTS
          ═══════════════════════════════════════════════════════════════ */}
      <section id="architecture" className="py-24 px-6 border-t border-zinc-800/80 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="text-xs font-mono text-violet-400 uppercase tracking-wider">
                01. LOCAL-FIRST RUNTIME
              </div>
              <h3 className="text-lg font-bold text-white">
                Self-Hosted Persistence
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Sessions, swarm runs, and bot configs are stored locally in SQLite and Redis.
                No third-party SaaS dependency or telemetry leaks.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono text-pink-400 uppercase tracking-wider">
                02. HYBRID INFERENCE
              </div>
              <h3 className="text-lg font-bold text-white">
                Multi-Provider Orchestration
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Connect your Anthropic, OpenAI, Gemini, and Groq API keys seamlessly.
                Switch providers on a per-persona basis at runtime.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                03. DESKTOP WORKSPACE UI
              </div>
              <h3 className="text-lg font-bold text-white">
                Native macOS Window Feel
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Traffic light window controls, keyboard shortcuts (⌘Enter, ⌘K), and
                real-time streaming deliverable inspectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6: BOTTOM CALL TO ACTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="relative rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 via-zinc-950/80 to-[#080910] p-10 md:p-16 text-center overflow-hidden">
          {/* Subtle Glow Orb inside CTA */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[100px] opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #8B5CF6 0%, #EC4899 50%, transparent 80%)",
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to assemble your autonomous workforce?
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Launch the workspace now to start interacting with the 8 specialized personas
              or run a multi-agent swarm task.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/workspace"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 transition shadow-xl shadow-white/10"
              >
                <span>Launch Workspace Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/arz282-ctrl/Mr-Agents"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-sm font-semibold flex items-center justify-center gap-2 transition"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7: FOOTER (VERCEL MINIMALIST STYLE)
          ═══════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-zinc-800/80 bg-[#07080e] py-12 px-6 text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-violet-600/30 text-violet-400 flex items-center justify-center font-bold text-xs">
              A
            </div>
            <span>© 2026 Master Mr. Agents. Open source.</span>
          </div>

          <div className="flex items-center gap-6 text-zinc-400">
            <Link href="/workspace" className="hover:text-white transition">
              Workspace
            </Link>
            <a href="#agents" className="hover:text-white transition">
              Agents
            </a>
            <a href="#swarm" className="hover:text-white transition">
              Swarm
            </a>
            <a href="#skills" className="hover:text-white transition">
              Registry
            </a>
            <a
              href="https://github.com/arz282-ctrl/Mr-Agents"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition flex items-center gap-1"
            >
              <Github className="h-3 w-3" />
              <span>GitHub</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>All 8 Agent Engines Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
