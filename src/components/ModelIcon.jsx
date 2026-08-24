'use client';

import Image from 'next/image';
import { useState } from 'react';

// Maps developer name (from RAW_MODELS) -> icon filename in public/icons/
const ICON_MAP = {
  'Alibaba':              'alibaba.webp',
  'Amazon':               'amazon.png',
  'Anthropic':            'anthropic.png',
  'Black Forest Labs':    'Black Forest.png',
  'Black Forest Labs × Krea': 'BlackforestXkrea.png',
  'Bria AI':              'bria ai.png',
  'ByteDance':            'Bytedance.png',
  'Canopy Labs':          'canopy labs.jfif',
  'Cartesia':             'cartesia.jfif',
  'DeepAI':               'deepai.png',
  'Deepgram':             'deepgram.png',
  'DeepSeek':             'deepseek.png',
  'ElevenLabs':           'Eleven Labs.png',
  'Exa':                  'EXA.png',
  'Genmo':                'genmo.png',
  'Google':               'google.png',
  'Google DeepMind':      'google.png',
  'Google Research':      'google.png',
  'GPTZero':              'gptzeron.jfif',
  'HiDream':              'hidream.png',
  'Ideogram':             'ideogram.png',
  'Kuaishou':             'kuaishou.jfif',
  'Leonardo AI':          'leonardo ai.jfif',
  'Lightricks':           'lightricks.webp',
  'Linkup':               'linkup.png',
  'Luma AI':              'luma ai.png',
  'Magnific':             'magnific.jpg',
  'Manus':                'manus.png',
  'Meta':                 'meta.jfif',
  'Microsoft':            'microsoft.webp',
  'MiniMax':              'minimax.png',
  'Mistral AI':           'mistral ai.webp',
  'Moonshot AI':          'moonshot.jpg',
  'NVIDIA':               'nvidia.jpg',
  'OpenAI':               'openai.png',
  'Perplexity':           'perplexity.png',
  'Pika Labs':            'pika labs.jfif',
  'PixVerse':             'pixverse.png',
  'Poe':                  'poe.png',
  'Recraft':              'recraft.jfif',
  'Reka AI':              'reka ai.jfif',
  'Retro Diffusion':      'retro diffusion.png',
  'Runway':               'runway.png',
  'Sakana AI':            'sakanaai.png',
  'Stability AI':         'stability ai.webp',
  'Tencent':              'tencent.png',
  'Unreal Speech':        'unreal speech.jfif',
  'Upstage':              'upstage.jfif',
  'Vidu':                 'vidu.jfif',
  'xAI':                  'xai.webp',
  'Xiaomi':               'xiaomi.png',
  'Zhipu AI':             'zhipu ai.png',
  // Also handle some common alternate names/aliases
  'CapCut/ByteDance':     'Bytedance.png',
  'gpt-researcher':       'gpt reasearcher.jfif',
};

// Model-name-specific overrides (when a model differs from its developer brand)
const MODEL_SPECIFIC_MAP = {
  'Dreamina-3.1': 'dreamina.png',
  'Happy Horse':  'happyhorse.png',
};

export default function ModelIcon({ model, className = 'w-11 h-11' }) {
  const [imgFailed, setImgFailed] = useState(false);

  const bgColor = model.color || '#3b82f6';
  const letters = model.letter || (model.name ? model.name.substring(0, 2).toUpperCase() : '??');

  const iconFile = MODEL_SPECIFIC_MAP[model.name] || ICON_MAP[model.developer];

  if (iconFile && !imgFailed) {
    return (
      <div className={`${className} rounded-xl shadow-lg overflow-hidden flex items-center justify-center bg-white shrink-0`}>
        <Image
          src={`/icons/${iconFile}`}
          alt={`${model.developer} logo`}
          width={44}
          height={44}
          className="w-full h-full object-contain p-1"
          onError={() => setImgFailed(true)}
          unoptimized
        />
      </div>
    );
  }

  // Fallback: original HTML-style colored monogram
  return (
    <div
      className={`${className} rounded-xl shadow-lg flex items-center justify-center font-bold text-white shrink-0`}
      style={{
        backgroundColor: bgColor,
        fontFamily: "'JetBrains Mono', monospace"
      }}
    >
      {letters}
    </div>
  );
}
