'use client';

import { CAT_MAP, CAT_TAG, COUNTRY_FLAG } from '@/data/intelligence_data';

export default function ModelDetailModal({ model, onClose }) {
  if (!model) return null;

  const [id, name, producer, cat, country, released, params, access, priceIn, priceOut, local, score, desc, tags, color, letter] = model;
  const flag = COUNTRY_FLAG[country] || '🌐';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#111520] border border-[#6378ff]/30 rounded-2xl p-6 max-w-xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8a94b0] hover:text-white bg-[#1a2035] hover:bg-[#202540] w-8 h-8 rounded-lg flex items-center justify-center text-base transition-colors"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pr-8">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-lg flex-shrink-0"
            style={{ backgroundColor: `${color}22`, color: color }}
          >
            {letter}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white leading-tight">{name}</h2>
            <div className="text-xs text-[#8a94b0] flex items-center gap-1.5 mt-0.5">
              <span>{flag}</span>
              <span>{producer}</span>
              <span>•</span>
              <span>{country}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-5 bg-[#0a0d14]/60 p-3.5 rounded-xl border border-[#6378ff]/10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5a6280] block mb-1">
            Overview
          </span>
          <p className="text-xs text-[#e8ecf4] leading-relaxed">{desc}</p>
        </div>

        {/* Technical Specs Grid */}
        <div className="mb-5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5a6280] block mb-2 border-b border-[#6378ff]/10 pb-1">
            Classification & Hardware Specs
          </span>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between py-1 border-b border-[#6378ff]/05">
              <span className="text-[#8a94b0]">Category</span>
              <span className="font-semibold text-white">{CAT_MAP[cat] || cat}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#6378ff]/05">
              <span className="text-[#8a94b0]">Released Date</span>
              <span className="font-mono text-slate-200">{released}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#6378ff]/05">
              <span className="text-[#8a94b0]">Parameters</span>
              <span className="font-mono font-semibold text-indigo-400">{params}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#6378ff]/05">
              <span className="text-[#8a94b0]">Access Model</span>
              <span className="capitalize font-semibold text-white">{access}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#6378ff]/05">
              <span className="text-[#8a94b0]">Pricing (In / Out per 1M tok)</span>
              <span className="font-mono text-emerald-400">
                {priceIn ? `$${priceIn} / $${priceOut}` : (access === 'open' || access === 'free' ? 'Free' : 'N/A')}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#6378ff]/05">
              <span className="text-[#8a94b0]">Local Deployment</span>
              <span className={`font-semibold ${local ? 'text-emerald-400' : 'text-slate-400'}`}>
                {local ? '✅ Supported (Local Execution)' : '❌ Cloud API Only'}
              </span>
            </div>
          </div>
        </div>

        {/* Capability Score */}
        <div className="mb-5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5a6280] block mb-2">
            Intelligence Capability Rating
          </span>
          <div className="flex items-center gap-3 bg-[#1a2035] p-3 rounded-xl border border-[#6378ff]/20">
            <div className="flex-1 h-2 bg-[#161b2e] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#6378ff] to-[#8b5cf6]"
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="font-mono font-bold text-lg text-white">{score}<span className="text-xs text-[#8a94b0]">/100</span></span>
          </div>
        </div>

        {/* Tags */}
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5a6280] block mb-2">
            Capabilities & Functional Tags
          </span>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span key={t} className={`tag ${CAT_TAG[t] || 'tag-tool'}`}>
                {t.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
