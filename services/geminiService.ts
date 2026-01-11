import { GoogleGenAI } from "@google/genai";
import { FileType, FileTypeExtensions } from "../types";

// Initialize the Gemini API client
// Ideally, in a real env, this handles missing keys gracefully.
// Per instructions, we assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFileContent = async (
  prompt: string,
  fileType: FileType
): Promise<string> => {
  const extension = FileTypeExtensions[fileType];
  
  // Construct a specialized prompt to ensure we get raw code/text suitable for a file
  const systemPrompt = `
    You are an expert code and content generator. 
    Your task is to generate the CONTENT of a file based on the user's description.
    
    Target File Type: ${fileType}
    Target Extension: ${extension}
    
    User Request: ${prompt}
    
    IMPORTANT RULES:
    1. Return ONLY the content of the file. 
    2. Do NOT wrap the content in markdown code blocks (like \`\`\`python ... \`\`\`).
    3. Do NOT include any conversational text, introductions, or conclusions.
    4. If it is a code file, include comments where necessary for clarity.
    5. Ensure the code is production-ready and bug-free.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: systemPrompt,
      config: {
        // High temperature for creativity in content, but restricted enough for syntax
        temperature: 0.7, 
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No content generated.");
    }

    // Cleanup: Sometimes models still wrap in markdown despite instructions.
    // We strip specifically the start ```lang and end ``` if present.
    let cleanText = text.trim();
    
    // Regex to remove starting markdown block like ```html or ```
    cleanText = cleanText.replace(/^```[a-zA-Z]*\n?/, '');
    // Regex to remove ending markdown block
    cleanText = cleanText.replace(/```$/, '');

    return cleanText.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate file content. Please check your prompt and try again.");
  }
};