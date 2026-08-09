export const FAMILY_COLORS = {
  encoder:   { stroke: '#818cf8', fill: 'rgba(99,102,241,0.12)',   label: 'Encoder (BERT)'      },
  encDec:    { stroke: '#34d399', fill: 'rgba(16,185,129,0.12)',   label: 'Encoder-Decoder (T5)' },
  gpt:       { stroke: '#60a5fa', fill: 'rgba(59,130,246,0.12)',   label: 'GPT / OpenAI'         },
  eleuther:  { stroke: '#a78bfa', fill: 'rgba(139,92,246,0.12)',   label: 'EleutherAI'           },
  meta:      { stroke: '#fb923c', fill: 'rgba(249,115,22,0.12)',   label: 'Meta'                 },
  google:    { stroke: '#f87171', fill: 'rgba(239,68,68,0.12)',    label: 'Google / DeepMind'    },
  anthropic: { stroke: '#e879f9', fill: 'rgba(232,121,249,0.12)', label: 'Anthropic'            },
  ai21:      { stroke: '#2dd4bf', fill: 'rgba(20,184,166,0.12)',   label: 'AI21 Labs'            },
  bloom:     { stroke: '#f472b6', fill: 'rgba(236,72,153,0.12)',   label: 'BigScience'           },
  ernie:     { stroke: '#fbbf24', fill: 'rgba(245,158,11,0.12)',   label: 'Baidu / ERNIE'        },
  microsoft: { stroke: '#38bdf8', fill: 'rgba(14,165,233,0.12)',   label: 'Microsoft'            },
  other:     { stroke: '#94a3b8', fill: 'rgba(100,116,139,0.12)',  label: 'Other'                },
};

export const W  = 1820;
export const H  = 1020;
export const NW = 100;
export const NH = 26;

// Y positions per year — 2023 at top, 2018 at bottom
export const YEAR_Y = { 2023: 120, 2022: 280, 2021: 490, 2020: 660, 2019: 810, 2018: 960 };

export const NODES = [
  // ─── 2018 ───
  { id:'bert',        name:'BERT',              dev:'Google',       year:2018, x:240,  yOff:0,  family:'encoder',  open:true,
    desc:'Bidirectional Encoder Representations from Transformers. Pre-trained on masked LM + NSP, it became the foundation of modern NLP.',
    features:['Bidirectional attention','Masked language modeling','110M / 340M parameters','Fine-tunable for any NLP task'] },

  { id:'gpt1',        name:'GPT-1',             dev:'OpenAI',       year:2018, x:1150, yOff:0,  family:'gpt',      open:false,
    desc:'First Generative Pre-trained Transformer. Showed unsupervised pre-training + supervised fine-tuning dramatically improves NLP.',
    features:['Transformer decoder','Unsupervised pre-training','Fine-tuning transfer','117M parameters'] },

  // ─── 2019 ───
  { id:'roberta',     name:'RoBERTa',            dev:'Meta',         year:2019, x:155,  yOff:0,  family:'encoder',  open:true,
    desc:'Robustly Optimized BERT: trains longer with bigger batches, more data, no NSP — beating BERT on every benchmark.',
    features:['Dynamic masking','No NSP task','Larger batch training','SOTA on GLUE / SQuAD'] },

  { id:'albert',      name:'ALBERT',             dev:'Google',       year:2019, x:265,  yOff:0,  family:'encoder',  open:true,
    desc:'A Lite BERT with factorized embedding parameterization and cross-layer parameter sharing, 18× fewer params than BERT-large.',
    features:['Factorized embeddings','Cross-layer param sharing','Sentence-order prediction','18× fewer params'] },

  { id:'ernie',       name:'ERNIE',              dev:'Baidu',        year:2019, x:390,  yOff:0,  family:'ernie',    open:false,
    desc:'Enhanced Representation through Knowledge Integration. Masks named entities and phrases, injecting world knowledge into BERT.',
    features:['Entity-aware masking','Knowledge graph integration','Chinese NLP leader','Phrase-level masking'] },

  { id:'t5',          name:'T5',                 dev:'Google',       year:2019, x:500,  yOff:0,  family:'encDec',   open:true,
    desc:'Text-To-Text Transfer Transformer — every NLP task is framed as text-in / text-out, pre-trained on massive C4 corpus.',
    features:['Unified text-to-text format','C4 corpus pre-training','Multi-task training','Up to 11B params'] },

  { id:'xlnet',       name:'XLNet',              dev:'Google',       year:2019, x:620,  yOff:0,  family:'encoder',  open:true,
    desc:'Overcomes BERT\'s conditional independence assumption with autoregressive permutation language modeling.',
    features:['Permutation LM','Autoregressive pre-training','Bidirectional context','Transformer-XL backbone'] },

  { id:'gpt2',        name:'GPT-2',              dev:'OpenAI',       year:2019, x:1150, yOff:0,  family:'gpt',      open:true,
    desc:'1.5B model initially withheld over misuse risk. Demonstrated surprisingly coherent, long-form text generation.',
    features:['1.5B parameters','Zero-shot task transfer','Coherent long-form text','Staged safety release'] },

  // ─── 2020 ───
  { id:'electra',     name:'ELECTRA',            dev:'Google',       year:2020, x:145,  yOff:0,  family:'encoder',  open:true,
    desc:'Replaced Token Detection pre-training. Discriminator-based approach — 4× more compute-efficient than BERT.',
    features:['Replaced token detection','Generator + discriminator','4× BERT efficiency','GLUE SOTA at small scale'] },

  { id:'distilbert',  name:'DistilBERT',         dev:'Hugging Face', year:2020, x:260,  yOff:0,  family:'encoder',  open:true,
    desc:'Knowledge-distilled BERT: 40% smaller, 60% faster, retaining 97% of BERT\'s NLU performance.',
    features:['Knowledge distillation','40% smaller model','60% faster inference','97% BERT performance'] },

  { id:'deberta',     name:'DeBERTa',            dev:'Microsoft',    year:2020, x:375,  yOff:0,  family:'encoder',  open:true,
    desc:'Disentangled attention mechanism that encodes content and position separately — SuperGLUE champion.',
    features:['Disentangled attention','Enhanced mask decoder','SiFT adversarial training','SOTA SuperGLUE'] },

  { id:'bart',        name:'BART',               dev:'Meta',         year:2020, x:490,  yOff:0,  family:'encDec',   open:true,
    desc:'Combines BERT\'s encoder with GPT\'s decoder for powerful denoising autoencoder pre-training for seq2seq.',
    features:['Denoising autoencoder','Seq2seq generation','Summarization SOTA','Text infilling & sentence shuffle'] },

  { id:'mt5',         name:'mT5',                dev:'Google',       year:2020, x:600,  yOff:0,  family:'encDec',   open:true,
    desc:'Massively multilingual T5 pre-trained on 101 languages from the mC4 Common Crawl dataset.',
    features:['101 languages','mC4 corpus','Cross-lingual transfer','Multilingual text-to-text'] },

  { id:'gpt3',        name:'GPT-3',              dev:'OpenAI',       year:2020, x:820,  yOff:0,  family:'gpt',      open:false,
    desc:'175B model that redefined LLMs with powerful in-context few-shot learning — no fine-tuning needed.',
    features:['175B parameters','In-context few-shot learning','API-only access','Broad task generalization'] },

  // ─── 2021 ───
  { id:'switch',      name:'Switch',             dev:'Google',       year:2021, x:415,  yOff:0,  family:'encDec',   open:true,
    desc:'Switch Transformer: simplifies MoE to single-expert routing, scaling to 1.6T parameters with 7× pre-training speedup.',
    features:['Mixture of Experts','Single expert routing','1.6T parameters','7× T5 pre-training speedup'] },

  { id:'t0',          name:'T0',                 dev:'BigScience',   year:2021, x:535,  yOff:0,  family:'encDec',   open:true,
    desc:'Multitask Prompted Training on 1600+ task templates enables strong zero-shot generalization without fine-tuning.',
    features:['1600+ prompted tasks','Zero-shot generalization','Human-written prompts','Open-source 11B model'] },

  { id:'mtNlg',       name:'MT-NLG',             dev:'Microsoft',    year:2021, x:660,  yOff:0,  family:'microsoft',open:false,
    desc:'Megatron-Turing NLG: 530B dense model by Microsoft + NVIDIA — the largest dense transformer at its release.',
    features:['530B parameters','Microsoft + NVIDIA','Largest dense LM at launch','State-of-the-art NLG (2021)'] },

  { id:'codex',       name:'CodeX',              dev:'OpenAI',       year:2021, x:780,  yOff:0,  family:'gpt',      open:false,
    desc:'GPT fine-tuned on GitHub code — powers GitHub Copilot. Strong code generation across many programming languages.',
    features:['Code generation','GitHub Copilot engine','12B parameters','Docstring-to-code generation'] },

  { id:'glam',        name:'GLaM',               dev:'Google',       year:2021, x:900,  yOff:0,  family:'google',   open:false,
    desc:'Generalist LM: 1.2T sparse MoE model. Outperforms GPT-3 on 29/57 tasks using only 1/3 of the energy per inference.',
    features:['1.2T sparse parameters','64-expert MoE','1/3 GPT-3 energy cost','Beats GPT-3 on 29/57 tasks'] },

  { id:'jurassic1',   name:'Jurassic-1',         dev:'AI21 Labs',    year:2021, x:1020, yOff:0,  family:'ai21',     open:false,
    desc:'AI21\'s 178B language model with a custom tokenizer, competitive with GPT-3 and available via commercial API.',
    features:['178B parameters','Custom tokenizer','API access','Strong text generation'] },

  { id:'gopher',      name:'Gopher',             dev:'Google',       year:2021, x:1140, yOff:0,  family:'google',   open:false,
    desc:'DeepMind\'s 280B model rigorously evaluated on 124 tasks, especially strong on reading comprehension & fact-checking.',
    features:['280B parameters','124-task evaluation','Knowledge-intensive SOTA','Extensive responsible-AI analysis'] },

  { id:'gptNeo',      name:'GPT-Neo',            dev:'EleutherAI',   year:2021, x:1280, yOff:0,  family:'eleuther', open:true,
    desc:'Open-source GPT-3 alternative trained on The Pile dataset, freely available to democratize LLM research.',
    features:['Open-source GPT','The Pile dataset','Local-global attention','Up to 2.7B parameters'] },

  { id:'gptJ',        name:'GPT-J',              dev:'EleutherAI',   year:2021, x:1390, yOff:0,  family:'eleuther', open:true,
    desc:'6B open-source GPT with rotary position embeddings — best open-source English LM at its release.',
    features:['6B parameters','Rotary position embedding','Open weights on HuggingFace','Beats GPT-3-small on most tasks'] },

  // ─── 2022 Row A (yOff = -20) ───
  { id:'stMoe',       name:'ST-MoE',             dev:'Google',       year:2022, x:290,  yOff:-20, family:'encDec',  open:false,
    desc:'Sparse-Transformer MoE with a stable training recipe enabling efficient large-scale encoder-decoder models.',
    features:['Sparse MoE','Stable large-scale training','Encoder-decoder','Strong NLG benchmarks'] },

  { id:'ul2',         name:'UL2',                dev:'Google',       year:2022, x:398,  yOff:-20, family:'encDec',  open:true,
    desc:'Unified Language Learner: mixes S-, R-, and X-denoiser objectives — a single model for many downstream tasks.',
    features:['Mixture of denoisers','Mode-switching prompts','20B open-source weights','Strong few-shot NLP'] },

  { id:'flanT5',      name:'Flan-T5',            dev:'Google',       year:2022, x:506,  yOff:-20, family:'encDec',  open:true,
    desc:'T5 instruction fine-tuned on 1800+ tasks including chain-of-thought — best open-source zero-shot model at launch.',
    features:['1800+ task fine-tuning','Chain-of-thought data','Zero-shot SOTA (open)','Multiple sizes released'] },

  { id:'tk',          name:'Tk',                 dev:'BigScience',   year:2022, x:614,  yOff:-20, family:'encDec',  open:true,
    desc:'Tk-Instruct: trained on 1600+ NLP tasks as natural-language instructions for zero-shot generalization.',
    features:['1600+ NLP task templates','Natural language instructions','SuperNatural-Instructions','Zero-shot capable'] },

  { id:'instructGPT', name:'InstructGPT',        dev:'OpenAI',       year:2022, x:722,  yOff:-20, family:'gpt',     open:false,
    desc:'GPT-3 aligned via RLHF. Preferred by labelers over 100× larger GPT-3 on most tasks — a safety milestone.',
    features:['RLHF alignment','Human feedback labels','1.3B beats 175B GPT-3','Reduced harmful outputs'] },

  { id:'chatgpt',     name:'ChatGPT',            dev:'OpenAI',       year:2022, x:830,  yOff:-20, family:'gpt',     open:false,
    desc:'RLHF-tuned GPT-3.5 for conversations. Hit 100M users in 2 months — fastest product adoption in history.',
    features:['Conversational RLHF','Multi-turn dialogue','100M users in 2 months','GPT-3.5 backbone'] },

  { id:'chinchilla',  name:'Chinchilla',         dev:'Google',       year:2022, x:938,  yOff:-20, family:'google',  open:false,
    desc:'Compute-optimal scaling law: 70B Chinchilla beats 280B Gopher by training on 4× more tokens.',
    features:['Compute-optimal training','70B beats Gopher 280B','4× training tokens','Reframed LLM scaling laws'] },

  { id:'sparrow',     name:'Sparrow',            dev:'Google',       year:2022, x:1046, yOff:-20, family:'google',  open:false,
    desc:'DeepMind\'s RLHF + rule-based reward dialogue agent trained for helpfulness, correctness, and harmlessness.',
    features:['RLHF training','Rule-based rewards','Citation-backed answers','Reduces rule violations vs Gopher'] },

  { id:'opt',         name:'OPT',                dev:'Meta',         year:2022, x:1154, yOff:-20, family:'meta',    open:true,
    desc:'Open Pre-trained Transformer: Meta open-sources weights from 125M to 175B, replicating GPT-3 for research.',
    features:['125M–175B parameters','Full open-source','GPT-3 replication','Research community access'] },

  { id:'bloom',       name:'BLOOM',              dev:'BigScience',   year:2022, x:1262, yOff:-20, family:'bloom',   open:true,
    desc:'176B open-source multilingual model trained by 1000+ researchers in 46 languages + 13 programming languages.',
    features:['176B parameters','46+ languages','1000+ researcher collaboration','Fully open weights'] },

  { id:'yalm',        name:'YaLM',               dev:'Yandex',       year:2022, x:1370, yOff:-20, family:'other',   open:true,
    desc:'Yandex\'s 100B open-source model trained on Russian + English text — one of the largest openly released models.',
    features:['100B parameters','Russian + English','Open-source weights','Half-precision inference'] },

  { id:'gptNeoX',     name:'GPT-NeoX',           dev:'EleutherAI',   year:2022, x:1478, yOff:-20, family:'eleuther',open:true,
    desc:'20B open-source GPT — the largest publicly available dense autoregressive model at time of release.',
    features:['20B parameters','Rotary embeddings','Parallel attn + FF','Largest open-source LM at release'] },

  { id:'anthropicLm', name:'Anthropic LM',       dev:'Anthropic',    year:2022, x:1586, yOff:-20, family:'anthropic',open:false,
    desc:'Anthropic\'s Constitutional AI research model. Founded by ex-OpenAI researchers committed to AI safety.',
    features:['Constitutional AI framework','Safety-first design','RLHF alignment','Red-teaming methodology'] },

  { id:'cohere',      name:'Cohere',             dev:'Cohere',       year:2022, x:1694, yOff:-20, family:'other',   open:false,
    desc:'Cohere\'s enterprise LLM suite for text generation, classification, and semantic search / embedding APIs.',
    features:['Enterprise NLP API','Text generation','Semantic search (Embed)','Command model family'] },

  // ─── 2022 Row B (yOff = +20) ───
  { id:'ernie3',      name:'ERNIE 3.0',          dev:'Baidu',        year:2022, x:340,  yOff:20,  family:'ernie',   open:false,
    desc:'ERNIE 3.0: 10B knowledge-enhanced model combining autoregressive and autoencoding objectives for NLU + NLG.',
    features:['10B parameters','Knowledge graph pre-training','Unified NLU + NLG','Chinese language SOTA'] },

  { id:'minerva',     name:'Minerva',            dev:'Google',       year:2022, x:930,  yOff:20,  family:'google',  open:false,
    desc:'PaLM fine-tuned on math / science content for quantitative reasoning — solves STEM problems step-by-step.',
    features:['Quantitative reasoning','STEM problem solving','Step-by-step math','PaLM fine-tune on arXiv+web'] },

  { id:'palm',        name:'PaLM',               dev:'Google',       year:2022, x:1040, yOff:20,  family:'google',  open:false,
    desc:'Pathways Language Model: 540B trained via Google\'s Pathways system, achieving breakthrough few-shot performance.',
    features:['540B parameters','Google Pathways system','Chain-of-thought prompting','Discontinuous capability jumps'] },

  { id:'flanPalm',    name:'Flan-PaLM',          dev:'Google',       year:2022, x:1150, yOff:20,  family:'google',  open:false,
    desc:'PaLM instruction-tuned on 1800+ tasks — sets SOTA on MMLU, BBH, TyDiQA and multiple other benchmarks.',
    features:['1800+ task fine-tuning','540B parameters','Chain-of-thought data','MMLU / BBH / TyDiQA SOTA'] },

  { id:'optIml',      name:'OPT-IML',            dev:'Meta',         year:2022, x:1260, yOff:20,  family:'meta',    open:true,
    desc:'OPT with Instruction Meta-Learning, fine-tuned on 2000+ NLP benchmarks for strong zero-shot generalization.',
    features:['Instruction meta-learning','2000+ NLP benchmarks','Zero-shot cross-task','Open-source fine-tune'] },

  { id:'bloomz',      name:'BLOOMZ',             dev:'BigScience',   year:2022, x:1370, yOff:20,  family:'bloom',   open:true,
    desc:'BLOOM fine-tuned on xP3 cross-lingual instruction data for zero-shot generalization across languages.',
    features:['Multilingual instruction tuning','xP3 cross-lingual dataset','Zero-shot NLP','Open-source'] },

  { id:'galactica',   name:'Galactica',          dev:'Meta',         year:2022, x:1480, yOff:20,  family:'meta',    open:true,
    desc:'Trained on 48M+ scientific papers to store, combine, and reason about scientific knowledge.',
    features:['48M scientific papers','Citation generation','LaTeX / SMILES / gene seqs','Step-by-step reasoning'] },

  { id:'lamda',       name:'LaMDA',              dev:'Google',       year:2022, x:1590, yOff:20,  family:'google',  open:false,
    desc:'Language Models for Dialog Applications: safety-tuned 137B conversation model that later inspired Bard.',
    features:['137B parameters','Dialog-specific training','Factual grounding','Safety fine-tuning'] },

  { id:'glm',         name:'GLM',                dev:'Zhipu AI',     year:2022, x:1700, yOff:20,  family:'other',   open:true,
    desc:'General Language Model from Zhipu AI/Tsinghua: autoregressive blank-infilling unifies NLU and NLG.',
    features:['Blank infilling pre-training','Bidirectional encoder','Chinese + English bilingual','Open source'] },

  // ─── 2023 ───
  { id:'flanUl2',     name:'Flan-UL2',           dev:'Google',       year:2023, x:380,  yOff:0,  family:'encDec',  open:true,
    desc:'Open-source 20B model based on UL2, instruction fine-tuned with Flan — outperforms Flan-PaLM 62B on some tasks.',
    features:['20B parameters','Instruction fine-tuned','Fully open weights','Beats Flan-PaLM 62B on some benchmarks'] },

  { id:'llama',       name:'LLaMA',              dev:'Meta',         year:2023, x:800,  yOff:0,  family:'meta',    open:true,
    desc:'Meta\'s foundational open-source models (7B–65B). The 13B model matches GPT-3 175B using only public data.',
    features:['7B–65B parameters','Open weights','Public data only','13B matches GPT-3 175B'] },

  { id:'bard',        name:'Bard',               dev:'Google',       year:2023, x:920,  yOff:0,  family:'google',  open:false,
    desc:'Google\'s conversational AI assistant powered by LaMDA, then PaLM 2, then Gemini — grounded in web search.',
    features:['Conversational assistant','Web-grounded answers','LaMDA → PaLM 2 → Gemini','Creative and factual tasks'] },

  { id:'gpt4',        name:'GPT-4',              dev:'OpenAI',       year:2023, x:1040, yOff:0,  family:'gpt',     open:false,
    desc:'Multimodal GPT-4 accepts image + text input. Near-expert-level performance on academic and professional benchmarks.',
    features:['Multimodal (text + image)','Expert-level benchmarks','Advanced reasoning','Improved RLHF safety'] },

  { id:'jurassic2',   name:'Jurassic-2',         dev:'AI21 Labs',    year:2023, x:1390, yOff:0,  family:'ai21',    open:false,
    desc:'AI21\'s next-gen Jurassic with improved instruction following, multilingual support, and commercial API.',
    features:['Instruction fine-tuned','Multilingual support','Improved factuality','Enterprise API'] },

  { id:'claude',      name:'Claude',             dev:'Anthropic',    year:2023, x:1505, yOff:0,  family:'anthropic',open:false,
    desc:'Anthropic\'s HHH (Helpful, Harmless, Honest) assistant trained with Constitutional AI. 100K token context window.',
    features:['Constitutional AI (HHH)','100K token context','Reduced hallucination','Strong coding & analysis'] },

  { id:'anthropicV4', name:'Anthropic LM_v4-s3', dev:'Anthropic',    year:2023, x:1620, yOff:0,  family:'anthropic',open:false,
    desc:'Advanced Constitutional AI model integrating further safety research and improved capabilities from Anthropic.',
    features:['Constitutional AI v2','Iterative safety training','Improved reasoning','Reduced harmful behavior'] },
];

export const EDGES = [
  // BERT encoder family
  { from:'bert',       to:'roberta',     family:'encoder'   },
  { from:'bert',       to:'albert',      family:'encoder'   },
  { from:'bert',       to:'ernie',       family:'ernie'     },
  { from:'bert',       to:'xlnet',       family:'encoder'   },
  { from:'bert',       to:'electra',     family:'encoder'   },
  { from:'bert',       to:'distilbert',  family:'encoder'   },
  { from:'bert',       to:'deberta',     family:'encoder'   },
  { from:'bert',       to:'bart',        family:'encDec'    },
  { from:'bert',       to:'glm',         family:'other'     },

  // T5 / encoder-decoder family
  { from:'t5',         to:'mt5',         family:'encDec'    },
  { from:'t5',         to:'switch',      family:'encDec'    },
  { from:'t5',         to:'t0',          family:'encDec'    },
  { from:'t5',         to:'flanT5',      family:'encDec'    },
  { from:'t5',         to:'glam',        family:'google'    },
  { from:'flanT5',     to:'ul2',         family:'encDec'    },
  { from:'ul2',        to:'stMoe',       family:'encDec'    },
  { from:'ul2',        to:'flanUl2',     family:'encDec'    },
  { from:'t0',         to:'bloom',       family:'bloom'     },
  { from:'t0',         to:'tk',          family:'encDec'    },

  // GPT lineage
  { from:'gpt1',       to:'gpt2',        family:'gpt'       },
  { from:'gpt2',       to:'gpt3',        family:'gpt'       },
  { from:'gpt2',       to:'gptNeo',      family:'eleuther'  },
  { from:'gpt3',       to:'codex',       family:'gpt'       },
  { from:'gpt3',       to:'opt',         family:'meta'      },
  { from:'gpt3',       to:'gopher',      family:'google'    },
  { from:'gpt3',       to:'jurassic1',   family:'ai21'      },
  { from:'gpt3',       to:'mtNlg',       family:'microsoft' },
  { from:'gpt3',       to:'yalm',        family:'other'     },
  { from:'gpt3',       to:'cohere',      family:'other'     },
  { from:'codex',      to:'instructGPT', family:'gpt'       },
  { from:'instructGPT',to:'chatgpt',     family:'gpt'       },
  { from:'instructGPT',to:'anthropicLm', family:'anthropic' },
  { from:'chatgpt',    to:'gpt4',        family:'gpt'       },

  // EleutherAI chain
  { from:'gptNeo',     to:'gptJ',        family:'eleuther'  },
  { from:'gptJ',       to:'gptNeoX',     family:'eleuther'  },

  // Meta / LLaMA
  { from:'opt',        to:'optIml',      family:'meta'      },
  { from:'opt',        to:'galactica',   family:'meta'      },
  { from:'opt',        to:'llama',       family:'meta'      },

  // Google / DeepMind
  { from:'glam',       to:'palm',        family:'google'    },
  { from:'gopher',     to:'chinchilla',  family:'google'    },
  { from:'gopher',     to:'sparrow',     family:'google'    },
  { from:'palm',       to:'minerva',     family:'google'    },
  { from:'palm',       to:'flanPalm',    family:'google'    },
  { from:'flanPalm',   to:'bard',        family:'google'    },
  { from:'lamda',      to:'bard',        family:'google'    },

  // Anthropic
  { from:'anthropicLm',to:'claude',      family:'anthropic' },
  { from:'claude',     to:'anthropicV4', family:'anthropic' },

  // AI21
  { from:'jurassic1',  to:'jurassic2',   family:'ai21'      },

  // BLOOM
  { from:'bloom',      to:'bloomz',      family:'bloom'     },

  // ERNIE
  { from:'ernie',      to:'ernie3',      family:'ernie'     },
];
