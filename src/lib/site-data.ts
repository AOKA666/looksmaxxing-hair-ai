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
    slug: "looksmaxxing-hair-guide",
    title: "Looksmaxxing Hair Guide for Men",
    description: "A practical looksmaxxing hair guide for men who want sharper haircuts, better facial balance, and stronger first impressions.",
    category: "Looksmaxxing",
    date: "2026-04-15",
    content: [
      "Looksmaxxing hair is not about copying random trends. It is about choosing a haircut that improves facial balance, works with your face shape, and makes your strongest features more obvious.",
      "For most men, the biggest gains come from controlling side width, using more texture on top, and matching the haircut to jawline strength and face length rather than chasing whatever is trending on TikTok this week.",
      "If you want the highest-return improvements, start with face shape, then choose a haircut that supports your jawline, cheekbones, and forehead balance. That is how looksmaxxing hair actually works in real life.",
    ],
  },
  {
    slug: "looksmaxxing-rating-for-men",
    title: "Looksmaxxing Rating for Men",
    description: "How to think about a looksmaxxing rating for men using face shape, jawline, cheekbones, forehead balance, and haircut strategy.",
    category: "Looksmaxxing",
    date: "2026-04-15",
    content: [
      "A useful looksmaxxing rating is not just about whether someone is attractive. It is about understanding which features are already strong and which styling choices can improve the overall result.",
      "Jawline sharpness, cheekbone prominence, forehead balance, face shape, haircut choice, and beard strategy all change how a face reads. A better rating framework looks at structure first, then grooming.",
      "That is why the same man can look average with the wrong haircut and significantly better with a cleaner cut, smarter beard, and more flattering face-shape strategy.",
    ],
  },
  {
    slug: "how-to-rate-my-face-for-looksmaxxing",
    title: "How to Rate My Face for Looksmaxxing",
    description: "A clear way to rate your face for looksmaxxing using face shape, jawline, cheekbones, chin balance, and hairstyle choices.",
    category: "Looksmaxxing",
    date: "2026-04-15",
    content: [
      "If you want to rate your face for looksmaxxing, start with structure instead of insecurity. Look at face shape, jawline definition, cheekbone visibility, chin balance, forehead width, and overall symmetry.",
      "Then ask the more useful question: what can actually be improved? Haircut, beard shape, frame choice, skin presentation, and photo angle often create bigger gains than men expect.",
      "A face rating becomes useful only when it leads to better decisions. Otherwise it is just doom-scrolling with a mirror.",
    ],
  },
  {
    slug: "best-haircuts-for-square-face-men",
    title: "Best Haircuts for Square Face Men",
    description: "Haircuts that sharpen a strong jawline without making a square face look too boxy, especially for looksmaxxing hair goals.",
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
    description: "The difference that changes haircut advice, jawline balance, and face rankings fast if your face already leans long.",
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
    description: "Use beard width, length, and outline to improve lower-face balance, chin appearance, and overall looksmaxxing features.",
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
