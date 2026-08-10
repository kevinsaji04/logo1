'use client';

import { useCompare } from '@/context/CompareContext';
import ModelIcon from '@/components/ModelIcon';

// Row definitions for comparison table
const ROWS = [
  { label: 'Developer',    key: 'developer' },
  { label: 'Category',     key: 'category' },
  { label: 'Architecture', key: 'arch' },
  { label: 'Country',      key: 'country' },
  { label: 'Released',     key: 'released' },
  { label: 'Parameters',  key: 'params' },
  { label: 'Access',      key: 'access' },
  { label: 'Price (In)',  key: 'priceIn',  format: v => v != null ? `$${v}/M tok` : '—' },
  { label: 'Price (Out)', key: 'priceOut', format: v => v != null ? `$${v}/M tok` : '—' },
  { label: 'Local Run',   key: 'local',    format: v => v ? '✅ Yes' : '❌ No' },
  { label: 'Score',       key: 'score',    format: v => v != null ? `${v}/100` : '—' },
];

const ACCENT = ['#6366f1', '#ec4899', '#f59e0b', '#10b981'];

export default function ComparePanel() {
  const { compareList, showPanel, removeModel, clearAll, setShowPanel } = useCompare();

  if (!showPanel || compareList.length === 0) return null;

  const cols = compareList.length;

  return (
    <div className="fixed inset-0 z-[999] flex flex-col bg-[#090d18]/97 backdrop-blur-xl overflow-auto">

      {/* ── Header ── */}
      <div className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/90 backdrop-blur px-6 py-4 flex items-center justify-between gap-4 flex-wrap shrink-0">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-indigo-400">⚖</span> Model Comparison
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Side-by-side breakdown of up to 4 AI models</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={clearAll}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
          >
            🗑 Clear All
          </button>
          <button
            onClick={() => setShowPanel(false)}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-all"
          >
            ✕ Close
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto min-w-0">
        {/* Model header cards */}
        <div
          className="grid gap-4 mb-6"
          style={{ gridTemplateColumns: `180px repeat(${cols}, 1fr)` }}
        >
          <div /> {/* empty label cell */}

          {compareList.map((model, i) => (
            <div
              key={model.id}
              className="relative rounded-2xl bg-slate-900/60 border border-slate-700 p-5 flex flex-col items-center text-center gap-3"
              style={{ borderTopColor: ACCENT[i], borderTopWidth: 3 }}
            >
              <button
                onClick={() => removeModel(model.id)}
                className="absolute top-2 right-2 w-6 h-6 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-all text-xs flex items-center justify-center"
              >✕</button>
              <ModelIcon model={model} className="w-14 h-14" />
              <div>
                <div className="text-sm font-bold text-white leading-snug">{model.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{model.developer}</div>
              </div>
              {/* Score bar */}
              {model.score != null && (
                <div className="w-full">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                    <span>Score</span>
                    <span className="font-mono font-bold" style={{ color: ACCENT[i] }}>{model.score}/100</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${model.score}%`, backgroundColor: ACCENT[i] }}
                    />
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-1 justify-center">
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-slate-700 bg-slate-800 text-slate-300">{model.category}</span>
                {model.local && <span className="text-[10px] px-2 py-0.5 rounded-full border border-emerald-700/50 bg-emerald-900/30 text-emerald-400">Local Run</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Description row */}
        <div
          className="grid gap-4 mb-4 items-start"
          style={{ gridTemplateColumns: `180px repeat(${cols}, 1fr)` }}
        >
          <div className="flex items-center pt-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold">Description</span>
          </div>
          {compareList.map(model => (
            <div key={model.id} className="rounded-xl bg-slate-900/40 border border-slate-800 p-3">
              <p className="text-xs text-slate-300 leading-relaxed">{model.description || '—'}</p>
            </div>
          ))}
        </div>

        {/* Data rows table */}
        <div className="rounded-2xl border border-slate-800 overflow-hidden mb-4">
          {ROWS.map((row, rowIdx) => {
            const values = compareList.map(m => row.format ? row.format(m[row.key]) : (m[row.key] ?? '—'));
            const scores = row.key === 'score' ? compareList.map(m => m.score ?? 0) : null;
            const maxScore = scores ? Math.max(...scores) : null;

            return (
              <div
                key={row.key}
                className={`grid ${rowIdx % 2 === 0 ? 'bg-slate-900/50' : 'bg-slate-950/50'}`}
                style={{ gridTemplateColumns: `180px repeat(${cols}, 1fr)` }}
              >
                <div className="px-4 py-3 border-r border-slate-800 flex items-center">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold">{row.label}</span>
                </div>
                {compareList.map((model, i) => {
                  const val = values[i];
                  const isBest = scores && model.score === maxScore && maxScore > 0;
                  return (
                    <div
                      key={model.id}
                      className={`px-4 py-3 border-r border-slate-800/60 last:border-r-0 flex items-center gap-1.5 ${isBest ? 'bg-indigo-950/30' : ''}`}
                    >
                      {isBest && <span className="text-[9px] text-amber-400 font-bold">★</span>}
                      <span className={`text-xs font-semibold ${
                        val === '✅ Yes' ? 'text-emerald-400' :
                        val === '❌ No' ? 'text-slate-500' :
                        isBest ? 'text-indigo-300' :
                        'text-slate-300'
                      }`}>{val}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Key Features row */}
        <div
          className="grid gap-4 items-start"
          style={{ gridTemplateColumns: `180px repeat(${cols}, 1fr)` }}
        >
          <div className="flex items-center pt-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold">Key Features</span>
          </div>
          {compareList.map(model => (
            <div key={model.id} className="rounded-xl bg-slate-900/40 border border-slate-800 p-3 space-y-1.5">
              {(model.features || []).map((f, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-indigo-400 mt-0.5 flex-shrink-0">✦</span>
                  {f}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
