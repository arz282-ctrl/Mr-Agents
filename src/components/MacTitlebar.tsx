"use client";

import React from "react";
import { Sparkles, Terminal, Shield, RefreshCw } from "lucide-react";

interface MacTitlebarProps {
  currentTheme: string;
  onSelectTheme: (theme: string) => void;
  activeBotName?: string;
  isSwarmMode?: boolean;
}

export function MacTitlebar({
  currentTheme,
  onSelectTheme,
  activeBotName,
  isSwarmMode,
}: MacTitlebarProps) {
  return (
    <div className="h-10 bg-[#0A0C14] border-b border-[#1A1D2E] flex items-center justify-between px-3.5 select-none z-30 flex-shrink-0">
      {/* macOS Traffic Light Buttons */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 group">
          <a
            href="/"
            title="Return to Landing Page"
            className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-sm inline-block cursor-pointer transition-transform hover:scale-110"
          />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-sm inline-block cursor-pointer transition-transform hover:scale-110"></span>
          <span className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-sm inline-block cursor-pointer transition-transform hover:scale-110"></span>
        </div>

        <div className="h-4 w-[1px] bg-[#23273D] ml-2 mr-1"></div>

        {/* Wordmark in Akeru Bot typography */}
        <a
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition group"
          title="Back to Landing Page"
        >
          <span className="text-[11px] font-mono font-medium text-zinc-400">
            mr. agents
          </span>
          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-violet-500/15 text-violet-300 border border-violet-500/30">
            DESKTOP
          </span>
        </a>
      </div>

      {/* Center Status / Active Context */}
      <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>
          {isSwarmMode
            ? "Swarm Room (8-Agent Mesh)"
            : activeBotName
            ? `Active: ${activeBotName}`
            : "Akeru Bot Assistant Runtime"}
        </span>
      </div>

      {/* Right Controls: Theme Selector & Registry */}
      <div className="flex items-center gap-2">
        {/* Theme Pills */}
        <div className="flex items-center gap-1 bg-[#121526] p-0.5 rounded-lg border border-[#23273D] text-[10px] font-mono">
          {[
            { id: "iris", label: "Iris", color: "#8B5CF6" },
            { id: "grove", label: "Grove", color: "#10B981" },
            { id: "ocean", label: "Ocean", color: "#06B6D4" },
            { id: "ember", label: "Ember", color: "#F59E0B" },
          ].map((theme) => (
            <button
              key={theme.id}
              onClick={() => onSelectTheme(theme.id)}
              className={`px-2 py-0.5 rounded flex items-center gap-1 transition ${
                currentTheme === theme.id
                  ? "bg-[#1E233D] text-white shadow"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: theme.color }}
              ></span>
              <span className="hidden md:inline">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
