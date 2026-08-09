export default function CategoryVisualMockup({ category, modelName }) {
  if (category === 'Text') return (
    <div className="p-3 bg-black/60 rounded-xl border border-slate-800 font-mono text-[10px] min-h-[110px] flex flex-col gap-1.5">
      <div className="flex gap-1.5 pb-1.5 border-b border-slate-800">
        <span className="w-2 h-2 rounded-full bg-red-500/70"/>
        <span className="w-2 h-2 rounded-full bg-yellow-500/70"/>
        <span className="w-2 h-2 rounded-full bg-green-500/70"/>
        <span className="ml-1 text-slate-500">{modelName}</span>
      </div>
      <span className="text-emerald-400">&gt; Initializing LLM session...</span>
      <span className="text-slate-300">Hello! I am {modelName}. How can I help?</span>
      <span className="text-indigo-400 animate-pulse mt-auto">● Streaming tokens...</span>
    </div>
  );

  if (category === 'Image') return (
    <div className="relative rounded-xl overflow-hidden min-h-[110px] bg-black/60 border border-slate-800 flex flex-col items-center justify-center">
      <div className="text-4xl mb-2">🎨</div>
      <span className="text-[10px] text-slate-400 font-mono">{modelName} Image API</span>
      <span className="absolute bottom-2 right-2 text-[9px] font-mono text-emerald-400 bg-black/80 px-1.5 py-0.5 rounded">1024×1024</span>
    </div>
  );

  if (category === 'Video') return (
    <div className="relative rounded-xl overflow-hidden min-h-[110px] bg-black/60 border border-slate-800 flex flex-col items-center justify-center gap-2">
      <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-orange-400 text-xl">▶</div>
      <span className="text-[10px] text-slate-400 font-mono">{modelName} Stream</span>
      <span className="absolute bottom-2 left-2 flex items-center gap-1 text-[9px] font-mono text-slate-400 bg-black/80 px-1.5 py-0.5 rounded">
        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping inline-block"/>60fps
      </span>
    </div>
  );

  if (category === 'Audio') return (
    <div className="p-3 bg-black/60 rounded-xl border border-slate-800 min-h-[110px] flex flex-col justify-center">
      <span className="text-[9px] text-slate-500 font-mono uppercase mb-2">Waveform Output</span>
      <div className="flex items-end justify-center gap-0.5 h-10">
        {[40,75,55,90,45,60,85,30,70,50,95,60,75,40,80].map((h,i) => (
          <div key={i} className="w-1 rounded-full bg-yellow-500/70" style={{height:`${h}%`}}/>
        ))}
      </div>
      <span className="text-[9px] text-yellow-500 font-mono mt-2 text-center">24kHz · Stereo</span>
    </div>
  );

  if (category === 'Code/Agent') return (
    <div className="p-3 bg-black/60 rounded-xl border border-slate-800 font-mono text-[9px] min-h-[110px]">
      <div className="text-[8px] text-indigo-400 mb-1.5 border-b border-slate-800 pb-1">agent.py</div>
      <div><span className="text-pink-500">def</span> <span className="text-blue-400">run</span>(task):</div>
      <div className="ml-3 text-slate-300">plan = task.parse()</div>
      <div className="ml-3 text-slate-300"><span className="text-pink-500">for</span> step <span className="text-pink-500">in</span> plan:</div>
      <div className="ml-6 text-slate-200">execute(step)</div>
      <div className="text-emerald-400 mt-1.5 text-[8px]">✓ Done</div>
    </div>
  );

  if (category === 'Search') return (
    <div className="p-3 bg-black/60 rounded-xl border border-slate-800 text-[10px] min-h-[110px] flex flex-col gap-2">
      <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded border border-slate-800">
        <span>🌐</span><span className="text-slate-200">Querying web index...</span>
      </div>
      <div className="pl-2 border-l border-slate-700 flex flex-col gap-0.5 text-[9px]">
        <span className="text-slate-500">✓ 14 sources retrieved</span>
        <span className="text-slate-500">✓ Citations cross-referenced</span>
        <span className="text-emerald-400">✓ Generating answer...</span>
      </div>
    </div>
  );

  return null;
}
