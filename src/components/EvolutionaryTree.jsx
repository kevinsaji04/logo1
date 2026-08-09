'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import ModelIcon from '@/components/ModelIcon';
import { NODES, EDGES, FAMILY_COLORS, W, H, NW, NH, YEAR_Y } from '@/data/ai_tree';

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.1;

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

  // Tooltip position (cursor-following)
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
      const yBase = YEAR_Y[n.year] || 500;
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
    // Track cursor for tooltip
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

  // Attach non-passive wheel listener
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  // Fit tree to view on mount
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const fitZoom = Math.min(width / W, height / H) * 0.9;
    setZoom(Math.max(MIN_ZOOM, Math.min(fitZoom, 1)));
    setPan({ x: (width - W * fitZoom) / 2, y: (height - H * fitZoom) / 2 });
  }, []);

  const resetView = () => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const fitZoom = Math.min(width / W, height / H) * 0.9;
    setZoom(Math.max(MIN_ZOOM, Math.min(fitZoom, 1)));
    setPan({ x: (width - W * fitZoom) / 2, y: (height - H * fitZoom) / 2 });
  };

  // Tooltip placement — keep inside container
  const tooltipWidth = 360;
  const tooltipHeight = 260;
  const tooltipOffset = 18;
  const getTooltipStyle = () => {
    if (!containerRef.current) return {};
    const { width, height } = containerRef.current.getBoundingClientRect();
    let left = tooltipPos.x + tooltipOffset;
    let top = tooltipPos.y + tooltipOffset;
    if (left + tooltipWidth > width - 12) left = tooltipPos.x - tooltipWidth - tooltipOffset;
    if (top + tooltipHeight > height - 12) top = tooltipPos.y - tooltipHeight - tooltipOffset;
    if (left < 8) left = 8;
    if (top < 8) top = 8;
    return { left, top, width: tooltipWidth };
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200 flex flex-col">

      {/* ── Header ── */}
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-30 px-6 py-4">
        <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              ← Back to Grid
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🌳</span> AI Model Evolutionary Tree (2018–2023)
              </h1>
              <p className="text-xs text-slate-400">
                Scroll to zoom · Drag to pan · Hover a node for details
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search model or developer..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 w-48"
            />

            <select
              value={selectedFamily}
              onChange={e => setSelectedFamily(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Families</option>
              {Object.entries(FAMILY_COLORS).map(([key, fam]) => (
                <option key={key} value={key}>{fam.label}</option>
              ))}
            </select>

            <button
              onClick={() => setOpenSourceOnly(!openSourceOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                openSourceOnly
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {openSourceOnly ? '✓ Open-Source Only' : 'Show All Licensing'}
            </button>

            {/* Zoom controls */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1">
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
              className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition-colors"
            >
              ⊡ Fit
            </button>
          </div>
        </div>
      </div>

      {/* ── Main pan/zoom container ── */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden select-none"
        style={{ cursor: 'grab' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Transformed canvas */}
        <div
          style={{
            position: 'absolute',
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            width: W,
            height: H,
          }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-[#0d1322] rounded-2xl border border-slate-800/80 shadow-2xl" />

          {/* SVG for edges + year lines */}
          <svg className="absolute inset-0 pointer-events-none z-0" width={W} height={H}>
            {/* Year guidelines */}
            {Object.entries(YEAR_Y).map(([year, y]) => (
              <g key={year}>
                <line x1="60" y1={y} x2={W - 40} y2={y} stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />
                <rect x="10" y={y - 12} width="44" height="24" rx="12" fill="#1e293b" />
                <text x="32" y={y + 4} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  {year}
                </text>
              </g>
            ))}

            {/* Edges */}
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
              const colorInfo = FAMILY_COLORS[edge.family] || FAMILY_COLORS.other;

              const x1 = fromC.x + NW / 2;
              const y1 = fromC.y;
              const x2 = toC.x + NW / 2;
              const y2 = toC.y;
              const cy1 = y1 - (y1 - y2) * 0.5;
              const cy2 = y2 + (y1 - y2) * 0.5;

              return (
                <path
                  key={idx}
                  d={`M ${x1} ${y1} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${y2}`}
                  fill="none"
                  stroke={isHighlighted ? colorInfo.stroke : isFiltered ? '#1e293b' : '#334155'}
                  strokeWidth={isHighlighted ? 3.5 : isFiltered ? 0.5 : 1.5}
                  strokeOpacity={hoveredId && !isHighlighted ? 0.12 : isFiltered ? 0.2 : 0.8}
                  style={{ transition: 'all 0.25s ease' }}
                />
              );
            })}
          </svg>

          {/* Node cards */}
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

              const familyTheme = FAMILY_COLORS[node.family] || FAMILY_COLORS.other;

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
                    opacity: hoveredId ? (isHighlighted ? 1 : 0.2) : (isVisible ? 1 : 0.15),
                    transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: isHovered ? 50 : isHighlighted ? 40 : 10,
                    backgroundColor: isHovered ? '#1e293b' : '#0f172a',
                    borderColor: isHighlighted || isHovered ? familyTheme.stroke : node.open ? '#334155' : '#1e293b',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderRadius: 8,
                    boxShadow: isHovered ? `0 0 16px ${familyTheme.stroke}55` : undefined,
                    cursor: 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 6px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, overflow: 'hidden' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: familyTheme.stroke, flexShrink: 0, display: 'inline-block' }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {node.name}
                    </span>
                  </div>
                  {node.open && (
                    <span style={{ fontSize: 8, color: '#34d399', background: 'rgba(16,185,129,0.1)', padding: '0 3px', borderRadius: 3, border: '1px solid rgba(16,185,129,0.3)', flexShrink: 0 }}>
                      OS
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Hover tooltip — fixed inside container, follows cursor ── */}
        {hoveredNode && (
          <div
            className="absolute z-50 pointer-events-none"
            style={getTooltipStyle()}
          >
            <div className="bg-slate-900/98 border border-indigo-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
              {/* Header */}
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
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-slate-800 text-slate-400 border border-slate-700">
                      {(FAMILY_COLORS[hoveredNode.family] || FAMILY_COLORS.other).label}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-tight">{hoveredNode.name}</h3>
                  <span className="text-xs text-slate-400">by {hoveredNode.dev}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 mb-3 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                {hoveredNode.desc}
              </p>

              {/* Features */}
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-1.5 font-bold">
                  Key Features
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
            </div>
          </div>
        )}

        {/* Mini-map legend */}
        <div className="absolute bottom-4 left-4 z-20 bg-slate-950/90 border border-slate-800 rounded-xl p-3 flex flex-col gap-1.5">
          <span className="text-[9px] uppercase font-mono text-slate-500 font-bold tracking-wider mb-1">Lineage</span>
          {Object.entries(FAMILY_COLORS).map(([key, fam]) => (
            <div key={key} className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedFamily(selectedFamily === key ? 'all' : key)}>
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: fam.stroke }} />
              <span className={`text-[10px] ${selectedFamily === key ? 'text-white font-bold' : 'text-slate-400'}`}>{fam.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
