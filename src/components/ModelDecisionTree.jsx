'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import DeveloperIcon from '@/components/DeveloperIcon';
import CategoryBadge from '@/components/CategoryBadge';
import ModelDetailModal from '@/components/ModelDetailModal';
import { useCompare } from '@/context/CompareContext';
import { ASSESSMENT_STEPS, evaluateAssessmentRecommendations } from '@/data/ai_decision_tree_7levels';
import {
  RAW_MODELS,
  COUNTRY_FLAG,
  getArchitectureDetails,
  getModelContextInfo,
  getModelHardwareRequirements
} from '@/data/intelligence_data';

export default function ModelDecisionTree() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState({
    goal: null,
    sensitivity: null,
    context: null,
    runtime: null,
    workload: null,
    priority: null,
    constraint: null
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeModalModel, setActiveModalModel] = useState(null);
  const [copiedToast, setCopiedToast] = useState(false);

  const { compareList, addToCompare, removeFromCompare } = useCompare();

  const currentStep = ASSESSMENT_STEPS[currentStepIndex];

  // Handle selecting an option
  const handleSelectOption = (value) => {
    const updatedAnswers = {
      ...answers,
      [currentStep.id]: value
    };
    setAnswers(updatedAnswers);

    if (currentStepIndex < ASSESSMENT_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  // Jump to specific step
  const handleJumpToStep = (index) => {
    setCurrentStepIndex(index);
    setIsCompleted(false);
  };

  const handleBack = () => {
    if (isCompleted) {
      setIsCompleted(false);
      setCurrentStepIndex(ASSESSMENT_STEPS.length - 1);
    } else if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setAnswers({
      goal: null,
      sensitivity: null,
      context: null,
      runtime: null,
      workload: null,
      priority: null,
      constraint: null
    });
    setCurrentStepIndex(0);
    setIsCompleted(false);
  };

  // Compute recommendations
  const recommendations = useMemo(() => {
    if (!isCompleted) return [];
    return evaluateAssessmentRecommendations(answers, RAW_MODELS);
  }, [isCompleted, answers]);

  // Copy recommendation summary
  const handleCopySummary = () => {
    if (!isCompleted || recommendations.length === 0) return;
    const topModel = recommendations[0]?.model?.[1] || 'Model';
    const otherModels = recommendations.slice(1).map(r => r.model[1]).join(', ');
    const summaryText = `AI Model Decision Assessment:\nTop Match: ${topModel} (${recommendations[0]?.score}% Match)\nAlternatives: ${otherModels}\nSelected Criteria:\n1. Goal: ${answers.goal}\n2. Sensitivity: ${answers.sensitivity}\n3. Context: ${answers.context}\n4. Runtime: ${answers.runtime}\n5. Workload: ${answers.workload}\n6. Priority: ${answers.priority}\n7. Constraint: ${answers.constraint}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  const progressPercent = isCompleted ? 100 : Math.round(((currentStepIndex + 1) / ASSESSMENT_STEPS.length) * 100);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-[#e8ecf4] py-8 px-4 md:px-8">
      {/* Ambient background lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/05 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>🎯</span> AI Architectural Decision Tree
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            AI Model Decision Assessment
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            7-level progressive decision framework to match the exact optimal AI models from our 787-model directory.
          </p>
        </div>

        {/* Clean Centered Assessment Card (Sidebar Removed) */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/90 rounded-2xl p-6 md:p-8 shadow-xl">
          
          {/* Top Progress & Step Status Bar */}
          <div className="mb-6 pb-4 border-b border-slate-800/80">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-bold tracking-tight text-sm">
                  {isCompleted ? 'Assessment Completed' : `Assessment Level ${currentStepIndex + 1}`}
                </span>
                {!isCompleted && (
                  <span className="text-blue-400 font-mono text-xs bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                    Step {currentStepIndex + 1} of {ASSESSMENT_STEPS.length}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {currentStepIndex > 0 && !isCompleted && (
                  <button
                    onClick={handleBack}
                    className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                  >
                    ← Back
                  </button>
                )}
                {(currentStepIndex > 0 || isCompleted) && (
                  <button
                    onClick={handleReset}
                    className="text-xs text-slate-500 hover:text-red-400 transition-colors"
                  >
                    ↺ Restart
                  </button>
                )}
              </div>
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Quick Step Indicators (7 clickable dots/pills) */}
            <div className="grid grid-cols-7 gap-1.5 mt-3">
              {ASSESSMENT_STEPS.map((s, idx) => {
                const isActive = !isCompleted && currentStepIndex === idx;
                const isAnswered = answers[s.id] != null;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleJumpToStep(idx)}
                    title={s.title}
                    className={`h-1.5 rounded-full transition-all ${
                      isActive
                        ? 'bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)]'
                        : isAnswered
                        ? 'bg-emerald-500'
                        : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* 1. QUESTION VIEW */}
          {!isCompleted && currentStep && (
            <div className="space-y-6">
              {/* Question Title & Subtitle */}
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 block mb-1">
                  LEVEL {currentStep.step} OF 7
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {currentStep.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-400 mt-1">
                  {currentStep.subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                {currentStep.options.map((opt) => {
                  const isSelected = answers[currentStep.id] === opt.value;

                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectOption(opt.value)}
                      className={`p-4 rounded-xl text-left border transition-all relative flex flex-col justify-between group ${
                        isSelected
                          ? 'bg-blue-500/15 border-blue-500/60 shadow-lg shadow-blue-500/10'
                          : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-600 hover:bg-slate-900/70'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{opt.icon}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold border ${
                            isSelected
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}>
                            {opt.tag}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors mb-1.5 leading-snug">
                          {opt.label}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-800/40 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-mono">
                          {isSelected ? '✓ Selected' : 'Click to select'}
                        </span>
                        <span className="text-blue-400 font-bold group-hover:translate-x-0.5 transition-transform">
                          Select →
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. COMPLETED RECOMMENDATIONS RESULT VIEW */}
          {isCompleted && (
            <div className="space-y-6">
              {/* Result Header */}
              <div className="border-b border-slate-800/80 pb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    ✓ ASSESSMENT COMPLETE
                  </span>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Recommended Model Matches
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Matched against your 7 criteria across 787 verified models in the directory.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopySummary}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{copiedToast ? '✓ Copied!' : '📋 Copy Plan'}</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition shadow-sm"
                  >
                    ↺ New Assessment
                  </button>
                </div>
              </div>

              {/* TOP #1 BEST MATCH HERO CARD */}
              {recommendations[0] && (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-950/80 border-2 border-indigo-500/50 shadow-2xl relative overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
                        ★ TOP MATCH #{1}
                      </span>
                      <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded-full border border-indigo-500/30">
                        {recommendations[0].score}% COMPATIBILITY
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {recommendations[0].model[2]} · {COUNTRY_FLAG[recommendations[0].model[4]] || '🌐'} {recommendations[0].model[4]}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold font-mono text-white shadow-lg shrink-0 border"
                      style={{
                        backgroundColor: `${recommendations[0].model[14]}25`,
                        borderColor: `${recommendations[0].model[14]}50`,
                        color: recommendations[0].model[14]
                      }}
                    >
                      {recommendations[0].model[15] || recommendations[0].model[1].substring(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-black text-white tracking-tight">
                        {recommendations[0].model[1]}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                        {recommendations[0].model[12]}
                      </p>
                    </div>
                  </div>

                  {/* Why this model was chosen */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-4">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1.5">
                      🎯 Why It Matches Your 7 Criteria:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {recommendations[0].reasons.map((r, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">✓</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Specs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-center">
                    <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Context Window</span>
                      <span className="text-xs font-bold text-white font-mono">
                        {getModelContextInfo(recommendations[0].model)?.label || '128K tokens'}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Pricing / 1M</span>
                      <span className="text-xs font-bold text-white font-mono">
                        {recommendations[0].model[8] != null ? `$${recommendations[0].model[8]} In` : 'Free / Local'}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Hardware Tier</span>
                      <span className="text-xs font-bold text-white font-mono truncate block">
                        {getModelHardwareRequirements(recommendations[0].model)?.badge || 'Serverless API'}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Access Tier</span>
                      <span className="text-xs font-bold text-emerald-400 uppercase font-mono">
                        {recommendations[0].model[7]}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setActiveModalModel(recommendations[0].model)}
                      className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-lg shadow-indigo-600/20"
                    >
                      Inspect Full Profile →
                    </button>
                    <button
                      onClick={() => {
                        const mObj = {
                          id: recommendations[0].model[0],
                          name: recommendations[0].model[1],
                          developer: recommendations[0].model[2],
                          category: recommendations[0].model[3],
                          cat: recommendations[0].model[3],
                          params: recommendations[0].model[6],
                          context_length: 128000,
                          pricing: { prompt: recommendations[0].model[8] ? recommendations[0].model[8] / 1000000 : 0 }
                        };
                        addToCompare(mObj);
                      }}
                      className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition"
                    >
                      + Add to Comparison
                    </button>
                  </div>
                </div>
              )}

              {/* RUNNER-UP / ALTERNATIVE MATCHES */}
              {recommendations.length > 1 && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Alternative Recommended Options:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {recommendations.slice(1, 3).map((r, i) => (
                      <div
                        key={r.model[0]}
                        className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                              #{i + 2} · {r.score}% Match
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {r.model[2]}
                            </span>
                          </div>
                          <h5 className="text-sm font-bold text-white mb-1">
                            {r.model[1]}
                          </h5>
                          <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                            {r.model[12]}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                          <span className="text-[11px] font-mono text-slate-500">
                            {getModelContextInfo(r.model)?.badge || '128K ctx'}
                          </span>
                          <button
                            onClick={() => setActiveModalModel(r.model)}
                            className="text-xs font-semibold text-blue-400 hover:text-blue-300"
                          >
                            Inspect →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CRITERIA SUMMARY RECAP */}
              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-xs">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">
                  📋 Your Selected 7 Assessment Parameters:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {ASSESSMENT_STEPS.map((s, idx) => {
                    const opt = s.options.find(o => o.value === answers[s.id]);
                    return (
                      <button
                        key={s.id}
                        onClick={() => handleJumpToStep(idx)}
                        className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 text-left hover:border-slate-600 transition"
                      >
                        <span className="text-[9px] text-slate-500 block truncate">{s.title}</span>
                        <span className="text-xs font-bold text-blue-300 block truncate font-mono mt-0.5">
                          {opt?.tag || opt?.label || 'None'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Model Detail Modal */}
      {activeModalModel && (
        <ModelDetailModal
          model={activeModalModel}
          onClose={() => setActiveModalModel(null)}
        />
      )}
    </div>
  );
}
