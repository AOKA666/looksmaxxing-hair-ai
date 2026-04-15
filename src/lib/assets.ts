const R2_BASE = "https://pub-edbe4ab918724de1b2705a13bc757cc7.r2.dev/web-images"

export function r2Image(path: string) {
  return `${R2_BASE}/${path}`
}

export const siteImages = {
  hero: r2Image("hero-looksmaxxing-hair-ai.webp"),
  howItWorks: r2Image("how-it-works-face-analysis.webp"),
  resultMockup: r2Image("result-dashboard-mockup.webp"),
  looksmaxxingSection: r2Image("looksmaxxing-section-hero.webp"),
  beardHero: r2Image("beard-styles-hero.webp"),
  faceShapes: {
    square: r2Image("face-shape-square-man.webp"),
    oval: r2Image("face-shape-oval-man.webp"),
    oblong: r2Image("face-shape-oblong-man.webp"),
    round: r2Image("face-shape-round-man.webp"),
  },
}
