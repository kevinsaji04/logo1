'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import ModelIcon from '@/components/ModelIcon';
import { NODES, EDGES, FAMILY_COLORS, W, H, NW, NH, YEAR_Y } from '@/data/ai_tree';

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.1;

const DEV_BADGES = {
  'OpenAI':       { icon: 'OA', color: '#3b82f6', bg: 'bg-blue-950/80 border-blue-500/40 text-blue-300' },
  'Google':       { icon: 'G',  color: '#ea4335', bg: 'bg-red-950/80 border-red-500/40 text-red-300' },
  'Google DeepMind': { icon: 'G', color: '#ea4335', bg: 'bg-red-950/80 border-red-500/40 text-red-300' },
  'Meta':         { icon: '∞',  color: '#22c55e', bg: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' },
  'Anthropic':    { icon: 'A',  color: '#d946ef', bg: 'bg-fuchsia-950/80 border-fuchsia-500/40 text-fuchsia-300' },
  'Mistral AI':   { icon: 'M',  color: '#14b8a6', bg: 'bg-teal-950/80 border-teal-500/40 text-teal-300' },
  'Microsoft':    { icon: 'MS', color: '#00a4ef', bg: 'bg-sky-950/80 border-sky-500/40 text-sky-300' },
  'Stability AI': { icon: 'S',  color: '#f97316', bg: 'bg-orange-950/80 border-orange-500/40 text-orange-300' },
  'AI2':          { icon: 'AI2',color: '#ec4899', bg: 'bg-pink-950/80 border-pink-500/40 text-pink-300' },
};

export default function EvolutionaryTree() {
  const [selectedFamily, setSelectedFamily] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredId, setHoveredId] = useState(null);
  const [openSourceOnly, setOpenSourceOnly] = useState(false);

  // Pan & zoom state
  const [zoom, setZoom] = useState(0.7);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Tooltip position
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Pre-index nodes
  const nodeMap = useMemo(() => {
    const map = new Map();
    NODES.forEach(n => map.set(n.id, n));
    return map;
  }, []);

  // Compute highlighted ancestors/descendants
  const highlightSet = useMemo(() => {
    if (!hoveredId) return new Set();
    const set = new Set([hoveredId]);
    const queueUp = [hoveredId];
    while (queueUp.length > 0) {
      const curr = queueUp.shift();
      EDGES.forEach(e => { if (e.to === curr && !set.has(e.from)) { set.add(e.from); queueUp.push(e.from); } });
    }
    const queueDown = [hoveredId];
    while (queueDown.length > 0) {
      const curr = queueDown.shift();
      EDGES.forEach(e => { if (e.from === curr && !set.has(e.to)) { set.add(e.to); queueDown.push(e.to); } });
    }
    return set;
  }, [hoveredId]);

  // Compute node coordinates
  const nodeCoords = useMemo(() => {
    const coords = new Map();
    NODES.forEach(n => {
      const yBase = YEAR_Y[n.year] || 600;
      coords.set(n.id, { x: n.x, y: yBase + (n.yOff || 0) });
    });
    return coords;
  }, []);

  const hoveredNode = hoveredId ? nodeMap.get(hoveredId) : null;

  // ── Pan handlers ──
  const onMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    isPanning.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.style.cursor = 'grabbing';
  }, []);

  const onMouseMove = useCallback((e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }

    if (!isPanning.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
  }, []);

  const onMouseUp = useCallback((e) => {
    isPanning.current = false;
    if (e.currentTarget) e.currentTarget.style.cursor = 'grab';
  }, []);

  // ── Zoom handler ──
  const onWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setZoom(prev => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev + delta)));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  // Fit view on mount
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const fitZoom = Math.min(width / W, height / H) * 0.95;
    setZoom(Math.max(MIN_ZOOM, Math.min(fitZoom, 1)));
    setPan({ x: (width - W * fitZoom) / 2, y: (height - H * fitZoom) / 2 });
  }, []);

  const resetView = () => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const fitZoom = Math.min(width / W, height / H) * 0.95;
    setZoom(Math.max(MIN_ZOOM, Math.min(fitZoom, 1)));
    setPan({ x: (width - W * fitZoom) / 2, y: (height - H * fitZoom) / 2 });
  };

  const getTooltipStyle = () => {
    if (!containerRef.current) return {};
    const { width, height } = containerRef.current.getBoundingClientRect();
    let left = tooltipPos.x + 20;
    let top = tooltipPos.y + 20;
    if (left + 360 > width - 12) left = tooltipPos.x - 360 - 20;
    if (top + 240 > height - 12) top = tooltipPos.y - 240 - 20;
    if (left < 8) left = 8;
    if (top < 8) top = 8;
    return { left, top, width: 360 };
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col font-sans">

      {/* ── Top Bar Header ── */}
      <div className="border-b border-slate-800/80 bg-[#0b0f19]/90 backdrop-blur sticky top-0 z-30 px-6 py-3.5">
        <div className="max-w-[1850px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-all shadow-sm"
            >
              ← Back to Directory
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>🌳</span> Evolution & Lineage of Major AI Models
                </h1>

                {/* Navigation Switcher between Evolution Tree and Landscape Tree */}
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
                    🌳 Model Evolution
                  </span>
                  <Link
                    href="/landscape"
                    className="px-3 py-1 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-all"
                  >
                    🏢 AI Model Landscape
                  </Link>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                Scientifically accurate model evolution map · Scroll to zoom · Drag canvas to pan
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search model or company..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 w-52"
            />

            <select
              value={selectedFamily}
              onChange={e => setSelectedFamily(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 font-semibold"
            >
              <option value="all">All Model Families</option>
              {Object.entries(FAMILY_COLORS).map(([key, fam]) => (
                <option key={key} value={key}>{fam.label}</option>
              ))}
            </select>

            <button
              onClick={() => setOpenSourceOnly(!openSourceOnly)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                openSourceOnly
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {openSourceOnly ? '✓ Open-Source Only' : 'Show All Licensing'}
            </button>

            {/* Zoom controls */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-2 py-1">
              <button
                onClick={() => setZoom(z => Math.max(MIN_ZOOM, z - ZOOM_STEP))}
                className="text-slate-400 hover:text-white w-6 h-6 flex items-center justify-center text-sm font-bold"
              >−</button>
              <span className="text-xs text-slate-400 font-mono w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(z => Math.min(MAX_ZOOM, z + ZOOM_STEP))}
                className="text-slate-400 hover:text-white w-6 h-6 flex items-center justify-center text-sm font-bold"
              >+</button>
            </div>
            <button
              onClick={resetView}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-800 bg-slate-950 text-slate-400 hover:text-white transition-colors"
            >
              ⊡ Fit Tree
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Canvas Viewport ── */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden select-none"
        style={{ cursor: 'grab' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Transformed Canvas Container */}
        <div
          style={{
            position: 'absolute',
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            width: W,
            height: H,
          }}
        >
          {/* Background Panel */}
          <div className="absolute inset-0 bg-[#080d1a] rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden" />

          {/* SVG Canvas for Curves and Timeline Grid */}
          <svg className="absolute inset-0 pointer-events-none z-0" width={W} height={H}>
            {/* Year Horizontal Gridlines & Badges */}
            {Object.entries(YEAR_Y).map(([year, y]) => {
              if (year === 'COMPANY' || year === 'PRE_TRANSFORMER') return null;
              return (
                <g key={year}>
                  <line x1="90" y1={y} x2={W - 60} y2={y} stroke="#1e293b" strokeDasharray="5 5" strokeWidth="1" opacity="0.7" />
                  <rect x="24" y={y - 14} width="52" height="28" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                  <text x="50" y={y + 4} textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    {year}
                  </text>
                </g>
              );
            })}

            {/* Tree Branch Edges */}
            {EDGES.map((edge, idx) => {
              const fromC = nodeCoords.get(edge.from);
              const toC = nodeCoords.get(edge.to);
              if (!fromC || !toC) return null;

              const fromNode = nodeMap.get(edge.from);
              const toNode = nodeMap.get(edge.to);

              const isFiltered = (
                (selectedFamily !== 'all' && edge.family !== selectedFamily) ||
                (openSourceOnly && (!fromNode?.open || !toNode?.open)) ||
                (searchQuery && !(
                  fromNode?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  toNode?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  fromNode?.dev.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  toNode?.dev.toLowerCase().includes(searchQuery.toLowerCase())
                ))
              );

              const isHighlighted = highlightSet.has(edge.from) && highlightSet.has(edge.to);
              const colorInfo = FAMILY_COLORS[edge.family] || FAMILY_COLORS.closed;
              const isBranch = edge.type === 'branch';

              const x1 = fromC.x + NW / 2;
              const y1 = fromC.y;
              const x2 = toC.x + NW / 2;
              const y2 = toC.y;
              const cy1 = y1 - (y1 - y2) * 0.45;
              const cy2 = y2 + (y1 - y2) * 0.45;

              return (
                <path
                  key={idx}
                  d={`M ${x1} ${y1} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${y2}`}
                  fill="none"
                  stroke={isHighlighted ? colorInfo.stroke : isFiltered ? '#1e293b' : colorInfo.stroke}
                  strokeWidth={isHighlighted ? 4.5 : edge.thick ? 3.5 : 2}
                  strokeDasharray={isBranch ? '6 4' : 'none'}
                  strokeOpacity={hoveredId && !isHighlighted ? 0.12 : isFiltered ? 0.15 : edge.thick ? 0.85 : 0.65}
                  strokeLinecap="round"
                  style={{ transition: 'all 0.25s ease' }}
                />
              );
            })}
          </svg>

          {/* Node Pill Cards */}
          <div className="absolute inset-0 z-10">
            {NODES.map(node => {
              const c = nodeCoords.get(node.id);
              if (!c) return null;

              const isHighlighted = highlightSet.has(node.id);
              const isHovered = hoveredId === node.id;

              const isMatchQuery = searchQuery
                ? node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  node.dev.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
              const isMatchFamily = selectedFamily === 'all' || node.family === selectedFamily;
              const isMatchOpen = !openSourceOnly || node.open;
              const isVisible = isMatchQuery && isMatchFamily && isMatchOpen;

              const familyTheme = FAMILY_COLORS[node.family] || FAMILY_COLORS.closed;
              const devBadge = DEV_BADGES[node.dev] || { icon: '✦', color: '#94a3b8', bg: 'bg-slate-800 text-slate-300' };

              // Company Origin Root Headers at bottom (y: 1280px)
              if (node.isRoot) {
                return (
                  <div
                    key={node.id}
                    onMouseEnter={() => setHoveredId(node.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      position: 'absolute',
                      left: c.x - 20,
                      top: c.y - 18,
                      width: NW + 40,
                      height: NH + 24,
                      opacity: hoveredId ? (isHighlighted ? 1 : 0.3) : 1,
                      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      zIndex: isHovered ? 50 : 30,
                      backgroundColor: '#0a0f1e',
                      borderColor: familyTheme.stroke,
                      borderWidth: 2,
                      borderStyle: 'solid',
                      borderRadius: 14,
                      boxShadow: `0 0 24px ${familyTheme.stroke}60`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '0 10px',
                    }}
                  >
                    <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.08)', border: `1px solid ${familyTheme.stroke}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {node.logo && node.logo !== 'stability' ? (
                        <img src={`/logos/${node.logo}`} alt={node.name} style={{ width: 18, height: 18, objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      ) : (
                        <span style={{ fontSize: 13 }}>🏢</span>
                      )}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: 8, fontWeight: 900, color: familyTheme.stroke, textTransform: 'uppercase', letterSpacing: '0.05em' }}>COMPANY ORIGIN</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {node.name}
                      </div>
                    </div>
                  </div>
                );
              }

              // Special rendering for Root Trunk (Transformers 2017)
              if (node.isTrunk) {
                return (
                  <div
                    key={node.id}
                    onMouseEnter={() => setHoveredId(node.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      position: 'absolute',
                      left: c.x - 25,
                      top: c.y - 20,
                      width: NW + 50,
                      height: NH + 24,
                      zIndex: isHovered ? 50 : 30,
                      backgroundColor: '#0a1020',
                      borderColor: '#ea4335',
                      borderWidth: 2,
                      borderStyle: 'solid',
                      borderRadius: 16,
                      boxShadow: '0 0 30px rgba(234,67,53,0.5)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                    }}
                  >
                    <span className="text-lg">🌴</span>
                    <div>
                      <div className="text-[9px] font-black text-red-400 uppercase tracking-widest leading-none">ARCHITECTURAL ROOT</div>
                      <div className="text-xs font-extrabold text-white mt-0.5">{node.name} <span className="text-[10px] text-slate-400 font-mono">({node.year})</span></div>
                    </div>
                  </div>
                );
              }

              // Special rendering for Generative Media Branch Head
              if (node.isBranchHead) {
                return (
                  <div
                    key={node.id}
                    onMouseEnter={() => setHoveredId(node.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      position: 'absolute',
                      left: c.x - 20,
                      top: c.y - 18,
                      width: NW + 40,
                      height: NH + 24,
                      zIndex: isHovered ? 50 : 30,
                      backgroundColor: '#0f1424',
                      borderColor: '#f97316',
                      borderWidth: 2,
                      borderStyle: 'solid',
                      borderRadius: 14,
                      boxShadow: '0 0 24px rgba(249,115,22,0.5)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                    }}
                  >
                    <span className="text-base">🎨</span>
                    <div>
                      <div className="text-[8px] font-black text-orange-400 uppercase tracking-widest leading-none">MEDIA BRANCH</div>
                      <div className="text-xs font-extrabold text-white mt-0.5">{node.name}</div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    position: 'absolute',
                    left: c.x,
                    top: c.y - NH / 2,
                    width: NW,
                    height: NH,
                    opacity: hoveredId ? (isHighlighted ? 1 : 0.2) : (isVisible ? 1 : 0.18),
                    transform: isHovered ? 'scale(1.14)' : 'scale(1)',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: isHovered ? 50 : isHighlighted ? 40 : 10,
                    backgroundColor: isHovered ? '#1e293b' : '#0d1527',
                    borderColor: isHighlighted || isHovered ? familyTheme.stroke : familyTheme.stroke,
                    borderWidth: isHighlighted || isHovered ? 2 : 1.5,
                    borderStyle: 'solid',
                    borderRadius: 12,
                    boxShadow: isHovered ? `0 0 20px ${familyTheme.stroke}66` : undefined,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 8px',
                  }}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className={`w-5 h-5 rounded-md text-[9px] font-black flex items-center justify-center shrink-0 border ${devBadge.bg}`}>
                      {devBadge.icon}
                    </span>
                    <span className="text-[11px] font-bold text-white truncate leading-tight">
                      {node.name}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-semibold text-slate-400 shrink-0 ml-1">
                    ({node.year})
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Model Family Legend (Top-Left) ── */}
        <div className="absolute top-4 left-4 z-20 bg-slate-950/90 border border-slate-800/90 rounded-2xl p-4 shadow-xl backdrop-blur-md max-w-xs">
          <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <span>🗺️</span> Model Families & Ecosystems
          </h4>
          <div className="space-y-2">
            {Object.entries(FAMILY_COLORS).map(([key, fam]) => (
              <div
                key={key}
                onClick={() => setSelectedFamily(selectedFamily === key ? 'all' : key)}
                className={`flex items-center justify-between p-1.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  selectedFamily === key ? 'bg-slate-800 border-indigo-500 text-white font-bold' : 'border-slate-800/60 text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 h-1 rounded-full" style={{ backgroundColor: fam.stroke }} />
                  <span>{fam.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5 text-[10px]">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-5 h-0.5 bg-indigo-400 shrink-0" />
              <span>Solid = Direct Model Successor</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-5 h-0.5 border-b border-dashed border-indigo-400 shrink-0" />
              <span>Dashed = Ecosystem Branch</span>
            </div>
          </div>
        </div>

        {/* ── Developer Badges Legend (Bottom-Right) ── */}
        <div className="absolute bottom-4 right-4 z-20 bg-slate-950/90 border border-slate-800/90 rounded-2xl p-3.5 shadow-xl backdrop-blur-md">
          <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Company Key</h4>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(DEV_BADGES).map(([dev, b]) => (
              <div key={dev} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px]">
                <span className={`w-4 h-4 rounded text-[8px] font-bold flex items-center justify-center border ${b.bg}`}>{b.icon}</span>
                <span className="text-slate-300 font-semibold truncate">{dev}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Note Card (Bottom-Left) ── */}
        <div className="absolute bottom-4 left-4 z-20 bg-slate-950/90 border border-slate-800/90 rounded-xl p-3 max-w-sm shadow-lg backdrop-blur-md">
          <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
            <strong className="text-slate-200">Note:</strong> This is a Model Lineage & Evolution Map. A connection indicates direct model succession or company ecosystem relationship, not raw pre-training weights.
          </p>
        </div>

        {/* ── Cursor Hover Tooltip ── */}
        {hoveredNode && (
          <div
            className="absolute z-50 pointer-events-none"
            style={getTooltipStyle()}
          >
            <div className="bg-slate-950/98 border border-indigo-500/50 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
              <div className="flex items-start gap-3 mb-3">
                <ModelIcon
                  model={{ name: hoveredNode.name, developer: hoveredNode.dev, color: '#6366f1', letter: hoveredNode.name.substring(0, 2).toUpperCase(), gradient: 'from-indigo-600 to-purple-800' }}
                  className="w-11 h-11"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {hoveredNode.year}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${
                      hoveredNode.open
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {hoveredNode.open ? 'Open Source' : 'Closed'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-tight">{hoveredNode.name}</h3>
                  <span className="text-xs text-slate-400">by {hoveredNode.dev}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-3 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                {hoveredNode.desc}
              </p>

              {hoveredNode.features && hoveredNode.features.length > 0 && (
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-1.5 font-bold">
                    Key Milestones & Features
                  </span>
                  <ul className="space-y-1">
                    {hoveredNode.features.map((feat, idx) => (
                      <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-2">
                        <span className="text-indigo-400 mt-0.5">✦</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
