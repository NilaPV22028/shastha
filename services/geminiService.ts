
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the Google GenAI client using the environment variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatSession: Chat | null = null;

/**
 * Initializes or retrieves the existing chat session for SHASTHA AI.
 */
export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  // Use 'gemini-3-flash-preview' for basic conversational and cultural guidance tasks.
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are 'SHASTHA AI', the cultural concierge for Shastha Kalasamithi, a premier Chenda Melam and Theyyam group from Kerala.
      
      Tone: Respectful, traditional, authoritative yet welcoming, energetic. Use symbols like 🔥, 🥁, 🏛️, ✨.
      
      Key Info:
      - Performances: Chenda Melam (Panchari, Pandi), Theyyam (various ritual forms).
      - Occasions: Temple festivals (Poorams), Weddings, Cultural events, Stage shows.
      - Spirit: Rooted in tradition, discipline, and the divine rhythm of the drums.
      
      Keep responses brief and culturally rich. If asked about booking, guide them to the booking form or provide the contact number (fictional: +91 98765 43210).`,
    },
  });

  return chatSession;
};

/**
 * Sends a message to the Gemini model and returns the text response.
 */
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    // Use the sendMessage method which takes a message parameter.
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    // Directly access the .text property from the GenerateContentResponse.
    return response.text || "The signal from the temple is faint. Try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The drums have fallen silent. (Error connecting)";
  }
};
