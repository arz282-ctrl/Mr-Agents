module.exports = {
  name: "math_optimizer",
  personaId: "backend",
  category: "Dynamic Math Engine",
  description: "Auto-discovered JS tool: Evaluates mathematical and resource allocation equations for backend scaling.",
  parameters: {
    type: "object",
    properties: {
      expression: {
        type: "string",
        description: "Math equation to compute, e.g. '1000 * 24 * 0.05'",
      },
    },
    required: ["expression"],
  },
  execute: async (args) => {
    try {
      // Safe sanitized arithmetic evaluation
      const sanitized = args.expression.replace(/[^0-9+\-*/().]/g, "");
      // eslint-disable-next-line no-eval
      const result = Function(`"use strict"; return (${sanitized})`)();
      return {
        status: "success",
        expression: args.expression,
        evaluatedResult: result,
        executedBy: "Custom Dynamic Plugin (calculator_tool.js)",
        timestamp: new Date().toISOString(),
      };
    } catch (e) {
      return { status: "error", message: e.message };
    }
  },
};
