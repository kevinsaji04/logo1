import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const DEV_MAP = {
  'openai': 'OpenAI',
  'anthropic': 'Anthropic',
  'meta': 'Meta',
  'meta-llama': 'Meta',
  'google': 'Google',
  'deepseek': 'DeepSeek',
  'qwen': 'Alibaba',
  'mistralai': 'Mistral AI',
  'cohere': 'Cohere',
  'microsoft': 'Microsoft',
  'x-ai': 'xAI',
  'amazon': 'Amazon',
  'perplexity': 'Perplexity',
  '01-ai': '01.AI',
  'bytedance': 'ByteDance',
  'minimax': 'MiniMax',
  'moonshot': 'Moonshot AI',
  'zhipu': 'Zhipu AI',
  'black-forest-labs': 'Black Forest Labs',
  'stabilityai': 'Stability AI',
  'sarvam': 'Sarvam AI',
  'two-ai': 'Two AI',
  'ai4bharat': 'AI4Bharat',
  'krutrim': 'Krutrim',
  'nousresearch': 'Nous Research',
  'bigcode': 'BigCode',
  'liquid': 'Liquid AI',
  'sao10k': 'Sao10k',
  'gryphe': 'Gryphe',
  'openchat': 'OpenChat',
  'pygmalionai': 'PygmalionAI',
  'neversleep': 'NeverSleep',
  'eva-unit-01': 'EvaUnit01',
  'undi95': 'Undi95',
  'cognitivecomputations': 'Cognitive Computations',
  'allenai': 'AllenAI',
  'eleutherai': 'EleutherAI',
};

const DEV_COUNTRIES = {
  'OpenAI': 'USA', 'Google': 'USA', 'Anthropic': 'USA', 'Meta': 'USA', 'Microsoft': 'USA',
  'xAI': 'USA', 'Amazon': 'USA', 'Perplexity': 'USA', 'Cohere': 'Canada', 'Nous Research': 'USA',
  'DeepSeek': 'China', 'Alibaba': 'China', '01.AI': 'China', 'ByteDance': 'China',
  'MiniMax': 'China', 'Moonshot AI': 'China', 'Zhipu AI': 'China',
  'Mistral AI': 'France', 'Black Forest Labs': 'Germany', 'Stability AI': 'UK',
  'Sarvam AI': 'India', 'Two AI': 'India', 'AI4Bharat': 'India', 'Krutrim': 'India',
  'SML': 'India', 'Tech Mahindra': 'India', 'Telugu LLM Labs': 'India', 'Tensoic': 'India'
};

const BRAND_COLORS = {
  'OpenAI': '#10b981', 'Google': '#4285F4', 'Anthropic': '#cc785c', 'Meta': '#0082fb',
  'DeepSeek': '#4D6BFE', 'Alibaba': '#ff6a00', 'Mistral AI': '#ff7000', 'Microsoft': '#00a4ef',
  'xAI': '#ffffff', 'Sarvam AI': '#f97316', 'Krutrim': '#10b981', 'AI4Bharat': '#6366f1',
  'Two AI': '#8b5cf6', 'Cohere': '#39594d', 'Amazon': '#ff9900', 'Perplexity': '#1fb8cd'
};

function transformModel(item, index) {
  const parts = (item.id || '').split('/');
  const rawDevSlug = parts[0]?.toLowerCase() || 'other';
  const rawModelSlug = parts[1] || item.id;
  const developer = DEV_MAP[rawDevSlug] || rawDevSlug.charAt(0).toUpperCase() + rawDevSlug.slice(1);
  const country = DEV_COUNTRIES[developer] || 'USA';

  let name = item.name || rawModelSlug;
  if (name.includes(': ')) {
    const splitName = name.split(': ')[1];
    if (splitName && splitName.length > 2) name = splitName;
  }

  const desc = (item.description || '').toLowerCase();
  const modality = (item.architecture?.modality || '').toLowerCase();
  let cat = 'llm';
  if (modality.includes('image') && !modality.includes('text->text')) cat = 'image';
  else if (modality.includes('audio')) cat = 'audio';
  else if (desc.includes('code') || desc.includes('programming') || name.toLowerCase().includes('coder') || name.toLowerCase().includes('code')) cat = 'code';
  else if (desc.includes('reasoning') || desc.includes('thought') || name.toLowerCase().includes('r1') || name.toLowerCase().includes('o1') || name.toLowerCase().includes('o3') || desc.includes('math')) cat = 'reason';
  else if (modality.includes('image') || modality.includes('video') || modality.includes('audio') || desc.includes('multimodal') || desc.includes('vision')) cat = 'multi';

  let params = 'Frontier';
  const paramMatch = (item.id + ' ' + (item.name || '')).match(/(\d+(\.\d+)?[bBmM])/);
  if (paramMatch) {
    params = paramMatch[1].toUpperCase();
  }

  const promptPerToken = parseFloat(item.pricing?.prompt || 0);
  const completionPerToken = parseFloat(item.pricing?.completion || 0);
  const priceIn = promptPerToken > 0 ? parseFloat((promptPerToken * 1000000).toFixed(3)) : (promptPerToken === 0 ? 0 : null);
  const priceOut = completionPerToken > 0 ? parseFloat((completionPerToken * 1000000).toFixed(3)) : (completionPerToken === 0 ? 0 : null);

  const isFree = promptPerToken === 0 && completionPerToken === 0;
  const isOpen = isFree || ['meta', 'mistralai', 'qwen', 'deepseek', 'google/gemma', 'microsoft/phi', 'nousresearch', 'ai4bharat', 'sarvam'].some(k => (item.id || '').toLowerCase().includes(k));
  const access = isOpen ? 'open' : (isFree ? 'free' : 'api');

  const createdDate = item.created ? new Date(item.created * 1000) : new Date();
  const year = createdDate.getFullYear() || 2024;
  const released = `${year}`;

  const tags = [cat, country.toLowerCase(), developer.toLowerCase().replace(/\s+/g, '')];
  if (isOpen) tags.push('open');
  if (params !== 'Frontier') tags.push(params.toLowerCase());

  const color = BRAND_COLORS[developer] || '#6366f1';
  const letter = (developer.slice(0, 2) || 'AI').toUpperCase();

  return [
    `or_${item.id.replace(/[^a-zA-Z0-9_-]/g, '_')}`,
    name,
    developer,
    cat,
    country,
    released,
    params,
    access,
    priceIn,
    priceOut,
    isOpen,
    Math.min(95, Math.max(75, 80 + Math.floor(Math.random() * 15))),
    item.description || `${name} by ${developer}. Context window: ${(item.context_length || 128000).toLocaleString()} tokens.`,
    tags,
    color,
    letter
  ];
}

async function performSync() {
  const res = await fetch('https://openrouter.ai/api/v1/models', { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`OpenRouter API error: ${res.statusText}`);
  const data = await res.json();
  const openRouterModels = data.data || [];

  const projectRoot = process.cwd();
  const modelsJsonPath = path.join(projectRoot, 'src/data/models.json');
  const syncMetaPath = path.join(projectRoot, 'src/data/sync_meta.json');
  const intelPath = path.join(projectRoot, 'src/data/intelligence_data.js');

  let existing = [];
  if (fs.existsSync(modelsJsonPath)) {
    existing = JSON.parse(fs.readFileSync(modelsJsonPath, 'utf8'));
  }

  const existingNames = new Set(existing.map(m => String(m[1]).toLowerCase().replace(/[^a-z0-9]/g, '')));
  let addedCount = 0;
  let updatedCount = 0;

  const newModels = [];
  for (let i = 0; i < openRouterModels.length; i++) {
    const orItem = openRouterModels[i];
    const transformed = transformModel(orItem, i);
    const normalizedName = String(transformed[1]).toLowerCase().replace(/[^a-z0-9]/g, '');

    if (!existingNames.has(normalizedName)) {
      existingNames.add(normalizedName);
      newModels.push(transformed);
      addedCount++;
    } else {
      updatedCount++;
    }
  }

  const merged = [...existing, ...newModels];
  fs.writeFileSync(modelsJsonPath, JSON.stringify(merged, null, 2), 'utf8');

  const meta = {
    lastSynced: new Date().toISOString(),
    source: 'https://openrouter.ai/api/v1/models',
    totalOpenRouterModels: openRouterModels.length,
    newModelsAdded: addedCount,
    totalCatalogModels: merged.length,
  };
  fs.writeFileSync(syncMetaPath, JSON.stringify(meta, null, 2), 'utf8');

  let intelContent = fs.readFileSync(intelPath, 'utf8');
  intelContent = intelContent.replace(
    /export const RAW_MODELS = \[[\s\S]*?\n\];/,
    `export const RAW_MODELS = ${JSON.stringify(merged, null, 2)};`
  );
  fs.writeFileSync(intelPath, intelContent, 'utf8');

  return meta;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';

    const projectRoot = process.cwd();
    const syncMetaPath = path.join(projectRoot, 'src/data/sync_meta.json');

    let meta = null;
    if (fs.existsSync(syncMetaPath)) {
      meta = JSON.parse(fs.readFileSync(syncMetaPath, 'utf8'));
    }

    const lastSyncTime = meta?.lastSynced ? new Date(meta.lastSynced).getTime() : 0;
    const isStale = (Date.now() - lastSyncTime) > 24 * 60 * 60 * 1000;

    if (force || isStale) {
      const result = await performSync();
      return NextResponse.json({
        success: true,
        action: 'synced',
        ...result
      });
    }

    return NextResponse.json({
      success: true,
      action: 'cached',
      message: 'Models are up to date (synced within last 24h). Pass ?force=true to re-sync.',
      ...meta
    });
  } catch (error) {
    console.error('OpenRouter sync failed:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const result = await performSync();
    return NextResponse.json({
      success: true,
      action: 'synced_post',
      ...result
    });
  } catch (error) {
    console.error('OpenRouter sync failed:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
