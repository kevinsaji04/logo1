'use client';

import Image from 'next/image';
import { useState } from 'react';

// simple-icons CDN slugs + brand background colors
// https://cdn.simpleicons.org/{slug}/{color-hex-no-hash}
const LOGO_MAP = {
  'OpenAI':            { slug: 'openai',       bg: '#000000', color: 'ffffff' },
  'Google':            { slug: 'google',        bg: '#ffffff', color: '4285F4' },
  'Google DeepMind':   { slug: 'google',        bg: '#ffffff', color: '4285F4' },
  'Google Research':   { slug: 'google',        bg: '#ffffff', color: '4285F4' },
  'Anthropic':         { slug: 'anthropic',     bg: '#cc785c', color: 'ffffff' },
  'DeepSeek':          { slug: 'deepseek',      bg: '#ffffff', color: '4D6BFE' },
  'xAI':               { slug: 'x',             bg: '#000000', color: 'ffffff' },
  'Kuaishou':          { slug: 'kuaishou',      bg: '#ff4700', color: 'ffffff' },
  'Alibaba':           { slug: 'alibaba',       bg: '#ff6a00', color: 'ffffff' },
  'Meta':              { slug: 'meta',          bg: '#0082fb', color: 'ffffff' },
  'Mistral AI':        { slug: 'mistral',       bg: '#ff7000', color: 'ffffff' },
  'Stability AI':      { slug: 'stabilityai',   bg: '#0f0f11', color: 'ffffff' },
  'Runway':            { slug: 'runway',        bg: '#161616', color: 'ffffff' },
  'ElevenLabs':        { slug: 'elevenlabs',    bg: '#000000', color: 'ffffff' },
  'Perplexity':        { slug: 'perplexity',    bg: '#1fb8cd', color: 'ffffff' },
  'ByteDance':         { slug: 'bytedance',     bg: '#161823', color: 'ffffff' },
};

// Fallbacks for companies without simple-icons entries
const FALLBACK = {
  'Zhipu AI':          { grad: 'from-cyan-600 to-blue-800',    letter: 'Z' },
  'Luma AI':           { grad: 'from-violet-600 to-indigo-700', letter: 'L' },
  'MiniMax':           { grad: 'from-rose-500 to-red-700',     letter: 'M' },
  'Moonshot AI':       { grad: 'from-emerald-500 to-teal-700', letter: 'Ki' },
  'Black Forest Labs': { grad: 'from-fuchsia-600 to-pink-700', letter: 'F' },
  'Wan':               { grad: 'from-sky-600 to-indigo-800',   letter: 'W' },
  'Sarvam AI':         { grad: 'from-orange-500 to-amber-700', letter: 'SA' },
  'Krutrim':           { grad: 'from-emerald-500 to-teal-700', letter: 'KR' },
  'AI4Bharat':         { grad: 'from-indigo-500 to-blue-700',  letter: 'A4B' },
  'CoRover.ai':        { grad: 'from-blue-500 to-cyan-700',    letter: 'CR' },
  'SML':               { grad: 'from-red-500 to-orange-700',   letter: 'HN' },
  'Two AI':            { grad: 'from-purple-500 to-violet-700',letter: '2AI' },
  'Tech Mahindra':     { grad: 'from-cyan-500 to-blue-700',    letter: 'TM' },
  'Telugu LLM Labs':   { grad: 'from-amber-500 to-orange-700', letter: 'TL' },
  'Tensoic':           { grad: 'from-yellow-500 to-amber-700', letter: 'TN' },
  'Abhinav Venkat':    { grad: 'from-pink-500 to-rose-700',    letter: 'AV' },
  'Govt of India (MeitY)': { grad: 'from-emerald-600 to-teal-800', letter: 'BH' },
};

export default function DeveloperIcon({ developer, className = 'w-11 h-11' }) {
  const [failed, setFailed] = useState(false);
  const logoData = LOGO_MAP[developer];
  const fallback = FALLBACK[developer] || { grad: 'from-slate-600 to-slate-800', letter: developer?.[0] || '?' };

  if (!logoData || failed) {
    return (
      <div className={`${className} flex items-center justify-center rounded-xl font-bold text-white text-sm shadow-lg bg-gradient-to-tr ${fallback.grad}`}>
        {fallback.letter}
      </div>
    );
  }

  const iconUrl = `https://cdn.simpleicons.org/${logoData.slug}/${logoData.color}`;

  return (
    <div
      className={`${className} rounded-xl shadow-lg overflow-hidden flex items-center justify-center p-2`}
      style={{ backgroundColor: logoData.bg }}
    >
      <Image
        src={iconUrl}
        alt={`${developer} logo`}
        width={40}
        height={40}
        className="w-full h-full object-contain"
        onError={() => setFailed(true)}
        unoptimized
      />
    </div>
  );
}
