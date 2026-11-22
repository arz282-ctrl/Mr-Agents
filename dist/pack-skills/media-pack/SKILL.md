---
name: media-pack
description: "Mr-Agents AI Video, Audio & Creative Media Production Pack (63 specialized skills). AI video generation (Seedance, Kling, Remotion, HyperFrames), FFmpeg editing, word-by-word captions, TTS/music prompting, image processing (ImageMagick), 3D/motion graphics, and NLE playbooks. Use when generating, scripting, editing, captioning, or post-producing AI videos, short-form reels, motion graphics, voiceovers, music tracks, album art, or restored photos."
---

# Mr-Agents AI Video, Audio & Creative Media Production Pack (`media-pack`)

> **Pack Overview:** Consolidates **63 production-grade skills** from the `Mr-Agents` universal catalog into a single installable pack skill.
> **Focus Area:** AI video generation (Seedance, Kling, Remotion, HyperFrames), FFmpeg editing, word-by-word captions, TTS/music prompting, image processing (ImageMagick), 3D/motion graphics, and NLE playbooks.

## When to Activate This Pack

Use when generating, scripting, editing, captioning, or post-producing AI videos, short-form reels, motion graphics, voiceovers, music tracks, album art, or restored photos.

## Core Execution Playbook

1. **Storyboard & Timing**: Define aspect ratio (16:9, 9:16, 1:1), scene beats, visual style, camera motion, and audio/caption sync.
2. **Precision Prompting & Rendering**: Craft structured prompts for video/audio/image models or render programmatic timelines via Remotion/HTML/FFmpeg.
3. **Quality Check**: Verify resolution, frame rate, audio loudness, subtitle readability, and smooth transitions.

## Included Skills Routing Matrix (63 Skills)

| Skill ID | When to Use / Trigger Description | Capabilities |Full Reference Path |
|---|---|---|---|
| `acestep` | AI music generation with ACE-Step 1.5 — background music, vocal tracks, covers, stem extraction, audio repainting, and continuation for video production. Use when generating mus... | `filesystem, media, network, shell` | `dist/skills/acestep/SKILL.md` |
| `after-effects-playbooks` | Use when the user asks what Manus can do with After Effects or needs an existing After Effects project or template customized, localized, versioned, rendered, collected, or prep... | `filesystem, media` | `dist/skills/after-effects-playbooks/SKILL.md` |
| `album-art-director` | Creates visual concepts for album artwork and generates AI art prompts. | `filesystem, media, network` | `dist/skills/album-art-director/SKILL.md` |
| `audacity-playbooks` | Use when the user asks what Manus can do with Audacity or needs an audiobook, spoken-word podcast, or noisy voice recording prepared, finished, restored, or checked. Routes the ... | `filesystem, media, network, python` | `dist/skills/audacity-playbooks/SKILL.md` |
| `capcut-playbooks` | Use when the user asks what Manus can do with CapCut or needs workflows for transcripts and captions, cutout and backgrounds, short-video editing, batch production, templates, d... | `browser, filesystem, media, network` | `dist/skills/capcut-playbooks/SKILL.md` |
| `captions-overlay` | Overlay doctrine for captions in HyperFrames videos — the caption MODEL (drop / rail / embed) and the rule that captions are an OVERLAY composited on top of the film, never a re... | `filesystem, media` | `dist/skills/captions-overlay/SKILL.md` |
| `clipify` | Find compelling moments in a video — funny dialogue OR repeated impact actions like axe chops, hits, throws, drumbeats — cut them as standalone clips, optionally reformat 16:9 ↔... | `filesystem, media, network, node, python, shell` | `dist/skills/clipify/SKILL.md` |
| `html-video-production` | Build editable, scene-based HTML videos rendered to MP4, on HyperFrames (open-source HTML-to-video framework by HeyGen). Use when the user wants a reproducible, editable video f... | `filesystem, media, network, node, python, shell` | `dist/skills/html-video-production/SKILL.md` |
| `hyperframes-keyframes` | Use when a HyperFrames composition needs a punch-in, punch-out, zoom, reframe, Ken Burns treatment, camera move, visual match/whip handoff, or other seek-safe 2D/3D keyframes; a... | `filesystem, media, network, node, shell` | `dist/skills/hyperframes-keyframes/SKILL.md` |
| `image-manipulation-image-magick` | Process and manipulate images using ImageMagick. Supports resizing, format | `filesystem, shell` | `dist/skills/image-manipulation-image-magick/SKILL.md` |
| `image-processing` | Understand, inspect, or programmatically transform existing images. Use when the task requires describing or answering questions about an image, performing deterministic image m... | `filesystem, media, network, python` | `dist/skills/image-processing/SKILL.md` |
| `imagegen` | Use for visual deliverable routing and image generation/editing tasks, including new images, image edits, image upscaling/restoration/enhancement, UI mockups, diagrams, infograp... | `browser, filesystem, media, network, node, python` | `dist/skills/imagegen/SKILL.md` |
| `json-canvas` | Create and edit JSON Canvas files (.canvas) with nodes, edges, groups, and connections. Use when working with .canvas files, creating visual canvases, mind maps, flowcharts, or ... | `filesystem, network, node` | `dist/skills/json-canvas/SKILL.md` |
| `kling-prompter` | 生成符合 Kling 3.0（可灵 3.0，快手）规则的视频提示词。三种写法自适应：4 部分基础公式（短视频）/ 5 层进阶公式（剧情+音频）/ 图生视频专用（只描述运动）。Kling 是 2026 年中文理解最强、原生音画同步、最长 2 分钟、支持角色定向发声、Motion Brush 的电影级模型。用于"用 Kling 生成视频"、"可灵 AI 提... | `filesystem, media, network, node` | `dist/skills/kling-prompter/SKILL.md` |
| `logic-pro-playbooks` | Use when the user asks what Manus can do with Logic Pro or needs Logic-related workflows for music and MIDI production, vocal editing, mixing and exports, spoken audio, project ... | `browser, filesystem, media, network, python, shell` | `dist/skills/logic-pro-playbooks/SKILL.md` |
| `manim-animator` | Generate code-driven explanatory animation videos and precise vector graphics using the Manim engine. Use when the user requests mathematical visualizations, algorithm walkthrou... | `filesystem, media, network, python, shell` | `dist/skills/manim-animator/SKILL.md` |
| `model-selector` | 根据用户的视频需求(场景、时长、音频、语言、平台限制、预算、是否需要本地部署/角色一致性等),从 16 个主流 AI 视频模型(12 商业 + 4 开源)中推荐最匹配的 1-3 个,并解释为什么。覆盖商业:Seedance 2.0、HappyHorse 1.0、Kling 3.0、Sora 2、Veo 3.1、**Gemini Omni**(2026-... | `filesystem, media, network` | `dist/skills/model-selector/SKILL.md` |
| `muapi-3d-logo-animation` | Transform a 2D logo into a premium 3D version and animate it with professional | `filesystem, media, network, shell` | `dist/skills/muapi-3d-logo-animation/SKILL.md` |
| `muapi-ai-fight-scene` | Generate a high-cut-density action / fight scene by first composing a | `filesystem, media, network, shell` | `dist/skills/muapi-ai-fight-scene/SKILL.md` |
| `muapi-animal-video-generator` | Create a hilarious and ultra-realistic video of an anthropomorphic animal | `filesystem, media, network, shell` | `dist/skills/muapi-animal-video-generator/SKILL.md` |
| `muapi-award-ceremony-video` | Generate a 15-second cinematic awards-ceremony video — a host announces | `filesystem, media, network, node, shell` | `dist/skills/muapi-award-ceremony-video/SKILL.md` |
| `muapi-cartoon-dance-animation` | Convert a photo of a person into a Pixar-style 3D cartoon character, | `filesystem, media, network, shell` | `dist/skills/muapi-cartoon-dance-animation/SKILL.md` |
| `muapi-character-story-video` | Create a multi-part animated story video by first establishing a consistent | `filesystem, media, network, shell` | `dist/skills/muapi-character-story-video/SKILL.md` |
| `muapi-cinema-director` | Direct high-fidelity cinematic video with AI — translates creative intent | `filesystem, media, network, shell` | `dist/skills/muapi-cinema-director/SKILL.md` |
| `muapi-drone-style-video` | Generate aerial drone-perspective footage — sweeping bird's-eye views, | `filesystem, media, network, shell` | `dist/skills/muapi-drone-style-video/SKILL.md` |
| `muapi-freeze-effect-video` | Generate a cinematic "freeze effect" video where time stops mid-scene, | `filesystem, media, network, shell` | `dist/skills/muapi-freeze-effect-video/SKILL.md` |
| `muapi-giant-product-showcase` | Create a dramatic "Giant Product" visual where a regular item is showcased | `filesystem, media, network, shell` | `dist/skills/muapi-giant-product-showcase/SKILL.md` |
| `muapi-jewelry-product-video` | Create a luxury jewelry advertisement with high-end commercial cinematography | `filesystem, media, network, shell` | `dist/skills/muapi-jewelry-product-video/SKILL.md` |
| `muapi-music-video` | Build a short music video from a song theme — N keyframes, animate each, | `filesystem, media, network, shell` | `dist/skills/muapi-music-video/SKILL.md` |
| `muapi-one-shot-video` | Generate a single continuous cinematic shot video — no cuts, one seamless | `filesystem, media, network, shell` | `dist/skills/muapi-one-shot-video/SKILL.md` |
| `muapi-product-ad-cinematic` | Cinematic 5–10s product ad from a product photo + brand brief. | `filesystem, media, network, node, shell` | `dist/skills/muapi-product-ad-cinematic/SKILL.md` |
| `muapi-product-campaign` | Generate a full multi-channel product campaign — hero visuals, social | `filesystem, media, network, shell` | `dist/skills/muapi-product-campaign/SKILL.md` |
| `muapi-product-showcase-video` | Create a dynamic product showcase with explosive ingredient arrangements, | `filesystem, media, network, shell` | `dist/skills/muapi-product-showcase-video/SKILL.md` |
| `muapi-product-video-ad-maker` | Create a high-end cinematic product video advertisement starting from | `filesystem, media, network, shell` | `dist/skills/muapi-product-video-ad-maker/SKILL.md` |
| `muapi-social-media-video` | Brand-aware social media video creator. Reads brand-identity.md, ICP.md, | `filesystem, media, network, node, shell` | `dist/skills/muapi-social-media-video/SKILL.md` |
| `muapi-storyboard-to-cooking-video` | Turn a single photo of a person into a 15-second cinematic pasta-making | `filesystem, media, network, shell` | `dist/skills/muapi-storyboard-to-cooking-video/SKILL.md` |
| `muapi-talking-baby-video` | Create a viral-style video of a talking baby with custom costumes and | `filesystem, media, network, shell` | `dist/skills/muapi-talking-baby-video/SKILL.md` |
| `muapi-ugc-ads-workflow` | Create a User-Generated Content (UGC) video ad by combining a human selfie | `filesystem, media, network, shell` | `dist/skills/muapi-ugc-ads-workflow/SKILL.md` |
| `muapi-ugc-video-factory` | Turn a person photo + a product photo + an optional script into a vertical | `filesystem, media, network, shell` | `dist/skills/muapi-ugc-video-factory/SKILL.md` |
| `muapi-ui-design` | Generate high-fidelity UI/UX mockups for mobile and web apps using Atomic | `filesystem, network, shell` | `dist/skills/muapi-ui-design/SKILL.md` |
| `muapi-youtube-shorts` | Auto-generate viral 9:16 YouTube Shorts (or TikTok / Reels clips) from | `filesystem, media, network, python, shell` | `dist/skills/muapi-youtube-shorts/SKILL.md` |
| `music-prompter` | MUST read this skill BEFORE calling `generate_music` or entering generate mode for any music task, including songs, instrumentals, background music, jingles and soundtracks requ... | `filesystem, media` | `dist/skills/music-prompter/SKILL.md` |
| `obs-playbooks` | Use when the user asks what Manus can do with OBS Studio or needs workflows for stream assets and overlays, scenes and sources, audio, capture and performance, output settings, ... | `browser, filesystem, media, shell` | `dist/skills/obs-playbooks/SKILL.md` |
| `obsidian-canvas-creator` | Create Obsidian Canvas files from text content, supporting both MindMap and freeform layouts. Use this skill when users want to visualize content as an interactive canvas, creat... | `filesystem, network, node` | `dist/skills/obsidian-canvas-creator/SKILL.md` |
| `oversized-cursor` | House-style oversized macOS cursor technique for HyperFrames launch videos. Load whenever a scene involves cursors or a pointer-led action, when kicking off a UI scene, when ign... | `filesystem, media, network, node` | `dist/skills/oversized-cursor/SKILL.md` |
| `photo-restoration` | Restores vintage and blurry photos to high-definition 8k images while preserving identity. | `filesystem, network` | `dist/skills/photo-restoration/SKILL.md` |
| `photoshop-playbooks` | Use when the user asks what Manus can do with Photoshop or needs workflows for image batches, cutouts, retouching, composites, data-driven variants, reusable Actions, delivery e... | `browser, filesystem` | `dist/skills/photoshop-playbooks/SKILL.md` |
| `premiere-playbooks` | Use when the user asks what Manus can do with Premiere Pro or needs workflows for transcripts and captions, sequence editing, project recovery, proxies, color, delivery, project... | `filesystem, media` | `dist/skills/premiere-playbooks/SKILL.md` |
| `read-special-images` | Read and OCR long webpage screenshots, panoramas, high-resolution images, and dense documents when whole-image display makes task-relevant text or details unreadable or unreliab... | `browser, filesystem, python, shell` | `dist/skills/read-special-images/SKILL.md` |
| `remotion` | Toolkit-specific Remotion patterns — custom transitions, shared components, and project conventions. For core Remotion framework knowledge (hooks, animations, rendering, etc.), ... | `filesystem, media, network, node, shell` | `dist/skills/remotion/SKILL.md` |
| `review-animations` | Reviews animation and motion code against a high craft bar derived from | `filesystem, media, network` | `dist/skills/review-animations/SKILL.md` |
| `seam-craft` | Render-correctness doctrine for scene-to-scene seams in HyperFrames launch videos — the prerequisites that make transitions composite correctly on the master timeline. Load when... | `filesystem, media` | `dist/skills/seam-craft/SKILL.md` |
| `seedance-prompter` | 把用户的自然语言视频需求转换为符合 Doubao Seedance 2.0 进阶公式的提示词（8 要素：精准主体+动作细节+场景环境+光影色调+镜头运镜+视觉风格+画质+约束条件）。用于"帮我写一个 Seedance 提示词"、"生成视频提示词"、"做个产品广告视频"、"用 Seedance 生成 XX"等触发场景。如果用户没明确说 Seedance，... | `filesystem, media` | `dist/skills/seedance-prompter/SKILL.md` |
| `seedance-recipes` | This skill should be used when the user asks for a Seedance 2.0 template, | `filesystem, media, network, node` | `dist/skills/seedance-recipes/SKILL.md` |
| `seedance-storyboard` | 把复杂剧情/故事大纲拆分为 Seedance 2.0 的"镜头1/镜头2/镜头3"多分镜结构。每个分镜按 4 维度组织（运镜 + 主体动作与表情 + 位置/空间变化 + 音频）。用于"帮我把这个故事写成 Seedance 提示词"、"分镜脚本"、"多镜头视频"、"剧情复杂的视频"、"剧本转分镜"等触发场景。 | `filesystem, media` | `dist/skills/seedance-storyboard/SKILL.md` |
| `tts-prompter` | MUST read this skill BEFORE calling `generate_speech` or entering generate mode for any text-to-speech (TTS) task, including narration, voice-over and dialogue audio requested b... | `filesystem, media, network, node, python, shell` | `dist/skills/tts-prompter/SKILL.md` |
| `video-generation` | Create and edit videos and motion graphics in Manus Sandbox. Use for trimming existing footage, extracting highlights, concatenating clips, subtitles, and video export with FFmp... | `filesystem, media` | `dist/skills/video-generation/SKILL.md` |
| `video-template-frame-glitch-title` | Use this plugin when the user wants a "Glitch Title Frame" HyperFrames | `browser, filesystem, media` | `dist/skills/video-template-frame-glitch-title/SKILL.md` |
| `video-template-frame-light-leak-cinema` | Use this plugin when the user wants a "Light-Leak Cinematic Frame" HyperFrames | `browser, filesystem, media` | `dist/skills/video-template-frame-light-leak-cinema/SKILL.md` |
| `video-to-subtitle-summary` | Use when user provides a short video platform URL or local video/audio | `filesystem, media, network, python, shell` | `dist/skills/video-to-subtitle-summary/SKILL.md` |
| `youtube-clipper` | YouTube 视频智能剪辑工具。下载视频和字幕，AI 分析生成精细章节（几分钟级别）， 用户选择片段后自动剪辑、翻译字幕为中英双语、烧录字幕到视频，并生成总结文案。 使用场景：当用户需要剪辑 YouTube 视频、生成短视频片段、制作双语字幕版本时。 关键词：视频剪辑、YouTube、字幕翻译、双语字幕、视频下载、clip video | `filesystem, media, network, node, python, shell` | `dist/skills/youtube-clipper/SKILL.md` |
| `youtube-transcript` | Download YouTube video transcripts when user provides a YouTube URL or asks to download/get/fetch a transcript from YouTube. Also use when user wants to transcribe or get captio... | `filesystem, media, network, python, shell` | `dist/skills/youtube-transcript/SKILL.md` |
| `youtube-video-research` | Enhance any deep research task with first-hand YouTube video evidence via manus-analyze-video. Highly recommended whenever the task involves deep research, investigation, report... | `browser, filesystem, media, network, node, shell` | `dist/skills/youtube-video-research/SKILL.md` |

---

## Detailed Skill Playbooks & Directives

When executing a task matching one of the included skills below, apply its specific workflow:

### `acestep`
- **Trigger & Scope:** AI music generation with ACE-Step 1.5 — background music, vocal tracks, covers, stem extraction, audio repainting, and continuation for video production. Use when generating music, soundtracks, jingles, or working with audio stems. Triggers include background music, soundtrack, jingle, music generation, stem extraction, cover, style transfer, repaint, continuation, or musical composition tasks.
- **Key Workflow Sections:** Setup → Quick Reference → Fixing "Samey" Output → Creating a Song (Step by Step) → 1. Instrumental background track (simplest) → 2. Song with vocals and lyrics
- **Core Directive:** Open-source music generation via `tools/music_gen.py`.
- **Canonical Skill Path:** `dist/skills/acestep/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install acestep`)

### `after-effects-playbooks`
- **Trigger & Scope:** Use when the user asks what Manus can do with After Effects or needs an existing After Effects project or template customized, localized, versioned, rendered, collected, or prepared for handoff. Routes each workflow by retained state among Manus file and data preparation, reproduced After Effects automation or rendering routes, and After Effects through Computer Use for visual or project-state work.
- **Key Workflow Sections:** Step 0: Classify the durable state → Step 0.5: Safety and ownership → Step 1: Routing map → Step 2: Completion gates
- **Core Directive:** Route by the state that must survive. A flat video, a folder of prepared assets, a data-driven project, and a visually approved editable `.aep` are different products.
- **Canonical Skill Path:** `dist/skills/after-effects-playbooks/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install after-effects-playbooks`)

### `album-art-director`
- **Trigger & Scope:** Creates visual concepts for album artwork and generates AI art prompts.
- **Key Workflow Sections:** Your Task → Supporting Files → Core Principles → Album Art is Visual Storytelling → Less is More → AI Art Requires Precision
- **Core Directive:** 1. Read album concept, tracklist, and themes
- **Canonical Skill Path:** `dist/skills/album-art-director/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install album-art-director`)

### `audacity-playbooks`
- **Trigger & Scope:** Use when the user asks what Manus can do with Audacity or needs an audiobook, spoken-word podcast, or noisy voice recording prepared, finished, restored, or checked. Routes the workflow among portable audio-file processing, reproduced Audacity Macros or app automation, Audacity through Computer Use for recording, listening, waveform judgment, or retained project state, and bounded guidance when the required runtime is unavailable.
- **Key Workflow Sections:** Step 0: Classify the durable state → Step 0.5: Global invariants → Step 1: Routing map → Step 2: Completion gates
- **Core Directive:** Route by the state that must survive. A checked audio file, a reproducible fixed chain, an editable Audacity project, and a listening decision are different products.
- **Canonical Skill Path:** `dist/skills/audacity-playbooks/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install audacity-playbooks`)

### `capcut-playbooks`
- **Trigger & Scope:** Use when the user asks what Manus can do with CapCut or needs workflows for transcripts and captions, cutout and backgrounds, short-video editing, batch production, templates, delivery, draft recovery, or CapCut guidance. Routes each workflow by required durable state among speech-to-text and deterministic media processing, Manus video surfaces, CapCut Web in My Browser, and CapCut Desktop through Computer Use.
- **Key Workflow Sections:** Step 0: Classify the durable state → Step 0.5: Hard boundaries → Step 1: Routing map → Step 2: Completion gates
- **Core Directive:** Route by the state the user needs to keep. Transcript text, an SRT, a flattened MP4, a Manus Video Editor scene, a CapCut Web project, and a CapCut Desktop draft are different products.
- **Canonical Skill Path:** `dist/skills/capcut-playbooks/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install capcut-playbooks`)

### `captions-overlay`
- **Trigger & Scope:** Overlay doctrine for captions in HyperFrames videos — the caption MODEL (drop / rail / embed) and the rule that captions are an OVERLAY composited on top of the film, never a reserved bottom band you shift content up to avoid. Load when adding captions/subtitles to a talking-head or launch video, when deciding whether a phrase should be dropped, ride the verbatim rail, or be promoted to a scarce embedded climax, when laying out a composition that will carry captions (do NOT reserve a keep-out band), or when centering a composition on the true frame center under captions. Applies ON TOP of the `/hyperframes` skill's references/captions.md.
- **Key Workflow Sections:** The caption model — drop / rail / embed → Rail-first, embed-scarce (the load-bearing rules) → The overlay law — captions are NOT a reserved band → Why these two rules are one doctrine
- **Core Directive:** > **Overlay doctrine — supplements the upstream `/hyperframes` skill's `references/captions.md`. Applies ON TOP of it; do not expect it folded into the upstream skill.**
- **Canonical Skill Path:** `dist/skills/captions-overlay/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install captions-overlay`)

### `clipify`
- **Trigger & Scope:** Find compelling moments in a video — funny dialogue OR repeated impact actions like axe chops, hits, throws, drumbeats — cut them as standalone clips, optionally reformat 16:9 ↔ 9:16, time-warp pans for tighter reveals, and burn opus-style word-by-word captions. Use when the user mentions "clipify," "cut clips from this video," "make shorts from this," "find funny moments," "action montage," "cut on each chop/hit/punch," "reframe to 9:16," "vertical clips," or pastes a video file path and wants social-ready cuts.
- **Key Workflow Sections:** Modes → Inputs → Tooling (use only the fastest path) → Workflow → Step 1A — Find dialogue moments (dialogue mode) → Step 1B — Find each strike (action mode)
- **Core Directive:** Find compelling moments in a video, cut them as standalone clips, optionally reformat 16:9 → 9:16 (face-pan or split-screen), time-warp pans for tighter reveals, and burn opus-style word-by-word captions.
- **Canonical Skill Path:** `dist/skills/clipify/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install clipify`)

### `html-video-production`
- **Trigger & Scope:** Build editable, scene-based HTML videos rendered to MP4, on HyperFrames (open-source HTML-to-video framework by HeyGen). Use when the user wants a reproducible, editable video from structured sources (PDF, GitHub repo/PR, CSV, slide deck, design doc, website URL, Figma design, music track, talking-head footage), or mentions HyperFrames, GSAP timelines, kinetic typography, data-driven motion graphics, lower thirds, title cards, animated charts, karaoke captions, product-launch videos, faceless explainers, PR-to-video, slideshows, or website-to-video. Also use as the on-screen-text and brand-frame layer over AI-generated B-roll. Do not use for pure photoreal AI video synthesis or AI avatar talking-head generation — route those to Manus native video tools. Speech, music, and images come from generate_speech / generate_music / generate_image.
- **Key Workflow Sections:** Step 0 — Fidelity gate (read this first, every time) → Route A — Use this skill (HyperFrames) → Route B — Decline and route to Manus native video tools → Route C — Hybrid (this skill + native video) → If ambiguous, ask once → Step 1 — Pick the workflow (Route A / C)
- **Core Directive:** This skill turns an idea into a **scene-based, editable HTML video** rendered to MP4. It is built on [HyperFrames](https://github.com/heygen-com/hyperframes), an open-source HTML-to-video framework by HeyGen, redistributed here under Apache
- **Canonical Skill Path:** `dist/skills/html-video-production/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install html-video-production`)

### `hyperframes-keyframes`
- **Trigger & Scope:** Use when a HyperFrames composition needs a punch-in, punch-out, zoom, reframe, Ken Burns treatment, camera move, visual match/whip handoff, or other seek-safe 2D/3D keyframes; also for GSAP, CSS keyframes, Anime.js, WAAPI, FLIP, paths, masks, SVG morph/draw, text trails, 3D depth, or `hyperframes keyframes` diagnostics. Don't use for broad scene strategy, brand design, media sourcing, captions, or general video planning.
- **Key Workflow Sections:** Creator editing boundary → Procedure → Contract → Runtime Rules → GSAP Skeleton → Keyframe Forms
- **Core Directive:** **Plugin installs:** Before setup or freshness commands, follow `plugin execution rules` when this skill is inside a HyperFrames plugin. Standalone installs keep the update instructions below.
- **Canonical Skill Path:** `dist/skills/hyperframes-keyframes/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install hyperframes-keyframes`)

### `image-manipulation-image-magick`
- **Trigger & Scope:** Process and manipulate images using ImageMagick. Supports resizing, format
- **Key Workflow Sections:** When to Use This Skill → Prerequisites → Core Capabilities → 1. Image Information → 2. Image Resizing → 3. Batch Processing
- **Core Directive:** This skill enables image processing and manipulation tasks using ImageMagick
- **Canonical Skill Path:** `dist/skills/image-manipulation-image-magick/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install image-manipulation-image-magick`)

### `image-processing`
- **Trigger & Scope:** Understand, inspect, or programmatically transform existing images. Use when the task requires describing or answering questions about an image, performing deterministic image manipulation such as downscaling, cropping, format conversion, or compression, or running traditional computer vision operations.
- **Key Workflow Sections:** When to Use → Image Processing Best Practices → Route Boundaries → Delivering Results
- **Core Directive:** - When the task requires describing an existing image, answering questions about it, or extracting information from it
- **Canonical Skill Path:** `dist/skills/image-processing/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install image-processing`)

### `imagegen`
- **Trigger & Scope:** Use for visual deliverable routing and image generation/editing tasks, including new images, image edits, image upscaling/restoration/enhancement, UI mockups, diagrams, infographics, posters, icons, logos, charts, schedules/itineraries/tables delivered as images, visual assets, and ambiguous visual requests. Helps choose between Mermaid, Python plotting, HTML-rendered static layouts, web/app development, and AI image generation/editing.
- **Key Workflow Sections:** Core Principle → Authoritative Routing → Diagram Boundary → Scenario Classification → Cross-Cutting Policies → UI images
- **Core Directive:** Use this skill to decide the correct production route for visual deliverables. A correct visual is not merely attractive; it must fit the user's intended medium, purpose, constraints, hierarchy, and acceptance criteria.
- **Canonical Skill Path:** `dist/skills/imagegen/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install imagegen`)

### `json-canvas`
- **Trigger & Scope:** Create and edit JSON Canvas files (.canvas) with nodes, edges, groups, and connections. Use when working with .canvas files, creating visual canvases, mind maps, flowcharts, or when the user mentions Canvas files in Obsidian.
- **Key Workflow Sections:** File Structure → Common Workflows → 1. Create a New Canvas → 2. Add a Node to an Existing Canvas → 3. Connect Two Nodes → 4. Edit an Existing Canvas
- **Core Directive:** A canvas file (`.canvas`) contains two top-level arrays following the [JSON Canvas Spec 1.0](https://jsoncanvas.org/spec/1.0/):
- **Canonical Skill Path:** `dist/skills/json-canvas/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install json-canvas`)

### `kling-prompter`
- **Trigger & Scope:** 生成符合 Kling 3.0（可灵 3.0，快手）规则的视频提示词。三种写法自适应：4 部分基础公式（短视频）/ 5 层进阶公式（剧情+音频）/ 图生视频专用（只描述运动）。Kling 是 2026 年中文理解最强、原生音画同步、最长 2 分钟、支持角色定向发声、Motion Brush 的电影级模型。用于"用 Kling 生成视频"、"可灵 AI 提示词"、"中文视频生成"、"带原生音频的剧情视频"、"图生视频"、"角色对话视频"等触发场景。
- **Key Workflow Sections:** 何时不用此 skill → 三套写法决策树 → 工作流程 → 步骤 1：判断写法 → 步骤 2：澄清缺失要素（必要时） → 步骤 3：按选定写法填充
- **Core Directive:** Kling 3.0（可灵 3.0，快手）的三套主流写法：4 部分基础 / 5 层进阶 / 图生视频。
- **Canonical Skill Path:** `dist/skills/kling-prompter/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install kling-prompter`)

### `logic-pro-playbooks`
- **Trigger & Scope:** Use when the user asks what Manus can do with Logic Pro or needs Logic-related workflows for music and MIDI production, vocal editing, mixing and exports, spoken audio, project handoff, Scripter MIDI effects, or troubleshooting. Routes portable audio, MIDI, source preparation, and diagnostics through available Manus file tools while reserving Logic-native project state for a current-build verified Logic Desktop session.
- **Key Workflow Sections:** Step 0: Classify the durable state → Step 0.5: Runtime truth gate → Step 1: Select the outcome card → Step 2: Global completion gates
- **Core Directive:** Route by the state the user needs to retain. A WAV file, a MIDI file, reviewed Scripter source, an analysis report, and an editable Logic project are different deliverables.
- **Canonical Skill Path:** `dist/skills/logic-pro-playbooks/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install logic-pro-playbooks`)

### `manim-animator`
- **Trigger & Scope:** Generate code-driven explanatory animation videos and precise vector graphics using the Manim engine. Use when the user requests mathematical visualizations, algorithm walkthroughs, scientific concept explanations, step-by-step derivations with LaTeX equations, or animations in the style of 3Blue1Brown — or explicitly mentions Manim, ManimCE, or ManimGL. Do not use for photorealistic AI video generation or standard timeline editing.
- **Key Workflow Sections:** Seven-stage workflow → File map → Key invariants (never violate) → Working with Manus-native media tools
- **Core Directive:** Manim is a Python engine for code-driven vector animation, created by 3Blue1Brown and forked into a community edition. This skill turns a user's idea into a final MP4 through seven stages. Most of the specialized knowledge lives in the `ref
- **Canonical Skill Path:** `dist/skills/manim-animator/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install manim-animator`)

### `model-selector`
- **Trigger & Scope:** 根据用户的视频需求(场景、时长、音频、语言、平台限制、预算、是否需要本地部署/角色一致性等),从 16 个主流 AI 视频模型(12 商业 + 4 开源)中推荐最匹配的 1-3 个,并解释为什么。覆盖商业:Seedance 2.0、HappyHorse 1.0、Kling 3.0、Sora 2、Veo 3.1、**Gemini Omni**(2026-05 新)、Runway Gen-4.5/Aleph、Pika 2.5、Hailuo 02、Hunyuan Video 1.5、Wan 2.7、即梦 AI;开源:LTX-Video 0.9.7、Mochi 1、CogVideoX 5B、Higgsfield Soul。用于"用哪个 AI 视频模型好"、"Sora 还是 Kling"、"国内有什么模型"、"哪个免费"、"哪个支持中文"、"哪个能编辑已有视频"、"哪个能本地部署"、"哪个角色一致性最强"等触发场景。
- **Key Workflow Sections:** 何时不用此 skill → 11 模型能力速查矩阵 → 工作流程 → 步骤 1：问 3-4 个关键问题 → 步骤 2：按决策树推荐 → 步骤 3：输出格式
- **Core Directive:** 15 个主流 AI 视频模型(11 商业 + 4 开源)的"购物顾问"。问用户 3-4 个关键问题,给出推荐 + 理由。
- **Canonical Skill Path:** `dist/skills/model-selector/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install model-selector`)

### `muapi-3d-logo-animation`
- **Trigger & Scope:** Transform a 2D logo into a premium 3D version and animate it with professional
- **Key Workflow Sections:** Inputs → Steps → Phase A — 3D Logo Transformation → Phase B — Cinematic Logo Animation → Trigger Keywords → Notes for the Executing Agent
- **Core Directive:** **Transform a 2D logo into a premium 3D version and animate it with professional cinematic effects.**
- **Canonical Skill Path:** `dist/skills/muapi-3d-logo-animation/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-3d-logo-animation`)

### `muapi-ai-fight-scene`
- **Trigger & Scope:** Generate a high-cut-density action / fight scene by first composing a
- **Key Workflow Sections:** Inputs → Steps → Phase A — Character Sheet → Phase B — Environment Concept → Phase C — 16-Cell Storyboard → Phase D — Storyboard → Video (Seedance 2.0)
- **Core Directive:** **Generate a high-cut-density action / fight scene by first composing a 16-cell storyboard image, then driving Seedance 2.0 image-to-video off that storyboard.**
- **Canonical Skill Path:** `dist/skills/muapi-ai-fight-scene/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-ai-fight-scene`)

### `muapi-animal-video-generator`
- **Trigger & Scope:** Create a hilarious and ultra-realistic video of an anthropomorphic animal
- **Key Workflow Sections:** Inputs → Steps → Phase A — Generate Vlogger Image → Phase B — Video Generation → Trigger Keywords → Notes for the Executing Agent
- **Core Directive:** **Create a hilarious and ultra-realistic video of an anthropomorphic animal acting like a human vlogger in a real-world setting.**
- **Canonical Skill Path:** `dist/skills/muapi-animal-video-generator/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-animal-video-generator`)

### `muapi-award-ceremony-video`
- **Trigger & Scope:** Generate a 15-second cinematic awards-ceremony video — a host announces
- **Key Workflow Sections:** Inputs → Steps → Phase A — Confirm Inputs → Phase B — Generate the Ceremony Video → Trigger Keywords → Notes for the Executing Agent
- **Core Directive:** **Generate a 15-second cinematic awards-ceremony video — a host announces a winner from the stage, a spotlight finds them in the crowd, they walk up to the podium, receive the award, and the LED display reveals their name and "THE BEST ACTO
- **Canonical Skill Path:** `dist/skills/muapi-award-ceremony-video/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-award-ceremony-video`)

### `muapi-cartoon-dance-animation`
- **Trigger & Scope:** Convert a photo of a person into a Pixar-style 3D cartoon character,
- **Key Workflow Sections:** Inputs → Steps → Phase A — Cartoon Character Generation → Phase B — Motion Control Animation → Trigger Keywords → Notes for the Executing Agent
- **Core Directive:** **Convert a photo of a person into a Pixar-style 3D cartoon character, then animate it using a reference dance or motion video.**
- **Canonical Skill Path:** `dist/skills/muapi-cartoon-dance-animation/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-cartoon-dance-animation`)

### `muapi-character-story-video`
- **Trigger & Scope:** Create a multi-part animated story video by first establishing a consistent
- **Key Workflow Sections:** Inputs → Steps → Phase A — Character Establishment → Phase B — Sequential Scene Generation → Phase C — Animation (Sequel Part 1, Part 2, Part 3) → Trigger Keywords
- **Core Directive:** **Create a multi-part animated story video by first establishing a consistent character and then generating sequential scenes and animating them.**
- **Canonical Skill Path:** `dist/skills/muapi-character-story-video/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-character-story-video`)

### `muapi-cinema-director`
- **Trigger & Scope:** Direct high-fidelity cinematic video with AI — translates creative intent
- **Key Workflow Sections:** Core Competencies → 🏗️ Technical Specification → 1. Intent Mapping Table → 2. Physical Camera Movements → 3. Lens & Optical Controls → 🧠 Prompt Optimization Protocol (Agent Instruction)
- **Core Directive:** **A specialized skill for AI Agents to direct high-fidelity cinematic video.**
- **Canonical Skill Path:** `dist/skills/muapi-cinema-director/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-cinema-director`)

### `muapi-drone-style-video`
- **Trigger & Scope:** Generate aerial drone-perspective footage — sweeping bird's-eye views,
- **Key Workflow Sections:** Inputs → Steps → Phase A — Generate Drone Footage → Notes → Trigger Keywords → Notes for the Executing Agent
- **Core Directive:** **Generate aerial drone-perspective footage — sweeping bird's-eye views, orbit shots, and flyover sequences for landscapes, architecture, and events.**
- **Canonical Skill Path:** `dist/skills/muapi-drone-style-video/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-drone-style-video`)

### `muapi-freeze-effect-video`
- **Trigger & Scope:** Generate a cinematic "freeze effect" video where time stops mid-scene,
- **Key Workflow Sections:** Inputs → Steps → Phase A — Generate the Freeze Effect Video → Notes → Trigger Keywords → Notes for the Executing Agent
- **Core Directive:** **Generate a cinematic "freeze effect" video where time stops mid-scene, the subject walks through the frozen world, then time resumes with a snap.**
- **Canonical Skill Path:** `dist/skills/muapi-freeze-effect-video/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-freeze-effect-video`)

### `muapi-giant-product-showcase`
- **Trigger & Scope:** Create a dramatic "Giant Product" visual where a regular item is showcased
- **Key Workflow Sections:** Inputs → Steps → Phase A — Giant Product Visualization → Phase B — Animation (Optional) → Trigger Keywords → Notes for the Executing Agent
- **Core Directive:** **Create a dramatic "Giant Product" visual where a regular item is showcased as a massive, building-sized object next to a person, then optionally animate the scene.**
- **Canonical Skill Path:** `dist/skills/muapi-giant-product-showcase/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-giant-product-showcase`)

### `muapi-jewelry-product-video`
- **Trigger & Scope:** Create a luxury jewelry advertisement with high-end commercial cinematography
- **Key Workflow Sections:** Inputs → Steps → Phase A — High-End Jewelry Rendering → Phase B — Cinematic Animation → Trigger Keywords → Notes for the Executing Agent
- **Core Directive:** **Create a luxury jewelry advertisement with high-end commercial cinematography and detailed macro animation.**
- **Canonical Skill Path:** `dist/skills/muapi-jewelry-product-video/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-jewelry-product-video`)

### `muapi-music-video`
- **Trigger & Scope:** Build a short music video from a song theme — N keyframes, animate each,
- **Key Workflow Sections:** Inputs → Steps → Notes → Trigger Keywords → Notes for the Executing Agent
- **Core Directive:** **Build a short music video from a song theme — N keyframes, animate each, generate matching music.**
- **Canonical Skill Path:** `dist/skills/muapi-music-video/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-music-video`)

### `muapi-one-shot-video`
- **Trigger & Scope:** Generate a single continuous cinematic shot video — no cuts, one seamless
- **Key Workflow Sections:** Inputs → Steps → Phase A — Generate the One-Shot Video → Notes → Trigger Keywords → Notes for the Executing Agent
- **Core Directive:** **Generate a single continuous cinematic shot video — no cuts, one seamless flowing scene with dramatic lighting and motion.**
- **Canonical Skill Path:** `dist/skills/muapi-one-shot-video/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-one-shot-video`)

### `muapi-product-ad-cinematic`
- **Trigger & Scope:** Cinematic 5–10s product ad from a product photo + brand brief.
- **Key Workflow Sections:** Inputs → Steps → Phase A — variant exploration (cheap) → Phase B — commit on the picked hero (expensive) → Notes → Trigger Keywords
- **Core Directive:** **Cinematic 5–10s product ad from a product photo + brand brief.**
- **Canonical Skill Path:** `dist/skills/muapi-product-ad-cinematic/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-product-ad-cinematic`)

### `muapi-product-campaign`
- **Trigger & Scope:** Generate a full multi-channel product campaign — hero visuals, social
- **Key Workflow Sections:** Inputs → Steps → Phase A — Campaign Hero (2 assets) → Phase B — Campaign Video → Phase C — Platform Crops (Parallel) → Notes
- **Core Directive:** **Generate a full multi-channel product campaign — hero visuals, social media assets, short ad video, and platform-specific crops for an end-to-end launch campaign.**
- **Canonical Skill Path:** `dist/skills/muapi-product-campaign/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-product-campaign`)

### `muapi-product-showcase-video`
- **Trigger & Scope:** Create a dynamic product showcase with explosive ingredient arrangements,
- **Key Workflow Sections:** Inputs → Steps → Phase A — Dynamic Product Image Generation → Phase B — Realistic Motion Animation → Trigger Keywords → Notes for the Executing Agent
- **Core Directive:** **Create a dynamic product showcase with explosive ingredient arrangements, followed by a realistic motion animation.**
- **Canonical Skill Path:** `dist/skills/muapi-product-showcase-video/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-product-showcase-video`)

### `muapi-product-video-ad-maker`
- **Trigger & Scope:** Create a high-end cinematic product video advertisement starting from
- **Key Workflow Sections:** Inputs → Steps → Phase A — Premium Product Rendering → Phase B — Cinematic Video Ad Generation → Trigger Keywords → Notes for the Executing Agent
- **Core Directive:** **Create a high-end cinematic product video advertisement starting from a simple product photo.**
- **Canonical Skill Path:** `dist/skills/muapi-product-video-ad-maker/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-product-video-ad-maker`)

### `muapi-social-media-video`
- **Trigger & Scope:** Brand-aware social media video creator. Reads brand-identity.md, ICP.md,
- **Key Workflow Sections:** Agent Execution Protocol → Step 1 — Read Brand Files → Step 2 — Write the Social Post + Storyboard → Step 3 — Craft the Seedance 2.0 Director Prompt → Step 4 — Generate Reference Images (If Needed) → Step 5 — Generate the Video
- **Core Directive:** **End-to-end pipeline: Brand Files → Storyboard → Reference Images → Seedance 2.0 Video.**
- **Canonical Skill Path:** `dist/skills/muapi-social-media-video/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-social-media-video`)

### `muapi-storyboard-to-cooking-video`
- **Trigger & Scope:** Turn a single photo of a person into a 15-second cinematic pasta-making
- **Key Workflow Sections:** Inputs → Steps → Step 1 — Reference Sheet (Composite Storyboard) → Step 2 — Cooking Video (Reference-to-Video) → Notes → Trigger Keywords
- **Core Directive:** **Turn a single photo of a person into a polished 15-second cinematic cooking tutorial. The skill first generates a high-end production reference sheet — character look, kitchen environment, and a 9-panel action board — then drives a contin
- **Canonical Skill Path:** `dist/skills/muapi-storyboard-to-cooking-video/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-storyboard-to-cooking-video`)

### `muapi-talking-baby-video`
- **Trigger & Scope:** Create a viral-style video of a talking baby with custom costumes and
- **Key Workflow Sections:** Inputs → Steps → Phase A — Baby Character Generation → Phase B — Talking Animation → Trigger Keywords → Notes for the Executing Agent
- **Core Directive:** **Create a viral-style video of a talking baby with custom costumes and scripts.**
- **Canonical Skill Path:** `dist/skills/muapi-talking-baby-video/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-talking-baby-video`)

### `muapi-ugc-ads-workflow`
- **Trigger & Scope:** Create a User-Generated Content (UGC) video ad by combining a human selfie
- **Key Workflow Sections:** Inputs → Steps → Phase A — Image Combination → Phase B — Script & Video Generation → Trigger Keywords → Notes for the Executing Agent
- **Core Directive:** **Create a User-Generated Content (UGC) video ad by combining a human selfie and a product image, then generating a video script and an animated ad.**
- **Canonical Skill Path:** `dist/skills/muapi-ugc-ads-workflow/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-ugc-ads-workflow`)

### `muapi-ugc-video-factory`
- **Trigger & Scope:** Turn a person photo + a product photo + an optional script into a vertical
- **Key Workflow Sections:** Inputs → Steps → Step 1 — Director Prompt (GPT) → Step 2 — Hero Image (Nano-Banana Pro Edit) → Step 3 — UGC Video (Seedance 2.0 VIP Image-to-Video) → Notes
- **Core Directive:** **Turn a person photo + product photo (+ optional script & environment) into a vertical 9:16 UGC-style video ad with native dialogue audio.**
- **Canonical Skill Path:** `dist/skills/muapi-ugc-video-factory/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-ugc-video-factory`)

### `muapi-ui-design`
- **Trigger & Scope:** Generate high-fidelity UI/UX mockups for mobile and web apps using Atomic
- **Key Workflow Sections:** Core Competencies → 🏗️ Technical Specification → 1. Intent Mapping Table → 2. Design Tokens & Variables → 🧠 Prompt Optimization Protocol (Agent Instruction) → 🚀 Protocol: Using the UI Designer
- **Core Directive:** **A specialized skill for AI Agents to architect high-fidelity digital interfaces.**
- **Canonical Skill Path:** `dist/skills/muapi-ui-design/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-ui-design`)

### `muapi-youtube-shorts`
- **Trigger & Scope:** Auto-generate viral 9:16 YouTube Shorts (or TikTok / Reels clips) from
- **Key Workflow Sections:** When to Use This vs. AI Clipping → Agent Execution Protocol → Step 1 — Collect Inputs → Step 2 — Verify Prerequisites → Step 3 — Run the Pipeline → What Happens Server-Side
- **Core Directive:** **Long video → ranked vertical short clips, tuned for short-form social.**
- **Canonical Skill Path:** `dist/skills/muapi-youtube-shorts/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install muapi-youtube-shorts`)

### `music-prompter`
- **Trigger & Scope:** MUST read this skill BEFORE calling `generate_music` or entering generate mode for any music task, including songs, instrumentals, background music, jingles and soundtracks requested as part of other work such as video production. Covers prompt crafting framework, structure syntax, and multi-clip strategy.
- **Key Workflow Sections:** 1. Duration Awareness → 2. The 9-Dimension Framework → 3. Standard Prompt Structure → 4. Detailed Structure Example → 5. In-Text Negative Prompting → 6. Emulating Advanced Controls
- **Core Directive:** When crafting music generation prompts, adopt the mindset of a **world-class music arranger and producer**. Think holistically about the entire piece — its emotional arc, sonic palette, and structural flow — before writing the prompt. Your 
- **Canonical Skill Path:** `dist/skills/music-prompter/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install music-prompter`)

### `obs-playbooks`
- **Trigger & Scope:** Use when the user asks what Manus can do with OBS Studio or needs workflows for stream assets and overlays, scenes and sources, audio, capture and performance, output settings, plugins, runtime control, or OBS guidance. Routes each workflow by required durable state among Manus asset and site creation, deterministic file and log analysis, a separately proven authenticated OBS protocol client, and OBS Desktop through Computer Use.
- **Key Workflow Sections:** Step 0: Classify the durable state → Step 0.5: Hard boundaries → Step 1: Routing map → Step 2: Completion gates
- **Core Directive:** Route by the state the user needs to keep. A PNG overlay, a deployed web page, an analysis report, OBS scene state, and a running public stream are different products with different permissions and verification.
- **Canonical Skill Path:** `dist/skills/obs-playbooks/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install obs-playbooks`)

### `obsidian-canvas-creator`
- **Trigger & Scope:** Create Obsidian Canvas files from text content, supporting both MindMap and freeform layouts. Use this skill when users want to visualize content as an interactive canvas, create mind maps, or organize information spatially in Obsidian format.
- **Key Workflow Sections:** When to Use This Skill → Core Workflow → 1. Analyze Content → 2. Determine Layout Type → 3. Plan Structure → 4. Generate Canvas
- **Core Directive:** Transform text content into structured Obsidian Canvas files with support for MindMap and freeform layouts.
- **Canonical Skill Path:** `dist/skills/obsidian-canvas-creator/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install obsidian-canvas-creator`)

### `oversized-cursor`
- **Trigger & Scope:** House-style oversized macOS cursor technique for HyperFrames launch videos. Load whenever a scene involves cursors or a pointer-led action, when kicking off a UI scene, when igniting a morph/transition/typing run with a click, or when a scene reads as static, dead, or stale and needs a cheap high-yield source of motion to carry the viewer's eye and segment them out of the stale state. Covers cursor size/look (incl. brand-motif cursors), the off-screen entry law, tip-targeting and the click tap, click-ignites-the-next-beat, and exit / cross-scene handoff.
- **Key Workflow Sections:** Size & look (house convention) → Entry law — physical, never revealed → Tip-targeting & the click tap → The click IGNITES the next beat → Exit law & cross-scene handoff → Checklist
- **Core Directive:** A deliberately oversized macOS-style pointer that travels the frame as a _visible
- **Canonical Skill Path:** `dist/skills/oversized-cursor/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install oversized-cursor`)

### `photo-restoration`
- **Trigger & Scope:** Restores vintage and blurry photos to high-definition 8k images while preserving identity.
- **Key Workflow Sections:** Capability → Triggers → Instructions → Tools / Commands → Examples
- **Core Directive:** Transform blurry, vintage, or low-quality images into crystal-clear, 8k resolution modern photographs while preserving the original identity, pose, and composition.
- **Canonical Skill Path:** `dist/skills/photo-restoration/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install photo-restoration`)

### `photoshop-playbooks`
- **Trigger & Scope:** Use when the user asks what Manus can do with Photoshop or needs workflows for image batches, cutouts, retouching, composites, data-driven variants, reusable Actions, delivery exports, or Photoshop guidance. Routes each workflow by requested client and retained output state among Manus image tools, deterministic file processing, Photoshop Web in My Browser, and Photoshop Desktop through Computer Use.
- **Key Workflow Sections:** Step 0: Classify the retained output → Step 0.5: Hard boundaries → Step 1: Routing map → Step 2: Universal completion gates
- **Core Directive:** Route by the state the user needs to keep, not by the word “Photoshop” alone. A good-looking image, an editable PSD, a clipping path, and a reusable Action are different products with different verification oracles.
- **Canonical Skill Path:** `dist/skills/photoshop-playbooks/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install photoshop-playbooks`)

### `premiere-playbooks`
- **Trigger & Scope:** Use when the user asks what Manus can do with Premiere Pro or needs workflows for transcripts and captions, sequence editing, project recovery, proxies, color, delivery, project hygiene, or Premiere guidance. Routes each workflow by required durable state among speech-to-text and deterministic media processing, Manus video surfaces, and Premiere Pro through Computer Use.
- **Key Workflow Sections:** Step 0: Classify the durable state → Step 0.5: Safety boundaries → Step 1: Routing map → Step 2: Completion gates
- **Core Directive:** Route by the state that must survive. Transcript text, an SRT, a burned-in MP4, a Manus Video Editor scene, and an editable Premiere sequence are different products.
- **Canonical Skill Path:** `dist/skills/premiere-playbooks/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install premiere-playbooks`)

### `read-special-images`
- **Trigger & Scope:** Read and OCR long webpage screenshots, panoramas, high-resolution images, and dense documents when whole-image display makes task-relevant text or details unreadable or unreliable. Treat aspect ratio at least 4:1, a side over 4096 px, or area over 16 million pixels only as screening signals, never automatic tiling triggers. Keep any image unsplit when the requested content is already readable, including small ultra-wide images.
- **Key Workflow Sections:** Goal → Decision Rule: Screen, Then Assess Readability → Calibration Examples → Workflow → Verification Checklist → Bundled Script
- **Core Directive:** Recover task-relevant content lost to whole-image display scaling, especially in very long browser screenshots. Preserve reading order and state uncertainty instead of guessing. **Solve a readability problem, not an aspect-ratio problem.**
- **Canonical Skill Path:** `dist/skills/read-special-images/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install read-special-images`)

### `remotion`
- **Trigger & Scope:** Toolkit-specific Remotion patterns — custom transitions, shared components, and project conventions. For core Remotion framework knowledge (hooks, animations, rendering, etc.), see the `remotion-official` skill.
- **Key Workflow Sections:** Shared Components → Motion Craft → Custom Transitions → Using TransitionSeries → Available Custom Transitions → Transition Examples
- **Core Directive:** > **Core Remotion knowledge** lives in `.claude/skills/remotion-official/` (synced from the official [remotion-dev/skills](https://github.com/remotion-dev/skills) repo). This file covers **toolkit-specific** patterns only.
- **Canonical Skill Path:** `dist/skills/remotion/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install remotion`)

### `review-animations`
- **Trigger & Scope:** Reviews animation and motion code against a high craft bar derived from
- **Key Workflow Sections:** Initial Response → Operating Posture → The Ten Non-Negotiable Standards → Aggressive Escalation Triggers → Remedial Preference Hierarchy → Required Output Format
- **Core Directive:** When this skill is first invoked without a specific question, respond only with:
- **Canonical Skill Path:** `dist/skills/review-animations/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install review-animations`)

### `seam-craft`
- **Trigger & Scope:** Render-correctness doctrine for scene-to-scene seams in HyperFrames launch videos — the prerequisites that make transitions composite correctly on the master timeline. Load when assembling the master timeline / index.html, when a white flash appears at a cut or crossfade seam (especially on dark films), when reasoning about why a transition opacity dip shows through, or when verifying the render-side mechanics of how overlapping scene wrappers blend. Covers the opaque stage-ground (#root background) white-flash guard and how the injector overlaps wrappers, holds final frames, ping-pongs tracks, and stamps lint-clean template code onto the master timeline. Does NOT contain the per-transition catalog — see the transition registry for individual transition entries.
- **Key Workflow Sections:** Stage ground prerequisite (white-flash guard) → How the injector applies a transition → Template placeholders
- **Core Directive:** This is the **render-correctness doctrine** for PLV scene-to-scene seams: the
- **Canonical Skill Path:** `dist/skills/seam-craft/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install seam-craft`)

### `seedance-prompter`
- **Trigger & Scope:** 把用户的自然语言视频需求转换为符合 Doubao Seedance 2.0 进阶公式的提示词（8 要素：精准主体+动作细节+场景环境+光影色调+镜头运镜+视觉风格+画质+约束条件）。用于"帮我写一个 Seedance 提示词"、"生成视频提示词"、"做个产品广告视频"、"用 Seedance 生成 XX"等触发场景。如果用户没明确说 Seedance，但描述的是单一镜头的复杂叙事/多主体/电影感视频，也优先用此 skill。
- **Key Workflow Sections:** 何时不用此 skill → 核心方法论：进阶公式 → 工作流程 → 步骤 1：澄清需求（必要时） → 步骤 2：按 8 要素填充 → 步骤 3：检查避免错误
- **Core Directive:** 把用户的"我想要什么样的视频"转换成 Seedance 2.0 能理解的工程级指令。
- **Canonical Skill Path:** `dist/skills/seedance-prompter/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install seedance-prompter`)

### `seedance-recipes`
- **Trigger & Scope:** This skill should be used when the user asks for a Seedance 2.0 template,
- **Key Workflow Sections:** Intent → Recipe Families → Prompt Skeletons → Selection Rule → Sequence State → Output Contract
- **Core Directive:** Before producing prompt text, a prompt-ready block, a rewrite, an example, or a compiled clip, load the `Director's Read`, classify the brief, and complete its canonical narrative or non-narrative record. Translate that record into visible 
- **Canonical Skill Path:** `dist/skills/seedance-recipes/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install seedance-recipes`)

### `seedance-storyboard`
- **Trigger & Scope:** 把复杂剧情/故事大纲拆分为 Seedance 2.0 的"镜头1/镜头2/镜头3"多分镜结构。每个分镜按 4 维度组织（运镜 + 主体动作与表情 + 位置/空间变化 + 音频）。用于"帮我把这个故事写成 Seedance 提示词"、"分镜脚本"、"多镜头视频"、"剧情复杂的视频"、"剧本转分镜"等触发场景。
- **Key Workflow Sections:** 何时不用此 skill → 核心规则 → 工作流程 → 步骤 1：解析剧情 → 步骤 2：确定素材角色 → 步骤 3：用模板拼接
- **Core Directive:** 剧情 → 多镜头分镜。Seedance 内部把时间和空间解耦，**复杂视频最理想的形态是时间轴化分镜**。
- **Canonical Skill Path:** `dist/skills/seedance-storyboard/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install seedance-storyboard`)

### `tts-prompter`
- **Trigger & Scope:** MUST read this skill BEFORE calling `generate_speech` or entering generate mode for any text-to-speech (TTS) task, including narration, voice-over and dialogue audio requested by other skills such as video production. Covers how to split a script into verbatim `turns[].text` and short `turns[].style`, inline vocal tags, two-speaker dialogue, voice selection (30 studio voices, plus 2,000+ locale-native library voices with regional accents and personas found through a bundled search script), language and accent, and length and duration planning.
- **Key Workflow Sections:** 1. The core model: four channels → 2. Workflow → 3. Writing `turns[].text`: the verbatim transcript → 3.1 Hard rules → 3.2 Inline vocal tags (point-in-time events) → 3.3 Pacing and pauses
- **Core Directive:** `generate_speech` reads `turns[].text` as a **verbatim transcript**: every character you put in `text` can be spoken aloud. Delivery direction goes in `turns[].style` (never spoken), and speaker identity comes from the voice you choose. The
- **Canonical Skill Path:** `dist/skills/tts-prompter/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install tts-prompter`)

### `video-generation`
- **Trigger & Scope:** Create and edit videos and motion graphics in Manus Sandbox. Use for trimming existing footage, extracting highlights, concatenating clips, subtitles, and video export with FFmpeg, as well as generated ads, explainers, talking heads, slide videos, UGC, and narrative shorts.
- **Key Workflow Sections:** Core requirements → Establish the deliverable → Creative workflow → Route to the relevant method → Generate missing assets → References and images
- **Core Directive:** Create the requested video as playable files in the Sandbox. For editing and assembling media files, use FFmpeg through the Sandbox shell for cuts, subtitles, audio mixing, and export, and ffprobe for media inspection. Use the native image,
- **Canonical Skill Path:** `dist/skills/video-generation/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install video-generation`)

### `video-template-frame-glitch-title`
- **Trigger & Scope:** Use this plugin when the user wants a "Glitch Title Frame" HyperFrames
- **Key Workflow Sections:** What this template is → Workflow → Attribution
- **Core Directive:** Digital glitch, chromatic offset, and data-corruption title frame for video transitions or cyberpunk heroes.
- **Canonical Skill Path:** `dist/skills/video-template-frame-glitch-title/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install video-template-frame-glitch-title`)

### `video-template-frame-light-leak-cinema`
- **Trigger & Scope:** Use this plugin when the user wants a "Light-Leak Cinematic Frame" HyperFrames
- **Key Workflow Sections:** What this template is → Workflow → Attribution
- **Core Directive:** Film light leaks, grain, 16:9 letterbox, and large serif type for cinematic openings or chapter cards.
- **Canonical Skill Path:** `dist/skills/video-template-frame-light-leak-cinema/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install video-template-frame-light-leak-cinema`)

### `video-to-subtitle-summary`
- **Trigger & Scope:** Use when user provides a short video platform URL or local video/audio
- **Key Workflow Sections:** Overview → When to Use → 外部依赖 → 环境变量 → 执行步骤 → 步骤 0：判断输入类型
- **Core Directive:** 将短视频平台（抖音、小红书、B 站、YouTube 等）视频或本地视频/音频文件转换为字幕文本并生成 AI 摘要。
- **Canonical Skill Path:** `dist/skills/video-to-subtitle-summary/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install video-to-subtitle-summary`)

### `youtube-clipper`
- **Trigger & Scope:** YouTube 视频智能剪辑工具。下载视频和字幕，AI 分析生成精细章节（几分钟级别）， 用户选择片段后自动剪辑、翻译字幕为中英双语、烧录字幕到视频，并生成总结文案。 使用场景：当用户需要剪辑 YouTube 视频、生成短视频片段、制作双语字幕版本时。 关键词：视频剪辑、YouTube、字幕翻译、双语字幕、视频下载、clip video
- **Key Workflow Sections:** 工作流程 → 阶段 1: 环境检测 → 阶段 2: 下载视频 → 阶段 3: 分析章节（核心差异化功能） → 阶段 4: 用户选择 → 阶段 5: 剪辑处理（核心执行阶段）
- **Core Directive:** > **Installation**: If you're installing this skill from GitHub, please refer to [README.md](README.md#installation) for installation instructions. The recommended method is `npx skills add https://github.com/op7418/Youtube-clipper-skill`.
- **Canonical Skill Path:** `dist/skills/youtube-clipper/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install youtube-clipper`)

### `youtube-transcript`
- **Trigger & Scope:** Download YouTube video transcripts when user provides a YouTube URL or asks to download/get/fetch a transcript from YouTube. Also use when user wants to transcribe or get captions/subtitles from a YouTube video.
- **Key Workflow Sections:** When to Use This Skill → How It Works → Priority Order: → Installation Check → If Not Installed → Check Available Subtitles
- **Core Directive:** This skill helps download transcripts (subtitles/captions) from YouTube videos using yt-dlp.
- **Canonical Skill Path:** `dist/skills/youtube-transcript/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install youtube-transcript`)

### `youtube-video-research`
- **Trigger & Scope:** Enhance any deep research task with first-hand YouTube video evidence via manus-analyze-video. Highly recommended whenever the task involves deep research, investigation, report writing, industry analysis, competitive intelligence, market research, technology trends, cultural analysis, policy research, or any information-gathering task that would benefit from expert talks, interviews, keynotes, panels, documentaries, product demos, vlogs, or conference presentations on YouTube. Also use when the user explicitly mentions YouTube, video sources, or asks for first-hand evidence. YouTube contains unfiltered first-person insights (CEO interviews, expert panels, practitioner vlogs, conference talks, earnings calls) unavailable in text articles, making it a critical primary source for virtually any research topic.
- **Key Workflow Sections:** Trigger Guidance → Core Tools → Core Workflow → Step 1: Theme-Based Video Discovery → Step 2: Select and Prioritize Videos → Step 3: Analyze Videos with manus-analyze-video
- **Core Directive:** Leverage YouTube as a **primary source of first-hand information** for research tasks. YouTube hosts CEO interviews, founder keynotes, earnings calls, expert panels, conference talks, product demos, practitioner vlogs, cultural documentarie
- **Canonical Skill Path:** `dist/skills/youtube-video-research/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install youtube-video-research`)

---

## Upgrading to Individual Expanded Skills

To expand this `media-pack` into all 63 individual skill folders (including bundled `scripts/`, `references/`, and `assets/`), run:

```bash
npx --yes github:arz282-ctrl/Mr-Agents install --pack media
```
