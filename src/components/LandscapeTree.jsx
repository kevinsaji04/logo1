'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import ModelIcon from '@/components/ModelIcon';
import { COMPANY_VIEW, CATEGORY_VIEW, RELEASE_VIEW, PURPOSE_VIEW, CAPABILITY_VIEW } from '@/data/ai_landscape';

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.1;

export default function LandscapeTree() {
  const [activeViewMode, setActiveViewMode] = useState('company'); // 'company', 'category', 'release', 'purpose', 'capability'
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredNode, setHoveredNode] = useState(null);

  // Collapsible Legend State
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  // Collapse / Expand set for interactive nodes
  const [collapsedNodes, setCollapsedNodes] = useState(new Set());

  // Pan & Zoom state (auto-fitted to screen)
  const [zoom, setZoom] = useState(0.85);
  const [pan, setPan] = useState({ x: 20, y: 20 });
  const isPanning = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Tooltip position
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const toggleNodeCollapse = (id) => {
    setCollapsedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Select active dataset based on view mode
  const currentRawTree = useMemo(() => {
    switch (activeViewMode) {
      case 'company': return COMPANY_VIEW;
      case 'category': return CATEGORY_VIEW;
      case 'release': return RELEASE_VIEW;
      case 'purpose': return PURPOSE_VIEW;
      case 'capability': return CAPABILITY_VIEW;
      default: return COMPANY_VIEW;
    }
  }, [activeViewMode]);

  // Compute Layout Tree Nodes & TOP-TO-BOTTOM Compact Coordinates
  const { layoutNodes, layoutEdges, totalW, totalH } = useMemo(() => {
    const nodes = [];
    const edges = [];

    // Compact Level Heights & Y Offsets (TOP TO BOTTOM)
    const levelYOffset = [50, 140, 220, 295, 365];
    const nodeHeights  = [44,  36,  32,  28,  26];
    const nodeWidths   = [160, 145, 135, 125, 120];

    const colGapX = 14;
    let currentX = 50;

    // Helper recursive column calculator for Top-to-Bottom tree
    const measureTreeWidth = (node, level) => {
      const isCollapsed = collapsedNodes.has(node.id);
      const hasChildren = node.children && node.children.length > 0;
      const nodeW = nodeWidths[Math.min(level, nodeWidths.length - 1)];

      if (!hasChildren || isCollapsed) return nodeW;

      let childrenTotalW = 0;
      node.children.forEach((c, idx) => {
        const cw = measureTreeWidth(c, level + 1);
        childrenTotalW += cw + (idx < node.children.length - 1 ? colGapX : 0);
      });

      return Math.max(nodeW, childrenTotalW);
    };

    const layoutBranch = (node, level, parentId, colorTheme, startSubX) => {
      const nodeColor = node.color || colorTheme || '#3b82f6';
      const isCollapsed = collapsedNodes.has(node.id);
      const hasChildren = node.children && node.children.length > 0;

      const nodeW = nodeWidths[Math.min(level, nodeWidths.length - 1)];
      const nodeH = nodeHeights[Math.min(level, nodeHeights.length - 1)];
      const nodeY = levelYOffset[Math.min(level, levelYOffset.length - 1)];

      const branchWidth = measureTreeWidth(node, level);
      const nodeX = startSubX + (branchWidth - nodeW) / 2; // Center node over its children

      // Search filter check
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchesSearch = (node.name && node.name.toLowerCase().includes(q)) ||
                        (node.desc && node.desc.toLowerCase().includes(q)) ||
                        (node.purpose && node.purpose.toLowerCase().includes(q));
      }

      const treeNode = {
        ...node,
        level,
        x: nodeX,
        y: nodeY,
        width: nodeW,
        height: nodeH,
        color: nodeColor,
        isCollapsed,
        matchesSearch,
      };
      nodes.push(treeNode);

      if (parentId) {
        edges.push({ from: parentId, to: node.id, color: nodeColor });
      }

      if (hasChildren && !isCollapsed) {
        let childRunX = startSubX;
        node.children.forEach(c => {
          const cw = measureTreeWidth(c, level + 1);
          layoutBranch(c, level + 1, node.id, nodeColor, childRunX);
          childRunX += cw + colGapX;
        });
      }
    };

    currentRawTree.forEach(rootItem => {
      const rootW = measureTreeWidth(rootItem, 0);
      layoutBranch(rootItem, 0, null, rootItem.color, currentX);
      currentX += rootW + colGapX + 24; // Compact horizontal gap between company columns
    });

    const maxY = Math.max(...nodes.map(n => n.y + n.height), 450);
    const maxX = Math.max(...nodes.map(n => n.x + n.width), 1200);

    return {
      layoutNodes: nodes,
      layoutEdges: edges,
      totalW: maxX + 80,
      totalH: maxY + 80,
    };
  }, [currentRawTree, collapsedNodes, searchQuery]);

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

  // Auto-fit view to screen on mount and view switch so user never has to zoom out!
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const fitZoom = Math.min(width / totalW, height / totalH) * 0.94;
    setZoom(Math.max(MIN_ZOOM, Math.min(fitZoom, 1)));
    setPan({ x: Math.max(10, (width - totalW * fitZoom) / 2), y: 15 });
  }, [activeViewMode, totalW, totalH]);

  const resetView = () => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const fitZoom = Math.min(width / totalW, height / totalH) * 0.94;
    setZoom(Math.max(MIN_ZOOM, Math.min(fitZoom, 1)));
    setPan({ x: Math.max(10, (width - totalW * fitZoom) / 2), y: 15 });
  };

  const getTooltipStyle = () => {
    if (!containerRef.current) return {};
    const { width, height } = containerRef.current.getBoundingClientRect();
    let left = tooltipPos.x + 20;
    let top = tooltipPos.y + 20;
    if (left + 340 > width - 12) left = tooltipPos.x - 340 - 20;
    if (top + 220 > height - 12) top = tooltipPos.y - 220 - 20;
    if (left < 8) left = 8;
    if (top < 8) top = 8;
    return { left, top, width: 340 };
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col font-sans">

      {/* ── Top Bar Header & View Switcher ── */}
      <div className="border-b border-slate-800/80 bg-[#0b0f19]/90 backdrop-blur sticky top-0 z-30 px-6 py-3">
        <div className="max-w-[1850px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-all shadow-sm"
            >
              ← Back to Directory
            </Link>

            <div>
              <div className="flex items-center gap-3 mb-0.5">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-sm">
                  🌲 AI Model Decision Tree
                </span>
                <h1 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>🏢</span> AI Model Landscape
                </h1>

                {/* Navigation Switcher between Evolution Tree and Landscape Tree */}
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <Link
                    href="/tree"
                    className="px-2.5 py-0.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-all"
                  >
                    🌳 Model Evolution
                  </Link>
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-extrabold bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
                    🏢 AI Model Landscape
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400">
                Companies, Model Categories & Model Families · Click +/− to expand · Scroll to zoom
              </p>
            </div>
          </div>

          {/* Controls & 5 View Mode Selector */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Selector Tabs */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              {[
                { id: 'company', label: '🏢 Company View' },
                { id: 'category', label: '📁 Category View' },
                { id: 'release', label: '📅 Release View' },
                { id: 'purpose', label: '🎯 Purpose View' },
                { id: 'capability', label: '⚡ Capability View' },
              ].map(v => (
                <button
                  key={v.id}
                  onClick={() => setActiveViewMode(v.id)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeViewMode === v.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Search landscape..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 w-40"
            />

            {/* Zoom controls */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-2 py-0.5">
              <button
                onClick={() => setZoom(z => Math.max(MIN_ZOOM, z - ZOOM_STEP))}
                className="text-slate-400 hover:text-white w-5 h-5 flex items-center justify-center text-xs font-bold"
              >−</button>
              <span className="text-[11px] text-slate-400 font-mono w-10 text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(z => Math.min(MAX_ZOOM, z + ZOOM_STEP))}
                className="text-slate-400 hover:text-white w-5 h-5 flex items-center justify-center text-xs font-bold"
              >+</button>
            </div>

            <button
              onClick={resetView}
              className="px-3 py-1 rounded-xl text-xs font-bold border border-slate-800 bg-slate-950 text-slate-400 hover:text-white transition-colors"
            >
              ⊡ Fit Screen
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Interactive Compact Canvas Viewport ── */}
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

          {/* SVG Canvas for Vertical Top-to-Bottom Curves */}
          <svg className="absolute inset-0 pointer-events-none z-0" width={totalW} height={totalH}>
            {layoutEdges.map((edge, idx) => {
              const fromN = nodeMap.get(edge.from);
              const toN = nodeMap.get(edge.to);
              if (!fromN || !toN) return null;

              // Vertical connection: Bottom center of parent -> Top center of child
              const x1 = fromN.x + fromN.width / 2;
              const y1 = fromN.y + fromN.height;
              const x2 = toN.x + toN.width / 2;
              const y2 = toN.y;

              const cy1 = y1 + (y2 - y1) * 0.45;
              const cy2 = y2 - (y2 - y1) * 0.45;

              return (
                <path
                  key={idx}
                  d={`M ${x1} ${y1} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${y2}`}
                  fill="none"
                  stroke={edge.color}
                  strokeWidth={2}
                  strokeOpacity={0.75}
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* Hierarchy Level Nodes (Compact Top-to-Bottom) */}
          <div className="absolute inset-0 z-10">
            {layoutNodes.map(node => {
              const hasChildren = node.children && node.children.length > 0;

              // Level 0: ROOT CARD (Top Header Node)
              if (node.level === 0) {
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
                      borderRadius: 12,
                      boxShadow: `0 0 20px ${node.color}50`,
                      zIndex: 30,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 8px',
                    }}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="w-6 h-6 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                        {node.logo && node.logo !== 'stability' ? (
                          <img src={`/logos/${node.logo}`} alt={node.name} className="w-3.5 h-3.5 object-contain" onError={e => e.currentTarget.style.display='none'} />
                        ) : (
                          <span className="text-xs">🏢</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[7.5px] font-black uppercase tracking-wider leading-none" style={{ color: node.color }}>ROOT</div>
                        <div className="text-[11px] font-extrabold text-white truncate leading-tight mt-0.5">{node.name}</div>
                      </div>
                    </div>

                    {hasChildren && (
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleNodeCollapse(node.id); }}
                        className="w-5 h-5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center text-[10px] font-bold shrink-0 ml-1"
                      >
                        {node.isCollapsed ? '+' : '−'}
                      </button>
                    )}
                  </div>
                );
              }

              // Level 1: CATEGORY / SUB-ROOT CARD
              if (node.level === 1) {
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
                      borderRadius: 10,
                      boxShadow: `0 0 12px ${node.color}25`,
                      zIndex: 25,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 7px',
                    }}
                  >
                    <div className="min-w-0">
                      <div className="text-[7px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">BRANCH</div>
                      <div className="text-[10px] font-bold text-white truncate mt-0.5">{node.name}</div>
                    </div>

                    {hasChildren && (
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleNodeCollapse(node.id); }}
                        className="w-4 h-4 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-[9px] font-bold shrink-0 ml-1"
                      >
                        {node.isCollapsed ? '+' : '−'}
                      </button>
                    )}
                  </div>
                );
              }

              // Level 2: MODEL FAMILY CARD
              if (node.level === 2) {
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
                      borderRadius: 9,
                      zIndex: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 7px',
                    }}
                  >
                    <div className="min-w-0">
                      <div className="text-[7px] font-mono font-bold text-indigo-400 uppercase leading-none">FAMILY</div>
                      <div className="text-[10px] font-bold text-white truncate mt-0.5">{node.name}</div>
                    </div>

                    {hasChildren && (
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleNodeCollapse(node.id); }}
                        className="w-4 h-4 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-[9px] font-bold shrink-0 ml-1"
                      >
                        {node.isCollapsed ? '+' : '−'}
                      </button>
                    )}
                  </div>
                );
              }

              // Level 3 & 4: MODEL / VERSION NODE
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
                    borderRadius: 8,
                    zIndex: 15,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 6px',
                  }}
                >
                  <span className="text-[10px] font-semibold text-slate-200 truncate">{node.name}</span>
                  {node.year && (
                    <span className="text-[8px] font-mono font-bold text-slate-400 bg-slate-900 px-1 py-0.5 rounded border border-slate-800 shrink-0 ml-1">
                      {node.year}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Collapsible Hierarchy Legend (Top-Left) ── */}
        <div className="absolute top-3 left-3 z-20 transition-all">
          {isLegendOpen ? (
            <div className="bg-slate-950/95 border border-slate-800 rounded-2xl p-3 shadow-2xl backdrop-blur-md max-w-xs">
              <div className="flex items-center justify-between gap-3 mb-2">
                <h4 className="text-[11px] font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span>📐</span> Compact Flow
                </h4>
                <button
                  onClick={() => setIsLegendOpen(false)}
                  className="w-5 h-5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold shrink-0"
                >
                  −
                </button>
              </div>

              <div className="space-y-1.5 text-[10px] font-mono">
                <div className="p-1.5 rounded-lg bg-slate-900 border border-blue-500/40 text-blue-300 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Top: ROOT (y = 50px)</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Level 1: BRANCH (y = 140px)</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900 border border-purple-500/40 text-purple-300 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Level 2: FAMILY (y = 220px)</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  <span>Bottom: VERSION (y ≥ 295px)</span>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsLegendOpen(true)}
              className="flex items-center gap-2 bg-slate-950/90 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white shadow-xl backdrop-blur-md transition-all"
            >
              <span>📐 Layout Legend</span>
              <span className="bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded text-[10px]">+</span>
            </button>
          )}
        </div>

        {/* ── Hover Tooltip ── */}
        {hoveredNode && (
          <div className="absolute z-50 pointer-events-none" style={getTooltipStyle()}>
            <div className="bg-slate-950/98 border border-indigo-500/50 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-mono font-bold uppercase text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {hoveredNode.level === 0 ? 'Root' : `Level ${hoveredNode.level}`}
                </span>
                {hoveredNode.year && <span className="text-[9px] font-mono text-slate-400">Released {hoveredNode.year}</span>}
              </div>
              <h3 className="text-sm font-extrabold text-white mb-1.5">{hoveredNode.name}</h3>
              {hoveredNode.desc && (
                <p className="text-[11px] text-slate-300 bg-slate-900 p-2 rounded-xl border border-slate-800 leading-relaxed font-mono mb-1.5">
                  {hoveredNode.desc}
                </p>
              )}
              {hoveredNode.purpose && (
                <div className="text-[10px] text-slate-300 bg-slate-900 p-2 rounded-lg border border-slate-800 font-mono">
                  <strong className="text-indigo-400">Main Purpose:</strong> {hoveredNode.purpose}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
