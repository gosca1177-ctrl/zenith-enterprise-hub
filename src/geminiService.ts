/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeMarket(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are a senior market analyst for a multi-asset platform. Provide concise, data-driven insights.",
    },
  });
  return response.text;
}

export async function generateLeadSuggestions(propertyDetails: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Based on this property: ${propertyDetails}, suggest 3 target buyer personas and marketing hooks.`,
  });
  return response.text;
}
