'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import DeveloperIcon from '@/components/DeveloperIcon';
import CategoryBadge from '@/components/CategoryBadge';
import ModelDetailModal from '@/components/ModelDetailModal';
import { useCompare } from '@/context/CompareContext';
import { AI_DECISION_TREE } from '@/data/ai_decision_tree';
import { RAW_MODELS, COUNTRY_FLAG } from '@/data/intelligence_data';

export default function ModelDecisionTree() {
  const [history, setHistory] = useState([AI_DECISION_TREE.startNodeId]);
  const [pathBreadcrumbs, setPathBreadcrumbs] = useState([]);
  const [activeModalModel, setActiveModalModel] = useState(null);
  const [copiedToast, setCopiedToast] = useState(false);

  const { compareList, addToCompare, removeFromCompare } = useCompare();

  // Index RAW_MODELS by ID for instant retrieval
  const modelsMap = useMemo(() => {
    const map = new Map();
    RAW_MODELS.forEach((m) => {
      map.set(m[0], m); // m[0] is id
    });
    return map;
  }, []);

  const currentNodeId = history[history.length - 1];
  const currentNode = AI_DECISION_TREE.nodes[currentNodeId];

  // Handle option selection
  const handleSelectOption = (option) => {
    const nextHistory = [...history, option.nextNodeId];
    const nextCrumbs = [
      ...pathBreadcrumbs,
      {
        stepName: currentNode.stepName || `Step ${history.length}`,
        label: option.label,
        nodeId: currentNode.id,
      },
    ];

    setHistory(nextHistory);
    setPathBreadcrumbs(nextCrumbs);
  };

  // Backtrack to a specific history index
  const handleJumpToStep = (index) => {
    if (index < history.length - 1) {
      setHistory(history.slice(0, index + 1));
      setPathBreadcrumbs(pathBreadcrumbs.slice(0, index));
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
      setPathBreadcrumbs(pathBreadcrumbs.slice(0, -1));
    }
  };

  const handleReset = () => {
    setHistory([AI_DECISION_TREE.startNodeId]);
    setPathBreadcrumbs([]);
  };

  const isQuestion = currentNode?.type === 'question';
  const isResult = currentNode?.type === 'result';

  // Calculate progress estimation
  const totalEstimatedSteps = 3;
  const currentStepNum = history.length;
  const progressPercent = isResult ? 100 : Math.min(Math.round((currentStepNum / totalEstimatedSteps) * 100), 85);

  // Retrieve recommended models objects
  const recommendedModels = useMemo(() => {
    if (!isResult || !currentNode.recommendedModelIds) return [];
    return currentNode.recommendedModelIds
      .map((id) => modelsMap.get(id))
      .filter(Boolean);
  }, [isResult, currentNode, modelsMap]);

  // Copy recommendation summary
  const handleCopySummary = () => {
    if (!isResult) return;
    const modelNames = recommendedModels.map((m) => m[1]).join(', ');
    const summaryText = `AI Model Decision Result:\nArchitecture: ${currentNode.title}\nRecommended Models: ${modelNames}\nReason: ${currentNode.subtitle}\nPath: ${pathBreadcrumbs.map((c) => c.label).join(' -> ')}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  if (!currentNode) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="bg-[#111520] border border-red-500/30 p-8 rounded-2xl text-center max-w-md">
          <p className="text-red-400 font-semibold mb-4">Navigation Node Not Found</p>
          <button
            onClick={handleReset}
            className="px-5 py-2.5 bg-[#6378ff] hover:bg-[#5264e6] text-white text-sm font-semibold rounded-xl transition"
          >
            Restart Decision Tree
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0d14] text-[#e8ecf4] py-10 px-4 md:px-8">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#6378ff]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-emerald-500/05 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Title & Subtitle */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6378ff]/10 border border-[#6378ff]/25 text-[#6378ff] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>🎯</span> Interactive Model Selector
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            AI Model Decision Tree
          </h1>
          <p className="text-sm md:text-base text-[#8a94b0] mt-2 max-w-xl mx-auto">
            Navigate through requirements and constraints to match the optimal AI models across our 383-model directory.
          </p>
        </div>

        {/* Wizard Container Card */}
        <div className="bg-[#111520]/90 backdrop-blur-xl border border-[#6378ff]/20 rounded-2xl shadow-2xl overflow-hidden">
          {/* Top Control Bar */}
          <div className="px-6 py-4 bg-[#0e121c]/80 border-b border-[#6378ff]/15 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {history.length > 1 && (
                <button
                  onClick={handleBack}
                  className="px-3 py-1.5 text-xs font-semibold text-[#8a94b0] hover:text-white bg-[#1a2035] hover:bg-[#222a44] border border-[#6378ff]/20 rounded-lg transition-all flex items-center gap-1.5"
                >
                  <span>←</span> Back
                </button>
              )}
              <span className="text-xs font-mono font-bold tracking-wider text-[#6378ff]">
                {isQuestion ? `STEP ${history.length} OF ~3` : '🎯 RECOMMENDATION'}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Progress bar */}
              <div className="flex items-center gap-2">
                <div className="w-24 md:w-36 h-2 bg-[#1a2035] rounded-full overflow-hidden border border-[#6378ff]/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#6378ff] to-emerald-400 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-[#8a94b0]">{progressPercent}%</span>
              </div>

              <button
                onClick={handleReset}
                className="text-xs text-[#8a94b0] hover:text-white transition underline underline-offset-4"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Breadcrumb Trail */}
          {pathBreadcrumbs.length > 0 && (
            <div className="px-6 py-2.5 bg-[#0a0d14]/40 border-b border-[#6378ff]/10 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[#5a6280] font-mono text-[10px] uppercase mr-1">Path:</span>
              <button
                onClick={() => handleJumpToStep(0)}
                className="text-[#8a94b0] hover:text-white hover:underline transition"
              >
                Start
              </button>
              {pathBreadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-[#5a6280]">/</span>
                  <button
                    onClick={() => handleJumpToStep(idx + 1)}
                    className={`px-2 py-0.5 rounded transition ${
                      idx === pathBreadcrumbs.length - 1
                        ? 'text-emerald-400 bg-emerald-500/10 font-semibold'
                        : 'text-[#8a94b0] hover:text-white hover:bg-[#1a2035]'
                    }`}
                  >
                    {crumb.label}
                  </button>
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Main Body */}
          <div className="p-6 md:p-8">
            {isQuestion && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {currentNode.title}
                  </h2>
                  {currentNode.subtitle && (
                    <p className="text-sm text-[#8a94b0] mt-1">
                      {currentNode.subtitle}
                    </p>
                  )}
                </div>

                {/* Question Option Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {currentNode.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option)}
                      className="w-full text-left p-4 rounded-xl border border-[#6378ff]/15 bg-[#0a0d14]/60 hover:bg-[#1a2035]/70 hover:border-[#6378ff]/50 hover:shadow-[0_0_20px_rgba(99,120,255,0.15)] transition-all duration-200 group flex items-start space-x-3.5 cursor-pointer relative"
                    >
                      {option.icon && (
                        <div className="text-2xl p-2.5 bg-[#1a2035]/80 border border-[#6378ff]/20 rounded-xl group-hover:scale-110 group-hover:border-[#6378ff]/50 transition-all flex-shrink-0">
                          {option.icon}
                        </div>
                      )}
                      <div className="flex-1 pr-4">
                        <div className="font-bold text-sm md:text-base text-white group-hover:text-[#6378ff] transition-colors leading-snug">
                          {option.label}
                        </div>
                        {option.description && (
                          <p className="text-xs text-[#8a94b0] mt-1 leading-relaxed">
                            {option.description}
                          </p>
                        )}
                      </div>
                      <div className="text-[#6378ff] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all self-center text-lg font-bold">
                        →
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isResult && (
              <div className="space-y-6">
                {/* Result Header */}
                <div>
                  {currentNode.badge && (
                    <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 rounded-full mb-3">
                      {currentNode.badge}
                    </span>
                  )}
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    {currentNode.title}
                  </h2>
                  {currentNode.subtitle && (
                    <p className="text-sm md:text-base font-medium text-[#8a94b0] mt-1">
                      {currentNode.subtitle}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="bg-[#0a0d14]/60 p-4 rounded-xl border border-[#6378ff]/15">
                  <p className="text-xs md:text-sm text-[#ccd3e3] leading-relaxed">
                    {currentNode.description}
                  </p>
                </div>

                {/* Key Strengths & Deploy Advice Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentNode.keyStrengths && (
                    <div className="bg-[#0e121c] p-4 rounded-xl border border-[#6378ff]/10">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#6378ff] mb-2.5 flex items-center gap-1.5">
                        <span>⚡</span> Key Architectural Strengths
                      </h4>
                      <ul className="space-y-2">
                        {currentNode.keyStrengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start text-xs text-[#8a94b0] leading-snug">
                            <span className="text-emerald-400 mr-2 font-bold flex-shrink-0">✓</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {currentNode.deployAdvice && (
                    <div className="bg-[#0e121c] p-4 rounded-xl border border-[#6378ff]/10 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-1.5">
                          <span>💡</span> Deployment Recommendation
                        </h4>
                        <p className="text-xs text-[#8a94b0] leading-relaxed">
                          {currentNode.deployAdvice}
                        </p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-[#6378ff]/10 flex items-center justify-between text-[11px] text-[#5a6280]">
                        <span>Verified with 383 models dataset</span>
                        <span className="text-emerald-400 font-mono">Ready to Deploy</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recommended Models from Directory */}
                {recommendedModels.length > 0 && (
                  <div className="pt-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                      <span>🏆</span> Top Recommended Models in Directory ({recommendedModels.length})
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {recommendedModels.map((m) => {
                        const [id, name, producer, cat, country, released, params, access, priceIn, priceOut, localRun, score, desc, tags, color, letter] = m;
                        const flag = COUNTRY_FLAG[country] || '🌐';
                        const isComparing = compareList.some((item) => item[0] === id);

                        return (
                          <div
                            key={id}
                            className="bg-[#0a0d14] border border-[#6378ff]/20 hover:border-[#6378ff]/50 rounded-xl p-4 flex flex-col justify-between transition-all group hover:shadow-[0_0_20px_rgba(99,120,255,0.12)]"
                          >
                            <div>
                              {/* Top Bar */}
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <DeveloperIcon developer={producer} className="w-8 h-8 flex-shrink-0" />
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                                    ★ {score}
                                  </span>
                                </div>
                              </div>

                              {/* Model Info */}
                              <div className="font-bold text-sm text-white group-hover:text-[#6378ff] transition-colors line-clamp-1 mb-0.5">
                                {name}
                              </div>
                              <div className="text-[11px] text-[#8a94b0] flex items-center gap-1 mb-2.5">
                                <span>{flag}</span>
                                <span className="line-clamp-1">{producer}</span>
                              </div>

                              {/* Specs tags */}
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1a2035] text-[#ccd3e3]">
                                  {params}
                                </span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1a2035] text-emerald-400 uppercase">
                                  {access}
                                </span>
                                {localRun && (
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                                    Local
                                  </span>
                                )}
                              </div>

                              {/* Pricing */}
                              <div className="text-[11px] font-mono text-[#5a6280] mb-3">
                                {priceIn !== null && priceIn > 0 ? (
                                  <span>${priceIn} / ${priceOut} per 1M</span>
                                ) : access === 'open' ? (
                                  <span className="text-emerald-400">Free / Open Weights</span>
                                ) : (
                                  <span>Freemium / API Tier</span>
                                )}
                              </div>
                            </div>

                            {/* Card Actions */}
                            <div className="flex items-center gap-1.5 pt-2 border-t border-[#6378ff]/10">
                              <button
                                onClick={() => setActiveModalModel(m)}
                                className="flex-1 py-1.5 text-xs font-semibold text-white bg-[#1a2035] hover:bg-[#6378ff] rounded-lg transition text-center"
                              >
                                View Specs
                              </button>
                              <button
                                onClick={() => (isComparing ? removeFromCompare(id) : addToCompare(m))}
                                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition ${
                                  isComparing
                                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                    : 'bg-[#1a2035] hover:bg-[#252d4a] text-[#8a94b0] hover:text-white'
                                }`}
                                title={isComparing ? 'Remove from Compare' : 'Add to Compare'}
                              >
                                {isComparing ? '✓ Added' : '+ Compare'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Bottom CTA Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#6378ff]/15">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#6378ff] hover:bg-[#5264e6] rounded-xl transition shadow-lg shadow-[#6378ff]/20"
                    >
                      🔄 Start Over
                    </button>
                    <button
                      onClick={handleCopySummary}
                      className="px-4 py-2 text-xs font-medium text-[#ccd3e3] bg-[#1a2035] hover:bg-[#252d4a] border border-[#6378ff]/20 rounded-xl transition flex items-center gap-1.5"
                    >
                      <span>📋</span> {copiedToast ? 'Copied to Clipboard!' : 'Copy Summary'}
                    </button>
                  </div>

                  <Link
                    href="/"
                    className="text-xs font-semibold text-[#8a94b0] hover:text-white hover:underline transition flex items-center gap-1"
                  >
                    <span>Browse All 383 Models</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Model Specs Modal */}
      {activeModalModel && (
        <ModelDetailModal
          model={activeModalModel}
          onClose={() => setActiveModalModel(null)}
        />
      )}
    </div>
  );
}
