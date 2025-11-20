import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generic Chat with Gemini 3 Pro (General Purpose + Image Understanding)
 */
export const chatWithGemini = async (
  message: string,
  history: { role: string; parts: { text?: string }[] }[],
  imageBase64?: string
) => {
  try {
    const modelId = 'gemini-3-pro-preview';
    
    // If image is present, use generateContent (single turn mostly, or simple chat structure)
    // For simplicity in this specific app context, we handle image queries as single shot or use chat if text only.
    if (imageBase64) {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: {
            parts: [
                { inlineData: { mimeType: 'image/jpeg', data: imageBase64.split(',')[1] } },
                { text: message }
            ]
        }
      });
      return { text: response.text, grounding: null };
    }

    // Text-only chat
    const chat = ai.chats.create({
      model: modelId,
      history: history,
      config: {
          systemInstruction: "You are a helpful, expert AI assistant for the ToolBox Suite application."
      }
    });

    const response = await chat.sendMessage({ message });
    return { text: response.text, grounding: null };

  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
};

/**
 * Fast Text Tasks using Gemini 2.5 Flash
 * Used for: Paraphrasing, Grammar, Tone Change, Simple Generators
 */
export const fastTextTask = async (prompt: string, systemInstruction?: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are a helpful concise assistant.",
      }
    });
    return response.text || "";
  } catch (error) {
    console.error("Fast Task Error:", error);
    return "Error generating response.";
  }
};

/**
 * Complex Logic / Coding Tasks using Thinking Mode
 * Used for: Bug Fixing, Code Optimization, Code Generation
 * Model: gemini-3-pro-preview with thinkingBudget
 */
export const thinkingCodeTask = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }, // Max budget for deep reasoning
      }
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Thinking Task Error:", error);
    return "Error analyzing code. The model might be overloaded.";
  }
};

/**
 * Grounded Search using Gemini 2.5 Flash
 * Used for: Fact-checking, recent info, "Ask Google" features
 */
export const searchGroundedQuery = async (query: string): Promise<{ text: string; sources: any[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks.map((c: any) => c.web).filter((w: any) => w);

    return { 
        text: response.text || "No result found.", 
        sources: sources 
    };
  } catch (error) {
    console.error("Search Error:", error);
    return { text: "Failed to search.", sources: [] };
  }
};

/**
 * Specific Wrappers
 */

export const explainRegex = async (regex: string, testString: string): Promise<string> => {
  return fastTextTask(
      `Explain this regular expression: /${regex}/. Test string: "${testString}". Breakdown tokens.`,
      "You are a regex expert."
  );
};

export const checkGrammar = async (text: string): Promise<string> => {
  return fastTextTask(
      `Fix grammar/spelling. Return ONLY the corrected text. Text: "${text}"`,
      "You are a copy editor."
  );
};

export const generateTitles = async (content: string): Promise<string[]> => {
  try {
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Generate 5 headlines for: "${content.substring(0, 500)}..."`,
          config: {
              responseMimeType: "application/json",
              responseSchema: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
              }
          }
      });
      return JSON.parse(response.text || "[]");
  } catch (e) { return []; }
};

export const paraphraseText = async (text: string, tone: string): Promise<string> => {
    return fastTextTask(`Rewrite to be ${tone}: "${text}"`);
};