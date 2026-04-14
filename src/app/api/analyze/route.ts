import { NextResponse } from "next/server"
import { normalizeAnalysisResult } from "@/lib/analysis"

export const runtime = "nodejs"

type SiliconFlowResponse = {
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
}

const ANALYSIS_PROMPT = `You are a world-class men's image consultant and barber. Analyze the user's uploaded photo and return a deep analysis report in strict JSON using English only.

Return exactly these fields:
face_shape: one of Square, Round, Oval, Diamond, Heart, Oblong
jawline_sharpness: integer score from 1 to 10
cheekbone_prominence: integer score from 1 to 10
forehead_width: one of Narrow, Medium, Wide
face_analysis_text: 2-3 empathetic expert sentences in English describing the user's strengths and facial advantages
best_hairstyles: an array with exactly 3 specific hairstyle names in English
barber_instructions: an array with exactly 3 clear instructions in English that the user can tell a barber
beard_recommendation: one strong beard recommendation in English based on the user's face shape
avoid_styles: an array with exactly 2 hairstyle names in English to avoid

Rules:
1. Output English only.
2. Output JSON only.
3. Do not output markdown.
4. Do not output explanations.
5. Do not output code fences.
6. The response must be a single object that can be parsed directly by JSON.parse().`

function extractJsonObject(raw: string) {
  const fenced = raw.match(/```json\s*([\s\S]*?)```/i)
  const candidate = fenced?.[1] ?? raw
  const start = candidate.indexOf("{")
  const end = candidate.lastIndexOf("}")
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Model did not return a JSON object")
  }
  return candidate.slice(start, end + 1)
}

export async function POST(request: Request) {
  try {
    const { imageDataUrl } = (await request.json()) as { imageDataUrl?: string }

    if (!imageDataUrl || !imageDataUrl.startsWith("data:image/")) {
      return NextResponse.json({ error: "Missing imageDataUrl" }, { status: 400 })
    }

    const apiKey = process.env.SILICONFLOW_API_KEY
    const model = process.env.SILICONFLOW_VISION_MODEL || "Qwen/Qwen2.5-VL-72B-Instruct"

    if (!apiKey) {
      return NextResponse.json({ error: "SILICONFLOW_API_KEY is not configured" }, { status: 500 })
    }

    const response = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: imageDataUrl,
                  detail: "high",
                },
              },
              {
                type: "text",
                text: ANALYSIS_PROMPT,
              },
            ],
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: errorText || "SiliconFlow request failed" }, { status: 500 })
    }

    const data = (await response.json()) as SiliconFlowResponse
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return NextResponse.json({ error: "SiliconFlow returned empty content" }, { status: 500 })
    }

    const parsed = JSON.parse(extractJsonObject(content))
    const normalized = normalizeAnalysisResult(parsed)

    return NextResponse.json({ result: normalized })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
