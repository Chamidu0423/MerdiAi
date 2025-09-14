export interface LLMSettings {
  modelName: string;
  apiKey: string;
}

export interface LLMResponse {
  success: boolean;
  mermaidCode?: string;
  error?: string;
}

export class LLMService {
  private static getSettings(): LLMSettings | null {
    try {
      const settings = localStorage.getItem("merdiai-settings");
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      console.error("Error reading settings from localStorage:", error);
      return null;
    }
  }

  static async generateMermaidDiagram(userText: string): Promise<LLMResponse> {
    const settings = this.getSettings();

    if (!settings || !settings.apiKey || !settings.modelName) {
      return {
        success: false,
        error: "Please configure your API settings in the Settings page first.",
      };
    }

    try {
      const isOpenRouterKey = settings.apiKey.startsWith("sk-or-v1");
      const isOpenAI =
        settings.modelName.toLowerCase().includes("gpt") && !isOpenRouterKey;
      const isClaude =
        settings.modelName.toLowerCase().includes("claude") && !isOpenRouterKey;

      console.log(
        "API Key type:",
        isOpenRouterKey ? "OpenRouter" : "Direct Provider"
      );
      console.log("Model name:", settings.modelName);
      console.log(
        "Routing to:",
        isOpenAI ? "OpenAI" : isClaude ? "Anthropic" : "OpenRouter"
      );

      let apiUrl = "";
      let headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      let requestBody: any = {};

      const systemPrompt = `You are an expert at creating Mermaid.js diagrams. Generate a Mermaid diagram based on the user's text description. 

CRITICAL RULES:
1. Return ONLY the Mermaid code without any explanations, markdown formatting, or code blocks
2. Do NOT include \`\`\`mermaid or \`\`\` in your response
3. Do NOT include --- dashes or any other decorative elements
4. Start directly with the diagram type (e.g., "graph TD", "sequenceDiagram", "classDiagram", etc.)
5. End with the last diagram element - no extra formatting
6. Choose the most appropriate diagram type for the scenario
7. Use clear, descriptive node labels
8. Make the diagram comprehensive but not overly complex

EXAMPLE CORRECT FORMAT:
graph TD
A[Start] --> B{Decision?}
B --> C[Option 1]
B --> D[Option 2]

Common diagram types:
- graph TD/LR: For flowcharts and process flows
- sequenceDiagram: For interactions between entities over time
- classDiagram: For object-oriented relationships
- erDiagram: For database relationships
- gitgraph: For git workflows
- journey: For user journeys
- gantt: For project timelines

Remember: Return ONLY valid Mermaid syntax, nothing else!`;

      if (isOpenAI) {
        // Direct OpenAI API
        apiUrl = "https://api.openai.com/v1/chat/completions";
        headers["Authorization"] = `Bearer ${settings.apiKey}`;
        requestBody = {
          model: settings.modelName,
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: userText,
            },
          ],
          max_tokens: 1000,
          temperature: 0.3,
        };
      } else if (isClaude) {
        // Direct Anthropic API
        apiUrl = "https://api.anthropic.com/v1/messages";
        headers["x-api-key"] = settings.apiKey;
        headers["anthropic-version"] = "2023-06-01";
        requestBody = {
          model: settings.modelName,
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `${systemPrompt}\n\nUser request: ${userText}`,
            },
          ],
        };
      } else {
        // OpenRouter API (unified endpoint for multiple providers)
        apiUrl = "https://openrouter.ai/api/v1/chat/completions";
        headers["Authorization"] = `Bearer ${settings.apiKey}`;
        headers["HTTP-Referer"] =
          typeof window !== "undefined"
            ? window.location.origin
            : "https://localhost:3000";
        headers["X-Title"] = "MerdiAI";
        requestBody = {
          model: settings.modelName,
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: userText,
            },
          ],
          max_tokens: 1000,
          temperature: 0.3,
        };
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.text();
        return {
          success: false,
          error: `API Error (${response.status}): ${errorData}`,
        };
      }

      const data = await response.json();

      let mermaidCode = "";

      if (isOpenAI || isOpenRouterKey) {
        // OpenAI format (used by OpenAI directly and OpenRouter)
        mermaidCode = data.choices?.[0]?.message?.content?.trim() || "";
      } else if (isClaude) {
        // Anthropic format
        mermaidCode = data.content?.[0]?.text?.trim() || "";
      }

      if (!mermaidCode) {
        return {
          success: false,
          error: "No diagram code received from the API",
        };
      }

      mermaidCode = mermaidCode
        .replace(/```mermaid\s*/g, "")
        .replace(/```\s*/g, "")
        .replace(/^---+\s*/g, "") // Remove leading dashes
        .replace(/\s*---+$/g, "") // Remove trailing dashes
        .replace(/^[\s\n]*/, "") // Remove leading whitespace and newlines
        .replace(/[\s\n]*$/, "") // Remove trailing whitespace and newlines
        .trim();

      if (!mermaidCode || mermaidCode.length < 5) {
        return {
          success: false,
          error: "Received empty or invalid diagram code from the API",
        };
      }

      console.log("Cleaned Mermaid code:", mermaidCode);

      return {
        success: true,
        mermaidCode,
      };
    } catch (error) {
      console.error("Error calling LLM API:", error);
      return {
        success: false,
        error: `Network error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  }
}
