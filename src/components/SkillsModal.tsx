"use client";

import React, { useState, useEffect } from "react";
import {
  Wrench,
  X,
  RotateCw,
  Play,
  Check,
  Terminal,
  FolderOpen,
  PlusCircle,
  FileCode,
  Layers,
  Sparkles,
} from "lucide-react";

interface SkillItem {
  name: string;
  personaId?: string;
  category?: string;
  description: string;
  parameters: any;
  isCustom?: boolean;
  sourcePath?: string;
}

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReloadSkills: () => void;
}

export function SkillsModal({ isOpen, onClose, onReloadSkills }: SkillsModalProps) {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [testArgs, setTestArgs] = useState<string>("{}");
  const [testResult, setTestResult] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [filterPersona, setFilterPersona] = useState<string>("all");

  useEffect(() => {
    if (isOpen) {
      loadSkills();
    }
  }, [isOpen]);

  const loadSkills = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      if (data.tools) {
        setSkills(data.tools);
        if (!selectedSkill && data.tools.length > 0) {
          selectSkillForTesting(data.tools[0]);
        }
      }
    } catch (e) {
      console.warn("Failed to load skills", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReloadRegistry = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/skills", { method: "POST" });
      const data = await res.json();
      await loadSkills();
      onReloadSkills();
    } catch (e) {
      console.warn("Failed to reload skills", e);
    } finally {
      setIsLoading(false);
    }
  };

  const selectSkillForTesting = (skill: SkillItem) => {
    setSelectedSkill(skill);
    setTestResult(null);

    // Generate sample arguments based on parameter properties
    const props = skill.parameters?.properties || {};
    const sample: Record<string, any> = {};

    for (const key of Object.keys(props)) {
      if (props[key].type === "string") {
        sample[key] = key.includes("url") ? "https://example.com" : `sample_${key}`;
      } else if (props[key].type === "array") {
        sample[key] = ["item_1", "item_2"];
      } else if (props[key].type === "boolean") {
        sample[key] = true;
      } else {
        sample[key] = "test_value";
      }
    }

    setTestArgs(JSON.stringify(sample, null, 2));
  };

  const handleExecuteTool = async () => {
    if (!selectedSkill) return;
    setIsExecuting(true);
    setTestResult(null);

    try {
      let parsedArgs = {};
      try {
        parsedArgs = JSON.parse(testArgs);
      } catch (err) {
        throw new Error("Invalid JSON in parameters field");
      }

      const res = await fetch("/api/skills/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolName: selectedSkill.name,
          args: parsedArgs,
        }),
      });

      const data = await res.json();
      setTestResult(data);
    } catch (err: any) {
      setTestResult({ error: err.message });
    } finally {
      setIsExecuting(false);
    }
  };

  if (!isOpen) return null;

  const filteredSkills = skills.filter((s) => {
    if (filterPersona === "all") return true;
    if (filterPersona === "custom") return s.isCustom;
    return s.personaId === filterPersona || s.personaId === "all";
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[85vh] bg-[#0C0E1A] border border-[#23273D] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#1F2336] bg-[#0E1020] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/40 flex items-center justify-center">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Plug-and-Play Dynamic Skill Registry
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {skills.length} Tools Auto-Loaded
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Any tool dropped into <code className="text-violet-300">/skills</code> auto-loads without restart
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReloadRegistry}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg bg-[#15182B] border border-[#282E49] hover:border-violet-500 text-xs text-zinc-200 hover:text-white flex items-center gap-1.5 transition"
              title="Rescan /skills folder for new tools"
            >
              <RotateCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Rescan Registry</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Skills List */}
          <div className="w-80 border-r border-[#1F2336] flex flex-col bg-[#090A12]">
            {/* Filter */}
            <div className="p-3 border-b border-[#1F2336]">
              <select
                value={filterPersona}
                onChange={(e) => setFilterPersona(e.target.value)}
                className="w-full bg-[#121526] border border-[#23273D] text-xs text-zinc-200 rounded-lg p-2 focus:outline-none focus:border-violet-500"
              >
                <option value="all">All Personas & Skills</option>
                <option value="custom">⚡ Auto-Discovered Custom Tools</option>
                <option value="orchestrator">The Orchestrator</option>
                <option value="architect">The UI/UX Architect</option>
                <option value="backend">The Backend Builder</option>
                <option value="scraper">The Data Scraper</option>
                <option value="marketer">The Multimodal Marketer</option>
                <option value="closer">The Sales Closer</option>
                <option value="devops">The DevOps Engineer</option>
                <option value="qa">The QA Tester</option>
              </select>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredSkills.map((s) => {
                const isSelected = selectedSkill?.name === s.name;

                return (
                  <button
                    key={s.name}
                    onClick={() => selectSkillForTesting(s)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs ${
                      isSelected
                        ? "bg-violet-950/40 border-violet-500 text-white"
                        : "bg-[#0E101D] border-transparent hover:bg-[#141728] text-zinc-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-semibold text-violet-300 truncate">
                        {s.name}()
                      </span>
                      {s.isCustom && (
                        <span className="text-[9px] font-mono px-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          CUSTOM
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-500 truncate mt-0.5">
                      {s.category || s.personaId || "Tool"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Tool Details & Interactive Test Runner */}
          <div className="flex-1 flex flex-col bg-[#0B0D17] overflow-y-auto p-6 space-y-5">
            {selectedSkill ? (
              <>
                {/* Tool Meta */}
                <div className="p-4 rounded-xl border border-[#23273D] bg-[#111322] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-white">
                        {selectedSkill.name}()
                      </span>
                      {selectedSkill.isCustom && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Plug-and-Play Plugin
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400 font-mono">
                      Target: @{selectedSkill.personaId || "all"}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {selectedSkill.description}
                  </p>

                  {selectedSkill.sourcePath && (
                    <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5 pt-1">
                      <FileCode className="h-3.5 w-3.5 text-zinc-400" />
                      <span>Source: {selectedSkill.sourcePath}</span>
                    </div>
                  )}
                </div>

                {/* Schema & Test Runner */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  {/* Parameter Schema */}
                  <div className="rounded-xl border border-[#23273D] bg-[#0E101D] p-4 flex flex-col">
                    <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
                      JSON Schema Parameters:
                    </div>
                    <pre className="flex-1 p-3 bg-black/60 rounded-lg text-zinc-300 text-xs overflow-auto font-mono">
                      {JSON.stringify(selectedSkill.parameters, null, 2)}
                    </pre>
                  </div>

                  {/* Interactive Execution */}
                  <div className="rounded-xl border border-[#23273D] bg-[#0E101D] p-4 flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                        Live Tool Execution:
                      </span>
                      <button
                        onClick={handleExecuteTool}
                        disabled={isExecuting}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition disabled:opacity-40"
                      >
                        <Play className="h-3 w-3 fill-white" />
                        <span>{isExecuting ? "Executing..." : "Run Tool"}</span>
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-500">
                        Input JSON Arguments:
                      </label>
                      <textarea
                        rows={4}
                        value={testArgs}
                        onChange={(e) => setTestArgs(e.target.value)}
                        className="w-full bg-black/60 border border-[#22273F] rounded-lg p-2.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-violet-500 resize-none"
                      />
                    </div>

                    {/* Output */}
                    <div className="flex-1 flex flex-col min-h-[140px]">
                      <label className="text-[10px] font-mono text-emerald-400 mb-1">
                        Execution Output:
                      </label>
                      <pre className="flex-1 p-2.5 bg-black/60 border border-[#1A1F33] rounded-lg text-emerald-300 text-xs overflow-auto font-mono">
                        {testResult
                          ? JSON.stringify(testResult, null, 2)
                          : "// Click 'Run Tool' to test execution"}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Instructions on how to drop new skills */}
                <div className="p-3.5 rounded-xl border border-violet-500/20 bg-violet-950/20 flex items-center justify-between text-xs text-zinc-300">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-violet-400 flex-shrink-0" />
                    <span>
                      <strong>Extensible Architecture:</strong> To add a new skill, simply drop a <code className="text-violet-300">.json</code> or <code className="text-violet-300">.js</code> tool in <code className="text-violet-300">/skills/</code> and hit "Rescan Registry".
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-zinc-500 text-sm">
                Select a tool on the left to inspect and test execute.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
