const R2_BASE = "https://pub-edbe4ab918724de1b2705a13bc757cc7.r2.dev/web-images"

export function r2Image(path: string) {
  return `${R2_BASE}/${path}`
}

export const siteImages = {
  resultMockup: r2Image("result-dashboard-mockup.webp"),
  looksmaxxingSection: r2Image("looksmaxxing-section-hero.webp"),
  beardHero: r2Image("beard-styles-hero.webp"),
  faceShapes: {
    square: r2Image("face-shape-square.webp"),
    oval: r2Image("face-shape-oval.webp"),
    oblong: r2Image("face-shape-oblong.webp"),
    round: r2Image("face-shape-round.webp"),
  },
}
