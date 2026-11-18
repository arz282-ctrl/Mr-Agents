import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mr. Agents | Autonomous Multi-Agent Workforce & Swarm Mesh",
  description:
    "Production-grade 8-agent AI workforce with autonomous Swarm Mode, dynamic tool registry, and multi-model execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#09090b] text-zinc-100 font-sans antialiased selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
