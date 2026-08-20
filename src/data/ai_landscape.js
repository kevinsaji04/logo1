// ─── AI MODEL LANDSCAPE DATASET (ALL 5 VIEWS) ───

// 1. COMPANY VIEW DATASET: COMPANY → CATEGORY → MODEL FAMILY → MODEL VERSION
export const COMPANY_VIEW = [
  {
    id: 'c_openai',
    name: 'OpenAI',
    logo: 'openai.png',
    color: '#3b82f6',
    founded: '2015',
    focus: 'Frontier LLMs, Multimodal Omni Models, Image & Video Synthesis',
    children: [
      {
        id: 'cat_openai_lang',
        name: 'Language Models',
        desc: 'Autoregressive language models and chat assistants.',
        children: [
          {
            id: 'fam_openai_gpt',
            name: 'GPT Series',
            desc: 'Generative Pre-trained Transformer series.',
            purpose: 'General intelligence, coding, reasoning, and dialogue.',
            children: [
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
        children: [
          {
            id: 'fam_openai_dalle',
            name: 'DALL·E Image',
            desc: 'Text-to-image diffusion models.',
            purpose: 'Generating photorealistic artwork and images.',
            children: [
              { id: 'v_dalle2', name: 'DALL·E 2', year: 2022, open: false, desc: 'unCLIP diffusion image generator.' },
              { id: 'v_dalle3', name: 'DALL·E 3', year: 2023, open: false, desc: 'High-detail ChatGPT native image generator.' },
            ]
          },
          {
            id: 'fam_openai_sora',
            name: 'Sora Video',
            desc: 'Diffusion Transformer (DiT) video engine.',
            purpose: 'Photorealistic video and physics simulation.',
            children: [
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
        children: [
          {
            id: 'fam_openai_spec',
            name: 'Whisper & Codex',
            desc: 'Speech recognition & code synthesis.',
            purpose: 'Powering automatic transcription and GitHub Copilot.',
            children: [
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
    name: 'Google / DeepMind',
    logo: 'google.png',
    color: '#ea4335',
    founded: '1998',
    focus: 'Transformers, Multimodal Frontier Gemini, Imagen, Veo & Lyria',
    children: [
      {
        id: 'cat_google_lang',
        name: 'Language Models',
        desc: 'Foundational encoder and decoder language models.',
        children: [
          {
            id: 'fam_google_encoder',
            name: 'BERT, T5 & PaLM',
            desc: 'Bidirectional encoder & text-to-text transformers.',
            purpose: 'Search comprehension and scale language modeling.',
            children: [
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
        children: [
          {
            id: 'fam_google_gemini',
            name: 'Gemini Series',
            desc: 'Google DeepMind flagship multimodal model ecosystem.',
            purpose: 'Native text, audio, image, and video comprehension.',
            children: [
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
        children: [
          {
            id: 'fam_google_media',
            name: 'Imagen, Veo & Lyria',
            desc: 'Creative image, video, and music models.',
            purpose: 'High fidelity image generation, 1080p video, and music composition.',
            children: [
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
    children: [
      {
        id: 'cat_meta_lang',
        name: 'Language Models',
        desc: 'Decoder-only open weights LLMs.',
        children: [
          {
            id: 'fam_meta_llama',
            name: 'LLaMA Series',
            desc: 'Meta flagship open-weights language model series.',
            purpose: 'General purpose text generation, coding, and reasoning.',
            children: [
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
        children: [
          {
            id: 'fam_meta_roberta',
            name: 'RoBERTa & BART',
            desc: 'Meta FAIR landmark NLP pre-training architectures.',
            purpose: 'Classification, comprehension, and sequence denoising.',
            children: [
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
    children: [
      {
        id: 'cat_anthropic_lang',
        name: 'Language / Foundation Models',
        desc: 'Safety-aligned Constitutional AI models.',
        children: [
          {
            id: 'fam_anthropic_claude',
            name: 'Claude Series',
            desc: 'Anthropic Claude model family.',
            purpose: 'Helpful, harmless, and honest assistant for coding, math, and analysis.',
            children: [
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
    children: [
      {
        id: 'cat_mistral_lang',
        name: 'Language Models',
        desc: 'High performance dense and MoE models.',
        children: [
          {
            id: 'fam_mistral_dense',
            name: 'Mistral & Mixtral',
            desc: 'Dense & Sparse MoE models.',
            purpose: 'High efficiency reasoning with active parameters.',
            children: [
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
        children: [
          {
            id: 'fam_mistral_spec',
            name: 'Codestral & Magistral',
            desc: 'Code synthesis & deep reasoning.',
            purpose: 'Coding in 80+ languages and step-by-step math reasoning.',
            children: [
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
    children: [
      {
        id: 'cat_xai_lang',
        name: 'Language Models',
        desc: 'Truth-seeking LLMs with real-time knowledge.',
        children: [
          {
            id: 'fam_xai_grok',
            name: 'Grok Series',
            desc: 'xAI Grok foundation model family.',
            purpose: 'Real-time information synthesis, coding, and reasoning.',
            children: [
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
    children: [
      {
        id: 'cat_ms_slm',
        name: 'Small Language Models',
        desc: 'Efficient small language models (SLMs).',
        children: [
          {
            id: 'fam_ms_phi',
            name: 'Phi Series',
            desc: 'Microsoft Phi open SLMs.',
            purpose: 'High performance reasoning on edge devices.',
            children: [
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
        children: [
          {
            id: 'fam_ms_copilot',
            name: 'Copilot Product Layer',
            desc: 'Microsoft AI assistant product layer.',
            purpose: 'Productivity integration across Windows, Office, and GitHub.',
            children: [
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
    children: [
      {
        id: 'cat_stability_image',
        name: 'Image & Video Synthesis',
        desc: 'Open latent diffusion image and video models.',
        children: [
          {
            id: 'fam_stability_sd',
            name: 'Stable Diffusion & Video',
            desc: 'Latent diffusion image and video series.',
            purpose: 'Open-source text-to-image and image-to-video generation.',
            children: [
              { id: 'v_sdxl', name: 'Stable Diffusion XL', year: 2023, open: true, desc: 'Flagship 1024x1024 dual encoder model.' },
              { id: 'v_sd3', name: 'Stable Diffusion 3', year: 2024, open: true, desc: 'Multimodal Diffusion Transformer (MMDiT).' },
              { id: 'v_svd', name: 'Stable Video Diffusion', year: 2023, open: true, desc: 'Open video generation model.' },
            ]
          }
        ]
      }
    ]
  }
];

// 2. CATEGORY VIEW DATASET: CATEGORY → MODEL FAMILY → COMPANY → MODEL VERSION
export const CATEGORY_VIEW = [
  {
    id: 'catv_lang',
    name: 'Language Models',
    color: '#3b82f6',
    desc: 'General purpose text generation, instruction alignment, and multi-turn dialogue.',
    children: [
      {
        id: 'catv_fam_gpt',
        name: 'GPT Series',
        desc: 'OpenAI autoregressive language model family.',
        children: [
          {
            id: 'catv_comp_openai',
            name: 'OpenAI',
            color: '#3b82f6',
            children: [
              { id: 'cv_gpt35', name: 'GPT-3.5', year: 2022, open: false, desc: 'Instruction-tuned backbone for ChatGPT.' },
              { id: 'cv_gpt4', name: 'GPT-4', year: 2023, open: false, desc: 'Multimodal reasoning frontier model.' },
              { id: 'cv_gpt4o', name: 'GPT-4o', year: 2024, open: false, desc: 'Native omni model for text, audio, vision.' },
              { id: 'cv_gpt5', name: 'GPT-5', year: 2025, open: false, desc: 'Unified reasoning & agentic execution.' },
            ]
          }
        ]
      },
      {
        id: 'catv_fam_llama',
        name: 'LLaMA Series',
        desc: 'Meta open weights foundation model series.',
        children: [
          {
            id: 'catv_comp_meta',
            name: 'Meta AI',
            color: '#22c55e',
            children: [
              { id: 'cv_llama2', name: 'Llama 2 70B', year: 2023, open: true, desc: 'Open weights model family.' },
              { id: 'cv_llama3', name: 'Llama 3 405B', year: 2024, open: true, desc: 'Flagship 405B open weights model.' },
              { id: 'cv_llama4', name: 'Llama 4', year: 2025, open: true, desc: 'Native multimodal MoE open weights.' },
            ]
          }
        ]
      },
      {
        id: 'catv_fam_claude',
        name: 'Claude Series',
        desc: 'Anthropic safety-aligned Constitutional AI.',
        children: [
          {
            id: 'catv_comp_anthropic',
            name: 'Anthropic',
            color: '#d946ef',
            children: [
              { id: 'cv_claude3', name: 'Claude 3 Opus', year: 2024, open: false, desc: 'Opus, Sonnet, and Haiku tiers.' },
              { id: 'cv_claude35', name: 'Claude 3.5 Sonnet', year: 2024, open: false, desc: 'SOTA coding and Computer Use model.' },
              { id: 'cv_claude37', name: 'Claude 3.7 Opus', year: 2025, open: false, desc: 'Hybrid reasoning model with extended thinking.' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'catv_image',
    name: 'Image Generation',
    color: '#f97316',
    desc: 'Text-to-image synthesis and latent diffusion models.',
    children: [
      {
        id: 'catv_fam_dalle',
        name: 'DALL·E',
        desc: 'OpenAI image generation model series.',
        children: [
          {
            id: 'catv_comp_openai_img',
            name: 'OpenAI',
            color: '#3b82f6',
            children: [
              { id: 'cv_dalle2', name: 'DALL·E 2', year: 2022, open: false, desc: 'unCLIP diffusion image generator.' },
              { id: 'cv_dalle3', name: 'DALL·E 3', year: 2023, open: false, desc: 'Native ChatGPT image generator.' },
            ]
          }
        ]
      },
      {
        id: 'catv_fam_sd',
        name: 'Stable Diffusion',
        desc: 'Stability AI open-source latent diffusion.',
        children: [
          {
            id: 'catv_comp_stability',
            name: 'Stability AI',
            color: '#8b5cf6',
            children: [
              { id: 'cv_sdxl', name: 'Stable Diffusion XL', year: 2023, open: true, desc: '1024x1024 dual encoder model.' },
              { id: 'cv_sd3', name: 'Stable Diffusion 3', year: 2024, open: true, desc: 'MMDiT architecture image generator.' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'catv_video',
    name: 'Video Generation',
    color: '#ec4899',
    desc: 'Text-to-video diffusion transformer models.',
    children: [
      {
        id: 'catv_fam_sora',
        name: 'Sora & Veo',
        desc: 'Diffusion Transformer video engines.',
        children: [
          {
            id: 'catv_comp_video_producers',
            name: 'OpenAI & Google',
            color: '#ea4335',
            children: [
              { id: 'cv_sora', name: 'Sora', year: 2024, open: false, desc: 'Breakthrough DiT text-to-video model.' },
              { id: 'cv_sora2', name: 'Sora 2', year: 2025, open: false, desc: 'Real-time interactive physics video engine.' },
              { id: 'cv_veo', name: 'Veo 3', year: 2025, open: false, desc: 'Google DeepMind 1080p video generator.' },
            ]
          }
        ]
      }
    ]
  }
];

// 3. RELEASE VIEW DATASET: YEAR → QUARTER → COMPANY → MODEL
export const RELEASE_VIEW = [
  {
    id: 'rel_2023',
    name: '2023 Releases',
    color: '#38bdf8',
    desc: 'The landmark year of ChatGPT integration, GPT-4, and open LLaMA models.',
    children: [
      {
        id: 'rel_2023_q1',
        name: 'Q1 / Q2 2023',
        desc: 'Frontier foundation models.',
        children: [
          {
            id: 'rel_2023_openai',
            name: 'OpenAI',
            color: '#3b82f6',
            children: [
              { id: 'rv_gpt4', name: 'GPT-4', year: 2023, open: false, desc: 'Multimodal reasoning frontier model.' },
            ]
          },
          {
            id: 'rel_2023_meta',
            name: 'Meta AI',
            color: '#22c55e',
            children: [
              { id: 'rv_llama1', name: 'LLaMA 1', year: 2023, open: true, desc: 'First Meta open weights LLM.' },
              { id: 'rv_llama2', name: 'Llama 2 70B', year: 2023, open: true, desc: 'Open weights model family.' },
            ]
          }
        ]
      },
      {
        id: 'rel_2023_q3',
        name: 'Q3 / Q4 2023',
        desc: 'Multimodal Gemini & Open MoE.',
        children: [
          {
            id: 'rel_2023_google',
            name: 'Google & Mistral',
            color: '#14b8a6',
            children: [
              { id: 'rv_gemini10', name: 'Gemini 1.0', year: 2023, open: false, desc: 'Google DeepMind native multimodal model.' },
              { id: 'rv_m7b', name: 'Mistral 7B', year: 2023, open: true, desc: 'High performance open model.' },
              { id: 'rv_mixtral8x7b', name: 'Mixtral 8x7B', year: 2023, open: true, desc: 'Sparse Mixture-of-Experts model.' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'rel_2024',
    name: '2024 Releases',
    color: '#8b5cf6',
    desc: 'The year of Omni models, Computer Use, and 405B Open Weights.',
    children: [
      {
        id: 'rel_2024_h1',
        name: 'First Half 2024',
        desc: 'GPT-4o, Claude 3.5, Llama 3.',
        children: [
          {
            id: 'rel_2024_frontier',
            name: 'Frontier Labs',
            color: '#d946ef',
            children: [
              { id: 'rv_gpt4o', name: 'GPT-4o', year: 2024, open: false, desc: 'Sub-second omni multimodal model.' },
              { id: 'rv_claude35', name: 'Claude 3.5 Sonnet', year: 2024, open: false, desc: 'Computer Use & SOTA coding.' },
              { id: 'rv_llama3', name: 'Llama 3 405B', year: 2024, open: true, desc: '405B open weights model.' },
            ]
          }
        ]
      },
      {
        id: 'rel_2024_h2',
        name: 'Second Half 2024',
        desc: 'Video diffusion & real-time audio.',
        children: [
          {
            id: 'rel_2024_media',
            name: 'Sora, Gemini 2.0 & Phi-4',
            color: '#f97316',
            children: [
              { id: 'rv_sora', name: 'Sora', year: 2024, open: false, desc: 'Breakthrough DiT text-to-video model.' },
              { id: 'rv_gemini20', name: 'Gemini 2.0 Flash', year: 2024, open: false, desc: 'Real-time audio & thinking mode.' },
              { id: 'rv_phi4', name: 'Phi-4', year: 2024, open: true, desc: 'Microsoft 14B reasoning SLM.' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'rel_2025_2026',
    name: '2025 – 2026 Frontier',
    color: '#10b981',
    desc: 'GPT-5, Claude 4, Gemini 3, and autonomous agentic systems.',
    children: [
      {
        id: 'rel_2025_next',
        name: '2025 – 2026 Next-Gen',
        desc: 'Autonomous reasoning & Orion engine.',
        children: [
          {
            id: 'rel_2025_leads',
            name: 'OpenAI, Anthropic & Google',
            color: '#3b82f6',
            children: [
              { id: 'rv_gpt5', name: 'GPT-5', year: 2025, open: false, desc: 'Unified reasoning & agentic execution.' },
              { id: 'rv_claude37', name: 'Claude 3.7 Opus', year: 2025, open: false, desc: 'Extended thinking budget model.' },
              { id: 'rv_gemini25', name: 'Gemini 2.5', year: 2025, open: false, desc: 'Deep reasoning multimodal engine.' },
              { id: 'rv_gpt55', name: 'GPT-5.5', year: 2026, open: false, desc: 'Flagship Orion-tier intelligence system.' },
              { id: 'rv_claude47', name: 'Claude Opus 4.7', year: 2026, open: false, desc: '2026 flagship Opus model.' },
            ]
          }
        ]
      }
    ]
  }
];

// 4. PURPOSE VIEW DATASET: PROBLEM → PURPOSE → TASK → REQUIREMENTS → RECOMMENDED MODELS
export const PURPOSE_VIEW = [
  {
    id: 'purp_app',
    name: 'Build an AI App',
    color: '#6366f1',
    desc: 'Building modern AI software, SaaS agents, and copilot products.',
    children: [
      {
        id: 'purp_coding',
        name: 'Coding & Software Development',
        desc: 'Code synthesis, bug fixing, and repository understanding.',
        children: [
          {
            id: 'purp_task_codegen',
            name: 'Code Generation & Refactoring',
            desc: 'Multi-file code generation and automated testing.',
            children: [
              {
                id: 'purp_req_sota',
                name: 'High Reasoning & Benchmark Accuracy',
                desc: 'Requires top benchmark scores in Python, TS, and System Design.',
                children: [
                  { id: 'pv_claude35', name: 'Claude 3.5 Sonnet', year: 2024, open: false, desc: 'Industry-leading coding benchmark score.' },
                  { id: 'pv_gpt4o', name: 'GPT-4o', year: 2024, open: false, desc: 'Fast multimodal code synthesis API.' },
                  { id: 'pv_codestral', name: 'Codestral 22B', year: 2024, open: true, desc: 'Fill-in-the-middle open weights coding model.' },
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'purp_agent',
        name: 'Autonomous Agentic Workflows',
        desc: 'Tool use, multi-step planning, and Computer Use API.',
        children: [
          {
            id: 'purp_task_agent',
            name: 'Browser & Computer Automation',
            desc: 'Executing actions via GUI mouse/keyboard control.',
            children: [
              {
                id: 'purp_req_computeruse',
                name: 'Native Tool Use & Visual UI Comprehension',
                desc: 'Must comprehend desktop UI pixels and execute API calls.',
                children: [
                  { id: 'pv_claude37', name: 'Claude 3.7 Opus', year: 2025, open: false, desc: 'Extended thinking and SOTA Computer Use.' },
                  { id: 'pv_gpt5', name: 'GPT-5', year: 2025, open: false, desc: 'Unified agentic execution engine.' },
                  { id: 'pv_gemini20', name: 'Gemini 2.0 Flash', year: 2024, open: false, desc: 'Sub-second real-time agentic execution.' },
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'purp_creative',
    name: 'Creative Content Studio',
    color: '#f97316',
    desc: 'Generating marketing assets, video graphics, and audio compositions.',
    children: [
      {
        id: 'purp_media_gen',
        name: 'Visual & Motion Synthesis',
        desc: 'Text-to-image and photorealistic video generation.',
        children: [
          {
            id: 'purp_task_media',
            name: 'Photorealistic Images & 60s Video',
            desc: 'Marketing banners, cinematic video, and product renders.',
            children: [
              {
                id: 'purp_req_visual',
                name: 'High Resolution & Physics Stability',
                desc: 'Prompt adherence and stable motion physics.',
                children: [
                  { id: 'pv_dalle3', name: 'DALL·E 3', year: 2023, open: false, desc: 'Native ChatGPT image generator.' },
                  { id: 'pv_sora2', name: 'Sora 2', year: 2025, open: false, desc: 'Real-time interactive physics video model.' },
                  { id: 'pv_sd3', name: 'Stable Diffusion 3', year: 2024, open: true, desc: 'MMDiT open weights image generator.' },
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

// 5. CAPABILITY VIEW DATASET: CAPABILITY → SUB-CAPABILITY → RECOMMENDED MODELS
export const CAPABILITY_VIEW = [
  {
    id: 'cap_reasoning',
    name: 'Deep Reasoning & Logic',
    color: '#ec4899',
    desc: 'System 2 extended thinking, mathematical proofing, and scientific synthesis.',
    children: [
      {
        id: 'cap_math',
        name: 'Mathematical & Scientific Proofing',
        desc: 'Step-by-step problem solving with verifiable chain-of-thought.',
        children: [
          { id: 'capv_claude37', name: 'Claude 3.7 Opus', year: 2025, open: false, desc: 'Hybrid extended thinking budget engine.' },
          { id: 'capv_gpt5', name: 'GPT-5', year: 2025, open: false, desc: 'Deep mathematical & agentic reasoning.' },
          { id: 'capv_gemini25', name: 'Gemini 2.5', year: 2025, open: false, desc: 'DeepMind deep reasoning multimodal engine.' },
          { id: 'capv_magistral', name: 'Magistral MoE', year: 2025, open: true, desc: 'Mistral open deep reasoning model.' },
        ]
      },
      {
        id: 'cap_longcontext',
        name: 'Long-Context Retrieval & Grounding',
        desc: 'Analyzing 1M–2M token documents, codebases, and video logs.',
        children: [
          { id: 'capv_gemini15', name: 'Gemini 1.5 Pro', year: 2024, open: false, desc: 'Breakthrough 2M token context window.' },
          { id: 'capv_llama31', name: 'Llama 3.1 405B', year: 2024, open: true, desc: '128K context open weights flagship.' },
          { id: 'capv_commandrp', name: 'Command R+', year: 2024, open: true, desc: 'Enterprise RAG grounding model.' },
        ]
      }
    ]
  },
  {
    id: 'cap_multimodal',
    name: 'Multimodal & Real-Time Voice',
    color: '#10b981',
    desc: 'Native processing of text, vision, audio, and video in real-time.',
    children: [
      {
        id: 'cap_omni',
        name: 'Real-Time Voice & Omni Processing',
        desc: 'Sub-second audio input/output with natural conversational tone.',
        children: [
          { id: 'capv_gpt4o', name: 'GPT-4o', year: 2024, open: false, desc: 'Native omni text, audio, and vision model.' },
          { id: 'capv_gemini20', name: 'Gemini 2.0 Flash', year: 2024, open: false, desc: 'Real-time low latency audio model.' },
        ]
      }
    ]
  },
  {
    id: 'cap_edge',
    name: 'Edge & On-Device Deployment',
    color: '#eab308',
    desc: 'Running high quality AI models locally on mobile devices and laptops.',
    children: [
      {
        id: 'cap_slm',
        name: 'Small Language Models (SLMs)',
        desc: '1B–7B parameter models optimized for local NPU execution.',
        children: [
          { id: 'capv_llama32', name: 'Llama 3.2 3B', year: 2024, open: true, desc: 'Edge-optimized vision & text SLM.' },
          { id: 'capv_phi4mini', name: 'Phi-4-mini 3.8B', year: 2025, open: true, desc: 'Microsoft textbook quality edge SLM.' },
          { id: 'capv_m7b', name: 'Mistral 7B', year: 2023, open: true, desc: 'Fast sliding window attention model.' },
        ]
      }
    ]
  }
];
