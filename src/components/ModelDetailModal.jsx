'use client';

import { CAT_MAP, CAT_TAG, COUNTRY_FLAG, getArchitectureDetails, getModelContextInfo } from '@/data/intelligence_data';

export default function ModelDetailModal({ model, onClose }) {
  if (!model) return null;

  const [id, name, producer, cat, country, released, params, access, priceIn, priceOut, local, score, desc, tags, color, letter] = model;
  const flag = COUNTRY_FLAG[country] || '🌐';
  const arch = getArchitectureDetails(model);
  const ctx = getModelContextInfo(model);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#111520] border border-[#6378ff]/30 rounded-2xl p-6 max-w-xl w-full max-h-[88vh] overflow-y-auto relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8a94b0] hover:text-white bg-[#1a2035] hover:bg-[#202540] w-8 h-8 rounded-lg flex items-center justify-center text-base transition-colors z-10"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5 pr-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-lg flex-shrink-0 shadow-lg"
            style={{ backgroundColor: `${color}22`, color: color }}
          >
            {letter}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-white leading-tight">{name}</h2>
              {arch && (
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${arch.badgeClass}`}>
                  {arch.icon} {arch.category}
                </span>
              )}
              {ctx && (
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                  📚 {ctx.badge}
                </span>
              )}
            </div>
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

        {/* ── Context Window & Token Capacity Specs ── */}
        {ctx && (
          <div className="mb-5 bg-[#0a0d14]/80 p-4 rounded-xl border border-indigo-500/25 shadow-inner">
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#6378ff]/15">
              <div className="flex items-center gap-2">
                <span className="text-base">📚</span>
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Context Window & Token Capacity
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                {ctx.label}
              </span>
            </div>

            {/* Token Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              <div className="bg-[#111520] p-2.5 rounded-lg border border-[#6378ff]/10">
                <span className="text-[9px] font-mono text-[#8a94b0] block mb-0.5">MAX INPUT TOKENS</span>
                <span className="text-xs font-bold text-indigo-300 leading-tight">{ctx.maxInputTokens}</span>
              </div>
              <div className="bg-[#111520] p-2.5 rounded-lg border border-[#6378ff]/10">
                <span className="text-[9px] font-mono text-[#8a94b0] block mb-0.5">MAX OUTPUT TOKENS</span>
                <span className="text-xs font-bold text-white leading-tight">{ctx.maxOutputTokens}</span>
              </div>
              <div className="bg-[#111520] p-2.5 rounded-lg border border-[#6378ff]/10">
                <span className="text-[9px] font-mono text-[#8a94b0] block mb-0.5">TOKEN SPEED</span>
                <span className="text-xs font-bold text-emerald-400 leading-tight">{ctx.tokenSpeed}</span>
              </div>
              <div className="bg-[#111520] p-2.5 rounded-lg border border-[#6378ff]/10">
                <span className="text-[9px] font-mono text-[#8a94b0] block mb-0.5">COST / 100K TOKENS</span>
                <span className="text-xs font-bold text-amber-400 leading-tight">{ctx.tokenCost100K}</span>
              </div>
            </div>

            {/* Document Ingestion & Needle Recall */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
              <div className="bg-[#111520]/80 p-2 rounded-lg border border-slate-800 text-[11px]">
                <span className="text-slate-500 block text-[9px] font-mono">PAGE CAPACITY</span>
                <span className="text-slate-200 font-semibold">{ctx.pages}</span>
              </div>
              <div className="bg-[#111520]/80 p-2 rounded-lg border border-slate-800 text-[11px]">
                <span className="text-slate-500 block text-[9px] font-mono">WORD EQUIVALENT</span>
                <span className="text-slate-200 font-semibold">{ctx.words}</span>
              </div>
              <div className="bg-[#111520]/80 p-2 rounded-lg border border-slate-800 text-[11px]">
                <span className="text-slate-500 block text-[9px] font-mono">RETRIEVAL ACCURACY</span>
                <span className="text-emerald-400 font-semibold">{ctx.needleRecall} Recall</span>
              </div>
            </div>

            {/* Optimal Workload & Token Ratio */}
            <div className="bg-[#111520]/60 p-2.5 rounded-lg text-xs space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-[#8a94b0] border-b border-[#6378ff]/10 pb-1">
                <span>TOKEN METRIC RATIO</span>
                <span className="text-slate-300 font-bold">{ctx.tokenUnitRatio}</span>
              </div>
              <p className="text-[11px] text-[#ccd3e3] leading-relaxed pt-1">
                <strong className="text-white">Best Workload: </strong>{ctx.bestFor}
              </p>
            </div>
          </div>
        )}

        {/* ── Open vs Closed Architecture Characteristics Card ── */}
        {arch && (
          <div className="mb-5 bg-[#0a0d14]/80 p-4 rounded-xl border border-[#6378ff]/25 shadow-inner">
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#6378ff]/15">
              <div className="flex items-center gap-2">
                <span className="text-base">{arch.icon}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  {arch.title}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#8a94b0]">
                {arch.category === 'Open' ? 'Self-Hostable' : 'Managed API'}
              </span>
            </div>

            {/* Structured Traits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
              {arch.traits.map((t, idx) => (
                <div key={idx} className="bg-[#111520] p-2.5 rounded-lg border border-[#6378ff]/10">
                  <div className="text-[10px] font-mono text-[#8a94b0] flex items-center gap-1 mb-0.5">
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                  </div>
                  <div className="text-xs font-semibold text-white leading-tight">
                    {t.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Strengths & Tradeoffs */}
            <div className="space-y-2 text-xs">
              <div className="bg-[#111520]/60 p-2.5 rounded-lg">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  ✓ Key Architectural Superpowers
                </span>
                <ul className="space-y-1 text-[#ccd3e3] text-[11px]">
                  {arch.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#111520]/60 p-2.5 rounded-lg">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  ⚙ Deployment Considerations
                </span>
                <ul className="space-y-1 text-[#8a94b0] text-[11px]">
                  {arch.tradeoffs.map((tr, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{tr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Technical Specs Grid */}
        <div className="mb-5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5a6280] block mb-2 border-b border-[#6378ff]/10 pb-1">
            Hardware, Context & Pricing Specs
          </span>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between py-1 border-b border-[#6378ff]/05">
              <span className="text-[#8a94b0]">Category</span>
              <span className="font-semibold text-white">{CAT_MAP[cat] || cat}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#6378ff]/05">
              <span className="text-[#8a94b0]">Context Window</span>
              <span className="font-mono font-bold text-indigo-400">{ctx?.label || '128K tokens'}</span>
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
                {priceIn ? `$${priceIn} / $${priceOut}` : (access === 'open' || access === 'free' ? 'Free / Open Weights' : 'N/A')}
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

