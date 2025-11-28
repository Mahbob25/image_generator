import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        // 1. this is where we use Gemini to act as the "Designer" and create a detailed image prompt
        let refinedPrompt = prompt;
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
            const designerPrompt = `
        You are an expert graphic designer. 
        Your task is to take a user's request for a design and convert it into a highly detailed, professional image generation prompt.
        
        User Request: "${prompt}"
        
        Rules:
        1. Focus on layout, typography, colors, and style.
        2. Be specific about the visual elements.
        3. Do NOT include any conversational text. Output ONLY the prompt.
        4. If the request is vague, add creative details to make it look premium and professional.
        5. Keep the prompt under 1000 characters.
      `;

            const result = await model.generateContent(designerPrompt);
            refinedPrompt = result.response.text();
            console.log("Refined Prompt:", refinedPrompt);
        } catch (geminiError) {
            console.warn("Gemini generation failed, using raw prompt:", geminiError);
            // Fallback to raw prompt if Gemini fails
        }

        
        
        // Adding a random seed to ensure freshness if the user retries with same prompt
        const seed = Math.floor(Math.random() * 1000000);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(refinedPrompt)}?seed=${seed}&nologo=true`;

        return NextResponse.json({
            idea: refinedPrompt,
            imageUrl: imageUrl,
        });
    } catch (error) {
        console.error("Error generating design:", error);
        return NextResponse.json(
            { error: "Failed to generate design" },
            { status: 500 }
        );
    }
}
