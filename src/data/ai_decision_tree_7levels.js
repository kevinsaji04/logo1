// 7-Level AI Model Assessment & Decision Engine

export const ASSESSMENT_STEPS = [
  {
    step: 1,
    id: 'goal',
    title: 'What are you trying to build?',
    subtitle: 'Select the primary application or core capability you want to achieve.',
    options: [
      {
        value: 'coding',
        icon: '💻',
        label: 'Coding & Software Engineering Agents',
        desc: 'Repository-level refactoring, bug fixes, terminal tool calling, and full-stack software development.',
        tag: 'Code & Dev'
      },
      {
        value: 'reasoning',
        icon: '🧠',
        label: 'Deep Reasoning & Scientific Research',
        desc: 'Multi-step problem solving, mathematical proofs, STEM analysis, and test-time deliberation.',
        tag: 'Reasoning / CoT'
      },
      {
        value: 'chat',
        icon: '💬',
        label: 'Conversational AI & Customer Support',
        desc: 'Interactive chat assistants, customer support triage, Q&A, and high-quality dialogue.',
        tag: 'Chat & Dialogue'
      },
      {
        value: 'media',
        icon: '🎨',
        label: 'Visual & Generative Media',
        desc: 'Text-to-image art generation, photorealistic rendering, video synthesis, and cinematic clips.',
        tag: 'Image & Video'
      },
      {
        value: 'voice',
        icon: '🎙️',
        label: 'Voice, Speech & Audio Synthesis',
        desc: 'Ultra-realistic Text-to-Speech (TTS), speech transcription, and low-latency voice streaming.',
        tag: 'Audio & Speech'
      },
      {
        value: 'rag',
        icon: '🔍',
        label: 'Document Intelligence & Enterprise RAG',
        desc: 'Long-form document Q&A, PDF extraction, vector search, and grounded citation retrieval.',
        tag: 'RAG & Search'
      }
    ]
  },
  {
    step: 2,
    id: 'sensitivity',
    title: 'How sensitive is the data?',
    subtitle: 'Define your data privacy, regulatory compliance, and confidentiality requirements.',
    options: [
      {
        value: 'public',
        icon: '🌐',
        label: 'Public & Non-Confidential Data',
        desc: 'Standard public web content, open-domain queries, and non-sensitive consumer apps.',
        tag: 'Public'
      },
      {
        value: 'internal',
        icon: '🏢',
        label: 'Internal Business Data',
        desc: 'Proprietary corporate documentation covered by standard enterprise NDAs and zero-data-retention.',
        tag: 'Enterprise NDA'
      },
      {
        value: 'regulated',
        icon: '🛡️',
        label: 'Highly Regulated (HIPAA / SOC 2 / GDPR)',
        desc: 'Healthcare patient data, financial transactions (PCI-DSS), legal contracts, and audited clouds.',
        tag: 'Compliance'
      },
      {
        value: 'airgap',
        icon: '🔒',
        label: 'Strictly Air-Gapped & Sovereign',
        desc: '100% On-premise execution with zero external cloud transmission. Complete data sovereignty.',
        tag: 'Air-Gapped'
      }
    ]
  },
  {
    step: 3,
    id: 'context',
    title: 'How much information must the model handle at once?',
    subtitle: 'Determine the working memory capacity and context window required for your workload.',
    options: [
      {
        value: 'standard',
        icon: '📄',
        label: 'Standard Context (≤ 32K tokens)',
        desc: 'Up to ~60 pages. Ideal for single-turn Q&A, standalone functions, and lightweight chats.',
        tag: '≤ 32K ctx'
      },
      {
        value: 'medium',
        icon: '📑',
        label: 'Medium Context (32K – 128K tokens)',
        desc: 'Up to ~250 pages. Perfect for multi-turn conversations, script files, and document summaries.',
        tag: '128K ctx'
      },
      {
        value: 'large',
        icon: '📚',
        label: 'Large Enterprise Context (128K – 200K tokens)',
        desc: 'Up to ~400 pages. Built for multi-file codebase indexing, legal dossiers, and architectural specs.',
        tag: '200K ctx'
      },
      {
        value: 'massive',
        icon: '🏛️',
        label: 'Massive / Ultra-Long Context (1M – 2M+ tokens)',
        desc: 'Up to ~3,000 pages or hours of video/audio. Full book libraries and multi-repo architectures.',
        tag: '1M – 2M ctx'
      }
    ]
  },
  {
    step: 4,
    id: 'runtime',
    title: 'Where should it run?',
    subtitle: 'Select your preferred deployment environment and infrastructure constraints.',
    options: [
      {
        value: 'cloud',
        icon: '☁️',
        label: 'Serverless Managed Cloud API',
        desc: 'Zero infrastructure management. High availability and pay-per-token pricing via OpenRouter / APIs.',
        tag: 'Serverless API'
      },
      {
        value: 'cluster',
        icon: '🏢',
        label: 'On-Premise GPU Cluster (Multi-GPU)',
        desc: 'Enterprise high-throughput cluster nodes with 4x–8x 80GB GPUs (vLLM / SGLang / TensorRT).',
        tag: 'Enterprise GPU'
      },
      {
        value: 'workstation',
        icon: '🖥️',
        label: 'Local Workstation / Gaming GPU (12GB–24GB)',
        desc: 'Runs locally on a single consumer GPU (RTX 4090/3090 or Apple Silicon) using Ollama / LM Studio.',
        tag: 'Single GPU'
      },
      {
        value: 'edge',
        icon: '📱',
        label: 'Edge Device / Standard Laptop CPU (< 8GB)',
        desc: 'Lightweight quantized 1B–8B models running offline on standard laptop CPUs, mobile, or micro-edge.',
        tag: 'Edge / CPU'
      }
    ]
  },
  {
    step: 5,
    id: 'workload',
    title: 'What does the workload look like?',
    subtitle: 'Choose the latency, throughput, and execution pattern that matches your traffic.',
    options: [
      {
        value: 'latency',
        icon: '⚡',
        label: 'Ultra-Low Latency Real-Time (< 200ms)',
        desc: 'Sub-second first-token response for live interactive voice, search autocomplete, and instant bots.',
        tag: 'Fast TTFT'
      },
      {
        value: 'batch',
        icon: '📦',
        label: 'High-Throughput Batch Processing',
        desc: 'Asynchronous offline batch jobs, large-scale text classification, and data extraction pipelines.',
        tag: 'High Throughput'
      },
      {
        value: 'reasoning_cot',
        icon: '💡',
        label: 'Deep Deliberation & Extended CoT',
        desc: 'Allocates extended test-time compute budget to think and verify before returning final answers.',
        tag: 'Chain of Thought'
      },
      {
        value: 'multimodal',
        icon: '👁️',
        label: 'Multimodal Streaming (Vision / Audio)',
        desc: 'Simultaneous image inspection, video comprehension, audio stream inputs, and structured outputs.',
        tag: 'Multimodal'
      }
    ]
  },
  {
    step: 6,
    id: 'priority',
    title: 'What matters most to the business?',
    subtitle: 'Select the primary trade-off and optimization goal for your organization.',
    options: [
      {
        value: 'quality',
        icon: '🏆',
        label: 'Maximum Intelligence & Benchmark Superiority',
        desc: 'Prioritize frontier reasoning capabilities, top-1 benchmark accuracy, and complex problem solving.',
        tag: 'Frontier SOTA'
      },
      {
        value: 'cost',
        icon: '💰',
        label: 'Lowest Cost & Maximum Token Efficiency',
        desc: 'Minimize operating expenses with ultra-cheap $/1M token rates or zero-fee open weights.',
        tag: 'Cost Efficient'
      },
      {
        value: 'speed',
        icon: '🚀',
        label: 'High Throughput & Rapid Response',
        desc: 'High generation tokens/second and instant user interface responsiveness.',
        tag: 'High Speed'
      },
      {
        value: 'indic',
        icon: '🇮🇳',
        label: 'Multilingual Indic & Sovereign Specialization',
        desc: 'Native fluency in 22+ Indian languages, cultural contextualization, and IndiaAI ecosystem alignment.',
        tag: 'Indic Native'
      }
    ]
  },
  {
    step: 7,
    id: 'constraint',
    title: 'Any non-negotiable requirements?',
    subtitle: 'Enforce strict mandatory criteria for your final model selection.',
    options: [
      {
        value: 'open_weights',
        icon: '🔓',
        label: '100% Open Weights / Open Source Checkpoints',
        desc: 'Model weights must be publicly available on Hugging Face / GGUF for full local self-hosting.',
        tag: 'Open-Weights'
      },
      {
        value: 'tool_call',
        icon: '🛠️',
        label: 'Guaranteed JSON Mode & Native Tool Calling',
        desc: 'Must reliably adhere to strict JSON schemas and execute structured function calls for agents.',
        tag: 'Function Calling'
      },
      {
        value: 'openrouter',
        icon: '🌐',
        label: 'Available via OpenRouter Multi-Provider API',
        desc: 'Single unified API key with automated load balancing, provider fallbacks, and live usage stats.',
        tag: 'OpenRouter'
      },
      {
        value: 'none',
        icon: '⚖️',
        label: 'No Strict Non-Negotiable Constraints',
        desc: 'Provide the overall best-fit recommendation balancing capability, latency, and cost.',
        tag: 'Balanced'
      }
    ]
  }
];

// High-Precision Matching Engine for 787 Models
export function evaluateAssessmentRecommendations(answers, models) {
  if (!models || models.length === 0) return [];

  const scored = models.map((m) => {
    const [id, name, producer, cat, country, released, params, access, priceIn, priceOut, local, score, desc, tags] = m;
    let matchScore = 55;
    const reasons = [];

    const nameLower = (name || '').toLowerCase();
    const descLower = (desc || '').toLowerCase();
    const isLocal = local === true || access === 'open' || access === 'free';
    const isFree = priceIn === 0 && priceOut === 0;

    // 1. Goal Match
    if (answers.goal === 'coding') {
      if (cat === 'code' || nameLower.includes('coder') || nameLower.includes('code') || descLower.includes('code')) {
        matchScore += 32;
        reasons.push('Specialized in repository-level code synthesis & debugging');
      } else if (cat === 'reason' || score >= 92) {
        matchScore += 18;
      }
    } else if (answers.goal === 'reasoning') {
      if (cat === 'reason' || nameLower.includes('r1') || nameLower.includes('o1') || nameLower.includes('o3') || nameLower.includes('think')) {
        matchScore += 32;
        reasons.push('Frontier chain-of-thought reasoning & verification engine');
      } else if (score >= 90) {
        matchScore += 20;
      }
    } else if (answers.goal === 'chat') {
      if (cat === 'llm') matchScore += 26;
      if (priceIn != null && priceIn < 1.0) matchScore += 8;
    } else if (answers.goal === 'media') {
      if (cat === 'image' || cat === 'video' || cat === 'multi') {
        matchScore += 35;
        reasons.push('Native visual rendering and generative diffusion engine');
      }
    } else if (answers.goal === 'voice') {
      if (cat === 'audio' || nameLower.includes('audio') || nameLower.includes('whisper') || nameLower.includes('tts')) {
        matchScore += 35;
        reasons.push('Optimized voice synthesis and audio stream architecture');
      }
    } else if (answers.goal === 'rag') {
      if (cat === 'search' || nameLower.includes('sonar') || descLower.includes('search') || descLower.includes('retrieval')) {
        matchScore += 30;
        reasons.push('Built-in real-time grounding & citation verification');
      } else if (cat === 'llm') {
        matchScore += 16;
      }
    }

    // 2. Sensitivity & Air-gap
    if (answers.sensitivity === 'airgap') {
      if (isLocal) {
        matchScore += 30;
        reasons.push('100% offline air-gapped on-premise execution safe');
      } else {
        matchScore -= 50;
      }
    } else if (answers.sensitivity === 'regulated') {
      if (['Anthropic', 'OpenAI', 'Google', 'Microsoft', 'Amazon'].includes(producer) || isLocal) {
        matchScore += 16;
        reasons.push('Enterprise security audits & compliance standards');
      }
    }

    // 3. Context Capacity
    if (answers.context === 'massive') {
      if (nameLower.includes('gemini') || descLower.includes('1m') || descLower.includes('2m') || descLower.includes('extended')) {
        matchScore += 30;
        reasons.push('Massive 1M – 2M+ token context window capacity');
      } else if (descLower.includes('128k') || descLower.includes('200k')) {
        matchScore += 12;
      }
    } else if (answers.context === 'large') {
      if (descLower.includes('128k') || descLower.includes('200k') || nameLower.includes('claude') || nameLower.includes('gpt')) {
        matchScore += 20;
        reasons.push('Enterprise-scale 128K – 200K token memory buffer');
      }
    }

    // 4. Runtime Environment
    if (answers.runtime === 'edge') {
      const paramsLower = (params || '').toLowerCase();
      if (paramsLower.includes('1b') || paramsLower.includes('2b') || paramsLower.includes('3b') || paramsLower.includes('4b') || paramsLower.includes('7b') || paramsLower.includes('8b')) {
        matchScore += 28;
        reasons.push('Compact memory footprint for local laptop & CPU execution');
      } else if (!isLocal) {
        matchScore -= 35;
      }
    } else if (answers.runtime === 'workstation') {
      if (isLocal) {
        matchScore += 22;
        reasons.push('Fits comfortably on a single 16GB–24GB prosumer GPU');
      }
    } else if (answers.runtime === 'cloud') {
      if (!isLocal || priceIn != null) {
        matchScore += 15;
      }
    }

    // 5. Workload Pattern
    if (answers.workload === 'latency') {
      if (nameLower.includes('flash') || nameLower.includes('mini') || nameLower.includes('haiku') || nameLower.includes('turbo') || nameLower.includes('lite') || nameLower.includes('8b')) {
        matchScore += 24;
        reasons.push('Sub-200ms ultra-low latency response turnaround');
      }
    } else if (answers.workload === 'reasoning_cot') {
      if (nameLower.includes('r1') || nameLower.includes('o1') || nameLower.includes('o3') || nameLower.includes('think') || cat === 'reason') {
        matchScore += 24;
        reasons.push('Autonomous test-time deliberation & reasoning verification');
      }
    }

    // 6. Business Priority
    if (answers.priority === 'quality') {
      matchScore += (score - 80) * 1.5;
    } else if (answers.priority === 'cost') {
      if (isFree || (priceIn != null && priceIn < 0.3)) {
        matchScore += 30;
        reasons.push('Highly cost-efficient pricing ($0 – <$0.30 per 1M tokens)');
      }
    } else if (answers.priority === 'indic') {
      if (country === 'India' || ['Sarvam AI', 'Krutrim', 'AI4Bharat', 'Two AI', 'SML', 'Tech Mahindra'].includes(producer)) {
        matchScore += 45;
        reasons.push('Native fluency across 22+ Indian languages & sovereign stack');
      }
    }

    // 7. Non-negotiable Constraint
    if (answers.constraint === 'open_weights') {
      if (!isLocal) matchScore -= 100;
      else matchScore += 25;
    } else if (answers.constraint === 'tool_call') {
      if (['OpenAI', 'Anthropic', 'Google', 'Mistral AI', 'Alibaba', 'DeepSeek'].includes(producer)) {
        matchScore += 20;
        reasons.push('Guaranteed schema enforcement & tool execution');
      }
    }

    const finalPct = Math.min(99, Math.max(50, Math.round(matchScore)));

    return {
      model: m,
      score: finalPct,
      reasons: reasons.slice(0, 3)
    };
  });

  // Filter out any models below threshold and return top 5
  return scored
    .filter((s) => s.score >= 60)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
