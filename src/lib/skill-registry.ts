import fs from "node:fs";
import path from "node:path";
import { PERSONAS } from "./personas";

export interface SkillTool {
  name: string;
  personaId?: string | "all";
  category?: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
  sourcePath?: string;
  isCustom?: boolean;
  execute?: (args: any) => Promise<any> | any;
  defaultMockResult?: (args: any) => any;
}

class SkillRegistry {
  private tools: Map<string, SkillTool> = new Map();
  private initialized: boolean = false;

  constructor() {
    this.init();
  }

  public init() {
    this.tools.clear();
    this.registerBaselineSkills();
    this.scanSkillsDirectory();
    this.initialized = true;
  }

  public reload() {
    this.init();
  }

  // Register baseline skills for all 8 personas
  private registerBaselineSkills() {
    // 1. The Orchestrator
    this.registerTool({
      name: "task_delegation",
      personaId: "orchestrator",
      category: "Swarm Orchestration",
      description: "Decompose a primary objective and assign concrete subtasks to target personas.",
      parameters: {
        type: "object",
        properties: {
          objective: { type: "string", description: "The overarching goal" },
          subtasks: {
            type: "array",
            items: {
              type: "object",
              properties: {
                targetPersona: { type: "string", description: "Persona ID to handle subtask" },
                instruction: { type: "string", description: "Clear action prompt for persona" },
                dependencies: { type: "array", items: { type: "string" } },
              },
              required: ["targetPersona", "instruction"],
            },
          },
        },
        required: ["objective", "subtasks"],
      },
      defaultMockResult: (args) => ({
        status: "delegated",
        assignedCount: args.subtasks?.length || 0,
        handoffGraph: args.subtasks?.map((s: any) => `${s.targetPersona}: ${s.instruction.slice(0, 40)}...`),
      }),
    });

    this.registerTool({
      name: "json_parsing",
      personaId: "orchestrator",
      category: "Swarm Orchestration",
      description: "Validate and transform raw agent communication strings into validated JSON schemas.",
      parameters: {
        type: "object",
        properties: {
          rawInput: { type: "string", description: "String to parse and validate" },
          schemaType: { type: "string", description: "Target schema type identifier" },
        },
        required: ["rawInput"],
      },
      defaultMockResult: (args) => {
        try {
          const parsed = JSON.parse(args.rawInput);
          return { status: "valid", parsed, schemaValid: true };
        } catch {
          return {
            status: "parsed_structured",
            data: { extracted: args.rawInput.slice(0, 100), structure: "synthesized_json" },
          };
        }
      },
    });

    this.registerTool({
      name: "goal_state_tracking",
      personaId: "orchestrator",
      category: "Swarm Orchestration",
      description: "Evaluate swarm progress towards completion and compute milestone percentage.",
      parameters: {
        type: "object",
        properties: {
          milestones: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                completed: { type: "boolean" },
                resultSummary: { type: "string" },
              },
            },
          },
        },
        required: ["milestones"],
      },
      defaultMockResult: (args) => {
        const total = args.milestones?.length || 1;
        const done = args.milestones?.filter((m: any) => m.completed)?.length || 0;
        return {
          completionRatio: done / total,
          progressPercent: `${Math.round((done / total) * 100)}%`,
          isGoalMet: done === total,
        };
      },
    });

    // 2. The UI/UX Architect
    this.registerTool({
      name: "figma_api_read",
      personaId: "architect",
      category: "Design & Frontend",
      description: "Query Figma file node trees, retrieve design tokens, color styles, and frame dimensions.",
      parameters: {
        type: "object",
        properties: {
          fileKey: { type: "string", description: "Figma project or file key" },
          nodeIds: { type: "array", items: { type: "string" }, description: "Specific frame IDs" },
        },
        required: ["fileKey"],
      },
      defaultMockResult: (args) => ({
        document: {
          name: "Design System 2026",
          tokens: {
            primary: "#8B5CF6",
            background: "#090A0F",
            surface: "#11131F",
            radius: "12px",
            font: "Inter, sans-serif",
          },
          componentsFound: ["EightPackerSidebar", "SwarmRoomView", "SkillPillCard", "TerminalConsole"],
        },
      }),
    });

    this.registerTool({
      name: "react_tailwind_gen",
      personaId: "architect",
      category: "Design & Frontend",
      description: "Generate accessible, responsive, dark-mode React 19 / Tailwind CSS components.",
      parameters: {
        type: "object",
        properties: {
          componentName: { type: "string", description: "Name of component" },
          specs: { type: "string", description: "Visual and interaction requirements" },
        },
        required: ["componentName", "specs"],
      },
      defaultMockResult: (args) => ({
        componentName: args.componentName,
        code: `export function ${args.componentName}() {\n  return (\n    <div className="rounded-xl border border-border bg-surface p-6 shadow-2xl transition hover:border-violet-500/50">\n      <h3 className="text-lg font-bold text-white">${args.componentName}</h3>\n      <p className="mt-2 text-sm text-zinc-400">${args.specs}</p>\n    </div>\n  );\n}`,
        status: "generated",
      }),
    });

    this.registerTool({
      name: "dom_parsing",
      personaId: "architect",
      category: "Design & Frontend",
      description: "Parse DOM trees to compute accessibility contrast ratios, tap target sizing, and semantic layout.",
      parameters: {
        type: "object",
        properties: {
          htmlSnippet: { type: "string", description: "Raw HTML or JSX" },
        },
        required: ["htmlSnippet"],
      },
      defaultMockResult: () => ({
        a11yScore: "100%",
        wcagCompliance: "AAA",
        tapTargetsValid: true,
        landmarks: ["header", "aside", "main", "footer"],
      }),
    });

    // 3. The Backend Builder
    this.registerTool({
      name: "db_schema_gen",
      personaId: "backend",
      category: "Backend & Systems",
      description: "Design relational SQL / SQLite schemas with indexes, primary keys, and foreign constraints.",
      parameters: {
        type: "object",
        properties: {
          entities: { type: "array", items: { type: "string" }, description: "Models to construct" },
          dialect: { type: "string", enum: ["sqlite", "postgres", "mysql"] },
        },
        required: ["entities"],
      },
      defaultMockResult: (args) => ({
        dialect: args.dialect || "sqlite",
        schemasGenerated: args.entities,
        sql: args.entities.map((e: string) => `CREATE TABLE ${e.toLowerCase()}s (id TEXT PRIMARY KEY, created_at INTEGER NOT NULL);`).join("\n"),
      }),
    });

    this.registerTool({
      name: "api_route_testing",
      personaId: "backend",
      category: "Backend & Systems",
      description: "Test API route endpoints for latency, schema validation, HTTP 200 responses, and error guards.",
      parameters: {
        type: "object",
        properties: {
          endpoint: { type: "string", description: "Route path (e.g. /api/swarm)" },
          method: { type: "string", enum: ["GET", "POST", "PUT", "DELETE"] },
          payload: { type: "object" },
        },
        required: ["endpoint"],
      },
      defaultMockResult: (args) => ({
        endpoint: args.endpoint,
        method: args.method || "POST",
        status: 200,
        latencyMs: 14,
        headers: { "content-type": "application/json" },
        validation: "passed",
      }),
    });

    this.registerTool({
      name: "nodejs_execution",
      personaId: "backend",
      category: "Backend & Systems",
      description: "Execute sandboxed Node.js algorithmic logic and micro-benchmarks.",
      parameters: {
        type: "object",
        properties: {
          code: { type: "string", description: "Javascript snippet to execute" },
        },
        required: ["code"],
      },
      defaultMockResult: (args) => ({
        executionStatus: "success",
        runtime: "Node.js v24.14.0",
        output: "Executed clean: all assertions passed.",
      }),
    });

    // 4. The Data Scraper
    this.registerTool({
      name: "puppeteer_playwright_ctrl",
      personaId: "scraper",
      category: "Web Scraping & Extraction",
      description: "Instruct headless Chromium browser to navigate, wait for selectors, and capture rendered page states.",
      parameters: {
        type: "object",
        properties: {
          url: { type: "string", description: "Target website URL" },
          waitForSelector: { type: "string" },
        },
        required: ["url"],
      },
      defaultMockResult: (args) => ({
        url: args.url,
        pageTitle: `Extracted View: ${args.url}`,
        viewport: "1920x1080",
        domNodesScraped: 342,
        networkRequests: 18,
      }),
    });

    this.registerTool({
      name: "html_parsing",
      personaId: "scraper",
      category: "Web Scraping & Extraction",
      description: "Extract structured JSON tabular data, OpenGraph tags, and article bodies from raw HTML.",
      parameters: {
        type: "object",
        properties: {
          html: { type: "string", description: "Raw markup" },
          cssSelectors: { type: "array", items: { type: "string" } },
        },
        required: ["html"],
      },
      defaultMockResult: (args) => ({
        matchedElements: 12,
        extractedFields: {
          title: "Extracted Target Content",
          metaKeywords: ["ai", "agents", "swarm", "nextjs"],
          tablesFound: 1,
        },
      }),
    });

    this.registerTool({
      name: "markdown_conversion",
      personaId: "scraper",
      category: "Web Scraping & Extraction",
      description: "Convert dense web HTML trees into clean, LLM-optimized Markdown with clean headers and lists.",
      parameters: {
        type: "object",
        properties: {
          htmlContent: { type: "string" },
        },
        required: ["htmlContent"],
      },
      defaultMockResult: () => ({
        markdown: "# Scraped Intel Brief\n\n- Key Metric: 99.98% accuracy\n- Primary Pipeline: Automated Headless Chromium\n- Status: Ready for persona digestion",
      }),
    });

    // 5. The Multimodal Marketer
    this.registerTool({
      name: "vision_image_analysis",
      personaId: "marketer",
      category: "Marketing & Growth",
      description: "Inspect visual screenshots, brand guidelines, color harmony, and ad creatives.",
      parameters: {
        type: "object",
        properties: {
          imageUrlOrBase64: { type: "string" },
          focusAreas: { type: "array", items: { type: "string" } },
        },
        required: ["imageUrlOrBase64"],
      },
      defaultMockResult: () => ({
        visualStyle: "Cyberpunk / Dark Mode Sleek",
        colorHarmony: "High contrast violet (#8B5CF6) on obsidian background",
        attentionFocalPoint: "Eight-Packer Sidebar & Swarm Workspace",
        readabilityRating: 9.8,
      }),
    });

    this.registerTool({
      name: "seo_keyword_extraction",
      personaId: "marketer",
      category: "Marketing & Growth",
      description: "Find high-converting, low-difficulty search queries and semantic topical clusters.",
      parameters: {
        type: "object",
        properties: {
          seedTopic: { type: "string" },
        },
        required: ["seedTopic"],
      },
      defaultMockResult: (args) => ({
        seed: args.seedTopic,
        clusters: [
          { keyword: "autonomous multi agent workspace", volume: 14200, difficulty: "low" },
          { keyword: "local agent hub and spoke nextjs", volume: 8900, difficulty: "low" },
          { keyword: "extensible skill registry mcp", volume: 6400, difficulty: "medium" },
        ],
      }),
    });

    this.registerTool({
      name: "social_platform_formatting",
      personaId: "marketer",
      category: "Marketing & Growth",
      description: "Format campaign copy specifically for Twitter/X threads, LinkedIn carousels, and Product Hunt launches.",
      parameters: {
        type: "object",
        properties: {
          content: { type: "string" },
          platform: { type: "string", enum: ["twitter", "linkedin", "producthunt"] },
        },
        required: ["content", "platform"],
      },
      defaultMockResult: (args) => ({
        platform: args.platform,
        hook: `🚀 Meet Master Mr. Agents: The 8-persona autonomous AI workstation.`,
        body: args.content,
        hashtags: ["#AIAgents", "#DevCommunity", "#OpenSource", "#MultiAgent"],
      }),
    });

    // 6. The Sales Closer
    this.registerTool({
      name: "crm_data_reading",
      personaId: "closer",
      category: "Sales & Revenue",
      description: "Query CRM records (HubSpot/Salesforce schema) for deal stages, contract sizes, and lead touchpoints.",
      parameters: {
        type: "object",
        properties: {
          leadIdOrCompany: { type: "string" },
        },
        required: ["leadIdOrCompany"],
      },
      defaultMockResult: (args) => ({
        company: args.leadIdOrCompany,
        stage: "Discovery / Technical Proof of Concept",
        contractValueEstimate: "$48,000 ARR",
        decisionMaker: "VP of Engineering",
        championIdentified: true,
      }),
    });

    this.registerTool({
      name: "email_drafting",
      personaId: "closer",
      category: "Sales & Revenue",
      description: "Draft high-converting, objection-dissolving cold and warm sales emails.",
      parameters: {
        type: "object",
        properties: {
          prospectName: { type: "string" },
          valueProp: { type: "string" },
          callToAction: { type: "string" },
        },
        required: ["prospectName", "valueProp"],
      },
      defaultMockResult: (args) => ({
        subject: `Quick idea on scaling multi-agent architecture for ${args.prospectName}`,
        body: `Hi ${args.prospectName},\n\nNoticed your team is exploring modular AI toolchains. ${args.valueProp}\n\nWould you be open to a 10-minute preview on Thursday?\n\nBest,\nMaster Mr. Agents Team`,
      }),
    });

    this.registerTool({
      name: "lead_qualification_logic",
      personaId: "closer",
      category: "Sales & Revenue",
      description: "Score inbound/outbound leads against MEDDPICC / BANT frameworks.",
      parameters: {
        type: "object",
        properties: {
          leadProfile: { type: "object" },
        },
        required: ["leadProfile"],
      },
      defaultMockResult: () => ({
        qualificationScore: 92,
        verdict: "High Intent Enterprise Tier",
        budgetVerified: true,
        authorityConfirmed: true,
      }),
    });

    // 7. The DevOps Engineer
    this.registerTool({
      name: "docker_execution",
      personaId: "devops",
      category: "Infrastructure & Deployment",
      description: "Author Docker container setups, check compose configs, and verify multi-stage builds.",
      parameters: {
        type: "object",
        properties: {
          serviceName: { type: "string" },
          image: { type: "string" },
          portBindings: { type: "array", items: { type: "string" } },
        },
        required: ["serviceName"],
      },
      defaultMockResult: (args) => ({
        container: `${args.serviceName}-container`,
        status: "configured",
        dockerfile: `FROM node:24-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install --production\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "start"]`,
      }),
    });

    this.registerTool({
      name: "log_reading",
      personaId: "devops",
      category: "Infrastructure & Deployment",
      description: "Filter and analyze structured server/container logs, identifying fatal errors and anomalies.",
      parameters: {
        type: "object",
        properties: {
          logLines: { type: "string" },
        },
        required: ["logLines"],
      },
      defaultMockResult: () => ({
        anomaliesFound: 0,
        memoryUsage: "142MB",
        healthStatus: "100% HEALTHY",
        uptimeSeconds: 84920,
      }),
    });

    this.registerTool({
      name: "bash_terminal_commands",
      personaId: "devops",
      category: "Infrastructure & Deployment",
      description: "Safely compose Bash shell commands for deployments, git workflows, and system inspection.",
      parameters: {
        type: "object",
        properties: {
          command: { type: "string" },
        },
        required: ["command"],
      },
      defaultMockResult: (args) => ({
        command: args.command,
        exitCode: 0,
        stdout: `Executing: ${args.command}\nOK [completed in 4ms]`,
      }),
    });

    // 8. The QA Tester
    this.registerTool({
      name: "unit_testing",
      personaId: "qa",
      category: "Testing & Verification",
      description: "Generate rigorous unit and integration test specs for functions, APIs, and edge cases.",
      parameters: {
        type: "object",
        properties: {
          targetFunctionOrModule: { type: "string" },
          framework: { type: "string", enum: ["vitest", "jest"] },
        },
        required: ["targetFunctionOrModule"],
      },
      defaultMockResult: (args) => ({
        framework: args.framework || "vitest",
        testCasesGenerated: 5,
        testSuite: `describe("${args.targetFunctionOrModule}", () => {\n  it("should handle nominal input correctly", () => {\n    expect(true).toBe(true);\n  });\n  it("should guard against invalid types and nulls", () => {\n    expect(() => {}).not.toThrow();\n  });\n});`,
      }),
    });

    this.registerTool({
      name: "error_stack_trace_analysis",
      personaId: "qa",
      category: "Testing & Verification",
      description: "Deconstruct TypeScript/JavaScript stack traces, finding the origin file and exact fix recommendation.",
      parameters: {
        type: "object",
        properties: {
          stackTrace: { type: "string" },
        },
        required: ["stackTrace"],
      },
      defaultMockResult: (args) => ({
        rootCause: "Null reference or undefined variable in execution context",
        suggestedFix: "Add optional chaining (?.) or assert schema validity using Zod before property access.",
        riskLevel: "low",
      }),
    });

    this.registerTool({
      name: "dependency_checking",
      personaId: "qa",
      category: "Testing & Verification",
      description: "Audit package dependencies against security advisories and version lock compatibility.",
      parameters: {
        type: "object",
        properties: {
          packageJsonContent: { type: "string" },
        },
      },
      defaultMockResult: () => ({
        criticalVulnerabilities: 0,
        peerDependencyWarnings: 0,
        licenseAudit: "MIT / Apache-2.0 compliant",
        status: "APPROVED FOR PRODUCTION",
      }),
    });
  }

  // Scan root /skills folder for any new dropped tools (.json, .js, .ts, or MCP format)
  private scanSkillsDirectory() {
    const skillsDir = path.join(process.cwd(), "skills");
    if (!fs.existsSync(skillsDir)) {
      fs.mkdirSync(skillsDir, { recursive: true });
      return;
    }

    const scanDir = (dir: string) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          scanDir(fullPath);
        } else if (entry.isFile()) {
          if (entry.name.endsWith(".json")) {
            try {
              const fileContent = fs.readFileSync(fullPath, "utf-8");
              const parsed = JSON.parse(fileContent);

              // Check if it's a valid skill/tool definition or an MCP manifest
              if (parsed.name && parsed.description) {
                this.registerCustomToolFromJson(parsed, fullPath);
              } else if (Array.isArray(parsed.tools)) {
                // MCP-style manifest containing multiple tools
                for (const tool of parsed.tools) {
                  this.registerCustomToolFromJson(tool, fullPath);
                }
              }
            } catch (err: any) {
              console.warn(`[SkillRegistry] Failed to parse JSON tool at ${fullPath}:`, err.message);
            }
          } else if (entry.name.endsWith(".js") || entry.name.endsWith(".mjs")) {
            try {
              // Dynamic module evaluation via function wrapper
              const content = fs.readFileSync(fullPath, "utf-8");
              const m = { exports: {} as any };
              const fn = new Function("module", "exports", "require", content);
              fn(m, m.exports, (modName: string) => require(modName));
              const toolDef = m.exports?.default || m.exports;
              if (toolDef && toolDef.name && toolDef.description) {
                this.registerTool({
                  ...toolDef,
                  sourcePath: fullPath,
                  isCustom: true,
                });
              }
            } catch (err: any) {
              console.warn(`[SkillRegistry] Failed to load JS skill at ${fullPath}:`, err.message);
            }
          }
        }
      }
    };

    scanDir(skillsDir);
    console.log(`[SkillRegistry] Total loaded skills: ${this.tools.size}`);
  }

  private registerCustomToolFromJson(data: any, filePath: string) {
    const tool: SkillTool = {
      name: data.name,
      personaId: data.personaId || "all",
      category: data.category || "Custom Plugin",
      description: data.description || "Dynamically loaded tool",
      parameters: data.parameters || {
        type: "object",
        properties: {},
      },
      sourcePath: filePath,
      isCustom: true,
      defaultMockResult: (args) => {
        if (data.mockResult) return data.mockResult;
        return {
          status: "success",
          toolExecuted: data.name,
          receivedArgs: args,
          autoLoadedFrom: path.relative(process.cwd(), filePath),
          timestamp: new Date().toISOString(),
        };
      },
    };

    this.registerTool(tool);
  }

  public registerTool(tool: SkillTool) {
    this.tools.set(tool.name, tool);
  }

  public getTool(name: string): SkillTool | undefined {
    return this.tools.get(name);
  }

  public getAllTools(): SkillTool[] {
    return Array.from(this.tools.values());
  }

  public getToolsForPersona(personaId: string): SkillTool[] {
    return Array.from(this.tools.values()).filter(
      (t) => t.personaId === personaId || t.personaId === "all" || !t.personaId
    );
  }

  public async executeTool(toolName: string, args: any): Promise<any> {
    const tool = this.tools.get(toolName);
    if (!tool) {
      throw new Error(`Tool "${toolName}" not found in Skill Registry.`);
    }

    if (tool.execute) {
      return await tool.execute(args);
    }

    if (tool.defaultMockResult) {
      return tool.defaultMockResult(args);
    }

    return {
      status: "success",
      message: `Executed tool ${toolName} with parameters.`,
      args,
    };
  }
}

// Singleton instance
export const skillRegistry = new SkillRegistry();
