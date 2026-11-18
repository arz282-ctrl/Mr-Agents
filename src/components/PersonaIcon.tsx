"use client";

import React from "react";
import {
  Workflow,
  PenTool,
  Database,
  ScanSearch,
  Megaphone,
  Target,
  Container,
  ShieldCheck,
  Bot,
  LucideProps,
} from "lucide-react";

interface PersonaIconProps extends LucideProps {
  name: string;
}

export function PersonaIcon({ name, ...props }: PersonaIconProps) {
  switch (name) {
    case "Compass":
    case "Workflow":
      return <Workflow {...props} />;
    case "Palette":
    case "PenTool":
      return <PenTool {...props} />;
    case "Cpu":
    case "Database":
      return <Database {...props} />;
    case "Terminal":
    case "ScanSearch":
      return <ScanSearch {...props} />;
    case "Sparkles":
    case "Megaphone":
      return <Megaphone {...props} />;
    case "Flame":
    case "Target":
      return <Target {...props} />;
    case "Server":
    case "Container":
      return <Container {...props} />;
    case "ShieldCheck":
      return <ShieldCheck {...props} />;
    default:
      return <Bot {...props} />;
  }
}
