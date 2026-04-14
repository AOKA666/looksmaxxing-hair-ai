# Looksmaxxing Hair AI

A redesigned face shape, haircut, and beard recommendation website for men, built with Next.js App Router and Tailwind CSS.

## Current routes

- `/` — landing page with direct upload
- `/result` — analysis result page
- `/mens-hairstyles-by-face-shape` — haircut hub
- `/beard-styles-by-face-shape` — beard hub
- `/blog` — blog hub
- `/blog/[slug]` — static article pages
- `/api/analyze` — server-side analysis route for SiliconFlow vision API

## Environment variables

Create a `.env.local` file with:

```bash
SILICONFLOW_API_KEY=your_siliconflow_api_key
# Optional. Defaults to Qwen/Qwen2.5-VL-72B-Instruct
SILICONFLOW_VISION_MODEL=Qwen/Qwen2.5-VL-72B-Instruct
```

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run start
```

## Notes

- The upload flow now calls the real SiliconFlow multimodal vision backend.
- The result page reads the stored analysis payload and fills the UI dynamically.
- If the API fails, the UI falls back to a safe default analysis so the page does not break.
