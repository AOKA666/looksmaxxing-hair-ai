import type { Metadata } from "next"
import { ResultView } from "@/components/result-view"

export const metadata: Metadata = {
  title: "Example Result | Looksmaxxing Hair AI",
  description: "Preview an example face shape result with haircut and beard recommendations.",
}

export default function ResultDemoPage() {
  return <ResultView />
}
