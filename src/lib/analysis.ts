export type FaceShape = "Square" | "Round" | "Oval" | "Diamond" | "Heart" | "Oblong"
export type ForeheadWidth = "Narrow" | "Medium" | "Wide"

export type AnalysisResult = {
  face_shape: FaceShape
  jawline_sharpness: number
  cheekbone_prominence: number
  forehead_width: ForeheadWidth
  face_analysis_text: string
  best_hairstyles: string[]
  barber_instructions: string[]
  beard_recommendation: string
  avoid_styles: string[]
}

export const fallbackAnalysis: AnalysisResult = {
  face_shape: "Square",
  jawline_sharpness: 8,
  cheekbone_prominence: 7,
  forehead_width: "Wide",
  face_analysis_text:
    "You have strong facial structure with a defined jawline and balanced proportions. That gives you a masculine foundation that works especially well with haircuts that add texture and direction rather than extra width.",
  best_hairstyles: ["Textured Crop", "Angular Quiff", "Side Part"],
  barber_instructions: [
    "Keep the sides clean but not too bulky.",
    "Leave texture and some lift on top.",
    "Avoid making the overall shape too boxy.",
  ],
  beard_recommendation: "Heavy stubble or a short boxed beard will usually sharpen your jawline without making the lower face look too heavy.",
  avoid_styles: ["Flat boxy crop", "Heavy wide fringe"],
}

function sanitizeString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback
}

function sanitizeNumber(value: unknown, fallback: number) {
  const num = Number(value)
  if (Number.isFinite(num)) {
    return Math.min(10, Math.max(1, Math.round(num)))
  }
  return fallback
}

function sanitizeStringArray(value: unknown, fallback: string[]) {
  if (Array.isArray(value)) {
    const cleaned = value.map((item) => String(item).trim()).filter(Boolean)
    if (cleaned.length) return cleaned
  }
  return fallback
}

export function normalizeAnalysisResult(input: unknown): AnalysisResult {
  const obj = typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {}

  const faceShape = sanitizeString(obj.face_shape, fallbackAnalysis.face_shape) as FaceShape
  const foreheadWidth = sanitizeString(obj.forehead_width, fallbackAnalysis.forehead_width) as ForeheadWidth

  const bestHairstylesRaw = sanitizeStringArray(obj.best_hairstyles, fallbackAnalysis.best_hairstyles)
  const barberInstructions = sanitizeStringArray(
    obj.barber_instructions,
    fallbackAnalysis.barber_instructions,
  )

  return {
    face_shape: (["Square", "Round", "Oval", "Diamond", "Heart", "Oblong"].includes(faceShape)
      ? faceShape
      : fallbackAnalysis.face_shape) as FaceShape,
    jawline_sharpness: sanitizeNumber(obj.jawline_sharpness, fallbackAnalysis.jawline_sharpness),
    cheekbone_prominence: sanitizeNumber(obj.cheekbone_prominence, fallbackAnalysis.cheekbone_prominence),
    forehead_width: (["Narrow", "Medium", "Wide"].includes(foreheadWidth)
      ? foreheadWidth
      : fallbackAnalysis.forehead_width) as ForeheadWidth,
    face_analysis_text: sanitizeString(obj.face_analysis_text, fallbackAnalysis.face_analysis_text),
    best_hairstyles: bestHairstylesRaw.slice(0, 3),
    barber_instructions: barberInstructions.slice(0, 3),
    beard_recommendation: sanitizeString(obj.beard_recommendation, fallbackAnalysis.beard_recommendation),
    avoid_styles: sanitizeStringArray(obj.avoid_styles, fallbackAnalysis.avoid_styles).slice(0, 2),
  }
}
