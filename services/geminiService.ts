import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Ensure API key availability
const ai = new GoogleGenAI({ apiKey });

export const generateStyleAdvice = async (userQuery: string, context: string = ''): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are a Gen Z fashion stylist for ReVibe, a sustainable fashion app. 
    Your tone is trendy, supportive, and eco-conscious. 
    Focus on styling tips that involve layering, mixing vintage with modern, and upcycling.
    Keep responses concise (under 100 words) and use emojis occasionally.`;
    
    const response = await ai.models.generateContent({
      model,
      contents: `Context: ${context}. User Question: ${userQuery}`,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I couldn't generate advice right now. Try again!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the fashion mainframe. Try again later!";
  }
};

export const generateOutfitDescription = async (items: string[]): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model,
      contents: `Create a catchy, 1-sentence caption for an outfit containing these items: ${items.join(', ')}. Include 2 relevant hashtags.`,
    });
    return response.text || "Cool fit! #ReVibe";
  } catch (error) {
    return "Check out this look! #SustainableStyle";
  }
};