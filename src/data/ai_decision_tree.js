// AI Model Decision Tree Dataset
// Maps user requirements (modality, deployment, budget, speed) to optimal AI models in the directory

export const AI_DECISION_TREE = {
  startNodeId: 'root_goal',
  nodes: {
    // ══════════════════════════════════════════════════════════════
    // LEVEL 1: PRIMARY USE CASE / GOAL
    // ══════════════════════════════════════════════════════════════
    root_goal: {
      type: 'question',
      id: 'root_goal',
      title: 'What is your primary AI objective?',
      subtitle: 'Select the core capability or task you want to achieve.',
      stepName: 'Goal & Modality',
      options: [
        {
          label: 'Coding & Autonomous Software Agents',
          description: 'Repo-level refactoring, debugging, terminal tool use, or inline code assist',
          icon: '💻',
          nextNodeId: 'branch_code_deploy',
        },
        {
          label: 'Deep Reasoning, Math & Complex Logic',
          description: 'Multi-step problem solving, STEM research, finance logic, and test-time compute',
          icon: '🧠',
          nextNodeId: 'branch_reason_priority',
        },
        {
          label: 'Conversational Chat, Customer Support & Triage',
          description: 'High-speed customer bots, multilingual dialogue, Q&A, and fast assistants',
          icon: '💬',
          nextNodeId: 'branch_chat_latency',
        },
        {
          label: 'Visual & Generative Media (Image / Video)',
          description: 'Text-to-image art, realistic video generation, physics simulation, or motion clips',
          icon: '🎨',
          nextNodeId: 'branch_media_type',
        },
        {
          label: 'Voice, Speech & Audio Synthesis',
          description: 'Ultra-realistic Text-to-Speech (TTS), voice cloning, and speech transcription',
          icon: '🎙️',
          nextNodeId: 'branch_audio_type',
        },
        {
          label: 'Enterprise Search, RAG & Document Retrieval',
          description: 'Real-time web search, vector embeddings, and zero-hallucination document Q&A',
          icon: '🔍',
          nextNodeId: 'branch_search_type',
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════
    // LEVEL 2: CODING BRANCH
    // ══════════════════════════════════════════════════════════════
    branch_code_deploy: {
      type: 'question',
      id: 'branch_code_deploy',
      title: 'How do you plan to deploy your coding model?',
      subtitle: 'Cloud API with frontier intelligence vs self-hosted local open weights for privacy.',
      stepName: 'Coding Deployment',
      options: [
        {
          label: 'Cloud API (Frontier Intelligence & Autonomy)',
          description: 'Maximum benchmark performance, complex multi-file repo edits, tool use',
          icon: '☁️',
          nextNodeId: 'branch_code_cloud_tier',
        },
        {
          label: 'Self-Hosted / Local (100% Private & Free)',
          description: 'Run on-premise or local workstation without sending code to third parties',
          icon: '🔒',
          nextNodeId: 'result_code_local',
        },
      ],
    },

    branch_code_cloud_tier: {
      type: 'question',
      id: 'branch_code_cloud_tier',
      title: 'What tier of coding capability do you need?',
      subtitle: 'Autonomous agents vs fast cost-effective inline completion.',
      stepName: 'Coding Tier',
      options: [
        {
          label: 'Autonomous Agentic Coding (Flagship)',
          description: 'Full repository refactoring, terminal execution, and recursive self-debugging',
          icon: '🤖',
          nextNodeId: 'result_code_flagship',
        },
        {
          label: 'High-Speed & Budget-Friendly API',
          description: 'Fast inline copilot, quick function drafting, and low-cost CI/CD review',
          icon: '⚡',
          nextNodeId: 'result_code_budget',
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════
    // LEVEL 2: DEEP REASONING BRANCH
    // ══════════════════════════════════════════════════════════════
    branch_reason_priority: {
      type: 'question',
      id: 'branch_reason_priority',
      title: 'What is your reasoning requirement?',
      subtitle: 'Select between test-time thinking compute, budget efficiency, or open weights.',
      stepName: 'Reasoning Mode',
      options: [
        {
          label: 'Maximum Thinking Compute (Uncapped Logic)',
          description: 'Extended chain-of-thought for competition math, science, and difficult proofs',
          icon: '🔬',
          nextNodeId: 'result_reason_max',
        },
        {
          label: 'Cost-Effective Open-Reasoning MoE',
          description: 'Ultra-low API cost with high thinking capability (Mixture of Experts)',
          icon: '💡',
          nextNodeId: 'result_reason_open_moe',
        },
        {
          label: 'Local / Self-Hosted Thinking Model',
          description: 'Run reasoning models on local hardware or private enterprise clusters',
          icon: '🖥️',
          nextNodeId: 'result_reason_local',
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════
    // LEVEL 2: CONVERSATIONAL CHAT & SUPPORT BRANCH
    // ══════════════════════════════════════════════════════════════
    branch_chat_latency: {
      type: 'question',
      id: 'branch_chat_latency',
      title: 'What is your primary speed & context requirement?',
      subtitle: 'Balance token throughput, context window size, and hosting preference.',
      stepName: 'Chat Constraints',
      options: [
        {
          label: 'Sub-Second Latency & Ultra-Low Cost',
          description: 'Ideal for high-volume customer support bots and real-time streaming widgets',
          icon: '⚡',
          nextNodeId: 'result_chat_fast',
        },
        {
          label: 'Massive Context Window (1M - 2M+ Tokens)',
          description: 'Ingest full book libraries, multiple codebases, or hours of transcripts',
          icon: '📚',
          nextNodeId: 'result_chat_long_context',
        },
        {
          label: 'Open-Weights On-Premise Chat',
          description: 'Deploy on internal enterprise servers with complete data ownership',
          icon: '🏢',
          nextNodeId: 'result_chat_open_weights',
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════
    // LEVEL 2: MEDIA GENERATION (IMAGE / VIDEO)
    // ══════════════════════════════════════════════════════════════
    branch_media_type: {
      type: 'question',
      id: 'branch_media_type',
      title: 'Which media format do you want to generate?',
      subtitle: 'Choose between high-resolution still imagery or video synthesis.',
      stepName: 'Media Type',
      options: [
        {
          label: 'Photorealistic Images & Design Typography',
          description: 'Marketing assets, accurate text in images, concept art, and product mockups',
          icon: '🖼️',
          nextNodeId: 'branch_image_deploy',
        },
        {
          label: 'Cinema-Quality Video & Motion Physics',
          description: 'Text-to-video, camera angle control, cinematic movement, and character animation',
          icon: '🎬',
          nextNodeId: 'result_video_gen',
        },
      ],
    },

    branch_image_deploy: {
      type: 'question',
      id: 'branch_image_deploy',
      title: 'How do you want to run your image generation?',
      subtitle: 'Managed cloud API vs open weights diffusion pipeline.',
      stepName: 'Image Hosting',
      options: [
        {
          label: 'Cloud API / Managed Service',
          description: 'Prompt-and-go with perfect prompt following and zero GPU infrastructure',
          icon: '☁️',
          nextNodeId: 'result_image_api',
        },
        {
          label: 'Open-Weights Diffusion (Local / ComfyUI)',
          description: 'Full fine-tuning freedom with LoRA adapters, ControlNet, and local rendering',
          icon: '🎨',
          nextNodeId: 'result_image_open',
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════
    // LEVEL 2: AUDIO & SPEECH
    // ══════════════════════════════════════════════════════════════
    branch_audio_type: {
      type: 'question',
      id: 'branch_audio_type',
      title: 'What speech/audio capability do you require?',
      subtitle: 'Synthesizing realistic voices vs speech-to-text transcription.',
      stepName: 'Audio Direction',
      options: [
        {
          label: 'Hyper-Realistic Text-to-Speech (TTS) & Voice Cloning',
          description: 'Human-like emotion, multi-lingual accent control, and conversational audio',
          icon: '🗣️',
          nextNodeId: 'result_audio_tts',
        },
        {
          label: 'Accurate Speech-to-Text Transcription (STT)',
          description: 'Robust audio transcribing, noisy environment handling, and translation',
          icon: '🎧',
          nextNodeId: 'result_audio_stt',
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════
    // LEVEL 2: SEARCH & RAG
    // ══════════════════════════════════════════════════════════════
    branch_search_type: {
      type: 'question',
      id: 'branch_search_type',
      title: 'What type of search pipeline are you building?',
      subtitle: 'Live web intelligence vs enterprise vector database indexing.',
      stepName: 'Search Architecture',
      options: [
        {
          label: 'Live Web Search & Real-Time Citations',
          description: 'Search engines with live browsing, news aggregation, and verified citations',
          icon: '🌐',
          nextNodeId: 'result_search_live',
        },
        {
          label: 'Dense Vector Embeddings & Hybrid RAG',
          description: 'Vector models for semantic indexing across internal documents and databases',
          icon: '📑',
          nextNodeId: 'result_search_embeddings',
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════
    // OUTCOME LEAF NODES (MATCHED WITH RAW_MODELS IN DIRECTORY)
    // ══════════════════════════════════════════════════════════════

    result_code_flagship: {
      type: 'result',
      id: 'result_code_flagship',
      badge: 'Flagship Agentic Model',
      title: 'Autonomous Coding & Agentic Architecture',
      subtitle: 'Unrivaled benchmark leaders for autonomous programming and multi-file refactoring.',
      description:
        'For autonomous agents, complex repo-wide refactoring, and multi-turn terminal loops, top-tier coding models provide the highest instruction adherence and self-correcting logic.',
      recommendedModelIds: [3, 14, 1], // GPT-5.1-Codex, Kimi-K2.7-Code, Kimi-K2.7-Code-EL
      keyStrengths: [
        'Multi-file workspace awareness and AST syntax parsing',
        'State-of-the-art SWE-bench verified performance',
        'Advanced tool calling and recursive error diagnostics',
      ],
      deployAdvice: 'Integrate via official SDKs with agentic frameworks like Cursor, Cline, or LangGraph.',
    },

    result_code_budget: {
      type: 'result',
      id: 'result_code_budget',
      badge: 'High-Speed & Cost Effective',
      title: 'High-Throughput Inline Coding Models',
      subtitle: 'Fast, highly accurate code completion at a fraction of frontier API cost.',
      description:
        'When you need fast autocompletion, real-time code review, or linting at scale, these high-throughput models deliver exceptional quality with microsecond latency.',
      recommendedModelIds: [11, 16, 35], // Qwen3.7-Plus, DeepSeek-V4-Flash-E, Seed-2.0-Code
      keyStrengths: [
        'Ultra-low token pricing ($0.20 - $0.50 / 1M tokens)',
        'Fast First-Token Latency (TTFT < 300ms)',
        'Native support for 50+ programming languages',
      ],
      deployAdvice: 'Great for inline autocomplete extensions and automated PR review bots.',
    },

    result_code_local: {
      type: 'result',
      id: 'result_code_local',
      badge: '100% Private & Open Weights',
      title: 'Self-Hosted Open-Weights Code Models',
      subtitle: 'Run offline on your workstation with zero external telemetry.',
      description:
        'For proprietary codebases with strict compliance, running open-weights models locally guarantees that no source code ever leaves your perimeter.',
      recommendedModelIds: [18, 19, 17], // Qwen3.5-9B-EL, Qwen3.5-4B-EL, Gemma-4-26B-A4B-EL
      keyStrengths: [
        'Zero API costs and completely offline capability',
        'Runs efficiently on consumer GPUs (RTX 3080/4090 or Apple M-series)',
        'Fully compliant with HIPAA, SOC-2, and internal air-gaps',
      ],
      deployAdvice: 'Run with Ollama or vLLM with an OpenAI-compatible endpoint.',
    },

    result_reason_max: {
      type: 'result',
      id: 'result_reason_max',
      badge: 'Maximum Frontier Reasoning',
      title: 'Deep Thinking & Test-Time Compute Engines',
      subtitle: 'Test-time compute with dynamic chain-of-thought for deep analytical proofs.',
      description:
        'When solving graduate-level mathematics, competitive algorithms, or complex architectural planning, test-time reasoning models spend deliberate compute before answering.',
      recommendedModelIds: [25, 8, 28], // DeepSeek-V4-Pro-T, Qwen3.7-Max-T, Qwen3.6-Plus-T
      keyStrengths: [
        'Extended internal monologue for step-by-step verification',
        'Top benchmark scores on AIME, Olympiad Math, and GPQA',
        'Greatly reduced hallucination rate in analytical fields',
      ],
      deployAdvice: 'Use thinking tokens and temperature 0.6 for difficult algorithmic planning.',
    },

    result_reason_open_moe: {
      type: 'result',
      id: 'result_reason_open_moe',
      badge: 'MoE Efficiency Champion',
      title: 'High-Efficiency Sparse MoE Reasoning',
      subtitle: 'Sparse Mixture of Experts delivering frontier reasoning with incredible economics.',
      description:
        'Sparse MoE architectures activate only a fraction of their total parameters per token, providing flagship intelligence at a 70-80% cost reduction.',
      recommendedModelIds: [15, 2, 27], // DeepSeek-V4-Pro-E, MiniMax-M3-T, DeepSeek-V4-Pro-EL
      keyStrengths: [
        'Massive parameter capacity (450B - 671B MoE total)',
        'Extremely economical token pricing ($0.40 - $0.50 / 1M tokens)',
        'Deep multilingual and general reasoning versatility',
      ],
      deployAdvice: 'Perfect for production apps needing top-tier reasoning without enterprise API costs.',
    },

    result_reason_local: {
      type: 'result',
      id: 'result_reason_local',
      badge: 'Local Reasoning Model',
      title: 'Distilled Local Reasoning Series',
      subtitle: 'Run thinking-mode reasoning models on your local servers.',
      description:
        'Compact distilled reasoning models bring chain-of-thought capability to edge servers and single-GPU setups without requiring giant server racks.',
      recommendedModelIds: [23, 22, 17], // MiMo-V2.5-Pro, MiMo-V2.5, Gemma-4-26B-A4B-EL
      keyStrengths: [
        'Built-in reflection tags <think> ... </think>',
        'Fits on single 24GB or 32GB GPU memory budgets',
        'Ideal for private on-premise analytics & audit automation',
      ],
      deployAdvice: 'Deploy with vLLM using FP8 or GGUF quantization for maximum token speed.',
    },

    result_chat_fast: {
      type: 'result',
      id: 'result_chat_fast',
      badge: 'High Throughput & Speed',
      title: 'Ultra-Fast Conversational Inference Models',
      subtitle: 'Blazing fast streaming responses for customer web widgets and support agents.',
      description:
        'Engineered specifically for low time-to-first-token and high concurrency, making them the gold standard for public-facing customer support chats.',
      recommendedModelIds: [16, 26, 3], // DeepSeek-V4-Flash-E, DeepSeek-V4-Flash-EL, GLM-5.2
      keyStrengths: [
        'Sub-300ms response start with smooth streaming',
        'Capable of handling thousands of concurrent user queries',
        'Highly economical at under $0.20 per million input tokens',
      ],
      deployAdvice: 'Pair with Server-Sent Events (SSE) or WebSockets in your Next.js/React frontend.',
    },

    result_chat_long_context: {
      type: 'result',
      id: 'result_chat_long_context',
      badge: 'Extended Context Master',
      title: 'Extended Context Knowledge Extractors',
      subtitle: 'Ingest hundreds of pages of documentation in a single prompt without losing needle recall.',
      description:
        'With context capacities extending to millions of tokens, these models excel at analyzing multi-year financial statements, complete legal archives, and technical specifications.',
      recommendedModelIds: [4, 10, 27], // GLM-5.2-EL, MiniMax-M3-EL, DeepSeek-V4-Pro-EL
      keyStrengths: [
        '100% needle-in-a-haystack recall across large documents',
        'Eliminates the need for aggressive document chunking',
        'Exceptional at comparative analysis between multiple PDFs',
      ],
      deployAdvice: 'Pass full document texts directly in the context window for high-fidelity extraction.',
    },

    result_chat_open_weights: {
      type: 'result',
      id: 'result_chat_open_weights',
      badge: 'Open Weights Flagship',
      title: 'Open-Weights Enterprise Chat Fleet',
      subtitle: 'Complete control over weights, system prompts, fine-tuning, and deployment.',
      description:
        'Open-weights models allow you to fine-tune on internal domain terminology and deploy across your private Kubernetes cluster or edge hardware.',
      recommendedModelIds: [17, 18, 6], // Gemma-4-26B-A4B-EL, Qwen3.5-9B-EL, HappyHorse-1.1
      keyStrengths: [
        'Customizable with LoRA / QLoRA fine-tuning',
        'Zero vendor lock-in and zero per-call billing',
        'Uncensored and steerable for specialized domain tasks',
      ],
      deployAdvice: 'Host on private AWS/GCP GPU instances using vLLM or Hugging Face TGI.',
    },

    result_image_api: {
      type: 'result',
      id: 'result_image_api',
      badge: 'Managed Image Generation',
      title: 'High-Fidelity Diffusion Cloud Engines',
      subtitle: 'Instant photorealistic graphics, marketing banners, and visual designs.',
      description:
        'Managed cloud diffusion engines provide turnkey generation with pristine typography, natural lighting, and complex multi-object composition.',
      recommendedModelIds: [34, 36], // Seedream-5.0-Lite-EL, Flux-1-Dev-FW
      keyStrengths: [
        'Superior prompt comprehension and spelling inside images',
        'Rich photorealistic textures and lighting control',
        'No local GPU required—instant cloud API delivery',
      ],
      deployAdvice: 'Call image endpoints with structured negative prompts and aspect ratio presets.',
    },

    result_image_open: {
      type: 'result',
      id: 'result_image_open',
      badge: 'Open-Weights Diffusion',
      title: 'Open-Weights Diffusion Architecture',
      subtitle: 'The gold standard for customizable open visual generation with LoRA.',
      description:
        'FLUX.1 Dev offers state-of-the-art text-to-image quality with open weights, allowing full integration with ComfyUI workflows, custom LoRA styles, and ControlNets.',
      recommendedModelIds: [36], // Flux-1-Dev-FW
      keyStrengths: [
        'Massive community ecosystem of custom styles and fine-tunes',
        'Complete control over seed, steps, samplers, and latent noise',
        'Can be integrated directly into proprietary design pipelines',
      ],
      deployAdvice: 'Deploy via Diffusers or ComfyUI server on an NVIDIA GPU with >= 16GB VRAM.',
    },

    result_video_gen: {
      type: 'result',
      id: 'result_video_gen',
      badge: 'Next-Gen Video Generation',
      title: 'Cinematic Diffusion Transformer (DiT) Video Engines',
      subtitle: 'Cinematic video synthesis with realistic physics and camera choreography.',
      description:
        'Diffusion Transformer (DiT) video architectures generate fluid 1080p/4K motion clips with consistent characters, realistic fluid physics, and cinematic lighting.',
      recommendedModelIds: [5, 9, 37], // Kling-3.0-Turbo, Grok-Imgn-Video-1.5, Mochi-preview
      keyStrengths: [
        'Real-time and turbo rendering options for video generation',
        'Dynamic camera motion (pan, tilt, zoom, drone shots)',
        'Character and object consistency across frames',
      ],
      deployAdvice: 'Combine with text-to-image models for initial keyframe conditioning.',
    },

    result_audio_tts: {
      type: 'result',
      id: 'result_audio_tts',
      badge: 'Conversational Voice & TTS',
      title: 'Human-Parity Neural Voice Synthesis',
      subtitle: 'Human-parity voice cloning, natural cadence, and expressive speech.',
      description:
        'Modern neural audio models generate speech that is indistinguishable from human speakers, complete with breathing, emotional inflections, and accent adaptation.',
      recommendedModelIds: [4, 5, 30], // ElevenLabs-v3, GPT-Audio-Mini, Gemini-3.1-Flash-TTS
      keyStrengths: [
        'Emotionally expressive speech synthesis with low latency',
        'Zero-shot voice cloning from short audio samples',
        'Native multi-lingual support across 30+ languages',
      ],
      deployAdvice: 'Stream audio chunks directly to HTML5 AudioContext for conversational AI bots.',
    },

    result_audio_stt: {
      type: 'result',
      id: 'result_audio_stt',
      badge: 'Accurate Speech-to-Text',
      title: 'Multimodal Audio & Speech Recognition Systems',
      subtitle: 'Robust voice transcription, multi-speaker diarization, and live translation.',
      description:
        'Neural transcription engines transcribe noisy meetings, multi-speaker podcasts, and technical jargon with near-zero word error rate.',
      recommendedModelIds: [6, 5, 30], // GPT-Audio-1.5, GPT-Audio-Mini, Gemini-3.1-Flash-TTS
      keyStrengths: [
        'Automatic punctuation, capitalization, and speaker labels',
        'Resilient against heavy accents and background acoustics',
        'Simultaneous transcription and English translation',
      ],
      deployAdvice: 'Process incoming microphone audio streams with Web Audio API recording.',
    },

    result_search_live: {
      type: 'result',
      id: 'result_search_live',
      badge: 'Real-Time Web Intelligence',
      title: 'Real-Time Grounded Search Engines',
      subtitle: 'Live web indexation with multi-source citation and factual verification.',
      description:
        'Live search models browse the real-time internet, synthesize contradictory sources, and output structured answers with clickable URL citations.',
      recommendedModelIds: [12], // Perplexity-Sonar-Pro
      keyStrengths: [
        'Up-to-the-minute web retrieval for breaking news & market data',
        'Automatic link citation and source attribution',
        'Built-in hallucination reduction via cross-checking',
      ],
      deployAdvice: 'Ideal for market research bots, current events analysis, and fact-checking engines.',
    },

    result_search_embeddings: {
      type: 'result',
      id: 'result_search_embeddings',
      badge: 'Vector Search & Embeddings',
      title: 'Hybrid Dense Vector & Retrieval Engines',
      subtitle: 'Dense neural vector representations for high-recall database indexing.',
      description:
        'Vector models convert text and documents into dense mathematical embeddings, enabling millisecond semantic search across millions of database records.',
      recommendedModelIds: [12, 10, 4], // Perplexity-Sonar-Pro, MiniMax-M3-EL, GLM-5.2-EL
      keyStrengths: [
        'High MTEB benchmark retrieval accuracy',
        'Compatible with Pinecone, pgvector, Qdrant, and Milvus',
        'Powers hybrid keyword + semantic similarity matching',
      ],
      deployAdvice: 'Index document chunks into a vector database with HNSW cosine similarity index.',
    },
  },
};
