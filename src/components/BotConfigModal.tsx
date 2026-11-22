"use client";

import React, { useState } from "react";
import { Persona } from "@/lib/personas";
import { PersonaIcon } from "./PersonaIcon";
import {
  X,
  Sliders,
  Check,
  Cpu,
  Sparkles,
  Terminal,
  Save,
  RotateCcw,
  Wrench,
  Key,
} from "lucide-react";

interface BotConfigModalProps {
  bot: Persona;
  isOpen: boolean;
  onClose: () => void;
  onSaveBotConfig: (updatedBot: Persona) => void;
}

export function BotConfigModal({
  bot,
  isOpen,
  onClose,
  onSaveBotConfig,
}: BotConfigModalProps) {
  const [instructions, setInstructions] = useState(bot.systemPrompt);
  const [selectedModel, setSelectedModel] = useState(bot.model);
  const [selectedProvider, setSelectedProvider] = useState(bot.provider);
  const [temperature, setTemperature] = useState(0.7);
  const [enabledSkills, setEnabledSkills] = useState<string[]>([
    ...bot.skillPack.skills,
  ]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const PROVIDER_OPTIONS = [
    {
      id: "anthropic",
      label: "Claude",
      models: ["claude-3-5-sonnet-20241022", "claude-3-haiku-20240307"],
    },
    {
      id: "groq",
      label: "Grok / OpenCode",
      models: ["llama-3.3-70b-versatile", "grok-2-1212", "qwen-2.5-coder-32b"],
    },
    {
      id: "openai",
      label: "Codex / GPT-4o",
      models: ["gpt-4o", "gpt-4o-mini", "o1-preview"],
    },
    {
      id: "gemini",
      label: "Gemini / Kimi For Coding",
      models: ["gemini-1.5-flash", "gemini-1.5-pro", "kimi-k1.5-coder"],
    },
  ];

  const toggleSkill = (skill: string) => {
    if (enabledSkills.includes(skill)) {
      setEnabledSkills(enabledSkills.filter((s) => s !== skill));
    } else {
      setEnabledSkills([...enabledSkills, skill]);
    }
  };

  const handleSave = () => {
    onSaveBotConfig({
      ...bot,
      systemPrompt: instructions,
      model: selectedModel,
      provider: selectedProvider as any,
      skillPack: {
        ...bot.skillPack,
        skills: enabledSkills,
      },
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#0C0E1A] border border-[#23273D] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1F2336] bg-[#0E1020] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: `${bot.color}25`,
                color: bot.color,
                border: `1px solid ${bot.color}40`,
              }}
            >
              <PersonaIcon name={bot.iconName} className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{bot.name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  BOT SETTINGS
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Akeru Bot Per-Assistant Instructions & Driver Config
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Connected Driver / Provider Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 font-bold">
              <Cpu className="h-3.5 w-3.5 text-violet-400" />
              <span>Connected LLM Driver & Model:</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PROVIDER_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSelectedProvider(opt.id as any);
                    setSelectedModel(opt.models[0]);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    selectedProvider === opt.id
                      ? "bg-violet-950/40 border-violet-500 text-white shadow-md shadow-violet-500/20"
                      : "bg-[#111322] border-[#23273D] text-zinc-300 hover:bg-[#16192C]"
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-[10px] text-zinc-500 font-mono truncate mt-0.5">
                    {opt.models[0].split("-")[0]}
                  </div>
                </button>
              ))}
            </div>

            {/* Model Variant Dropdown */}
            <div className="pt-2">
              <label className="text-[11px] text-zinc-400 font-mono">
                Select Model Variant:
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="mt-1 w-full bg-[#121526] border border-[#23273D] text-xs text-zinc-200 rounded-lg p-2.5 font-mono focus:outline-none focus:border-violet-500"
              >
                {PROVIDER_OPTIONS.find((p) => p.id === selectedProvider)?.models.map(
                  (m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Custom Instructions / System Prompt */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between font-bold">
              <div className="flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-violet-400" />
                <span>Custom Assistant Instructions (System Prompt):</span>
              </div>
              <button
                onClick={() => setInstructions(bot.systemPrompt)}
                className="text-[10px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Default</span>
              </button>
            </label>
            <textarea
              rows={6}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full bg-[#090B14] border border-[#23273D] focus:border-violet-500 rounded-xl p-3 text-xs text-zinc-200 font-mono focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Attached Skill Pack Tools Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 font-bold">
              <Wrench className="h-3.5 w-3.5 text-violet-400" />
              <span>Attached Skill Pack Tools:</span>
            </label>

            <div className="flex flex-wrap gap-2">
              {bot.skillPack.skills.map((skill) => {
                const isEnabled = enabledSkills.includes(skill);

                return (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 transition ${
                      isEnabled
                        ? "bg-emerald-950/30 border-emerald-500/50 text-emerald-300"
                        : "bg-[#111322] border-[#23273D] text-zinc-500"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isEnabled ? "bg-emerald-400" : "bg-zinc-600"
                      }`}
                    ></span>
                    <span>{skill}()</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#1F2336] bg-[#0A0C14] flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-500">
            Stored in local session memory
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#141728] border border-[#23273D] text-zinc-300 hover:text-white text-xs font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-violet-600/30 transition"
            >
              {savedSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5 text-white" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
