'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import DeveloperIcon from '@/components/DeveloperIcon';
import ModelIcon from '@/components/ModelIcon';
import CategoryBadge from '@/components/CategoryBadge';
import { useCompare } from '@/context/CompareContext';
import CategoryVisualMockup from '@/components/CategoryVisualMockup';
import TopModelsByTask from '@/components/TopModelsByTask';
import syncMeta from '@/data/sync_meta.json';
import {
  RAW_MODELS,
  RANKINGS,
  COUNTRIES,
  CLIENTS,
  BENCHMARKS,
  COMPLIANCE,
  COUNTRY_FLAG,
  getArchitectureDetails,
  getModelContextInfo,
  getModelHardwareRequirements
} from '@/data/intelligence_data';

const formatSyncTime = (iso) => {
  if (!iso) return 'Today';
  try {
    const d = new Date(iso);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return 'Recently';
  }
};

// Map raw 610 array models to object format compatible with original ModelGrid
const FORMATTED_MODELS = RAW_MODELS.map((m) => {
  const [id, name, developer, cat, country, released, params, access, priceIn, priceOut, local, score, desc, tags, color, letter] = m;
  const ctx = getModelContextInfo(m);
  const hw = getModelHardwareRequirements(m);
  
  // map category code to display category
  let category = 'Text';
  if (cat === 'image') category = 'Image';
  else if (cat === 'video') category = 'Video';
  else if (cat === 'audio') category = 'Audio';
  else if (cat === 'code') category = 'Code';
  else if (cat === 'search') category = 'Search';
  else if (cat === 'reason') category = 'Reasoning';
  else if (cat === 'multi') category = 'Multimodal';
  else if (cat === 'tool') category = 'Tools';

  // Derive Transformer Architecture Type (String for badges, filters, and rendering):
  let arch = 'Decoder-Only';
  const nameLower = name.toLowerCase();
  const descLower = (desc || '').toLowerCase();

  if (
    cat === 'audio' || cat === 'video' || cat === 'image' ||
    nameLower.includes('whisper') || nameLower.includes('nova') || nameLower.includes('flux') ||
    nameLower.includes('veo') || nameLower.includes('sora') || nameLower.includes('wan') ||
    nameLower.includes('seedream') || nameLower.includes('kling') || nameLower.includes('t5') ||
    nameLower.includes('bart') || nameLower.includes('lyria') || nameLower.includes('mochi')
  ) {
    arch = 'Encoder-Decoder';
  } else if (
    cat === 'search' || cat === 'tool' ||
    nameLower.includes('embed') || nameLower.includes('search') || nameLower.includes('detector') ||
    nameLower.includes('zero') || nameLower.includes('bria') || nameLower.includes('sonar') ||
    nameLower.includes('exa') || descLower.includes('embedding') || descLower.includes('detection')
  ) {
    arch = 'Encoder-Only';
  }

  const archDetails = getArchitectureDetails(m);

  return {
    id,
    name,
    developer,
    category,
    cat,
    country,
    released,
    params,
    access,
    priceIn,
    priceOut,
    local,
    score,
    description: desc,
    tags: tags || [],
    color: color || '#6378ff',
    letter: letter || name.charAt(0),
    arch,
    archDetails,
    context: ctx,
    hardware: hw,
    gradient: color === '#f59e0b' ? 'from-amber-600 to-orange-800' :
              color === '#10b981' ? 'from-emerald-600 to-teal-800' :
              color === '#ec4899' ? 'from-pink-600 to-rose-800' :
              color === '#06b6d4' ? 'from-cyan-600 to-blue-800' :
              color === '#3b82f6' ? 'from-blue-600 to-indigo-800' :
              color === '#8b5cf6' ? 'from-purple-600 to-violet-800' : 'from-indigo-600 to-purple-800',
    features: [
      `Hardware: ${hw?.badge || (local ? 'Local GPU' : 'Cloud API')}`,
      `Min VRAM: ${hw?.minVram || 'N/A'}`,
      `Context: ${ctx?.label || '128K tokens'}`,
      `Architecture: ${arch}`,
      `Parameters: ${params}`,
      `Release: ${released}`,
      `Execution: ${local ? 'Local & Cloud Supported' : 'Cloud API Only'}`,
      `Pricing: ${priceIn ? `$${priceIn} in / $${priceOut} out` : (access === 'open' || access === 'free' ? 'Free / Open-Source' : 'Enterprise Tier')}`
    ]
  };
});

export default function ModelGrid({ models = FORMATTED_MODELS }) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('directory'); // directory | charts | rankings | origins | clients
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [developer, setDeveloper] = useState('All');
  const [architecture, setArchitecture] = useState('All');
  const [accessFilter, setAccessFilter] = useState('All'); // All | Open | Closed
  const [contextFilter, setContextFilter] = useState('All'); // All | standard | extended | massive
  const [sortBy, setSortBy] = useState('default'); // default | score_desc | score_asc
  const [selectedModel, setSelectedModel] = useState(models[0] || null);
  const [visible, setVisible] = useState(100);
  const { compareList, toggleModel, isSelected, setShowPanel } = useCompare();

  // Support direct URL query parameter routing (tab, category, model, search)
  useEffect(() => {
    const tabParam = searchParams?.get('tab');
    if (tabParam && ['directory', 'charts', 'tasks', 'rankings', 'origins', 'clients'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
    const catParam = searchParams?.get('cat');
    if (catParam) {
      setCategory(catParam);
    }
    const modelParam = searchParams?.get('model');
    const searchParam = searchParams?.get('search');
    const target = modelParam || searchParam;

    if (target) {
      const q = target.toLowerCase().trim();
      const found = models.find(m => {
        const nameStr = String(m.name || '').toLowerCase();
        const idStr = String(m.id || '').toLowerCase();
        const devStr = String(m.developer || '').toLowerCase();
        return nameStr === q || idStr === q || nameStr.includes(q) || idStr.includes(q) || devStr === q;
      });

      if (found) {
        setSelectedModel(found);
        setSearch(found.name);
      } else {
        setSearch(target);
      }
      setActiveTab('directory');
    }
  }, [searchParams, models]);

  const developers = useMemo(() => ['All', ...[...new Set(models.map(m => m.developer))].sort()], [models]);

  // Dynamic Category Counts
  const categoryCounts = useMemo(() => {
    const counts = { all: models.length, llm: 0, image: 0, video: 0, audio: 0, code: 0, search: 0, reason: 0, multi: 0, tool: 0 };
    models.forEach(m => {
      const c = m.cat;
      if (c === 'text' || c === 'llm') counts.llm = (counts.llm || 0) + 1;
      else if (counts[c] !== undefined) counts[c] = (counts[c] || 0) + 1;
      else counts.llm = (counts.llm || 0) + 1;
    });
    return counts;
  }, [models]);

  const categories = useMemo(() => [
    { id: 'all', label: 'All', count: models.length },
    { id: 'llm', label: 'LLM', count: categoryCounts.llm || 0 },
    { id: 'image', label: 'Image Gen', count: categoryCounts.image || 0 },
    { id: 'video', label: 'Video', count: categoryCounts.video || 0 },
    { id: 'audio', label: 'Audio/TTS', count: categoryCounts.audio || 0 },
    { id: 'code', label: 'Code', count: categoryCounts.code || 0 },
    { id: 'search', label: 'Search', count: categoryCounts.search || 0 },
    { id: 'reason', label: 'Reasoning', count: categoryCounts.reason || 0 },
    { id: 'multi', label: 'Multimodal', count: categoryCounts.multi || 0 },
    { id: 'tool', label: 'Tools', count: categoryCounts.tool || 0 },
  ], [models, categoryCounts]);

  const filtered = useMemo(() => {
    let r = models;
    if (category !== 'all') {
      r = r.filter(m => m.cat === category || (m.tags && m.tags.includes(category)));
    }
    if (developer !== 'All') r = r.filter(m => m.developer === developer);
    if (architecture !== 'All') r = r.filter(m => m.arch === architecture);
    if (accessFilter === 'Open') {
      r = r.filter(m => m.access === 'open' || m.access === 'free' || m.local === true);
    } else if (accessFilter === 'Closed') {
      r = r.filter(m => !(m.access === 'open' || m.access === 'free' || m.local === true));
    }
    if (contextFilter === 'standard') {
      r = r.filter(m => (m.context?.tokens || 128000) <= 32768);
    } else if (contextFilter === 'extended') {
      r = r.filter(m => (m.context?.tokens || 128000) >= 64000 && (m.context?.tokens || 128000) <= 200000);
    } else if (contextFilter === 'massive') {
      r = r.filter(m => (m.context?.tokens || 128000) >= 1048576);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(m => m.name.toLowerCase().includes(q) || m.developer.toLowerCase().includes(q) || m.arch.toLowerCase().includes(q));
    }
    if (sortBy === 'score_desc') r = [...r].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    if (sortBy === 'score_asc')  r = [...r].sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
    return r;
  }, [models, search, category, developer, architecture, accessFilter, contextFilter, sortBy]);

  useEffect(() => {
    setVisible(100);
    if (filtered.length > 0 && selectedModel && !filtered.find(m => m.id === selectedModel.id)) {
      setSelectedModel(filtered[0]);
    }
  }, [filtered]);

  // Canvas Chart References
  const catChartRef = useRef(null);
  const producerChartRef = useRef(null);
  const countryChartRef = useRef(null);
  const accessChartRef = useRef(null);

  useEffect(() => {
    if (activeTab !== 'charts') return;

    const initCharts = () => {
      if (!window.Chart) return;

      const baseOpts = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#94a3b8', font: { size: 11 } } } }
      };

      if (catChartRef.current) {
        if (catChartRef.current._chartInstance) catChartRef.current._chartInstance.destroy();
        const catLabels = ['LLM', 'Multimodal', 'Image Gen', 'Video', 'Audio/TTS', 'Code', 'Search', 'Reasoning', 'Tools'];
        const catData = [
          categoryCounts.llm || 0,
          categoryCounts.multi || 0,
          categoryCounts.image || 0,
          categoryCounts.video || 0,
          categoryCounts.audio || 0,
          categoryCounts.code || 0,
          categoryCounts.search || 0,
          categoryCounts.reason || 0,
          categoryCounts.tool || 0
        ];

        catChartRef.current._chartInstance = new window.Chart(catChartRef.current, {
          type: 'doughnut',
          data: {
            labels: catLabels,
            datasets: [{
              data: catData,
              backgroundColor: ['#6366f1', '#f97316', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6', '#fbbf24', '#64748b'],
              borderColor: '#0b0f19',
              borderWidth: 2
            }]
          },
          options: { ...baseOpts, plugins: { legend: { display: false } } }
        });
      }

      if (producerChartRef.current) {
        if (producerChartRef.current._chartInstance) producerChartRef.current._chartInstance.destroy();
        const devMap = {};
        models.forEach(m => {
          const d = m.developer || 'Other';
          devMap[d] = (devMap[d] || 0) + 1;
        });
        const topDevs = Object.entries(devMap).sort((a, b) => b[1] - a[1]).slice(0, 10);

        producerChartRef.current._chartInstance = new window.Chart(producerChartRef.current, {
          type: 'bar',
          data: {
            labels: topDevs.map(d => d[0]),
            datasets: [{
              label: 'Models Cataloged',
              data: topDevs.map(d => d[1]),
              backgroundColor: 'rgba(99, 102, 241, 0.3)',
              borderColor: '#6366f1',
              borderWidth: 1.5,
              borderRadius: 6
            }]
          },
          options: {
            ...baseOpts,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { color: 'rgba(51, 65, 85, 0.4)' } },
              y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(51, 65, 85, 0.4)' } }
            }
          }
        });
      }

      if (countryChartRef.current) {
        if (countryChartRef.current._chartInstance) countryChartRef.current._chartInstance.destroy();
        const countryMap = {};
        models.forEach(m => {
          const c = m.country || 'Other';
          countryMap[c] = (countryMap[c] || 0) + 1;
        });
        const topCountries = Object.entries(countryMap).sort((a, b) => b[1] - a[1]).slice(0, 8);

        countryChartRef.current._chartInstance = new window.Chart(countryChartRef.current, {
          type: 'doughnut',
          data: {
            labels: topCountries.map(c => c[0]),
            datasets: [{
              data: topCountries.map(c => c[1]),
              backgroundColor: ['#10b981', '#f43f5e', '#f59e0b', '#3b82f6', '#8b5cf6', '#f97316', '#14b8a6', '#64748b'],
              borderColor: '#0b0f19',
              borderWidth: 2
            }]
          },
          options: {
            ...baseOpts,
            plugins: { legend: { position: 'right', labels: { color: '#94a3b8', font: { size: 10 } } } }
          }
        });
      }

      if (accessChartRef.current) {
        if (accessChartRef.current._chartInstance) accessChartRef.current._chartInstance.destroy();
        const accessMap = { 'open': 0, 'free': 0, 'freemium': 0, 'api': 0, 'commercial': 0, 'paid': 0 };
        models.forEach(m => {
          const a = (m.access || 'commercial').toLowerCase();
          if (accessMap[a] !== undefined) accessMap[a]++;
          else accessMap.commercial++;
        });

        accessChartRef.current._chartInstance = new window.Chart(accessChartRef.current, {
          type: 'bar',
          data: {
            labels: ['Open Source', 'Free Access', 'Freemium', 'API Paid', 'Commercial'],
            datasets: [{
              data: [accessMap.open, accessMap.free, accessMap.freemium, accessMap.api, accessMap.commercial + accessMap.paid],
              backgroundColor: [
                'rgba(16, 185, 129, 0.3)',
                'rgba(20, 184, 166, 0.3)',
                'rgba(245, 158, 11, 0.3)',
                'rgba(99, 102, 241, 0.3)',
                'rgba(244, 63, 94, 0.3)'
              ],
              borderColor: ['#10b981', '#14b8a6', '#f59e0b', '#6366f1', '#f43f5e'],
              borderWidth: 1.5,
              borderRadius: 6
            }]
          },
          options: {
            ...baseOpts,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { color: 'rgba(51, 65, 85, 0.4)' } },
              y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(51, 65, 85, 0.4)' } }
            }
          }
        });
      }
    };

    if (!window.Chart) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
      script.onload = initCharts;
      document.body.appendChild(script);
    } else {
      initCharts();
    }
  }, [activeTab, models, categoryCounts]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
      {/* Original Header */}
      <header className="text-center mb-8 fade-up">
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent mb-3"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          AI Model Directory
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto text-sm">
          Explore {models.length} cutting-edge AI models. Click any card to inspect its full profile and context capacity.
        </p>
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span>OpenRouter Live Sync:</span>
            <strong className="text-emerald-400 font-mono font-bold">{formatSyncTime(syncMeta?.lastSynced)}</strong>
            <span className="text-slate-600">·</span>
            <span className="text-indigo-400 font-mono font-semibold">{models.length} Models Active</span>
          </span>
        </div>
      </header>

      {/* 1. ORIGINAL MODEL GRID & PROFILE LAYOUT */}
      {activeTab === 'directory' && (
        <>
          {/* Filters */}
          <div className="mb-8 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 fade-up">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 pointer-events-none">⌕</span>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search model name or developer..."
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              {/* Developer Filter */}
              <select
                value={developer}
                onChange={e => setDeveloper(e.target.value)}
                className="bg-slate-950/70 border border-slate-800 text-slate-300 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 min-w-[150px]"
              >
                {developers.map(d => <option key={d} value={d}>{d === 'All' ? 'All Developers' : d}</option>)}
              </select>
              {/* Architecture Filter */}
              <select
                value={architecture}
                onChange={e => setArchitecture(e.target.value)}
                className="bg-slate-950/70 border border-slate-800 text-slate-300 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 min-w-[150px]"
              >
                <option value="All">All Transformers</option>
                <option value="Decoder-Only">⚡ Decoder-Only</option>
                <option value="Encoder-Only">🔍 Encoder-Only</option>
                <option value="Encoder-Decoder">🔄 Encoder-Decoder</option>
              </select>
              {/* Open vs Closed Architecture Filter */}
              <select
                value={accessFilter}
                onChange={e => setAccessFilter(e.target.value)}
                className="bg-slate-950/70 border border-slate-800 text-slate-300 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 min-w-[160px]"
              >
                <option value="All">All Model Types</option>
                <option value="Open">🔓 Open-Weights Models</option>
                <option value="Closed">🔒 Closed / API Models</option>
              </select>
              {/* Context Window Filter */}
              <select
                value={contextFilter}
                onChange={e => setContextFilter(e.target.value)}
                className="bg-slate-950/70 border border-slate-800 text-slate-300 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 min-w-[160px]"
              >
                <option value="All">All Context Sizes</option>
                <option value="standard">⚡ Standard (≤ 32K)</option>
                <option value="extended">📚 Extended (64K - 200K)</option>
                <option value="massive">🚀 Massive (1M - 2M+)</option>
              </select>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                    category === cat.id
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    category === cat.id ? 'bg-white/20 text-white' : 'bg-slate-950/60 text-slate-500'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main split layout (Grid left, Sticky Profile right) */}
          <div className="flex flex-col-reverse lg:flex-row gap-6 items-start">
            {/* Grid */}
            <div className="w-full lg:w-[68%]">
              <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  {filtered.length === models.length ? `All Models (${models.length})` : `Filtered (${filtered.length})`}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-mono">Showing {Math.min(visible, filtered.length)}</span>
                  <div className="flex items-center gap-1 bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                    {[
                      { val: 'default',    label: 'Default' },
                      { val: 'score_desc', label: '↓ Score' },
                      { val: 'score_asc',  label: '↑ Score' },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => setSortBy(opt.val)}
                        className={`px-3 py-1.5 text-[11px] font-semibold transition-all ${
                          sortBy === opt.val
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] rounded-2xl border border-slate-800 text-center">
                  <span className="text-4xl mb-3">🔍</span>
                  <span className="text-slate-300 font-semibold text-sm">No models found</span>
                  <button onClick={() => { setSearch(''); setCategory('all'); setDeveloper('All'); setArchitecture('All'); setAccessFilter('All'); setContextFilter('All'); }}
                    className="mt-4 text-xs text-indigo-400 border border-indigo-500/20 px-4 py-1.5 rounded-xl hover:bg-indigo-600/10 transition-colors">
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                    {filtered.slice(0, visible).map(model => {
                      const active = selectedModel?.id === model.id;
                      const selected = isSelected(model.id);
                      const atLimit = compareList.length >= 4 && !selected;
                      return (
                        <div key={model.id}
                          onClick={() => setSelectedModel(model)}
                          className={`relative flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer border transition-all duration-200 select-none text-center group min-h-[120px] gap-2.5
                            ${selected
                              ? 'bg-indigo-950/60 border-indigo-500/70 -translate-y-1 shadow-lg shadow-indigo-600/20 ring-1 ring-indigo-500/40'
                              : active
                              ? 'bg-slate-800/90 border-indigo-500/80 -translate-y-1 shadow-xl shadow-indigo-600/15 ring-2 ring-indigo-500/50'
                              : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/40 hover:border-slate-700 hover:-translate-y-0.5'
                            }`}>
                          {/* Compare checkbox */}
                          <button
                            onClick={e => { e.stopPropagation(); if (!atLimit) toggleModel(model); }}
                            title={atLimit ? 'Max 4 models' : selected ? 'Remove from compare' : 'Add to compare'}
                            className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-md border text-[10px] flex items-center justify-center transition-all z-10
                              ${ selected
                                ? 'bg-indigo-600 border-indigo-500 text-white'
                                : atLimit
                                ? 'bg-slate-900 border-slate-700 text-slate-600 cursor-not-allowed'
                                : 'bg-slate-900/80 border-slate-700 text-slate-500 opacity-0 group-hover:opacity-100 hover:border-indigo-500 hover:text-indigo-400'
                              }`}
                          >
                            {selected ? '✓' : '+'}
                          </button>
                          <div className="group-hover:scale-105 transition-transform duration-200 mb-1">
                            <ModelIcon model={model} />
                          </div>
                          <span className="text-xs font-bold text-slate-200 group-hover:text-white line-clamp-2 leading-tight">
                            {model.name}
                          </span>
                          <span className="text-[9px] text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800/80 truncate max-w-full font-medium mt-0.5">
                            {model.developer}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {visible < filtered.length && (
                    <div className="flex justify-center mt-8">
                      <button onClick={() => setVisible(v => Math.min(v + 100, filtered.length))}
                        className="px-6 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:border-slate-600 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                        Load More
                        <span className="text-indigo-400">({filtered.length - visible} left)</span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sticky Detail Panel */}
            <div className="w-full lg:w-[32%] lg:sticky lg:top-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Model Profile</span>
                {selectedModel && (
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    Selected
                  </span>
                )}
              </div>
              {selectedModel ? (
                <div className="rounded-2xl bg-slate-900/60 border border-indigo-500/30 shadow-2xl relative overflow-hidden max-h-[calc(100vh-6rem)] overflow-y-auto">
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-tr ${selectedModel.gradient} opacity-10 blur-3xl pointer-events-none`} />

                  {/* Header */}
                  <div className="p-5 pb-4">
                    <div className="flex items-start gap-3 mb-3">
                      <ModelIcon model={selectedModel} className="w-14 h-14 shrink-0" />
                      <div className="flex-1 min-w-0">
                        {(() => {
                          const hArch = getArchitectureDetails(selectedModel);
                          return (
                            <>
                              <div className="flex flex-wrap gap-1.5 mb-1.5">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{selectedModel.category}</span>
                                {hArch && (
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold font-mono border ${hArch.badgeClass}`}>
                                    {hArch.icon} {hArch.category}
                                  </span>
                                )}
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold font-mono border ${
                                  selectedModel.arch === 'Decoder-Only'
                                    ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                                    : selectedModel.arch === 'Encoder-Decoder'
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                }`}>{selectedModel.arch}</span>
                                {selectedModel.local && (
                                  <span className="text-[10px] bg-emerald-900/40 text-emerald-400 border border-emerald-700/40 px-2 py-0.5 rounded-full">Local</span>
                                )}
                                {selectedModel.country && (
                                  <span className="text-[10px] text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded-full border border-slate-800">
                                    {selectedModel.country === 'USA' ? '🇺🇸' : selectedModel.country === 'China' ? '🇨🇳' : selectedModel.country === 'France' ? '🇫🇷' : selectedModel.country === 'Germany' ? '🇩🇪' : selectedModel.country === 'UK' ? '🇬🇧' : selectedModel.country === 'Canada' ? '🇨🇦' : selectedModel.country === 'Israel' ? '🇮🇱' : selectedModel.country === 'Japan' ? '🇯🇵' : selectedModel.country === 'South Korea' ? '🇰🇷' : '🌐'} {selectedModel.country}
                                  </span>
                                )}
                              </div>
                              <h2 className="text-base font-bold text-white leading-snug">{selectedModel.name}</h2>
                              <span className="text-xs text-slate-400">{selectedModel.developer}</span>
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Score bar */}
                    {selectedModel.score != null && (
                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Intelligence Score</span>
                          <span className="text-sm font-bold font-mono text-indigo-400">{selectedModel.score}<span className="text-slate-600 text-xs">/100</span></span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${selectedModel.gradient} transition-all duration-500`}
                            style={{ width: `${selectedModel.score}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Architecture Characteristics Box */}
                  {(() => {
                    const hArch = getArchitectureDetails(selectedModel);
                    if (!hArch) return null;
                    return (
                      <div className="border-t border-slate-800 px-4 py-3 bg-slate-950/40">
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                          <span>{hArch.icon} {hArch.title}</span>
                          <span className={hArch.category === 'Open' ? 'text-emerald-400' : 'text-blue-400'}>
                            {hArch.category === 'Open' ? 'Self-Hostable' : 'Managed API'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                          <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
                            <span className="text-slate-500 block text-[9px]">WEIGHTS</span>
                            <span className="text-slate-200">{hArch.category === 'Open' ? 'Public / Local' : 'Gated API'}</span>
                          </div>
                          <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
                            <span className="text-slate-500 block text-[9px]">PRIVACY</span>
                            <span className={hArch.category === 'Open' ? 'text-emerald-400' : 'text-slate-300'}>
                              {hArch.category === 'Open' ? 'Air-Gap Safe' : 'Provider Cloud'}
                            </span>
                          </div>
                          <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
                            <span className="text-slate-500 block text-[9px]">FINE-TUNING</span>
                            <span className="text-slate-200">{hArch.category === 'Open' ? 'Full LoRA/QLoRA' : 'Prompt / Managed'}</span>
                          </div>
                          <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
                            <span className="text-slate-500 block text-[9px]">BILLING</span>
                            <span className="text-slate-200">{hArch.category === 'Open' ? 'Zero Token Fees' : 'Per-Token API'}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Context Window & Token Capacity Section */}
                  {selectedModel.context && (
                    <div className="border-t border-slate-800 px-4 py-3 bg-indigo-950/20">
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-300 mb-1.5">
                        <span className="flex items-center gap-1"><span>📚</span> Tokens & Capacity</span>
                        <span className="text-white bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded font-mono">
                          {selectedModel.context.label} In
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono mt-1 mb-2">
                        <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
                          <span className="text-slate-500 block text-[9px]">MAX OUTPUT</span>
                          <span className="text-slate-200">{selectedModel.context.maxOutputTokens}</span>
                        </div>
                        <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
                          <span className="text-slate-500 block text-[9px]">TOKEN SPEED</span>
                          <span className="text-emerald-400">{selectedModel.context.tokenSpeed}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>Doc Capacity: <strong className="text-slate-200">{selectedModel.context.pages}</strong></span>
                        <span className="text-indigo-300 font-semibold">{selectedModel.context.needleRecall} Recall</span>
                      </div>
                    </div>
                  )}

                  {/* Minimum System & Hardware Requirements */}
                  {selectedModel.hardware && (
                    <div className="border-t border-slate-800 px-4 py-3 bg-cyan-950/20">
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 mb-1.5">
                        <span className="flex items-center gap-1"><span>🖥️</span> Min Hardware Specs</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${selectedModel.hardware.badgeClass}`}>
                          {selectedModel.hardware.badge}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono mt-1 mb-2">
                        <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
                          <span className="text-slate-500 block text-[9px]">MIN VRAM</span>
                          <span className="text-cyan-300 font-semibold">{selectedModel.hardware.minVram}</span>
                        </div>
                        <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
                          <span className="text-slate-500 block text-[9px]">SYSTEM RAM</span>
                          <span className="text-slate-200 font-semibold">{selectedModel.hardware.minRam}</span>
                        </div>
                      </div>
                      <div className="bg-slate-900/60 p-2 rounded border border-slate-800/80 text-[10px] space-y-1">
                        <div className="flex justify-between text-slate-400">
                          <span>GPU/Target:</span>
                          <span className="text-slate-200 truncate max-w-[170px]" title={selectedModel.hardware.recGpu}>{selectedModel.hardware.recGpu}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Storage:</span>
                          <span className="text-amber-400 font-mono">{selectedModel.hardware.storage}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Runtime:</span>
                          <span className="text-indigo-300 truncate max-w-[170px]" title={selectedModel.hardware.runtimeEngine}>{selectedModel.hardware.runtimeEngine}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick stats grid */}
                  <div className="grid grid-cols-2 border-t border-slate-800 divide-x divide-slate-800">
                    {[
                      { label: 'Input Tokens',  value: selectedModel.context?.maxInputTokens || '128K tokens' },
                      { label: 'Max Output',    value: selectedModel.context?.maxOutputTokens || '8,192 tokens' },
                      { label: 'Architecture',  value: selectedModel.arch || 'Decoder-Only' },
                      { label: 'Parameters',    value: selectedModel.params || '—' },
                    ].map(stat => (
                      <div key={stat.label} className="px-4 py-2.5 odd:border-b odd:border-slate-800 even:border-b even:border-slate-800 last:border-b-0 [&:nth-child(3)]:border-b-0 [&:nth-child(4)]:border-b-0">
                        <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">{stat.label}</div>
                        <div className="text-xs font-semibold text-slate-200 mt-0.5">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="border-t border-slate-800 px-4 py-3">
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-2">Pricing (per 1M tokens)</div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 rounded-xl bg-slate-950/60 border border-slate-800 px-3 py-2 text-center">
                        <div className="text-[9px] text-slate-500 mb-0.5">Input</div>
                        <div className="text-sm font-bold font-mono text-emerald-400">
                          {selectedModel.priceIn != null ? `$${selectedModel.priceIn}` : selectedModel.access === 'open' || selectedModel.access === 'free' ? 'Free' : '—'}
                        </div>
                      </div>
                      <div className="text-slate-700 text-xs">→</div>
                      <div className="flex-1 rounded-xl bg-slate-950/60 border border-slate-800 px-3 py-2 text-center">
                        <div className="text-[9px] text-slate-500 mb-0.5">Output</div>
                        <div className="text-sm font-bold font-mono text-amber-400">
                          {selectedModel.priceOut != null ? `$${selectedModel.priceOut}` : selectedModel.access === 'open' || selectedModel.access === 'free' ? 'Free' : '—'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Overview */}
                  <div className="border-t border-slate-800 px-4 py-3">
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Overview</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{selectedModel.description}</p>
                  </div>

                  {/* Pipeline preview */}
                  <div className="border-t border-slate-800 px-4 py-3">
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Pipeline Preview</div>
                    <CategoryVisualMockup category={selectedModel.category} modelName={selectedModel.name} />
                  </div>

                  {/* Key features */}
                  <div className="border-t border-slate-800 px-4 py-3">
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Key Features</div>
                    <ul className="space-y-1.5">
                      {selectedModel.features?.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-slate-300">
                          <span className="text-indigo-400 mt-0.5 shrink-0">✦</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-slate-800 px-4 py-2.5 flex justify-between text-[9px] font-mono text-slate-600">
                    <span>ID: {String(selectedModel.id).padStart(4, '0')}</span>
                    <span className="text-emerald-600">● READY</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-900/30 border border-slate-800 p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
                  <span className="text-3xl mb-3">✦</span>
                  <span className="text-sm font-semibold text-slate-400">Click a model card</span>
                  <p className="text-xs text-slate-500 mt-1">to inspect its full profile & context capacity</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* NEW: TOP MODELS BY TASK TAB */}
      {activeTab === 'tasks' && (
        <TopModelsByTask />
      )}

      {/* 2. MARKET ANALYTICS & CHARTS TAB */}
      {activeTab === 'charts' && (
        <div className="space-y-6 fade-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { icon: '🤖', num: categoryCounts.llm || 0, label: 'LLMs' },
              { icon: '🧩', num: categoryCounts.multi || 0, label: 'Multimodal' },
              { icon: '🎨', num: categoryCounts.image || 0, label: 'Image Gen' },
              { icon: '🎬', num: categoryCounts.video || 0, label: 'Video Gen' },
              { icon: '🔊', num: categoryCounts.audio || 0, label: 'Audio / TTS' },
              { icon: '💻', num: categoryCounts.code || 0, label: 'Code' },
              { icon: '🔍', num: categoryCounts.search || 0, label: 'Search' },
              { icon: '🧠', num: categoryCounts.reason || 0, label: 'Reasoning' },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800 text-center">
                <div className="text-lg mb-1">{item.icon}</div>
                <div className="text-lg font-bold font-mono text-white">{item.num}</div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Model Distribution by Category</h3>
              <div className="h-64 relative"><canvas ref={catChartRef} /></div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Models by Top Producer</h3>
              <div className="h-64 relative"><canvas ref={producerChartRef} /></div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Country of Origin</h3>
              <div className="h-64 relative"><canvas ref={countryChartRef} /></div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Licensing & Access Model</h3>
              <div className="h-64 relative"><canvas ref={accessChartRef} /></div>
            </div>
          </div>
        </div>
      )}

      {/* 3. RANKINGS & BENCHMARKS TAB */}
      {activeTab === 'rankings' && (
        <div className="space-y-8 fade-up">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Frontier Benchmark Matrix</h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40">
              <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                <thead className="bg-slate-950 text-[10px] uppercase font-mono tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Model</th>
                    <th className="p-3.5">Producer</th>
                    <th className="p-3.5">MMLU-Pro</th>
                    <th className="p-3.5">HumanEval</th>
                    <th className="p-3.5">MATH</th>
                    <th className="p-3.5">GPQA</th>
                    <th className="p-3.5">MT-Bench</th>
                    <th className="p-3.5">Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {BENCHMARKS.map((b, i) => (
                    <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 font-bold text-white">{b[0]}</td>
                      <td className="p-3.5 text-slate-400">{b[1]}</td>
                      <td className="p-3.5 font-mono text-emerald-400 font-bold">{b[2]}%</td>
                      <td className="p-3.5 font-mono text-emerald-400 font-bold">{b[3]}%</td>
                      <td className="p-3.5 font-mono text-amber-400 font-semibold">{b[4]}%</td>
                      <td className="p-3.5 font-mono text-amber-400 font-semibold">{b[5]}%</td>
                      <td className="p-3.5 font-mono text-indigo-400 font-bold">{b[6]}</td>
                      <td className="p-3.5 font-mono text-slate-300">{b[7]}K</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(RANKINGS).map(([catKey, list]) => {
              const meta = {
                llm:    { title: 'Top LLM / Reasoning', subtitle: 'Ranked by MMLU-Pro, reasoning, knowledge', icon: '💬' },
                image:  { title: 'Top Image Generation', subtitle: 'Ranked by prompt fidelity, aesthetics, speed', icon: '🖼️' },
                video:  { title: 'Top Video Generation', subtitle: 'Ranked by motion consistency, physics, realism', icon: '🎬' },
                code:   { title: 'Top Code & Software Agents', subtitle: 'Ranked by HumanEval, SWE-bench, refactoring', icon: '💻' },
                audio:  { title: 'Top Audio / TTS', subtitle: 'Ranked by naturalness, latency, voice options', icon: '🔊' },
                search: { title: 'Top Search / Research', subtitle: 'Ranked by accuracy, source citation, depth', icon: '🔍' },
              }[catKey] || { title: `Top ${catKey.toUpperCase()}`, subtitle: '', icon: '🏆' };

              return (
                <div key={catKey} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-base">{meta.icon}</span>
                    <h3 className="text-sm font-bold text-white tracking-tight">{meta.title}</h3>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-4 font-mono">{meta.subtitle}</p>

                  {/* Header row */}
                  <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-wider text-slate-500 pb-2 mb-2 border-b border-slate-800/80 px-1">
                    <div className="flex items-center gap-6">
                      <span>RANK</span>
                      <span>MODEL</span>
                    </div>
                    <span>SCORE</span>
                  </div>

                  <div className="space-y-2">
                    {list.map((r, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs hover:border-slate-700 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono font-bold text-slate-500 w-4 text-center">{i + 1}</span>
                          <div className="w-7 h-7 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-[10px] font-bold font-mono text-indigo-300 flex items-center justify-center shrink-0" style={{ backgroundColor: `${r[3]}20`, color: r[3], borderColor: `${r[3]}40` }}>
                            {r[4] || r[0].substring(0, 2).toUpperCase()}
                          </div>
                          <div className="truncate">
                            <span className="font-bold text-white block truncate">{r[0]}</span>
                            <span className="text-[10px] text-slate-500">{r[1]}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div className="h-full rounded-full bg-indigo-500" style={{ width: `${r[2]}%` }} />
                          </div>
                          <span className="font-mono font-bold text-slate-200 text-xs w-6 text-right">{r[2]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. GEOGRAPHIC ORIGINS & COMPLIANCE TAB */}
      {activeTab === 'origins' && (
        <div className="space-y-8 fade-up">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Geographic Ecosystems</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {COUNTRIES.map((c) => (
                <div key={c.name} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="text-3xl mb-2">{c.flag}</div>
                  <h3 className="text-sm font-bold text-white">{c.name}</h3>
                  <div className="text-xs text-slate-400 font-mono mb-2">{c.count} models ({c.share}%)</div>
                  <div className="text-xs text-slate-400 mb-2 leading-relaxed"><strong className="text-slate-200">Key Companies:</strong> {c.companies}</div>
                  <div className="text-xs text-indigo-400 font-semibold">{c.strategy}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. ENTERPRISE CLIENTS DEPLOYMENTS TAB */}
      {activeTab === 'clients' && (
        <div className="space-y-4 fade-up">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Enterprise Model Adoption</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[600px] overflow-y-auto pr-2">
            {CLIENTS.map((c, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800">
                <span className="font-mono text-[10px] text-slate-500">#{i + 1}</span>
                <h4 className="text-xs font-bold text-white mb-1">{c[0]}</h4>
                <p className="text-[11px] text-slate-400 mb-2">{c[1]}</p>
                <span className="text-[10px] font-mono text-indigo-400 font-bold block">{c[2]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
        <span>© 2026 AI Model Directory</span>
        <div className="flex items-center gap-2 font-mono text-[11px] flex-wrap justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          <span>Last updated from OpenRouter: <strong className="text-slate-200">{formatSyncTime(syncMeta?.lastSynced)}</strong></span>
          <span className="text-slate-700">·</span>
          <span className="text-indigo-400 font-semibold">{models.length} models verified</span>
        </div>
      </footer>

      {/* ── Floating Compare Tray ── */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/95 border border-indigo-500/40 shadow-2xl backdrop-blur-xl">
          <span className="text-xs font-bold text-indigo-400 mr-1">⚖ Compare</span>
          {compareList.map(m => (
            <div key={m.id} className="flex items-center gap-2 bg-slate-800 rounded-xl px-2 py-1 border border-slate-700">
              <ModelIcon model={m} className="w-6 h-6" />
              <span className="text-xs font-semibold text-slate-200 max-w-[80px] truncate">{m.name}</span>
              <button onClick={() => toggleModel(m)} className="text-slate-500 hover:text-red-400 text-xs ml-1">✕</button>
            </div>
          ))}
          {compareList.length < 4 && (
            <span className="text-[10px] text-slate-500 italic">{4 - compareList.length} more…</span>
          )}
          <button
            onClick={() => setShowPanel(true)}
            disabled={compareList.length < 2}
            className="ml-2 px-4 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20"
          >
            Compare Now →
          </button>
        </div>
      )}
    </div>
  );
}
