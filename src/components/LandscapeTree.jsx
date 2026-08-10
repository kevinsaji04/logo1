'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import ModelIcon from '@/components/ModelIcon';
import { LANDSCAPE_COMPANIES } from '@/data/ai_landscape';

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.1;

export default function LandscapeTree() {
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredNode, setHoveredNode] = useState(null);

  // Collapsible Hierarchy Legend
  const [isHierarchyLegendOpen, setIsHierarchyLegendOpen] = useState(false);

  // Collapse / Expand state
  const [collapsedCompanies, setCollapsedCompanies] = useState(new Set());
  const [collapsedCategories, setCollapsedCategories] = useState(new Set());
  const [collapsedFamilies, setCollapsedFamilies] = useState(new Set());

  // Pan & Zoom state
  const [zoom, setZoom] = useState(0.7);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Tooltip position
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const toggleCompanyCollapse = (id) => {
    setCollapsedCompanies(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCategoryCollapse = (id) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleFamilyCollapse = (id) => {
    setCollapsedFamilies(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Filter companies
  const filteredCompanies = useMemo(() => {
    return LANDSCAPE_COMPANIES.filter(comp => {
      if (selectedCompany !== 'all' && comp.id !== selectedCompany) return false;
      if (!searchQuery) return true;

      const q = searchQuery.toLowerCase();
      const matchComp = comp.name.toLowerCase().includes(q) || comp.focus.toLowerCase().includes(q);
      const matchCat = comp.categories.some(cat =>
        cat.name.toLowerCase().includes(q) ||
        cat.families.some(fam =>
          fam.name.toLowerCase().includes(q) ||
          fam.purpose.toLowerCase().includes(q) ||
          fam.versions.some(v => v.name.toLowerCase().includes(q))
        )
      );
      return matchComp || matchCat;
    });
  }, [selectedCompany, searchQuery]);

  // Compute Layout Tree Nodes & SVG Curves
  const { layoutNodes, layoutEdges, totalW, totalH } = useMemo(() => {
    const nodes = [];
    const edges = [];

    const startY = 80;
    const colWidth = 260;
    const gapX = 42;
    let currX = 120;

    filteredCompanies.forEach(comp => {
      const isCompCollapsed = collapsedCompanies.has(comp.id);
      const compX = currX;
      let maxCompWidth = colWidth;

      // Level 1: COMPANY NODE
      const compNode = {
        type: 'company',
        id: comp.id,
        name: comp.name,
        logo: comp.logo,
        color: comp.color,
        founded: comp.founded,
        focus: comp.focus,
        x: compX,
        y: startY,
        width: 220,
        height: 64,
        isCollapsed: isCompCollapsed,
      };
      nodes.push(compNode);

      if (!isCompCollapsed) {
        let catY = startY + 130;

        comp.categories.forEach(cat => {
          const isCatCollapsed = collapsedCategories.has(cat.id);

          // Level 2: CATEGORY NODE
          const catNode = {
            type: 'category',
            id: cat.id,
            name: cat.name,
            desc: cat.desc,
            companyName: comp.name,
            color: comp.color,
            x: compX + 20,
            y: catY,
            width: 190,
            height: 48,
            isCollapsed: isCatCollapsed,
          };
          nodes.push(catNode);
          edges.push({ from: comp.id, to: cat.id, color: comp.color });

          if (!isCatCollapsed) {
            let famY = catY + 95;

            cat.families.forEach(fam => {
              const isFamCollapsed = collapsedFamilies.has(fam.id);

              // Level 3: MODEL FAMILY NODE
              const famNode = {
                type: 'family',
                id: fam.id,
                name: fam.name,
                desc: fam.desc,
                purpose: fam.purpose,
                companyName: comp.name,
                categoryName: cat.name,
                color: comp.color,
                x: compX + 40,
                y: famY,
                width: 170,
                height: 42,
                isCollapsed: isFamCollapsed,
              };
              nodes.push(famNode);
              edges.push({ from: cat.id, to: fam.id, color: comp.color });

              if (!isFamCollapsed) {
                let verY = famY + 80;

                fam.versions.forEach(v => {
                  // Level 4: MODEL VERSION NODE
                  const verNode = {
                    type: 'version',
                    id: v.id,
                    name: v.name,
                    year: v.year,
                    open: v.open,
                    desc: v.desc,
                    companyName: comp.name,
                    categoryName: cat.name,
                    familyName: fam.name,
                    color: comp.color,
                    x: compX + 60,
                    y: verY,
                    width: 150,
                    height: 34,
                  };
                  nodes.push(verNode);
                  edges.push({ from: fam.id, to: v.id, color: comp.color });

                  verY += 52;
                });

                famY = verY + 15;
              } else {
                famY += 75;
              }
            });

            catY = famY + 20;
          } else {
            catY += 80;
          }
        });
      }

      currX += maxCompWidth + gapX;
    });

    const calculatedW = Math.max(2400, currX + 150);
    const maxY = Math.max(...nodes.map(n => n.y + (n.height || 50)), 1200);
    const calculatedH = maxY + 150;

    return { layoutNodes: nodes, layoutEdges: edges, totalW: calculatedW, totalH: calculatedH };
  }, [filteredCompanies, collapsedCompanies, collapsedCategories, collapsedFamilies]);

  // Index for quick lookup
  const nodeMap = useMemo(() => {
    const map = new Map();
    layoutNodes.forEach(n => map.set(n.id, n));
    return map;
  }, [layoutNodes]);

  // Pan handlers
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

  // Zoom handler
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
    const fitZoom = Math.min(width / totalW, height / totalH) * 0.95;
    setZoom(Math.max(MIN_ZOOM, Math.min(fitZoom, 1)));
    setPan({ x: (width - totalW * fitZoom) / 2, y: 40 });
  }, [totalW, totalH]);

  const resetView = () => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const fitZoom = Math.min(width / totalW, height / totalH) * 0.95;
    setZoom(Math.max(MIN_ZOOM, Math.min(fitZoom, 1)));
    setPan({ x: (width - totalW * fitZoom) / 2, y: 40 });
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

      {/* ── Top Bar Header & Navigation Switcher ── */}
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
                  <span>🏢</span> AI Model Landscape
                </h1>

                {/* Navigation Switcher between Evolution Tree and Landscape Tree */}
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <Link
                    href="/tree"
                    className="px-3 py-1 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-all"
                  >
                    🌳 Model Evolution
                  </Link>
                  <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
                    🏢 AI Model Landscape
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                Companies, Model Categories & Model Families · Click nodes to expand/collapse · Scroll to zoom
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search company or model..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 w-56"
            />

            <select
              value={selectedCompany}
              onChange={e => setSelectedCompany(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 font-semibold"
            >
              <option value="all">All Companies ({LANDSCAPE_COMPANIES.length})</option>
              {LANDSCAPE_COMPANIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

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
              ⊡ Fit View
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Interactive Landscape Canvas ── */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden select-none"
        style={{ cursor: 'grab' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div
          style={{
            position: 'absolute',
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            width: totalW,
            height: totalH,
          }}
        >
          {/* Background Panel */}
          <div className="absolute inset-0 bg-[#080d1a] rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden" />

          {/* SVG Canvas for Tree Connections */}
          <svg className="absolute inset-0 pointer-events-none z-0" width={totalW} height={totalH}>
            {layoutEdges.map((edge, idx) => {
              const fromN = nodeMap.get(edge.from);
              const toN = nodeMap.get(edge.to);
              if (!fromN || !toN) return null;

              const x1 = fromN.x + fromN.width / 2;
              const y1 = fromN.y + fromN.height;
              const x2 = toN.x + toN.width / 2;
              const y2 = toN.y;

              const cy1 = y1 + (y2 - y1) * 0.5;
              const cy2 = y2 - (y2 - y1) * 0.5;

              return (
                <path
                  key={idx}
                  d={`M ${x1} ${y1} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${y2}`}
                  fill="none"
                  stroke={edge.color}
                  strokeWidth={2}
                  strokeOpacity={0.65}
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* Hierarchy Level Nodes */}
          <div className="absolute inset-0 z-10">
            {layoutNodes.map(node => {
              // Level 1: COMPANY NODE
              if (node.type === 'company') {
                return (
                  <div
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{
                      position: 'absolute',
                      left: node.x,
                      top: node.y,
                      width: node.width,
                      height: node.height,
                      backgroundColor: '#0a0f1e',
                      borderColor: node.color,
                      borderWidth: 2,
                      borderRadius: 16,
                      boxShadow: `0 0 28px ${node.color}50`,
                      zIndex: 30,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 12px',
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                        {node.logo && node.logo !== 'stability' ? (
                          <img src={`/logos/${node.logo}`} alt={node.name} className="w-5 h-5 object-contain" onError={e => e.currentTarget.style.display='none'} />
                        ) : (
                          <span className="text-sm">🏢</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] font-black uppercase tracking-wider" style={{ color: node.color }}>COMPANY</div>
                        <div className="text-xs font-extrabold text-white truncate">{node.name}</div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); toggleCompanyCollapse(node.id); }}
                      className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold shrink-0 ml-1"
                    >
                      {node.isCollapsed ? '+' : '−'}
                    </button>
                  </div>
                );
              }

              // Level 2: CATEGORY NODE
              if (node.type === 'category') {
                return (
                  <div
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{
                      position: 'absolute',
                      left: node.x,
                      top: node.y,
                      width: node.width,
                      height: node.height,
                      backgroundColor: '#0e172a',
                      borderColor: `${node.color}90`,
                      borderWidth: 1.5,
                      borderRadius: 14,
                      boxShadow: `0 0 16px ${node.color}30`,
                      zIndex: 25,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 10px',
                    }}
                  >
                    <div className="min-w-0">
                      <div className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest">CATEGORY</div>
                      <div className="text-[11px] font-bold text-white truncate">{node.name}</div>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); toggleCategoryCollapse(node.id); }}
                      className="w-5 h-5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-[10px] font-bold shrink-0 ml-1"
                    >
                      {node.isCollapsed ? '+' : '−'}
                    </button>
                  </div>
                );
              }

              // Level 3: MODEL FAMILY NODE
              if (node.type === 'family') {
                return (
                  <div
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{
                      position: 'absolute',
                      left: node.x,
                      top: node.y,
                      width: node.width,
                      height: node.height,
                      backgroundColor: '#111c33',
                      borderColor: `${node.color}70`,
                      borderWidth: 1.5,
                      borderRadius: 12,
                      zIndex: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 10px',
                    }}
                  >
                    <div className="min-w-0">
                      <div className="text-[8px] font-mono font-bold text-indigo-400 uppercase">MODEL FAMILY</div>
                      <div className="text-xs font-bold text-white truncate">{node.name}</div>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFamilyCollapse(node.id); }}
                      className="w-5 h-5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-[10px] font-bold shrink-0 ml-1"
                    >
                      {node.isCollapsed ? '+' : '−'}
                    </button>
                  </div>
                );
              }

              // Level 4: MODEL VERSION NODE
              if (node.type === 'version') {
                return (
                  <div
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{
                      position: 'absolute',
                      left: node.x,
                      top: node.y,
                      width: node.width,
                      height: node.height,
                      backgroundColor: '#0a1020',
                      borderColor: `${node.color}50`,
                      borderWidth: 1,
                      borderRadius: 10,
                      zIndex: 15,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 8px',
                    }}
                  >
                    <span className="text-[11px] font-semibold text-slate-200 truncate">{node.name}</span>
                    <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 shrink-0 ml-1">
                      {node.year}
                    </span>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>

        {/* ── Collapsible Hierarchy Legend (Top-Left) ── */}
        <div className="absolute top-4 left-4 z-20 transition-all">
          {isHierarchyLegendOpen ? (
            <div className="bg-slate-950/95 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md max-w-xs">
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>📐</span> Landscape Hierarchy
                </h4>
                <button
                  onClick={() => setIsHierarchyLegendOpen(false)}
                  className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold shrink-0"
                >
                  −
                </button>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 rounded-xl bg-slate-900 border border-blue-500/40 text-blue-300 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Level 1: COMPANY</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-2 ml-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Level 2: MODEL CATEGORY</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-purple-500/40 text-purple-300 font-bold flex items-center gap-2 ml-4">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Level 3: MODEL FAMILY</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-bold flex items-center gap-2 ml-6">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  <span>Level 4: MODEL / VERSION</span>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsHierarchyLegendOpen(true)}
              className="flex items-center gap-2 bg-slate-950/90 border border-slate-800 hover:border-slate-700 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white shadow-xl backdrop-blur-md transition-all"
            >
              <span>📐 Hierarchy Legend</span>
              <span className="bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded text-[10px]">+</span>
            </button>
          )}
        </div>

        {/* ── Hover Tooltip ── */}
        {hoveredNode && (
          <div className="absolute z-50 pointer-events-none" style={getTooltipStyle()}>
            <div className="bg-slate-950/98 border border-indigo-500/50 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
              {hoveredNode.type === 'company' && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      Company Root
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Est. {hoveredNode.founded}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white mb-2">{hoveredNode.name}</h3>
                  <p className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800 leading-relaxed font-mono">
                    {hoveredNode.focus}
                  </p>
                </div>
              )}

              {hoveredNode.type === 'category' && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Model Category
                    </span>
                    <span className="text-xs text-slate-400">by {hoveredNode.companyName}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white mb-2">{hoveredNode.name}</h3>
                  <p className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800 leading-relaxed font-mono">
                    {hoveredNode.desc}
                  </p>
                </div>
              )}

              {hoveredNode.type === 'family' && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      Model Family
                    </span>
                    <span className="text-xs text-slate-400">{hoveredNode.companyName} · {hoveredNode.categoryName}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white mb-1">{hoveredNode.name}</h3>
                  <p className="text-xs text-slate-300 mb-2 leading-relaxed">{hoveredNode.desc}</p>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 font-mono">
                    <strong className="text-indigo-400">Main Purpose:</strong> {hoveredNode.purpose}
                  </div>
                </div>
              )}

              {hoveredNode.type === 'version' && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      Released {hoveredNode.year}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${hoveredNode.open ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {hoveredNode.open ? 'Open Source' : 'Closed'}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-white mb-0.5">{hoveredNode.name}</h3>
                  <span className="text-xs text-slate-400 block mb-2">{hoveredNode.companyName} · {hoveredNode.categoryName} · {hoveredNode.familyName}</span>
                  <p className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800 leading-relaxed font-mono">
                    {hoveredNode.desc}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
