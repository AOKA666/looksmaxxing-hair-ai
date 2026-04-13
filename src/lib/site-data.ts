export type BlogPost = {
  slug: string
  title: string
  description: string
  category: string
  date: string
  content: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "best-haircuts-for-square-face-men",
    title: "Best Haircuts for Square Face Men",
    description: "Haircuts that sharpen a strong jawline without making a square face look too boxy.",
    category: "Haircuts",
    date: "2026-04-13",
    content: [
      "Square faces already look strong. The haircut should add height, texture, and direction instead of piling on extra width.",
      "The safest winners are textured crops, side parts, angular quiffs, crew cuts with lift, and taper fades with controlled volume.",
      "Avoid flat cuts with bulky sides, wide heavy fringe, or anything that turns your whole head into a rectangle.",
    ],
  },
  {
    slug: "oval-vs-oblong-face-male",
    title: "Oval vs Oblong Face Male",
    description: "The difference that changes haircut advice fast if your face already leans long.",
    category: "Face Shape",
    date: "2026-04-13",
    content: [
      "Oval faces are balanced and flexible. Oblong faces are clearly longer and need less height on top.",
      "If volume on top quickly makes your face look stretched, you are probably closer to oblong than oval.",
      "That distinction matters because a style that flatters oval can easily over-elongate oblong.",
    ],
  },
  {
    slug: "best-beard-styles-for-your-face-shape",
    title: "Best Beard Styles for Your Face Shape",
    description: "Use beard width, length, and outline to improve lower-face balance instead of guessing.",
    category: "Beards",
    date: "2026-04-13",
    content: [
      "Beard shape changes perceived jaw width, chin length, and facial proportions more than most men realise.",
      "Round faces usually benefit from structure. Oblong faces usually need less vertical beard length. Oval faces can handle more range, but proportion still matters.",
      "The right beard should support your haircut instead of fighting it.",
    ],
  },
]

export const faceShapeCards = [
  {
    name: "Square",
    summary: "Strong jawline, similar width through forehead and jaw, handles clean masculine cuts well.",
    best: ["Textured crop", "Angular quiff", "Crew cut with lift", "Taper fade"],
    avoid: ["Flat bulky sides", "Boxy one-length shapes"],
  },
  {
    name: "Oval",
    summary: "Balanced and versatile, but too much height can make the face look longer than it really is.",
    best: ["Ivy League", "Low quiff", "Side part", "Textured crop"],
    avoid: ["Very high pompadour", "Ultra-high skin fade"],
  },
  {
    name: "Oblong",
    summary: "Clearly longer than wide, so the haircut should reduce extra height and keep some side width.",
    best: ["French crop", "Crew cut", "Textured fringe", "Classic taper"],
    avoid: ["Tall pompadour", "High fade with height"],
  },
  {
    name: "Round",
    summary: "Wider cheeks and softer angles, usually improved by lift and definition rather than extra width.",
    best: ["Structured quiff", "Angular crop", "Side part", "Taper fade"],
    avoid: ["Heavy fringe", "Wide rounded shapes"],
  },
]
