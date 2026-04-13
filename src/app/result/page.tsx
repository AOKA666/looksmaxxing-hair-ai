import type { Metadata } from "next"
import { ResultView } from "@/components/result-view"

export const metadata: Metadata = {
  title: "Result | Looksmaxxing Hair AI",
  description: "Review your face shape result with haircut and beard recommendations.",
}

export default function ResultPage() {
  return <ResultView allowPreviewImage />
}
