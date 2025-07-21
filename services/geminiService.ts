
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateExcuse = async (): Promise<string> => {
    if (!process.env.API_KEY) {
        return "Sorry, the excuse generator is currently offline. How about: 'I have to return some videotapes.'";
    }

    try {
        const prompt = "Generate a short, creative, and slightly funny excuse for needing to leave a social situation or a date unexpectedly. The excuse should be believable but quirky. Keep it under 20 words.";

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.9,
                topK: 50,
                topP: 0.95,
            }
        });

        const text = response.text.trim();
        // Remove quotes if the model returns them
        return text.replace(/^"|"$/g, '');
    } catch (error) {
        console.error("Error generating excuse with Gemini API:", error);
        return "My cat just texted me, it's an emergency. I have to go!";
    }
};
