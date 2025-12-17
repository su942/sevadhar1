import { GoogleGenAI, Type } from "@google/genai";
import { Service } from '../../types';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartRecommendations = async (userQuery: string, availableServices: Service[]) => {
  try {
    const serviceList = availableServices.map(s => `ID: ${s.id}, Title: ${s.title}, Category: ${s.categoryId}, Desc: ${s.description}`).join('\n');

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an intelligent home service assistant. A user has a request: "${userQuery}".
      
      Here is the list of available services:
      ${serviceList}
      
      Analyze the user's request and match it to the most relevant services (max 3).
      Return the result in JSON format with a list of matching 'serviceIds' and a short 'reasoning' (one sentence) explaining why you chose them.
      If no services match, return an empty array for serviceIds.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            serviceIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            reasoning: { type: Type.STRING }
          },
          required: ["serviceIds", "reasoning"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { serviceIds: [], reasoning: "Sorry, I couldn't connect to the smart assistant right now." };
  }
};

export const generateSmartReviewSummary = async (serviceTitle: string) => {
  try {
     const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a brief, 2-sentence summary of what customers typically love about a "${serviceTitle}" service. Make it sound like an aggregated review summary (e.g., "Customers love...").`,
    });
    return response.text;
  } catch (error) {
    return "Top rated service by customers.";
  }
}
