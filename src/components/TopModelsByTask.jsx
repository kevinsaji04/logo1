'use client';

import { useState } from 'react';
import { RAW_MODELS, COUNTRY_FLAG } from '@/data/intelligence_data';

/* ─────────────────────────────────────────
   COLOUR SYSTEM  (glassmorphism palette)
───────────────────────────────────────── */
const GROUPS = {
  General: {
    glow:    'rgba(99,102,241,0.55)',
    border:  'rgba(99,102,241,0.45)',
    bg:      'rgba(99,102,241,0.13)',
    bgHover: 'rgba(99,102,241,0.22)',
    bgActive:'rgba(99,102,241,0.28)',
    pill:    'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    bar:     'from-indigo-500 to-violet-500',
    dot:     '#818cf8',
    tag:     'Indigo',
  },
  Agent: {
    glow:    'rgba(6,182,212,0.55)',
    border:  'rgba(6,182,212,0.40)',
    bg:      'rgba(6,182,212,0.10)',
    bgHover: 'rgba(6,182,212,0.18)',
    bgActive:'rgba(6,182,212,0.24)',
    pill:    'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    bar:     'from-cyan-400 to-sky-500',
    dot:     '#22d3ee',
    tag:     'Cyan',
  },
  Code: {
    glow:    'rgba(16,185,129,0.50)',
    border:  'rgba(16,185,129,0.38)',
    bg:      'rgba(16,185,129,0.10)',
    bgHover: 'rgba(16,185,129,0.18)',
    bgActive:'rgba(16,185,129,0.22)',
    pill:    'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    bar:     'from-emerald-400 to-teal-500',
    dot:     '#34d399',
    tag:     'Emerald',
  },
  Data: {
    glow:    'rgba(168,85,247,0.55)',
    border:  'rgba(168,85,247,0.40)',
    bg:      'rgba(168,85,247,0.10)',
    bgHover: 'rgba(168,85,247,0.18)',
    bgActive:'rgba(168,85,247,0.24)',
    pill:    'bg-purple-500/20 text-purple-300 border-purple-500/30',
    bar:     'from-purple-400 to-fuchsia-500',
    dot:     '#c084fc',
    tag:     'Violet',
  },
};

const GROUP_TOTALS = [
  { name: 'General', pct: 34.1 },
  { name: 'Agent',   pct: 30.9 },
  { name: 'Code',    pct: 25.1 },
  { name: 'Data',    pct:  9.9 },
];

/* Helper to resolve details for a model name */
const resolveModelDetail = (mName, dev) => {
  const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const target = norm(mName);

  const found = RAW_MODELS.find(([id, name]) => {
    const n = norm(name);
    return n === target || n.includes(target) || target.includes(n);
  });

  if (found) {
    const [id, name, producer, cat, country, released, params, access, priceIn, priceOut, local, score, desc, tags, color, letter] = found;
    return {
      name,
      producer,
      country,
      flag: COUNTRY_FLAG[country] || '🌐',
      released,
      params: params || 'N/A',
      access: access ? access.toUpperCase() : 'API',
      priceIn,
      priceOut,
      local,
      score: score || 85,
      desc: desc || `State-of-the-art ${name} model developed by ${producer}.`,
      color: color || '#6366f1',
      letter: letter || name.substring(0, 2).toUpperCase()
    };
  }

  // Fallback defaults
  const isUS = ['openai', 'anthropic', 'google', 'xai', 'meta', 'amazon'].includes((dev || '').toLowerCase());
  return {
    name: mName,
    producer: dev,
    country: isUS ? 'USA' : 'China',
    flag: isUS ? '🇺🇸' : '🇨🇳',
    released: '2025-Q2',
    params: 'Frontier Scale',
    access: 'ENTERPRISE / API',
    priceIn: null,
    priceOut: null,
    local: false,
    score: 91,
    desc: `High-performance ${mName} model developed by ${dev} for next-gen reasoning and task execution.`,
    color: '#6366f1',
    letter: mName.substring(0, 2).toUpperCase()
  };
};

/* ─────────────────────────────────────────
   TASKS
───────────────────────────────────────── */
const TASKS = [
  { id: 'classification',   label: 'Classification',      group: 'General', share: 9.2  },
  { id: 'content_writing',  label: 'Content Writing',     group: 'General', share: 8.7  },
  { id: 'qa',               label: 'Q&A & Knowledge',     group: 'General', share: 6.1  },
  { id: 'research',         label: 'Research & Reports',  group: 'General', share: 5.4  },
  { id: 'summarization',    label: 'Summarization',       group: 'General', share: 4.8  },
  { id: 'customer_support', label: 'Customer Support',    group: 'General', share: 3.2  },
  { id: 'roleplay',         label: 'Roleplay & Fiction',  group: 'General', share: 2.9  },
  { id: 'conversation',     label: 'Conversation',        group: 'General', share: 2.4  },
  { id: 'workflow',         label: 'Workflow Execution',  group: 'Agent',   share: 11.3 },
  { id: 'planning',         label: 'Multi-step Planning', group: 'Agent',   share: 7.6  },
  { id: 'browser_use',      label: 'Browser & Web Use',   group: 'Agent',   share: 4.2  },
  { id: 'tool_calling',     label: 'Tool Calling',        group: 'Agent',   share: 3.5  },
  { id: 'code_gen',         label: 'Code Generation',     group: 'Code',    share: 10.1 },
  { id: 'debugging',        label: 'Debugging',           group: 'Code',    share: 5.8  },
  { id: 'file_io',          label: 'File I/O',            group: 'Code',    share: 3.9  },
  { id: 'shell',            label: 'Shell Execution',     group: 'Code',    share: 3.1  },
  { id: 'frontend',         label: 'Frontend & UI',       group: 'Code',    share: 2.8  },
  { id: 'extraction',       label: 'Data Extraction',     group: 'Data',    share: 5.9  },
  { id: 'transformation',   label: 'Data Transformation', group: 'Data',    share: 4.1  },
];

/* ─────────────────────────────────────────
   MODEL RANKINGS PER TASK
───────────────────────────────────────── */
const TASK_MODELS = {
  classification: [
    { name: 'GPT-5.5',            dev: 'openai',    share: 7.6, delta: -3.4 },
    { name: 'Claude Sonnet 4.6',  dev: 'anthropic', share: 6.4, delta: -6.5 },
    { name: 'Claude Opus 4.7',    dev: 'anthropic', share: 5.6, delta: -5.6 },
    { name: 'Gemini 3.1 Pro',     dev: 'google',    share: 5.3, delta: -0.3 },
    { name: 'Claude Opus 4.8',    dev: 'anthropic', share: 5.2, delta: -3.9 },
    { name: 'GPT-5.6 Sol',        dev: 'openai',    share: 5.1, delta:  5.1 },
    { name: 'Claude Sonnet 5',    dev: 'anthropic', share: 3.3, delta:  2.7 },
    { name: 'Gemini 3 Flash',     dev: 'google',    share: 3.1, delta:  0.1 },
    { name: 'Gemini 3.5 Flash',   dev: 'google',    share: 2.8, delta:  0.1 },
    { name: 'GLM-5.2',            dev: 'zhipu',     share: 2.6, delta:  0.4 },
  ],
  content_writing: [
    { name: 'GPT-5',              dev: 'openai',    share: 9.1, delta:  1.2 },
    { name: 'Claude Sonnet 4.6',  dev: 'anthropic', share: 8.3, delta: -2.1 },
    { name: 'Gemini 3.1 Pro',     dev: 'google',    share: 7.2, delta:  0.8 },
    { name: 'Claude Opus 4.8',    dev: 'anthropic', share: 6.1, delta: -1.4 },
    { name: 'GPT-5.1',            dev: 'openai',    share: 5.7, delta:  3.2 },
    { name: 'Grok-4',             dev: 'xai',       share: 4.9, delta:  1.5 },
    { name: 'DeepSeek-V4-Pro',    dev: 'deepseek',  share: 3.8, delta: -0.6 },
    { name: 'Qwen3-Max',          dev: 'alibaba',   share: 3.2, delta:  0.9 },
    { name: 'Mistral-Large-2',    dev: 'mistral',   share: 2.7, delta: -0.3 },
    { name: 'Claude Haiku 4.5',   dev: 'anthropic', share: 2.1, delta:  1.1 },
  ],
  workflow: [
    { name: 'Claude Opus 4.8',    dev: 'anthropic', share: 12.4, delta:  2.1 },
    { name: 'GPT-5',              dev: 'openai',    share: 11.2, delta:  0.8 },
    { name: 'Gemini 3.1 Pro',     dev: 'google',    share:  9.8, delta:  1.3 },
    { name: 'Grok-4',             dev: 'xai',       share:  8.1, delta:  3.4 },
    { name: 'Claude Sonnet 4.6',  dev: 'anthropic', share:  7.3, delta: -1.2 },
    { name: 'DeepSeek-V4-Pro',    dev: 'deepseek',  share:  5.9, delta:  0.4 },
    { name: 'Qwen3-235B-DI',      dev: 'alibaba',   share:  4.4, delta:  1.8 },
    { name: 'GPT-4.1',            dev: 'openai',    share:  3.7, delta: -2.1 },
    { name: 'Mistral-Medium-3.1', dev: 'mistral',   share:  2.8, delta:  0.2 },
    { name: 'Llama-3.3-70B',      dev: 'meta',      share:  2.3, delta: -0.5 },
  ],
  code_gen: [
    { name: 'Claude Code',        dev: 'anthropic', share: 14.2, delta:  4.8 },
    { name: 'GPT-5.1 Codex Max',  dev: 'openai',    share: 11.6, delta:  3.1 },
    { name: 'DeepSeek-V4-Pro',    dev: 'deepseek',  share:  9.4, delta:  1.7 },
    { name: 'Qwen3-Coder-480B',   dev: 'alibaba',   share:  7.8, delta:  5.2 },
    { name: 'GPT-5-Codex',        dev: 'openai',    share:  6.9, delta:  2.4 },
    { name: 'Claude Sonnet 4.6',  dev: 'anthropic', share:  5.1, delta: -1.3 },
    { name: 'Gemini 3.1 Pro',     dev: 'google',    share:  4.2, delta:  0.6 },
    { name: 'Grok-4',             dev: 'xai',       share:  3.6, delta:  1.9 },
    { name: 'Kimi-K2.7-Code',     dev: 'moonshot',  share:  2.9, delta:  0.8 },
    { name: 'GPT-5.2 Codex',      dev: 'openai',    share:  2.4, delta:  1.1 },
  ],
  planning: [
    { name: 'GPT-5',              dev: 'openai',    share: 10.3, delta:  2.2 },
    { name: 'Claude Opus 4.8',    dev: 'anthropic', share:  9.8, delta:  1.6 },
    { name: 'Gemini 3.1 Pro',     dev: 'google',    share:  8.4, delta:  0.9 },
    { name: 'o3-pro',             dev: 'openai',    share:  7.1, delta:  3.4 },
    { name: 'Grok-4',             dev: 'xai',       share:  6.2, delta:  2.8 },
    { name: 'DeepSeek-V4-Pro-T',  dev: 'deepseek',  share:  5.0, delta:  1.3 },
    { name: 'Claude Sonnet 4.6',  dev: 'anthropic', share:  4.2, delta: -0.7 },
    { name: 'Qwen3-Max-Thinking', dev: 'alibaba',   share:  3.5, delta:  2.1 },
    { name: 'GPT-4.1',            dev: 'openai',    share:  2.9, delta: -1.2 },
    { name: 'Nova-Premier-1.0',   dev: 'amazon',    share:  1.8, delta:  0.4 },
  ],
  extraction: [
    { name: 'GPT-4.1',            dev: 'openai',    share:  8.9, delta:  0.4 },
    { name: 'Claude Sonnet 4.6',  dev: 'anthropic', share:  7.6, delta: -1.1 },
    { name: 'Gemini 2.5 Flash',   dev: 'google',    share:  6.3, delta:  2.3 },
    { name: 'DeepSeek-V3.2',      dev: 'deepseek',  share:  5.1, delta:  0.9 },
    { name: 'Qwen3-Max',          dev: 'alibaba',   share:  4.4, delta:  1.6 },
    { name: 'GPT-4o',             dev: 'openai',    share:  3.8, delta: -0.8 },
    { name: 'Mistral-Medium-3.1', dev: 'mistral',   share:  3.2, delta:  0.3 },
    { name: 'Llama-3.3-70B',      dev: 'meta',      share:  2.7, delta:  0.5 },
    { name: 'Claude Haiku 4.5',   dev: 'anthropic', share:  2.1, delta:  0.9 },
    { name: 'Nova-Pro-1.0',       dev: 'amazon',    share:  1.6, delta:  0.2 },
  ],
};

const DEFAULT_MODELS = () => [
  { name: 'GPT-5',             dev: 'openai',    share: 11.2, delta:  2.1 },
  { name: 'Claude Opus 4.8',   dev: 'anthropic', share:  9.8, delta:  1.4 },
  { name: 'Gemini 3.1 Pro',    dev: 'google',    share:  8.3, delta:  0.7 },
  { name: 'Grok-4',            dev: 'xai',       share:  6.9, delta:  3.2 },
  { name: 'DeepSeek-V4-Pro',   dev: 'deepseek',  share:  5.7, delta:  1.8 },
  { name: 'Claude Sonnet 4.6', dev: 'anthropic', share:  4.4, delta: -1.3 },
  { name: 'Qwen3-Max',         dev: 'alibaba',   share:  3.6, delta:  0.9 },
  { name: 'GPT-4.1',           dev: 'openai',    share:  3.1, delta: -0.4 },
  { name: 'Mistral-Large-2',   dev: 'mistral',   share:  2.5, delta:  0.3 },
  { name: 'Llama-3.3-70B',     dev: 'meta',      share:  1.9, delta:  0.6 },
];

/* ─────────────────────────────────────────
   DEV ICON
───────────────────────────────────────── */
const DEV_META = {
  openai:    { url: 'https://cdn.simpleicons.org/openai/ffffff',    bg: '#09090b' },
  anthropic: { url: 'https://cdn.simpleicons.org/anthropic/ffffff', bg: '#6b3a2a' },
  google:    { url: 'https://cdn.simpleicons.org/google/4285F4',    bg: '#ffffff' },
  xai:       { url: 'https://cdn.simpleicons.org/x/ffffff',         bg: '#09090b' },
  deepseek:  { url: 'https://cdn.simpleicons.org/deepseek/4D6BFE',  bg: '#ffffff' },
  alibaba:   { url: 'https://cdn.simpleicons.org/alibaba/ff6a00',   bg: '#ffffff' },
  mistral:   { url: 'https://cdn.simpleicons.org/mistral/ff7000',   bg: '#ffffff' },
  meta:      { url: 'https://cdn.simpleicons.org/meta/0082fb',      bg: '#ffffff' },
  amazon:    { url: 'https://cdn.simpleicons.org/amazon/ff9900',    bg: '#ffffff' },
  moonshot:  { url: null, bg: '#f97316', letter: 'KI' },
  zhipu:     { url: null, bg: '#06b6d4', letter: 'ZH' },
};

function DevIcon({ dev, size = 22 }) {
  const cfg = DEV_META[dev] || { bg: '#334155', letter: (dev?.[0] || '?').toUpperCase() };
  if (cfg.url) {
    return (
      <span style={{ width: size, height: size, minWidth: size, background: cfg.bg }}
        className="rounded-lg overflow-hidden flex items-center justify-center ring-1 ring-white/10 shrink-0">
        <img src={cfg.url} alt={dev} width={size - 5} height={size - 5}
          className="object-contain"
          onError={e => { e.target.style.display = 'none'; }} />
      </span>
    );
  }
  return (
    <span style={{ width: size, height: size, minWidth: size, background: cfg.bg, fontSize: size * 0.36 }}
      className="rounded-lg flex items-center justify-center font-bold text-white ring-1 ring-white/10 shrink-0">
      {cfg.letter}
    </span>
  );
}

/* ─────────────────────────────────────────
   TASK CELL (treemap tile)
───────────────────────────────────────── */
function TaskCell({ task, isActive, onClick, style }) {
  const g = GROUPS[task.group];
  const topDevs = (TASK_MODELS[task.id] || DEFAULT_MODELS()).slice(0, 3).map(m => m.dev);

  return (
    <button
      onClick={() => onClick(task)}
      style={{
        ...style,
        background: isActive ? g.bgActive : g.bg,
        border: `1px solid ${isActive ? g.dot + '80' : g.border}`,
        boxShadow: isActive ? `0 0 20px ${g.glow}, inset 0 0 0 1px ${g.dot}30` : 'none',
        transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
        backdropFilter: 'blur(8px)',
      }}
      className="relative rounded-xl p-2.5 text-left cursor-pointer overflow-hidden group flex flex-col justify-between"
    >
      {/* Hover shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 30%, ${g.glow.replace('0.55','0.08')}, transparent 70%)` }} />

      {/* Active glow pulse */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${g.dot}18, transparent 70%)` }} />
      )}

      {/* Dev icons row */}
      <div className="flex gap-1 relative z-10">
        {topDevs.map((dev, i) => <DevIcon key={i} dev={dev} size={16} />)}
      </div>

      {/* Label */}
      <div className="relative z-10 mt-1">
        <span
          className="font-semibold leading-tight block"
          style={{
            color: isActive ? '#fff' : 'rgba(226,232,240,0.82)',
            fontSize: 'clamp(8px, 1vw, 11px)',
            letterSpacing: '0.01em',
          }}
        >
          {task.label}
        </span>
        {isActive && (
          <span className="block mt-0.5" style={{ fontSize: 9, color: g.dot, fontFamily: 'monospace' }}>
            {task.share}% usage ●
          </span>
        )}
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function TopModelsByTask() {
  const [activeTask, setActiveTask] = useState(TASKS[0]);
  const [hoveredModel, setHoveredModel] = useState(null);

  const g        = GROUPS[activeTask.group];
  const models   = TASK_MODELS[activeTask.id] || DEFAULT_MODELS();
  const maxShare = models[0]?.share ?? 1;
  const left     = models.slice(0, 5);
  const right    = models.slice(5, 10);

  const hoveredDetail = hoveredModel ? resolveModelDetail(hoveredModel.name, hoveredModel.dev) : null;

  return (
    <div className="space-y-6 fade-up">

      {/* ── Header bar ── */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-5 h-5 rounded-lg flex items-center justify-center text-xs"
              style={{ background: `${g.dot}20`, color: g.dot, border: `1px solid ${g.dot}35` }}>▦</span>
            Top Models by Task
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
            Each task's leading models · ranked by share of usage
          </p>
        </div>

        {/* Group legend pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {GROUP_TOTALS.map(gr => {
            const gc = GROUPS[gr.name];
            return (
              <span key={gr.name}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border"
                style={{
                  background: gc.bg,
                  border: `1px solid ${gc.dot}35`,
                  color: gc.dot,
                }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: gc.dot }} />
                {gr.name}
                <span className="opacity-60">{gr.pct}%</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* ── Treemap ── */}
      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'repeat(5, 62px)',
          gap: 3,
          padding: 3,
          background: 'rgba(2,4,16,0.7)',
          border: '1px solid rgba(99,102,241,0.12)',
          borderRadius: 16,
          boxShadow: 'inset 0 0 60px rgba(99,102,241,0.04)',
        }}
      >
        {/* GENERAL */}
        <TaskCell task={TASKS[0]} isActive={activeTask.id===TASKS[0].id} onClick={setActiveTask} style={{ gridColumn:'1/3', gridRow:'1/4' }} />
        <TaskCell task={TASKS[1]} isActive={activeTask.id===TASKS[1].id} onClick={setActiveTask} style={{ gridColumn:'3/5', gridRow:'1/3' }} />
        <TaskCell task={TASKS[2]} isActive={activeTask.id===TASKS[2].id} onClick={setActiveTask} style={{ gridColumn:'1/3', gridRow:'4/6' }} />
        <TaskCell task={TASKS[3]} isActive={activeTask.id===TASKS[3].id} onClick={setActiveTask} style={{ gridColumn:'3/5', gridRow:'3/5' }} />
        <TaskCell task={TASKS[4]} isActive={activeTask.id===TASKS[4].id} onClick={setActiveTask} style={{ gridColumn:'3/4', gridRow:'5/6' }} />
        <TaskCell task={TASKS[5]} isActive={activeTask.id===TASKS[5].id} onClick={setActiveTask} style={{ gridColumn:'4/5', gridRow:'5/6' }} />

        {/* AGENT */}
        <TaskCell task={TASKS[8]}  isActive={activeTask.id===TASKS[8].id}  onClick={setActiveTask} style={{ gridColumn:'5/8', gridRow:'1/4' }} />
        <TaskCell task={TASKS[9]}  isActive={activeTask.id===TASKS[9].id}  onClick={setActiveTask} style={{ gridColumn:'5/7', gridRow:'4/6' }} />
        <TaskCell task={TASKS[11]} isActive={activeTask.id===TASKS[11].id} onClick={setActiveTask} style={{ gridColumn:'7/8', gridRow:'4/6' }} />

        {/* CODE */}
        <TaskCell task={TASKS[12]} isActive={activeTask.id===TASKS[12].id} onClick={setActiveTask} style={{ gridColumn:'8/11', gridRow:'1/3' }} />
        <TaskCell task={TASKS[14]} isActive={activeTask.id===TASKS[14].id} onClick={setActiveTask} style={{ gridColumn:'11/13', gridRow:'1/2' }} />
        <TaskCell task={TASKS[15]} isActive={activeTask.id===TASKS[15].id} onClick={setActiveTask} style={{ gridColumn:'11/13', gridRow:'2/3' }} />
        <TaskCell task={TASKS[13]} isActive={activeTask.id===TASKS[13].id} onClick={setActiveTask} style={{ gridColumn:'8/10', gridRow:'3/5' }} />
        <TaskCell task={TASKS[16]} isActive={activeTask.id===TASKS[16].id} onClick={setActiveTask} style={{ gridColumn:'10/13', gridRow:'3/4' }} />
        <TaskCell task={TASKS[10]} isActive={activeTask.id===TASKS[10].id} onClick={setActiveTask} style={{ gridColumn:'10/13', gridRow:'4/5' }} />

        {/* DATA */}
        <TaskCell task={TASKS[17]} isActive={activeTask.id===TASKS[17].id} onClick={setActiveTask} style={{ gridColumn:'8/10', gridRow:'5/6' }} />
        <TaskCell task={TASKS[18]} isActive={activeTask.id===TASKS[18].id} onClick={setActiveTask} style={{ gridColumn:'10/13', gridRow:'5/6' }} />
      </div>

      {/* ── Detail panel ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(8,10,24,0.80)',
          border: `1px solid ${g.dot}28`,
          boxShadow: `0 0 40px ${g.glow.replace('0.55','0.08')}`,
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Panel header */}
        <div
          className="px-5 py-3.5 flex items-center justify-between flex-wrap gap-3"
          style={{ borderBottom: `1px solid ${g.dot}18`, background: `${g.bg}` }}
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: g.dot, boxShadow: `0 0 6px ${g.dot}` }} />
            <span className="text-sm font-bold text-white tracking-tight">{activeTask.label}</span>
            <span className="font-mono text-[10px] text-slate-500">{activeTask.share}% of total usage</span>
          </div>
          <span
            className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${g.pill}`}
          >
            {activeTask.group} · {GROUPS[activeTask.group].tag}
          </span>
        </div>

        {/* Two-column model list */}
        <div className="grid grid-cols-1 md:grid-cols-2 relative">
          {[left, right].map((col5, ci) => (
            <div key={ci}
              style={{ borderRight: ci === 0 ? `1px solid ${g.dot}12` : 'none' }}
              className="divide-y"
            >
              {col5.map((m, i) => {
                const rank   = ci * 5 + i + 1;
                const barW   = ((m.share / maxShare) * 100).toFixed(1);

                return (
                  <div
                    key={m.name}
                    onMouseEnter={() => setHoveredModel(m)}
                    onMouseLeave={() => setHoveredModel(null)}
                    className="flex items-center gap-3 px-4 py-2.5 transition-colors group relative overflow-hidden cursor-pointer"
                    style={{ borderColor: `${g.dot}10` }}
                  >
                    {/* Hover row glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                      style={{ background: `${g.bg}` }} />

                    {/* Progress bar underlay */}
                    <div
                      className="absolute bottom-0 left-0 h-px transition-all duration-500"
                      style={{ width: `${barW}%`, background: `linear-gradient(90deg, ${g.dot}60, transparent)` }}
                    />

                    {/* Rank */}
                    <span className="font-mono text-[10px] font-bold w-4 shrink-0 relative z-10"
                      style={{ color: rank <= 3 ? g.dot : '#475569' }}>
                      {rank}
                    </span>

                    {/* Icon */}
                    <div className="relative z-10 shrink-0 transform group-hover:scale-110 transition-transform">
                      <DevIcon dev={m.dev} size={26} />
                    </div>

                    {/* Name + dev */}
                    <div className="flex-1 min-w-0 relative z-10">
                      <div className="text-[11px] font-bold text-slate-200 group-hover:text-indigo-300 transition-colors truncate flex items-center gap-1.5">
                        {m.name}
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 font-mono">✦ info</span>
                      </div>
                      <div className="text-[9px] text-slate-600 font-mono">by {m.dev}</div>
                    </div>

                    {/* Bar sparkline */}
                    <div className="w-12 h-1 rounded-full bg-slate-800 overflow-hidden relative z-10 shrink-0 hidden sm:block">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${g.bar} transition-all duration-700`}
                        style={{ width: `${barW}%` }}
                      />
                    </div>

                    {/* Share % */}
                    <div className="text-right relative z-10 shrink-0 min-w-[52px]">
                      <div className="text-xs font-bold font-mono text-slate-200">
                        {m.share.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="px-5 py-2 flex items-center justify-between"
          style={{ borderTop: `1px solid ${g.dot}12`, background: g.bg }}
        >
          <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">
            Usage share · 7-day rolling avg · Hover logo for model specs
          </span>
        </div>
      </div>

      {/* ── Model Detail Hover Popover Card ── */}
      {hoveredDetail && (
        <div
          className="fixed bottom-8 right-8 z-50 w-80 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl transition-all duration-200 animate-fade-in border"
          style={{
            background: 'rgba(11, 15, 27, 0.95)',
            borderColor: `${g.dot}50`,
            boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 30px ${g.glow.replace('0.55', '0.25')}`,
          }}
        >
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="relative shrink-0">
              <DevIcon dev={hoveredModel.dev} size={38} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-xs">{hoveredDetail.flag}</span>
                <span className="text-[10px] text-slate-400 font-semibold">{hoveredDetail.producer}</span>
                <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded border border-indigo-500/30 font-mono ml-auto">
                  {hoveredDetail.access}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white leading-tight truncate">{hoveredDetail.name}</h4>
            </div>
          </div>

          {/* Intelligence Score */}
          <div className="mb-3 p-2 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex justify-between items-center text-[10px] mb-1">
              <span className="text-slate-400 font-mono">Intelligence Rating</span>
              <span className="font-mono font-bold text-indigo-400">{hoveredDetail.score}<span className="text-slate-600 text-[9px]">/100</span></span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${g.bar}`}
                style={{ width: `${hoveredDetail.score}%` }}
              />
            </div>
          </div>

          {/* Specs summary */}
          <div className="grid grid-cols-2 gap-2 text-[10px] mb-3 font-mono">
            <div className="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80">
              <span className="text-slate-500 block text-[9px]">Params</span>
              <span className="text-slate-200 font-bold">{hoveredDetail.params}</span>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80">
              <span className="text-slate-500 block text-[9px]">Execution</span>
              <span className={hoveredDetail.local ? 'text-emerald-400 font-bold' : 'text-slate-300 font-bold'}>
                {hoveredDetail.local ? 'Local & Cloud' : 'Cloud API'}
              </span>
            </div>
          </div>

          {/* Overview */}
          <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3 bg-slate-950/30 p-2 rounded-xl border border-slate-800/50">
            {hoveredDetail.desc}
          </p>

          <div className="mt-2 text-[9px] font-mono text-slate-500 text-right flex items-center justify-between">
            <span className="text-slate-600">✦ NextGen AI Index</span>
            <span className="text-indigo-400 font-semibold">Hover active</span>
          </div>
        </div>
      )}
    </div>
  );
}
