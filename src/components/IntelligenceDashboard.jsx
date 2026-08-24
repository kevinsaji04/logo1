'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import ModelDetailModal from '@/components/ModelDetailModal';
import DeveloperIcon from '@/components/DeveloperIcon';
import CategoryBadge from '@/components/CategoryBadge';
import {
  RAW_MODELS,
  RANKINGS,
  COUNTRIES,
  CLIENTS,
  BENCHMARKS,
  COMPLIANCE,
  CAT_MAP,
  CAT_TAG,
  COUNTRY_FLAG
} from '@/data/intelligence_data';

export default function IntelligenceDashboard() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tableSearch, setTableSearch] = useState('');
  const [selectedModel, setSelectedModel] = useState(null);
  const [visibleCount, setVisibleCount] = useState(48);

  // Filtered models for Category Grid
  const filteredGridModels = useMemo(() => {
    return RAW_MODELS.filter((m) => {
      const [id, name, producer, cat, country, released, params, access, priceIn, priceOut, local, score, desc, tags] = m;
      
      if (selectedCat !== 'all' && cat !== selectedCat && !tags.includes(selectedCat)) return false;
      
      if (filterType === 'free' && access !== 'open' && access !== 'free') return false;
      if (filterType === 'local' && !local) return false;
      if (filterType === 'us' && country !== 'USA') return false;
      if (filterType === 'cn' && country !== 'China') return false;
      if (filterType === 'eu' && !['France', 'Germany', 'UK', 'Spain'].includes(country)) return false;
      
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!name.toLowerCase().includes(q) && !producer.toLowerCase().includes(q)) return false;
      }
      
      return true;
    });
  }, [selectedCat, filterType, searchQuery]);

  // Filtered models for Full Register Table
  const filteredTableModels = useMemo(() => {
    if (!tableSearch.trim()) return RAW_MODELS;
    const q = tableSearch.toLowerCase();
    return RAW_MODELS.filter((m) => {
      const [id, name, producer, cat, country] = m;
      return name.toLowerCase().includes(q) || producer.toLowerCase().includes(q) || country.toLowerCase().includes(q);
    });
  }, [tableSearch]);

  // Chart Canvas References
  const catChartRef = useRef(null);
  const producerChartRef = useRef(null);
  const countryChartRef = useRef(null);
  const accessChartRef = useRef(null);

  useEffect(() => {
    const initCharts = () => {
      if (!window.Chart) return;

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#94a3b8', font: { family: 'var(--font-inter)', size: 11 } }
          }
        }
      };

      // 1. Category Chart
      if (catChartRef.current) {
        if (catChartRef.current._chartInstance) catChartRef.current._chartInstance.destroy();
        catChartRef.current._chartInstance = new window.Chart(catChartRef.current, {
          type: 'doughnut',
          data: {
            labels: ['LLM', 'Image Gen', 'Video', 'Audio/TTS', 'Code', 'Search', 'Reasoning', 'Multimodal', 'Other'],
            datasets: [{
              data: [127, 72, 54, 28, 31, 22, 18, 18, 13],
              backgroundColor: ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6', '#fbbf24', '#f97316', '#64748b'],
              borderColor: '#0f172a',
              borderWidth: 2
            }]
          },
          options: { ...chartOptions, plugins: { legend: { display: false } } }
        });
      }

      // 2. Producer Chart
      if (producerChartRef.current) {
        if (producerChartRef.current._chartInstance) producerChartRef.current._chartInstance.destroy();
        producerChartRef.current._chartInstance = new window.Chart(producerChartRef.current, {
          type: 'bar',
          data: {
            labels: ['OpenAI', 'Kling', 'Qwen', 'Google', 'DeepSeek', 'GLM', 'MiniMax', 'ByteDance', 'Mistral', 'Anthropic'],
            datasets: [{
              label: 'Models Cataloged',
              data: [58, 24, 22, 21, 16, 12, 11, 10, 9, 8],
              backgroundColor: 'rgba(99, 102, 241, 0.4)',
              borderColor: '#6366f1',
              borderWidth: 1.5,
              borderRadius: 6
            }]
          },
          options: {
            ...chartOptions,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { color: 'rgba(51, 65, 85, 0.4)' } },
              y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(51, 65, 85, 0.4)' } }
            }
          }
        });
      }

      // 3. Country Chart
      if (countryChartRef.current) {
        if (countryChartRef.current._chartInstance) countryChartRef.current._chartInstance.destroy();
        countryChartRef.current._chartInstance = new window.Chart(countryChartRef.current, {
          type: 'doughnut',
          data: {
            labels: ['USA 🇺🇸', 'China 🇨🇳', 'Germany 🇩🇪', 'France 🇫🇷', 'UK 🇬🇧', 'Canada 🇨🇦', 'Israel 🇮🇱', 'Other'],
            datasets: [{
              data: [198, 144, 12, 15, 7, 5, 4, 3],
              backgroundColor: ['#10b981', '#f43f5e', '#f59e0b', '#3b82f6', '#8b5cf6', '#f97316', '#14b8a6', '#64748b'],
              borderColor: '#0f172a',
              borderWidth: 2
            }]
          },
          options: {
            ...chartOptions,
            plugins: { legend: { position: 'right', labels: { color: '#94a3b8', font: { size: 10 } } } }
          }
        });
      }

      // 4. Access Chart
      if (accessChartRef.current) {
        if (accessChartRef.current._chartInstance) accessChartRef.current._chartInstance.destroy();
        accessChartRef.current._chartInstance = new window.Chart(accessChartRef.current, {
          type: 'bar',
          data: {
            labels: ['Open Source', 'Free', 'Freemium', 'API Paid', 'Paid Sub', 'Enterprise'],
            datasets: [{
              data: [60, 18, 78, 142, 38, 47],
              backgroundColor: [
                'rgba(16, 185, 129, 0.4)',
                'rgba(20, 184, 166, 0.4)',
                'rgba(245, 158, 11, 0.4)',
                'rgba(99, 102, 241, 0.4)',
                'rgba(244, 63, 94, 0.4)',
                'rgba(249, 115, 22, 0.4)'
              ],
              borderColor: ['#10b981', '#14b8a6', '#f59e0b', '#6366f1', '#f43f5e', '#f97316'],
              borderWidth: 1.5,
              borderRadius: 6
            }]
          },
          options: {
            ...chartOptions,
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
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200 selection:bg-indigo-500 selection:text-white pb-20">
      
      {/* Premium Glass Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#0b0f19]/80 backdrop-blur-xl border-b border-slate-800/80 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="font-extrabold text-base tracking-tight text-white" style={{ fontFamily: 'var(--font-outfit)' }}>
            NextGen AI Intelligence
          </span>
          <span className="text-[10px] font-mono font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full hidden sm:inline-block">
            383 Models Cataloged
          </span>
        </div>

        <div className="flex items-center gap-3">
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-400">
            <a href="#overview" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors">Overview</a>
            <a href="#categories" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors">Categories</a>
            <a href="#register" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors">Register</a>
            <a href="#rankings" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors">Rankings</a>
            <a href="#origins" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors">Origins</a>
            <a href="#benchmarks" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors">Benchmarks</a>
          </nav>

          <Link
            href="/tree"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/30 text-emerald-400 hover:border-emerald-500/60 text-xs font-bold transition-all shadow-lg shadow-emerald-500/5"
          >
            <span>🌳</span> AI Lineage Tree →
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-12 pb-10 text-center relative overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 blur-[120px] pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6">
          ✦ AI Intelligence Repository · 383 Frontier Models
        </div>

        <h1
          className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent mb-4 max-w-4xl mx-auto leading-tight"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          Explore the Full Directory of AI Intelligence
        </h1>

        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-10">
          Interactive classification, benchmark evaluation, licensing tier breakdown, and country origin analysis across {RAW_MODELS.length} cutting-edge language, vision, video, and audio models.
        </p>

        {/* Big Stat Counter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto">
          {[
            { label: 'Total Models', num: String(RAW_MODELS.length), color: 'from-indigo-500 to-purple-500' },
            { label: 'Categories', num: '14', color: 'from-purple-500 to-pink-500' },
            { label: 'Producers', num: '24+', color: 'from-cyan-500 to-blue-500' },
            { label: 'Countries', num: '12+', color: 'from-amber-500 to-orange-500' },
            { label: 'Free Access', num: '~60%', color: 'from-emerald-500 to-teal-500' },
          ].map((s, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl text-center group hover:border-slate-700 transition-all"
            >
              <div
                className={`text-2xl sm:text-3xl font-extrabold font-mono bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}
              >
                {s.num}
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 space-y-16">

        {/* SECTION 01: Market Overview & Charts */}
        <section id="overview" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              01
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
              Market Overview & Intelligence Distribution
            </h2>
          </div>

          {/* Quick Category Metric Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { icon: '🤖', num: 127, label: 'LLM Models' },
              { icon: '🎨', num: 72, label: 'Image Gen' },
              { icon: '🎬', num: 54, label: 'Video Gen' },
              { icon: '🔊', num: 28, label: 'Audio / TTS' },
              { icon: '💻', num: 31, label: 'Code / Dev' },
              { icon: '🔍', num: 22, label: 'Search' },
              { icon: '🧩', num: 18, label: 'Multimodal' },
              { icon: '📐', num: 11, label: 'Specialty' },
            ].map((m, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center">
                <div className="text-xl mb-1">{m.icon}</div>
                <div className="text-lg font-bold font-mono text-white">{m.num}</div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase">{m.label}</div>
              </div>
            ))}
          </div>

          {/* 4 Interactive Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-xl">
              <h3 className="text-sm font-bold text-white mb-1">Model Distribution by Category</h3>
              <p className="text-xs text-slate-400 mb-4">Breakdown across 14 specialized functional categories</p>
              <div className="h-64 relative"><canvas ref={catChartRef} /></div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-xl">
              <h3 className="text-sm font-bold text-white mb-1">Models by Top Producer</h3>
              <p className="text-xs text-slate-400 mb-4">OpenAI leads with 58 variants, followed by Kling and Qwen</p>
              <div className="h-64 relative"><canvas ref={producerChartRef} /></div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-xl">
              <h3 className="text-sm font-bold text-white mb-1">Country of Origin Share</h3>
              <p className="text-xs text-slate-400 mb-4">USA and China account for ~88% of all surveyed models</p>
              <div className="h-64 relative"><canvas ref={countryChartRef} /></div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-xl">
              <h3 className="text-sm font-bold text-white mb-1">Access & Licensing Model</h3>
              <p className="text-xs text-slate-400 mb-4">Open-source vs API-paid vs Freemium tiers</p>
              <div className="h-64 relative"><canvas ref={accessChartRef} /></div>
            </div>
          </div>
        </section>

        {/* SECTION 02: Category Deep-Dive & Model Cards */}
        <section id="categories" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              02
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
              Category Deep-Dive & Model Catalog
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All', count: 383 },
              { id: 'llm', label: 'LLM', count: 127 },
              { id: 'image', label: 'Image Gen', count: 72 },
              { id: 'video', label: 'Video', count: 54 },
              { id: 'audio', label: 'Audio/TTS', count: 28 },
              { id: 'code', label: 'Code', count: 31 },
              { id: 'search', label: 'Search', count: 22 },
              { id: 'reason', label: 'Reasoning', count: 18 },
              { id: 'multi', label: 'Multimodal', count: 18 },
              { id: 'tool', label: 'Tools', count: 13 },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                  selectedCat === cat.id
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                {cat.label}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  selectedCat === cat.id ? 'bg-white/20 text-white' : 'bg-slate-950/60 text-slate-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search & Filter Pill Controls */}
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 text-xs">⌕</span>
              <input
                type="text"
                placeholder="Search model name or developer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {[
                { id: 'all', label: 'All Tiers' },
                { id: 'free', label: 'Free / Open' },
                { id: 'local', label: 'Runs Locally' },
                { id: 'us', label: '🇺🇸 USA' },
                { id: 'cn', label: '🇨🇳 China' },
                { id: 'eu', label: '🇪🇺 EU' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    filterType === f.id
                      ? 'bg-indigo-600/30 text-indigo-400 border-indigo-500/50'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Model Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGridModels.slice(0, visibleCount).map((m, idx) => {
              const [id, name, producer, cat, country, released, params, access, priceIn, priceOut, local, score, desc, tags, color, letter] = m;
              const flag = COUNTRY_FLAG[country] || '🌐';
              const priceStr = priceIn ? `$${priceIn}/$${priceOut}` : (access === 'open' || access === 'free' ? 'Free' : 'Contact');

              return (
                <div
                  key={id}
                  onClick={() => setSelectedModel(m)}
                  className="group relative p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/50 hover:-translate-y-1 transition-all duration-200 cursor-pointer select-none flex flex-col justify-between"
                >
                  {/* Rank Badge */}
                  <div className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-[9px] ${
                    idx === 0 ? 'bg-amber-400 text-black' : idx === 1 ? 'bg-slate-300 text-black' : idx === 2 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {idx < 3 ? idx + 1 : id}
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shadow-md flex-shrink-0"
                        style={{ backgroundColor: `${color}22`, color: color }}
                      >
                        {letter}
                      </div>
                      <div className="min-w-0 flex-1 pr-4">
                        <h3 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
                          {name}
                        </h3>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                          <span>{flag}</span> {producer}
                        </span>
                      </div>
                    </div>

                    {/* Functional Tag Badges */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {tags.slice(0, 3).map((t) => (
                        <span key={t} className={`tag ${CAT_TAG[t] || 'tag-tool'}`}>
                          {t.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hardware & Pricing Metadata Footer */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] pt-3 border-t border-slate-800/80">
                    <div>
                      <span className="text-slate-500 block">Released</span>
                      <span className="font-mono text-slate-300">{released}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Params</span>
                      <span className="font-mono font-semibold text-indigo-400">{params}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Pricing</span>
                      <span className={`font-mono font-semibold ${access === 'open' || access === 'free' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {priceStr}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Execution</span>
                      <span className={local ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
                        {local ? '✓ Local' : 'Cloud'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredGridModels.length && (
            <div className="flex justify-center pt-6">
              <button
                onClick={() => setVisibleCount((v) => v + 48)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:border-slate-600 transition-colors flex items-center gap-2"
              >
                Load More Models
                <span className="text-indigo-400 font-mono">({filteredGridModels.length - visibleCount} remaining)</span>
              </button>
            </div>
          )}
        </section>

        {/* SECTION 03: Complete Model Register Table */}
        <section id="register" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
                Complete Model Register
              </h2>
            </div>

            <input
              type="text"
              placeholder="Filter register table..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-full sm:w-64"
            />
          </div>

          <div className="max-h-[500px] overflow-y-auto rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-900 sticky top-0 z-10 text-[10px] uppercase font-mono tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3.5">#</th>
                  <th className="p-3.5">Model</th>
                  <th className="p-3.5">Producer</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Country</th>
                  <th className="p-3.5">Released</th>
                  <th className="p-3.5">Parameters</th>
                  <th className="p-3.5">Pricing</th>
                  <th className="p-3.5">Execution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredTableModels.map((m) => {
                  const [id, name, producer, cat, country, released, params, access, priceIn, priceOut, local, score, desc, tags, color, letter] = m;
                  const flag = COUNTRY_FLAG[country] || '🌐';
                  const priceStr = priceIn ? `$${priceIn} / $${priceOut}` : (access === 'open' || access === 'free' ? 'Free' : '—');

                  return (
                    <tr
                      key={id}
                      onClick={() => setSelectedModel(m)}
                      className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <td className="p-3.5 font-mono text-slate-500">{id}</td>
                      <td className="p-3.5 font-bold text-white flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-[9px]"
                          style={{ backgroundColor: `${color}22`, color: color }}
                        >
                          {letter}
                        </div>
                        {name}
                      </td>
                      <td className="p-3.5 text-slate-300">{producer}</td>
                      <td className="p-3.5">
                        <span className={`tag ${CAT_TAG[cat] || 'tag-tool'}`}>
                          {CAT_MAP[cat] || cat}
                        </span>
                      </td>
                      <td className="p-3.5">{flag} {country}</td>
                      <td className="p-3.5 font-mono text-slate-400">{released}</td>
                      <td className="p-3.5 font-mono text-indigo-400 font-bold">{params}</td>
                      <td className="p-3.5 font-mono text-emerald-400">{priceStr}</td>
                      <td className="p-3.5">{local ? <span className="text-emerald-400 font-bold">✓ Local</span> : <span className="text-slate-500">Cloud</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 04: Category Rankings Leaderboards */}
        <section id="rankings" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              04
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
              Vertical Category Leaderboards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(RANKINGS).map(([catKey, list]) => (
              <div key={catKey} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-xl">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span>{catKey === 'llm' ? '🤖' : catKey === 'image' ? '🎨' : catKey === 'video' ? '🎬' : '💻'}</span>
                  Top {catKey.toUpperCase()} Models
                </h3>
                <div className="space-y-2">
                  {list.map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60 text-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-mono font-bold text-slate-500 w-4">{i + 1}</span>
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold"
                          style={{ backgroundColor: `${r[3]}22`, color: r[3] }}
                        >
                          {r[4]}
                        </div>
                        <div className="truncate">
                          <span className="font-bold text-white block truncate">{r[0]}</span>
                          <span className="text-[10px] text-slate-500">{r[1]}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 font-mono font-bold text-indigo-400">
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                            style={{ width: `${r[2]}%` }}
                          />
                        </div>
                        <span>{r[2]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 05: Country of Origin Analysis */}
        <section id="origins" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              05
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
              Geographic & Sovereign AI Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COUNTRIES.map((c) => (
              <div key={c.name} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
                <div className="text-3xl mb-2">{c.flag}</div>
                <h3 className="text-base font-bold text-white">{c.name}</h3>
                <div className="text-xs text-slate-400 mb-3 font-mono">{c.count} models · {c.share}% share</div>
                <div className="text-xs text-slate-400 mb-2 leading-relaxed"><strong className="text-slate-200">Ecosystem:</strong> {c.companies}</div>
                <div className="text-xs text-indigo-400 font-semibold">{c.strategy}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 06: Enterprise Benchmark Matrix */}
        <section id="benchmarks" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              06
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
              Frontier Benchmark Matrix
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl">
            <table className="w-full text-left text-xs border-collapse min-w-[700px]">
              <thead className="bg-slate-900 text-[10px] uppercase font-mono tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Model</th>
                  <th className="p-3.5">Producer</th>
                  <th className="p-3.5">MMLU-Pro</th>
                  <th className="p-3.5">HumanEval</th>
                  <th className="p-3.5">MATH</th>
                  <th className="p-3.5">GPQA</th>
                  <th className="p-3.5">MT-Bench</th>
                  <th className="p-3.5">Context Window</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {BENCHMARKS.map((b, i) => (
                  <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3.5 font-bold text-white">{b[0]}</td>
                    <td className="p-3.5 text-slate-400">{b[1]}</td>
                    <td className="p-3.5 font-mono text-emerald-400 font-bold">{b[2]}%</td>
                    <td className="p-3.5 font-mono text-emerald-400 font-bold">{b[3]}%</td>
                    <td className="p-3.5 font-mono text-amber-400 font-semibold">{b[4]}%</td>
                    <td className="p-3.5 font-mono text-amber-400 font-semibold">{b[5]}%</td>
                    <td className="p-3.5 font-mono text-indigo-400 font-bold">{b[6]}</td>
                    <td className="p-3.5 font-mono text-slate-300">{b[7]}K tokens</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 07: Enterprise Adoption & Compliance */}
        <section id="compliance" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              07
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
              Compliance & Security Frameworks
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {COMPLIANCE.map((c, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
                <div className="text-2xl mb-2">{c.icon}</div>
                <h3 className="text-xs font-bold text-white mb-0.5">{c.name}</h3>
                <div className="text-[10px] text-slate-500 font-mono uppercase mb-2">{c.org}</div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{c.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {c.models.map((m) => (
                    <span key={m} className="px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[9px] text-slate-300 font-mono">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Model Detail Popup Modal */}
      {selectedModel && (
        <ModelDetailModal
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
        />
      )}
    </div>
  );
}
