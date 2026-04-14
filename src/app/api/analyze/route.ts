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

const ANALYSIS_PROMPT = `你是一个世界顶级的男士形象设计师和理发师。请分析用户上传的照片，并严格按照以下 JSON 格式输出深度分析报告：
face_shape: (枚举：Square, Round, Oval, Diamond, Heart, Oblong)
jawline_sharpness: (1-10的评分)
cheekbone_prominence: (1-10的评分)
forehead_width: (Narrow, Medium, Wide)
face_analysis_text: (一段充满同理心、像专家一样点评他面部优势的文字，2-3句话)
best_hairstyles: (推荐3款具体发型名称，必须包含向理发师沟通的3条具体指令)
beard_recommendation: (强力加分项！基于他的脸型，推荐留什么胡子，例如 5 o'clock shadow 或 Goatee)
avoid_styles: (千万不要留的2款发型)

额外要求：
1. 只输出 JSON，不要输出 markdown，不要输出解释。
2. best_hairstyles 请输出为字符串数组，只包含3个发型名。
3. 向理发师沟通的3条具体指令请单独输出到 barber_instructions 数组中。
4. avoid_styles 请输出为字符串数组，只包含2个发型名。`

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
        response_format: { type: "json_object" },
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
