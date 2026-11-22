"use client";

import React from "react";
import Link from "next/link";
import { Persona } from "@/lib/personas";
import { PersonaIcon } from "./PersonaIcon";

interface SidebarProps {
  personas: Persona[];
  selectedPersona: Persona;
  onSelectPersona: (persona: Persona) => void;
}

export function Sidebar({
  personas,
  selectedPersona,
  onSelectPersona,
}: SidebarProps) {
  return (
    <aside className="w-60 flex-shrink-0 border-r border-white/[0.06] bg-[#0B0C10] flex flex-col h-full select-none">
      {/* Minimal Brand Wordmark */}
      <div className="px-4 pt-5 pb-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-100 hover:text-white transition-colors"
        >
          <span className="h-2 w-2 rounded-full bg-zinc-100" />
          <span className="font-mono">mr. agents</span>
        </Link>
      </div>

      {/* Minimal Persona Character List */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-2 space-y-1">
        {personas.map((persona) => {
          const isSelected = selectedPersona.id === persona.id;

          return (
            <button
              key={persona.id}
              type="button"
              onClick={() => onSelectPersona(persona)}
              className={`group w-full px-3 py-2.5 rounded-xl flex items-center gap-3 text-left transition-all duration-150 ease-out active:scale-[0.98] cursor-pointer ${
                isSelected
                  ? "bg-white/[0.07] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.03]"
              }`}
            >
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-150 ease-out group-hover:scale-105"
                style={{
                  backgroundColor: isSelected
                    ? `${persona.color}22`
                    : "rgba(255, 255, 255, 0.04)",
                  color: isSelected ? persona.color : "#A1A1AA",
                  border: isSelected
                    ? `1px solid ${persona.color}40`
                    : "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <PersonaIcon name={persona.iconName} className="h-3.5 w-3.5" />
              </div>

              <span className="text-[13px] font-medium truncate">
                {persona.name}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
