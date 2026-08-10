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
            name: 'GPT Series',
            desc: 'Generative Pre-trained Transformer landmark models.',
            purpose: 'General intelligence, coding, reasoning, and multi-turn dialogue.',
            versions: [
              { id: 'v_gpt35', name: 'GPT-3.5', year: 2022, open: false, desc: 'Instruction-tuned backbone for ChatGPT.' },
              { id: 'v_gpt4', name: 'GPT-4', year: 2023, open: false, desc: 'Multimodal reasoning frontier model.' },
              { id: 'v_gpt4o', name: 'GPT-4o', year: 2024, open: false, desc: 'Native omni model integrating text, audio, and vision.' },
              { id: 'v_gpt45', name: 'GPT-4.5', year: 2025, open: false, desc: 'Scale-up milestone model with enhanced intuition.' },
              { id: 'v_gpt5', name: 'GPT-5', year: 2025, open: false, desc: 'Unified reasoning & agentic execution system.' },
              { id: 'v_gpt55', name: 'GPT-5.5', year: 2026, open: false, desc: 'Flagship Orion-tier intelligence system.' },
            ]
          }
        ]
      },
      {
        id: 'cat_openai_media',
        name: 'Generative Media',
        desc: 'Image and video synthesis models.',
        families: [
          {
            id: 'fam_openai_dalle',
            name: 'DALL·E Image',
            desc: 'Text-to-image diffusion models.',
            purpose: 'Generating artwork and photorealistic images.',
            versions: [
              { id: 'v_dalle2', name: 'DALL·E 2', year: 2022, open: false, desc: 'unCLIP diffusion image generator.' },
              { id: 'v_dalle3', name: 'DALL·E 3', year: 2023, open: false, desc: 'High-detail ChatGPT native image generator.' },
            ]
          },
          {
            id: 'fam_openai_sora',
            name: 'Sora Video',
            desc: 'Diffusion Transformer (DiT) video engine.',
            purpose: 'Photorealistic video and physics simulation.',
            versions: [
              { id: 'v_sora1', name: 'Sora', year: 2024, open: false, desc: 'Breakthrough DiT text-to-video model.' },
              { id: 'v_sora2', name: 'Sora 2', year: 2025, open: false, desc: 'Real-time interactive physics video engine.' },
            ]
          }
        ]
      },
      {
        id: 'cat_openai_spec',
        name: 'Specialized AI',
        desc: 'Speech recognition and code synthesis.',
        families: [
          {
            id: 'fam_openai_specialized',
            name: 'Whisper & Codex',
            desc: 'Speech recognition & code synthesis.',
            purpose: 'Powering automatic transcription and GitHub Copilot.',
            versions: [
              { id: 'v_codex', name: 'Codex', year: 2021, open: false, desc: 'Code completion engine for GitHub Copilot.' },
              { id: 'v_whisper', name: 'Whisper', year: 2022, open: true, desc: 'Robust open multilingual speech recognition.' },
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
            name: 'BERT, T5 & PaLM',
            desc: 'Bidirectional encoder & text-to-text transformers.',
            purpose: 'Search comprehension and scale language modeling.',
            versions: [
              { id: 'v_bert', name: 'BERT', year: 2018, open: true, desc: 'Bidirectional Encoder Representations from Transformers.' },
              { id: 'v_t5', name: 'T5', year: 2019, open: true, desc: 'Text-to-Text Transfer Transformer.' },
              { id: 'v_palm2', name: 'PaLM 2', year: 2023, open: false, desc: 'Multilingual reasoning language model.' },
            ]
          }
        ]
      },
      {
        id: 'cat_google_multi',
        name: 'Multimodal Frontier',
        desc: 'Native multimodal foundation models.',
        families: [
          {
            id: 'fam_google_gemini',
            name: 'Gemini Series',
            desc: 'Google DeepMind flagship multimodal model ecosystem.',
            purpose: 'Native text, audio, image, and video comprehension.',
            versions: [
              { id: 'v_gemini10', name: 'Gemini 1.0', year: 2023, open: false, desc: 'Ultra, Pro, and Nano multimodal tiers.' },
              { id: 'v_gemini15', name: 'Gemini 1.5 Pro', year: 2024, open: false, desc: '2M token context window model.' },
              { id: 'v_gemini20', name: 'Gemini 2.0 Flash', year: 2024, open: false, desc: 'Real-time audio & thinking mode model.' },
              { id: 'v_gemini25', name: 'Gemini 2.5', year: 2025, open: false, desc: 'Deep reasoning multimodal engine.' },
              { id: 'v_gemini31', name: 'Gemini 3.1 Pro', year: 2026, open: false, desc: 'Flagship 2026 Pro frontier model.' },
            ]
          }
        ]
      },
      {
        id: 'cat_google_creative',
        name: 'Creative Generative AI',
        desc: 'Image, video, and audio synthesis.',
        families: [
          {
            id: 'fam_google_media',
            name: 'Imagen, Veo & Lyria',
            desc: 'Creative image, video, and music models.',
            purpose: 'High fidelity image generation, 1080p video, and music composition.',
            versions: [
              { id: 'v_imagen3', name: 'Imagen 3', year: 2024, open: false, desc: 'Highest quality image synthesis model.' },
              { id: 'v_veo', name: 'Veo 3', year: 2025, open: false, desc: 'Photorealistic physics video generator.' },
              { id: 'v_lyria', name: 'Lyria', year: 2024, open: false, desc: 'DeepMind music composition model.' },
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
            name: 'LLaMA Series',
            desc: 'Meta flagship open-weights language model series.',
            purpose: 'General purpose text generation, coding, and reasoning.',
            versions: [
              { id: 'v_llama1', name: 'LLaMA', year: 2023, open: true, desc: 'Meta first open weights LLM (7B-65B).' },
              { id: 'v_llama2', name: 'Llama 2', year: 2023, open: true, desc: '70B open weights model family.' },
              { id: 'v_llama3', name: 'Llama 3', year: 2024, open: true, desc: 'Flagship 405B open weights model.' },
              { id: 'v_llama31', name: 'Llama 3.1', year: 2024, open: true, desc: '405B open weights with 128K context.' },
              { id: 'v_llama4', name: 'Llama 4', year: 2025, open: true, desc: 'Native multimodal MoE open weights.' },
            ]
          }
        ]
      },
      {
        id: 'cat_meta_nlp',
        name: 'NLP Research',
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
            name: 'Claude Series',
            desc: 'Anthropic Claude model family.',
            purpose: 'Helpful, harmless, and honest assistant for coding, math, and analysis.',
            versions: [
              { id: 'v_claude2', name: 'Claude 2', year: 2023, open: false, desc: '100K token context window assistant.' },
              { id: 'v_claude3', name: 'Claude 3 Opus', year: 2024, open: false, desc: 'Opus, Sonnet, and Haiku tiers.' },
              { id: 'v_claude35', name: 'Claude 3.5 Sonnet', year: 2024, open: false, desc: 'SOTA coding and Computer Use model.' },
              { id: 'v_claude37', name: 'Claude 3.7 Opus', year: 2025, open: false, desc: 'Hybrid reasoning model with extended thinking.' },
              { id: 'v_claude4', name: 'Claude 4', year: 2025, open: false, desc: '4th generation Constitutional AI assistant.' },
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
        desc: 'High performance dense and MoE models.',
        families: [
          {
            id: 'fam_mistral_dense',
            name: 'Mistral & Mixtral',
            desc: 'Dense & Sparse MoE models.',
            purpose: 'High efficiency reasoning with active parameters.',
            versions: [
              { id: 'v_m7b', name: 'Mistral 7B', year: 2023, open: true, desc: 'Sliding window attention 7B open model.' },
              { id: 'v_mixtral8x7b', name: 'Mixtral 8x7B', year: 2023, open: true, desc: 'Sparse 8x7B MoE model.' },
              { id: 'v_mixtral8x22b', name: 'Mixtral 8x22B', year: 2024, open: true, desc: 'Massive 8x22B open MoE.' },
              { id: 'v_mlarge2', name: 'Mistral Large 2', year: 2024, open: true, desc: '128K context open weights model.' },
              { id: 'v_mlarge3', name: 'Mistral Large 3', year: 2025, open: true, desc: 'Top-tier open source frontier LLM.' },
            ]
          }
        ]
      },
      {
        id: 'cat_mistral_spec',
        name: 'Specialized Models',
        desc: 'Code, reasoning, and speech models.',
        families: [
          {
            id: 'fam_mistral_specialized',
            name: 'Codestral & Magistral',
            desc: 'Code synthesis & deep reasoning.',
            purpose: 'Coding in 80+ languages and step-by-step math reasoning.',
            versions: [
              { id: 'v_codestral', name: 'Codestral', year: 2024, open: true, desc: 'Specialized 22B coding model.' },
              { id: 'v_magistral', name: 'Magistral', year: 2025, open: true, desc: 'Deep reasoning MoE model.' },
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
            name: 'Grok Series',
            desc: 'xAI Grok foundation model family.',
            purpose: 'Real-time information synthesis, coding, and reasoning.',
            versions: [
              { id: 'v_grok1', name: 'Grok-1', year: 2023, open: true, desc: '314B open weights language model.' },
              { id: 'v_grok2', name: 'Grok-2', year: 2024, open: false, desc: 'SOTA reasoning and image comprehension.' },
              { id: 'v_grok3', name: 'Grok-3', year: 2025, open: false, desc: 'Trained on 100K H100 Colossus cluster.' },
              { id: 'v_grok4', name: 'Grok-4', year: 2025, open: false, desc: 'Next-gen reasoning engine.' },
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
            name: 'Phi Series',
            desc: 'Microsoft Phi open SLMs.',
            purpose: 'High performance reasoning on edge devices.',
            versions: [
              { id: 'v_phi2', name: 'Phi-2', year: 2023, open: true, desc: '2.7B textbook quality language model.' },
              { id: 'v_phi3', name: 'Phi-3', year: 2024, open: true, desc: 'Mini (3.8B), Small (7B), and Medium (14B).' },
              { id: 'v_phi4', name: 'Phi-4', year: 2024, open: true, desc: '14B math and reasoning model.' },
            ]
          }
        ]
      },
      {
        id: 'cat_ms_assistant',
        name: 'AI Ecosystem',
        desc: 'Enterprise productivity assistant layer.',
        families: [
          {
            id: 'fam_ms_copilot',
            name: 'Copilot Product Layer',
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
        name: 'Image & Video Synthesis',
        desc: 'Open latent diffusion image and video models.',
        families: [
          {
            id: 'fam_stability_sd',
            name: 'Stable Diffusion & Video',
            desc: 'Latent diffusion image and video series.',
            purpose: 'Open-source text-to-image and image-to-video generation.',
            versions: [
              { id: 'v_sdxl', name: 'Stable Diffusion XL', year: 2023, open: true, desc: 'Flagship 1024x1024 dual encoder model.' },
              { id: 'v_sd3', name: 'Stable Diffusion 3', year: 2024, open: true, desc: 'Multimodal Diffusion Transformer (MMDiT).' },
              { id: 'v_svd', name: 'Stable Video Diffusion', year: 2023, open: true, desc: 'Open video generation model.' },
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
        name: 'AI Platforms',
        desc: 'Nemotron LLMs, Riva Speech, and Cosmos Physical AI.',
        families: [
          {
            id: 'fam_nvidia_ai',
            name: 'Nemotron & Cosmos',
            desc: 'Foundation and physical world models.',
            purpose: 'Enterprise LLMs, speech SDK, and robotics simulation.',
            versions: [
              { id: 'v_riva', name: 'Riva Speech', year: 2022, open: false, desc: 'GPU-accelerated speech AI SDK.' },
              { id: 'v_nemotron', name: 'Nemotron', year: 2023, open: true, desc: 'NVIDIA open foundation LLM.' },
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
        id: 'cat_cohere_platform',
        name: 'Enterprise RAG Platform',
        desc: 'Command series and search retrieval models.',
        families: [
          {
            id: 'fam_cohere_suite',
            name: 'Command & Retrieval',
            desc: 'Command R+ & Embed / Rerank models.',
            purpose: 'Enterprise RAG, semantic search, and multi-step agents.',
            versions: [
              { id: 'v_embed', name: 'Embed & Rerank', year: 2023, open: false, desc: 'Multilingual text embedding and reranking.' },
              { id: 'v_commandrp', name: 'Command R+', year: 2024, open: true, desc: 'Flagship enterprise RAG model.' },
              { id: 'v_commanda', name: 'Command A', year: 2025, open: false, desc: 'Agentic reasoning LLM.' },
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
        id: 'cat_ai21_models',
        name: 'Language & Hybrid Models',
        desc: 'Jurassic series & Jamba Mamba hybrids.',
        families: [
          {
            id: 'fam_ai21_suite',
            name: 'Jurassic & Jamba',
            desc: 'Transformer and Mamba SSM hybrid models.',
            purpose: 'Enterprise language processing with 256K context windows.',
            versions: [
              { id: 'v_j2', name: 'Jurassic-2', year: 2023, open: false, desc: 'Advanced enterprise instruction model.' },
              { id: 'v_jamba', name: 'Jamba', year: 2024, open: true, desc: 'First production SSM-Transformer hybrid.' },
            ]
          }
        ]
      }
    ]
  }
];
