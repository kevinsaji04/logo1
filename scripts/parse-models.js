const fs = require('fs');
const path = require('path');

const lines = fs.readFileSync(path.join(__dirname, '../list.txt'), 'utf-8')
  .split('\n').map(l => l.trim()).filter(Boolean);

function getInfo(name) {
  let developer = 'Other', gradient = 'from-slate-600 to-slate-800', category = 'Text';

  if (/Gemini|Gemma|Veo|Lyria|Imagen|Pearl/.test(name)) { developer = 'Google'; gradient = 'from-blue-600 via-purple-600 to-pink-600'; }
  else if (/GPT|OpenAI|Whisper|^o[134]/.test(name)) { developer = 'OpenAI'; gradient = 'from-emerald-600 to-teal-800'; }
  else if (/Claude/.test(name)) { developer = 'Anthropic'; gradient = 'from-amber-600 to-orange-800'; }
  else if (/DeepSeek|DeepReasoning/.test(name)) { developer = 'DeepSeek'; gradient = 'from-blue-600 to-cyan-800'; }
  else if (/Grok/.test(name)) { developer = 'xAI'; gradient = 'from-slate-700 to-slate-900'; }
  else if (/Kling/.test(name)) { developer = 'Kuaishou'; gradient = 'from-orange-500 to-red-600'; }
  else if (/Qwen/.test(name)) { developer = 'Alibaba'; gradient = 'from-purple-600 to-indigo-800'; }
  else if (/GLM/.test(name)) { developer = 'Zhipu AI'; gradient = 'from-cyan-600 to-blue-800'; }
  else if (/Runway/.test(name)) { developer = 'Runway'; gradient = 'from-neutral-800 to-neutral-600'; }
  else if (/Luma|Photon/.test(name)) { developer = 'Luma AI'; gradient = 'from-violet-600 to-indigo-700'; }
  else if (/ElevenLabs/.test(name)) { developer = 'ElevenLabs'; gradient = 'from-yellow-500 to-amber-600'; }
  else if (/Minimax|MiniMax/.test(name)) { developer = 'MiniMax'; gradient = 'from-rose-500 to-red-700'; }
  else if (/Kimi/.test(name)) { developer = 'Moonshot AI'; gradient = 'from-emerald-500 to-teal-700'; }
  else if (/Llama/.test(name)) { developer = 'Meta'; gradient = 'from-blue-500 to-indigo-600'; }
  else if (/Flux|FLUX/.test(name)) { developer = 'Black Forest Labs'; gradient = 'from-fuchsia-600 to-pink-700'; }
  else if (/Mistral|Mixtral|Magistral/.test(name)) { developer = 'Mistral AI'; gradient = 'from-orange-600 to-amber-700'; }
  else if (/^Wan/.test(name)) { developer = 'Wan'; gradient = 'from-sky-600 to-indigo-800'; }
  else if (/Seed|Seedream|Seedance/.test(name)) { developer = 'ByteDance'; gradient = 'from-teal-600 to-cyan-800'; }
  else if (/Perplexity|Sonar/.test(name)) { developer = 'Perplexity'; gradient = 'from-cyan-600 to-blue-700'; }

  if (/Video|Sora|Kling|Runway|Veo|Vidu|Pixverse|LTX|Animate|Mochi|OmniHuman|LivePortrait|Reel|Seedance|Wan/.test(name)) category = 'Video';
  else if (/Image|Flux|FLUX|Ideogram|Recraft|StableDiffusion|Imagen|Sana|Bria|Hunyuan|Canvas|Sketch|Background|Remove|Dreamina|Phoenix|Seedream/.test(name)) category = 'Image';
  else if (/Audio|Speech|TTS|Whisper|Sonic|Orpheus|ElevenLabs|Cartesia|Music|Lyria/.test(name)) category = 'Audio';
  else if (/Code|Coder|Interpreter|Manus|Bot|Editor|Saver|Python|Prover/.test(name)) category = 'Code/Agent';
  else if (/Search|Perplexity|Exa|Linkup|Sonar|Research|Researcher/.test(name)) category = 'Search';

  const descs = {
    Video: `${name} is a high-fidelity video generation model by ${developer}.`,
    Image: `${name} is a premium text-to-image synthesis model by ${developer}.`,
    Audio: `${name} is a high-performance audio/speech synthesis model by ${developer}.`,
    'Code/Agent': `${name} is a specialized coding and agentic model by ${developer}.`,
    Search: `${name} is an advanced search and deep research agent by ${developer}.`,
    Text: `${name} is a state-of-the-art language model by ${developer} for reasoning, chat, and creative tasks.`,
  };
  const feats = {
    Video: ['Text-to-Video generation', 'High frame-rate rendering', 'Physics-aware simulation', 'Multiple aspect ratios'],
    Image: ['Photorealistic text-to-image', 'Superior text rendering', 'Ultra-fast generation', 'Style reference support'],
    Audio: ['Expressive speech synthesis', 'Multi-lingual voice cloning', 'Low latency streaming', 'Background noise control'],
    'Code/Agent': ['Self-debugging and reflection', 'Complex repository editing', 'Multi-turn task planning', 'API integration support'],
    Search: ['Real-time web browsing', 'Multi-source citation', 'In-depth research planning', 'Structured summaries'],
    Text: ['Advanced logical reasoning', 'Long-context understanding', 'High-quality coding', 'Instruction following'],
  };

  return { developer, gradient, category, description: descs[category], features: feats[category] };
}

const models = lines.map((name, i) => ({ id: i + 1, name, ...getInfo(name) }));

const outDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'models.json'), JSON.stringify(models, null, 2));
console.log(`Generated ${models.length} models → src/data/models.json`);
