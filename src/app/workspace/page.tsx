"use client";

import React, { useState, useEffect } from "react";
import { PERSONAS, Persona } from "@/lib/personas";
import { Sidebar } from "@/components/Sidebar";
import { ActiveWorkspace } from "@/components/ActiveWorkspace";
import { SkillsModal } from "@/components/SkillsModal";

export default function WorkspacePage() {
  const [selectedPersona, setSelectedPersona] = useState<Persona>(PERSONAS[0]);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/skills").catch(() => null);
  }, []);

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[#08090A] text-zinc-100 font-sans">
      <Sidebar
        personas={PERSONAS}
        selectedPersona={selectedPersona}
        onSelectPersona={(persona) => setSelectedPersona(persona)}
      />

      <section className="flex-1 flex flex-col h-full overflow-hidden">
        <ActiveWorkspace
          persona={selectedPersona}
          onOpenSkills={() => setIsSkillsModalOpen(true)}
        />
      </section>

      <SkillsModal
        isOpen={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
        onReloadSkills={() => {}}
      />
    </main>
  );
}
