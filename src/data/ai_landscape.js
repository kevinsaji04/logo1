export const LANDSCAPE_COMPANIES = [
  {
    id: 'c_openai',
    name: 'OpenAI',
    logo: 'openai.png',
    color: '#3b82f6',
    founded: '2015',
    focus: 'Frontier LLMs, Multimodal Omni Models, Image & Video Synthesis',
    categories: [
      {
        id: 'cat_openai_lang',
        name: 'Language Models',
        desc: 'Autoregressive language models and chat assistants.',
        families: [
          {
            id: 'fam_openai_gpt',
            name: 'GPT',
            desc: 'Generative Pre-trained Transformer series.',
            purpose: 'General intelligence, coding, reasoning, and multi-turn dialogue.',
            versions: [
              { id: 'v_gpt1', name: 'GPT-1', year: 2018, open: false, desc: 'First Generative Pre-trained Transformer model.' },
              { id: 'v_gpt2', name: 'GPT-2', year: 2019, open: true, desc: '1.5B parameter open-weights language model.' },
              { id: 'v_gpt3', name: 'GPT-3', year: 2020, open: false, desc: '175B parameter landmark model establishing few-shot in-context learning.' },
              { id: 'v_gpt35', name: 'GPT-3.5', year: 2022, open: false, desc: 'Instruction-tuned backbone for ChatGPT.' },
              { id: 'v_gpt4', name: 'GPT-4', year: 2023, open: false, desc: 'Multimodal reasoning frontier model.' },
              { id: 'v_gpt4v', name: 'GPT-4V', year: 2023, open: false, desc: 'GPT-4 with native vision comprehension.' },
              { id: 'v_gpt4o', name: 'GPT-4o', year: 2024, open: false, desc: 'Native omni model integrating text, audio, and vision.' },
              { id: 'v_gpt41', name: 'GPT-4.1', year: 2025, open: false, desc: 'Optimized inference & developer API flagship.' },
              { id: 'v_gpt45', name: 'GPT-4.5', year: 2025, open: false, desc: 'Scale-up milestone model with enhanced intuition.' },
              { id: 'v_gpt5', name: 'GPT-5', year: 2025, open: false, desc: 'Unified reasoning & agentic execution system.' },
              { id: 'v_gpt51', name: 'GPT-5.1', year: 2025, open: false, desc: 'Fast inference & cost-efficient iteration.' },
              { id: 'v_gpt52', name: 'GPT-5.2', year: 2025, open: false, desc: 'Expanded context window & long-horizon planning.' },
              { id: 'v_gpt53', name: 'GPT-5.3', year: 2026, open: false, desc: 'Autonomous math & deep reasoning synthesis.' },
              { id: 'v_gpt54', name: 'GPT-5.4', year: 2026, open: false, desc: 'Self-correcting enterprise agentic workflow.' },
              { id: 'v_gpt55', name: 'GPT-5.5', year: 2026, open: false, desc: 'Flagship Orion-tier intelligence system.' },
            ]
          }
        ]
      },
      {
        id: 'cat_openai_image',
        name: 'Image Generation',
        desc: 'Text-to-image synthesis models.',
        families: [
          {
            id: 'fam_openai_dalle',
            name: 'DALL·E',
            desc: 'Text-to-image diffusion and VAE models.',
            purpose: 'Generating photorealistic artwork and images from text prompts.',
            versions: [
              { id: 'v_dalle1', name: 'DALL·E', year: 2021, open: false, desc: 'Discrete VAE + GPT text-to-image model.' },
              { id: 'v_dalle2', name: 'DALL·E 2', year: 2022, open: false, desc: 'unCLIP diffusion image generator.' },
              { id: 'v_dalle3', name: 'DALL·E 3', year: 2023, open: false, desc: 'High-detail ChatGPT native image generator.' },
            ]
          }
        ]
      },
      {
        id: 'cat_openai_video',
        name: 'Video Generation',
        desc: 'Text-to-video diffusion transformer models.',
        families: [
          {
            id: 'fam_openai_sora',
            name: 'Sora',
            desc: 'Diffusion Transformer (DiT) video engine.',
            purpose: 'Photorealistic 60s video and physics simulation.',
            versions: [
              { id: 'v_sora1', name: 'Sora', year: 2024, open: false, desc: 'Breakthrough DiT text-to-video model.' },
              { id: 'v_sora2', name: 'Sora 2', year: 2025, open: false, desc: 'Real-time interactive physics video engine.' },
            ]
          }
        ]
      },
      {
        id: 'cat_openai_speech',
        name: 'Speech',
        desc: 'Speech recognition and audio transcription.',
        families: [
          {
            id: 'fam_openai_whisper',
            name: 'Whisper',
            desc: 'Multilingual speech-to-text model.',
            purpose: 'Automatic speech recognition and transcription.',
            versions: [
              { id: 'v_whisper', name: 'Whisper', year: 2022, open: true, desc: 'Robust multilingual open speech recognition.' },
            ]
          }
        ]
      },
      {
        id: 'cat_openai_coding',
        name: 'Coding',
        desc: 'Code synthesis and programming assistants.',
        families: [
          {
            id: 'fam_openai_codex',
            name: 'Codex',
            desc: 'Code-specialized GPT model.',
            purpose: 'Powering GitHub Copilot and automated code completion.',
            versions: [
              { id: 'v_codex', name: 'Codex', year: 2021, open: false, desc: 'Code completion model powering GitHub Copilot.' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'c_google',
    name: 'Google / Google DeepMind',
    logo: 'google.png',
    color: '#ea4335',
    founded: '1998',
    focus: 'Transformers, Multimodal Frontier Gemini, Imagen, Veo & Lyria',
    categories: [
      {
        id: 'cat_google_lang',
        name: 'Language Models',
        desc: 'Foundational encoder and decoder language models.',
        families: [
          {
            id: 'fam_google_encoder',
            name: 'BERT & T5',
            desc: 'Bidirectional encoder & text-to-text transformers.',
            purpose: 'Search, understanding, and unified text transfer.',
            versions: [
              { id: 'v_bert', name: 'BERT', year: 2018, open: true, desc: 'Bidirectional Encoder Representations from Transformers.' },
              { id: 'v_t5', name: 'T5', year: 2019, open: true, desc: 'Text-to-Text Transfer Transformer.' },
              { id: 'v_palm', name: 'PaLM', year: 2022, open: false, desc: '540B Pathways Language Model.' },
              { id: 'v_palm2', name: 'PaLM 2', year: 2023, open: false, desc: 'Multilingual reasoning language model.' },
            ]
          }
        ]
      },
      {
        id: 'cat_google_multi',
        name: 'Multimodal Models',
        desc: 'Native multimodal foundation models.',
        families: [
          {
            id: 'fam_google_gemini',
            name: 'Gemini',
            desc: 'Google DeepMind flagship multimodal model ecosystem.',
            purpose: 'Native text, audio, image, and video comprehension.',
            versions: [
              { id: 'v_gemini10', name: 'Gemini 1.0', year: 2023, open: false, desc: 'Ultra, Pro, and Nano multimodal tiers.' },
              { id: 'v_gemini15', name: 'Gemini 1.5', year: 2024, open: false, desc: '2M token context window model.' },
              { id: 'v_gemini20', name: 'Gemini 2.0', year: 2024, open: false, desc: 'Real-time audio & thinking mode model.' },
              { id: 'v_gemini25', name: 'Gemini 2.5', year: 2025, open: false, desc: 'Deep reasoning multimodal engine.' },
              { id: 'v_gemini30', name: 'Gemini 3', year: 2025, open: false, desc: '3rd generation frontier intelligence.' },
              { id: 'v_gemini31', name: 'Gemini 3.1 Pro', year: 2026, open: false, desc: 'Flagship 2026 Pro frontier model.' },
            ]
          }
        ]
      },
      {
        id: 'cat_google_image',
        name: 'Image Generation',
        desc: 'Text-to-image diffusion models.',
        families: [
          {
            id: 'fam_google_imagen',
            name: 'Imagen',
            desc: 'Photorealistic text-to-image diffusion series.',
            purpose: 'High-fidelity image generation and editing.',
            versions: [
              { id: 'v_imagen1', name: 'Imagen', year: 2022, open: false, desc: 'Photorealistic text-to-image diffusion model.' },
              { id: 'v_imagen2', name: 'Imagen 2', year: 2023, open: false, desc: 'High resolution image generation for Enterprise.' },
              { id: 'v_imagen3', name: 'Imagen 3', year: 2024, open: false, desc: 'Google highest quality image model.' },
              { id: 'v_imagen4', name: 'Imagen 4', year: 2025, open: false, desc: 'Next-gen typography and detail rendering.' },
            ]
          }
        ]
      },
      {
        id: 'cat_google_video',
        name: 'Video Generation',
        desc: 'Text-to-video generative models.',
        families: [
          {
            id: 'fam_google_veo',
            name: 'Veo',
            desc: 'High-definition video generation model series.',
            purpose: '1080p cinematic video creation.',
            versions: [
              { id: 'v_veo1', name: 'Veo', year: 2024, open: false, desc: '1080p cinematic video generator.' },
              { id: 'v_veo2', name: 'Veo 2', year: 2024, open: false, desc: 'Enhanced motion controls and camera angles.' },
              { id: 'v_veo3', name: 'Veo 3', year: 2025, open: false, desc: 'Photorealistic physics video model.' },
              { id: 'v_veo31', name: 'Veo 3.1', year: 2025, open: false, desc: 'Real-time video synthesis engine.' },
            ]
          }
        ]
      },
      {
        id: 'cat_google_music',
        name: 'Music Generation',
        desc: 'Audio and music composition models.',
        families: [
          {
            id: 'fam_google_lyria',
            name: 'Lyria',
            desc: 'Google DeepMind music generation model.',
            purpose: 'High quality music track and vocal generation.',
            versions: [
              { id: 'v_lyria1', name: 'Lyria', year: 2024, open: false, desc: 'Music generation model by DeepMind.' },
              { id: 'v_lyria2', name: 'Lyria 2', year: 2025, open: false, desc: 'Multitrack studio composition model.' },
              { id: 'v_lyria3', name: 'Lyria 3', year: 2026, open: false, desc: 'Interactive real-time audio synthesis.' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'c_meta',
    name: 'Meta',
    logo: 'meta.jfif',
    color: '#22c55e',
    founded: '2004',
    focus: 'Open Weights LLMs, LLaMA Ecosystem, RoBERTa & BART',
    categories: [
      {
        id: 'cat_meta_lang',
        name: 'Language Models',
        desc: 'Decoder-only open weights LLMs.',
        families: [
          {
            id: 'fam_meta_llama',
            name: 'LLaMA',
            desc: 'Meta flagship open-weights language model series.',
            purpose: 'General purpose text generation, coding, and reasoning.',
            versions: [
              { id: 'v_llama1', name: 'LLaMA', year: 2023, open: true, desc: 'Meta first open weights LLM (7B-65B).' },
              { id: 'v_llama2', name: 'Llama 2', year: 2023, open: true, desc: '70B open weights model family.' },
              { id: 'v_llama3', name: 'Llama 3', year: 2024, open: true, desc: 'Flagship 405B open weights model.' },
              { id: 'v_llama31', name: 'Llama 3.1', year: 2024, open: true, desc: '405B open weights with 128K context.' },
              { id: 'v_llama32', name: 'Llama 3.2', year: 2024, open: true, desc: 'Multimodal vision and edge models.' },
              { id: 'v_llama33', name: 'Llama 3.3', year: 2024, open: true, desc: '70B model with 405B capabilities.' },
              { id: 'v_llama4', name: 'Llama 4', year: 2025, open: true, desc: 'Native multimodal MoE open weights.' },
            ]
          },
          {
            id: 'fam_meta_opt',
            name: 'OPT',
            desc: 'Open Pre-trained Transformer 175B.',
            purpose: 'Open research replication of GPT-3 scale models.',
            versions: [
              { id: 'v_opt', name: 'OPT', year: 2022, open: true, desc: '175B open pre-trained transformer.' },
            ]
          }
        ]
      },
      {
        id: 'cat_meta_nlp',
        name: 'NLP',
        desc: 'Encoder and seq2seq NLP models.',
        families: [
          {
            id: 'fam_meta_roberta',
            name: 'RoBERTa & BART',
            desc: 'Meta FAIR landmark NLP pre-training architectures.',
            purpose: 'Classification, comprehension, and sequence denoising.',
            versions: [
              { id: 'v_roberta', name: 'RoBERTa', year: 2019, open: true, desc: 'Robustly optimized BERT approach.' },
              { id: 'v_bart', name: 'BART', year: 2019, open: true, desc: 'Denoising sequence-to-sequence model.' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'c_anthropic',
    name: 'Anthropic',
    logo: 'anthropic.png',
    color: '#d946ef',
    founded: '2021',
    focus: 'Constitutional AI, Claude Models, Computer Use API',
    categories: [
      {
        id: 'cat_anthropic_lang',
        name: 'Language / Foundation Models',
        desc: 'Safety-aligned Constitutional AI models.',
        families: [
          {
            id: 'fam_anthropic_claude',
            name: 'Claude',
            desc: 'Anthropic Claude model family.',
            purpose: 'Helpful, harmless, and honest assistant for coding, math, and analysis.',
            versions: [
              { id: 'v_claude1', name: 'Claude', year: 2023, open: false, desc: 'First generation HHH aligned model.' },
              { id: 'v_claude2', name: 'Claude 2', year: 2023, open: false, desc: '100K token context window assistant.' },
              { id: 'v_claude3', name: 'Claude 3', year: 2024, open: false, desc: 'Opus, Sonnet, and Haiku tiers.' },
              { id: 'v_claude35', name: 'Claude 3.5', year: 2024, open: false, desc: 'SOTA coding and Computer Use model.' },
              { id: 'v_claude37', name: 'Claude 3.7', year: 2025, open: false, desc: 'Hybrid reasoning model with extended thinking.' },
              { id: 'v_claude4', name: 'Claude 4', year: 2025, open: false, desc: '4th generation Constitutional AI assistant.' },
              { id: 'v_claude45', name: 'Claude 4.5', year: 2025, open: false, desc: 'Enhanced code synthesis and long context.' },
              { id: 'v_claude46', name: 'Claude 4.6', year: 2026, open: false, desc: 'Zero hallucination agentic reasoning.' },
              { id: 'v_claude_opus47', name: 'Claude Opus 4.7', year: 2026, open: false, desc: 'Flagship Opus 2026 frontier model.' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'c_mistral',
    name: 'Mistral AI',
    logo: 'mistral ai.webp',
    color: '#14b8a6',
    founded: '2023',
    focus: 'Sparse MoE, Open Weights Flagships, Codestral & Voxtral',
    categories: [
      {
        id: 'cat_mistral_lang',
        name: 'Language Models',
        desc: 'High performance dense language models.',
        families: [
          {
            id: 'fam_mistral_dense',
            name: 'Mistral Series',
            desc: 'Sliding window attention dense models.',
            purpose: 'Fast inference and commercial deployment.',
            versions: [
              { id: 'v_m7b', name: 'Mistral 7B', year: 2023, open: true, desc: 'Sliding window attention 7B open model.' },
              { id: 'v_mlarge1', name: 'Mistral Large', year: 2024, open: false, desc: 'Flagship commercial LLM.' },
              { id: 'v_mlarge2', name: 'Mistral Large 2', year: 2024, open: true, desc: '128K context open weights model.' },
              { id: 'v_mlarge3', name: 'Mistral Large 3', year: 2025, open: true, desc: 'Top-tier open source frontier LLM.' },
            ]
          }
        ]
      },
      {
        id: 'cat_mistral_moe',
        name: 'Mixture-of-Experts',
        desc: 'Sparse Mixture-of-Experts (MoE) models.',
        families: [
          {
            id: 'fam_mistral_mixtral',
            name: 'Mixtral',
            desc: 'Sparse MoE architecture series.',
            purpose: 'High efficiency reasoning with active parameters.',
            versions: [
              { id: 'v_mixtral8x7b', name: 'Mixtral 8x7B', year: 2023, open: true, desc: 'Sparse 8x7B MoE model.' },
              { id: 'v_mixtral8x22b', name: 'Mixtral 8x22B', year: 2024, open: true, desc: 'Massive 8x22B open MoE.' },
            ]
          }
        ]
      },
      {
        id: 'cat_mistral_code',
        name: 'Coding',
        desc: 'Code synthesis models.',
        families: [
          {
            id: 'fam_mistral_codestral',
            name: 'Codestral',
            desc: 'Code specialized LLM.',
            purpose: 'Fill-in-the-middle code generation in 80+ languages.',
            versions: [
              { id: 'v_codestral', name: 'Codestral', year: 2024, open: true, desc: 'Specialized 22B coding model.' },
            ]
          }
        ]
      },
      {
        id: 'cat_mistral_reasoning',
        name: 'Reasoning',
        desc: 'Deep reasoning MoE models.',
        families: [
          {
            id: 'fam_mistral_magistral',
            name: 'Magistral',
            desc: 'Mistral reasoning model family.',
            purpose: 'Step-by-step problem solving.',
            versions: [
              { id: 'v_magistral_sm', name: 'Magistral Small', year: 2025, open: true, desc: 'Lightweight reasoning model.' },
              { id: 'v_magistral_md', name: 'Magistral Medium', year: 2025, open: true, desc: 'Mid-sized reasoning model.' },
            ]
          }
        ]
      },
      {
        id: 'cat_mistral_speech',
        name: 'Speech & OCR',
        desc: 'Multimodal audio and document models.',
        families: [
          {
            id: 'fam_mistral_voxtral',
            name: 'Voxtral & OCR',
            desc: 'Speech & document parsing models.',
            purpose: 'Voice processing and PDF document understanding.',
            versions: [
              { id: 'v_voxtral', name: 'Voxtral', year: 2025, open: true, desc: 'Voice understanding model.' },
              { id: 'v_mistral_ocr', name: 'Mistral OCR', year: 2025, open: false, desc: 'Document structure and OCR engine.' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'c_xai',
    name: 'xAI',
    logo: 'openai.png',
    color: '#38bdf8',
    founded: '2023',
    focus: 'Grok Series, Maximum Truth-Seeking AI, Real-time X Integration',
    categories: [
      {
        id: 'cat_xai_lang',
        name: 'Language Models',
        desc: 'Truth-seeking LLMs with real-time knowledge.',
        families: [
          {
            id: 'fam_xai_grok',
            name: 'Grok',
            desc: 'xAI Grok foundation model family.',
            purpose: 'Real-time information synthesis, coding, and reasoning.',
            versions: [
              { id: 'v_grok', name: 'Grok', year: 2023, open: false, desc: 'Initial Grok model connected to X.' },
              { id: 'v_grok1', name: 'Grok-1', year: 2023, open: true, desc: '314B open weights language model.' },
              { id: 'v_grok15', name: 'Grok-1.5', year: 2024, open: false, desc: '128K context window model with vision.' },
              { id: 'v_grok2', name: 'Grok-2', year: 2024, open: false, desc: 'SOTA reasoning and image comprehension.' },
              { id: 'v_grok3', name: 'Grok-3', year: 2025, open: false, desc: 'Trained on 100K H100 Colossus cluster.' },
              { id: 'v_grok4', name: 'Grok-4', year: 2025, open: false, desc: 'Next-gen reasoning engine.' },
              { id: 'v_grok41', name: 'Grok 4.1', year: 2025, open: false, desc: 'Multimodal omni iteration.' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'c_microsoft',
    name: 'Microsoft',
    logo: 'microsoft.png',
    color: '#00a4ef',
    founded: '1975',
    focus: 'Phi Small Language Models & Copilot Ecosystem',
    categories: [
      {
        id: 'cat_ms_slm',
        name: 'Small Language Models',
        desc: 'Efficient small language models (SLMs).',
        families: [
          {
            id: 'fam_ms_phi',
            name: 'Phi',
            desc: 'Microsoft Phi series SLMs.',
            purpose: 'High performance reasoning on edge devices with small parameter counts.',
            versions: [
              { id: 'v_phi1', name: 'Phi-1', year: 2023, open: true, desc: '1.3B code-specialized model.' },
              { id: 'v_phi2', name: 'Phi-2', year: 2023, open: true, desc: '2.7B textbook quality language model.' },
              { id: 'v_phi3', name: 'Phi-3', year: 2024, open: true, desc: 'Mini (3.8B), Small (7B), and Medium (14B).' },
              { id: 'v_phi35', name: 'Phi-3.5', year: 2024, open: true, desc: 'MoE and vision open SLMs.' },
              { id: 'v_phi4', name: 'Phi-4', year: 2024, open: true, desc: '14B math and reasoning model.' },
              { id: 'v_phi4mini', name: 'Phi-4-mini', year: 2025, open: true, desc: 'Ultra efficient edge SLM.' },
            ]
          }
        ]
      },
      {
        id: 'cat_ms_assistant',
        name: 'AI Assistant Ecosystem',
        desc: 'Enterprise assistant products.',
        families: [
          {
            id: 'fam_ms_copilot',
            name: 'Copilot Product Ecosystem',
            desc: 'Microsoft AI assistant product layer.',
            purpose: 'Productivity integration across Windows, Office, and GitHub.',
            versions: [
              { id: 'v_copilot', name: 'Copilot', year: 2023, open: false, desc: 'Enterprise productivity assistant ecosystem.' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'c_stability',
    name: 'Stability AI',
    logo: 'stability',
    color: '#8b5cf6',
    founded: '2019',
    focus: 'Stable Diffusion, Stable Video, 3D Synthesis',
    categories: [
      {
        id: 'cat_stability_image',
        name: 'Image Generation',
        desc: 'Open latent diffusion image models.',
        families: [
          {
            id: 'fam_stability_sd',
            name: 'Stable Diffusion',
            desc: 'Latent diffusion text-to-image series.',
            purpose: 'Open-source text-to-image generation.',
            versions: [
              { id: 'v_sd1', name: 'Stable Diffusion', year: 2022, open: true, desc: 'First open source latent diffusion model.' },
              { id: 'v_sd2', name: 'Stable Diffusion 2', year: 2022, open: true, desc: '768x768 native resolution image model.' },
              { id: 'v_sdxl', name: 'Stable Diffusion XL', year: 2023, open: true, desc: 'Flagship 1024x1024 dual encoder model.' },
              { id: 'v_sd3', name: 'Stable Diffusion 3', year: 2024, open: true, desc: 'Multimodal Diffusion Transformer (MMDiT).' },
            ]
          }
        ]
      },
      {
        id: 'cat_stability_video_3d',
        name: 'Video & 3D Generation',
        desc: 'Generative video and 3D mesh models.',
        families: [
          {
            id: 'fam_stability_svd',
            name: 'Stable Video & 3D',
            desc: 'Generative video and fast 3D mesh synthesis.',
            purpose: 'Image-to-video and 3D asset creation.',
            versions: [
              { id: 'v_svd', name: 'Stable Video Diffusion', year: 2023, open: true, desc: 'Open video generation model.' },
              { id: 'v_sf3d', name: 'Stable Fast 3D', year: 2024, open: true, desc: 'Sub-second 3D mesh generation.' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'c_nvidia',
    name: 'NVIDIA',
    logo: 'google.png',
    color: '#76b900',
    founded: '1993',
    focus: 'Nemotron LLMs, Riva Speech AI, Cosmos Physical AI',
    categories: [
      {
        id: 'cat_nvidia_found',
        name: 'Foundation Models',
        desc: 'Nemotron LLM series.',
        families: [
          {
            id: 'fam_nvidia_nemotron',
            name: 'Nemotron',
            desc: 'NVIDIA customized foundation model series.',
            purpose: 'Enterprise LLMs optimized for NeMo framework.',
            versions: [
              { id: 'v_nemotron', name: 'Nemotron', year: 2023, open: true, desc: 'NVIDIA open alignment & foundation LLM.' },
            ]
          }
        ]
      },
      {
        id: 'cat_nvidia_speech',
        name: 'Speech AI',
        desc: 'Speech processing framework.',
        families: [
          {
            id: 'fam_nvidia_riva',
            name: 'Riva',
            desc: 'NVIDIA GPU-accelerated speech AI.',
            purpose: 'Real-time conversational speech pipelines.',
            versions: [
              { id: 'v_riva', name: 'Riva', year: 2022, open: false, desc: 'GPU-accelerated speech AI SDK.' },
            ]
          }
        ]
      },
      {
        id: 'cat_nvidia_physical',
        name: 'World / Physical AI',
        desc: 'Physical AI and world foundation models.',
        families: [
          {
            id: 'fam_nvidia_cosmos',
            name: 'Cosmos',
            desc: 'NVIDIA world foundation models for robotics.',
            purpose: 'Physical AI simulation and autonomous navigation.',
            versions: [
              { id: 'v_cosmos', name: 'Cosmos', year: 2024, open: true, desc: 'World foundation model for physical AI.' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'c_cohere',
    name: 'Cohere',
    logo: 'google.png',
    color: '#d97706',
    founded: '2019',
    focus: 'Enterprise Command LLMs, Embed & Rerank Models',
    categories: [
      {
        id: 'cat_cohere_lang',
        name: 'Language Models',
        desc: 'Command series for Enterprise RAG.',
        families: [
          {
            id: 'fam_cohere_command',
            name: 'Command',
            desc: 'Cohere enterprise LLM series.',
            purpose: 'Enterprise RAG, tool use, and multi-step agents.',
            versions: [
              { id: 'v_command', name: 'Command', year: 2023, open: false, desc: 'Cohere instruction tuned model.' },
              { id: 'v_commandr', name: 'Command R', year: 2024, open: true, desc: 'RAG-optimized open weights model.' },
              { id: 'v_commandrp', name: 'Command R+', year: 2024, open: true, desc: 'Flagship enterprise RAG model.' },
              { id: 'v_commanda', name: 'Command A', year: 2025, open: false, desc: 'Agentic reasoning LLM.' },
            ]
          }
        ]
      },
      {
        id: 'cat_cohere_search',
        name: 'Embeddings & Reranking',
        desc: 'Search and retrieval models.',
        families: [
          {
            id: 'fam_cohere_retrieval',
            name: 'Embed & Rerank',
            desc: 'Semantic search and document reranking.',
            purpose: 'Powering high precision vector search and RAG pipelines.',
            versions: [
              { id: 'v_embed', name: 'Embed', year: 2023, open: false, desc: 'Multilingual text embedding model.' },
              { id: 'v_rerank', name: 'Rerank', year: 2023, open: false, desc: 'Document relevance reranking model.' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'c_ai21',
    name: 'AI21 Labs',
    logo: 'google.png',
    color: '#ec4899',
    founded: '2017',
    focus: 'Jurassic Series & Jamba Mamba-Transformer Hybrids',
    categories: [
      {
        id: 'cat_ai21_lang',
        name: 'Language Models',
        desc: 'Jurassic series LLMs.',
        families: [
          {
            id: 'fam_ai21_jurassic',
            name: 'Jurassic',
            desc: 'AI21 foundational language models.',
            purpose: 'Enterprise language processing and text generation.',
            versions: [
              { id: 'v_j1', name: 'Jurassic-1', year: 2021, open: false, desc: '178B parameter language model.' },
              { id: 'v_j2', name: 'Jurassic-2', year: 2023, open: false, desc: 'Advanced enterprise instruction model.' },
            ]
          }
        ]
      },
      {
        id: 'cat_ai21_hybrid',
        name: 'Hybrid Language Models',
        desc: 'Mamba + Transformer SSM hybrid models.',
        families: [
          {
            id: 'fam_ai21_jamba',
            name: 'Jamba',
            desc: 'Joint Mamba-Transformer SSM hybrid architecture.',
            purpose: '256K context window with high memory efficiency.',
            versions: [
              { id: 'v_jamba', name: 'Jamba', year: 2024, open: true, desc: 'First production SSM-Transformer hybrid.' },
            ]
          }
        ]
      }
    ]
  }
];
