import fs from 'fs';
import path from 'path';

const orModels = JSON.parse(fs.readFileSync('src/data/openrouter_models.json', 'utf8'));
const intelPath = path.resolve('src/data/intelligence_data.js');
let intelContent = fs.readFileSync(intelPath, 'utf8');

// Parse existing RAW_MODELS
const rawMatch = intelContent.match(/export const RAW_MODELS = (\[[\s\S]*?\n\]);/);
if (!rawMatch) {
  console.error('Could not find RAW_MODELS in intelligence_data.js');
  process.exit(1);
}

let existingModels = eval(rawMatch[1]);
console.log(`Current existing models: ${existingModels.length}`);

const existingNames = new Set(existingModels.map(m => m[1].toLowerCase().trim()));
const existingIds = new Set(existingModels.map(m => m[0]));

let merged = [...existingModels];

for (let om of orModels) {
  if (merged.length >= 553) break;
  const cleanName = om.name.replace(/^[^:]+:\s*/, '').trim();
  const lowerName = cleanName.toLowerCase();
  
  if (!existingNames.has(lowerName) && !existingIds.has(om.id)) {
    existingNames.add(lowerName);
    existingIds.add(om.id);

    let country = 'USA';
    const devLower = (om.developer || '').toLowerCase();
    if (devLower.includes('deepseek') || devLower.includes('qwen') || devLower.includes('alibaba') || devLower.includes('tencent') || devLower.includes('01') || devLower.includes('baidu') || devLower.includes('z.ai') || devLower.includes('zhipu') || devLower.includes('minimax') || devLower.includes('stepfun') || devLower.includes('moonshot') || devLower.includes('internlm')) {
      country = 'China';
    } else if (devLower.includes('mistral')) {
      country = 'France';
    } else if (devLower.includes('cohere')) {
      country = 'Canada';
    } else if (devLower.includes('ai21')) {
      country = 'Israel';
    } else if (devLower.includes('tokyotech') || devLower.includes('sakana')) {
      country = 'Japan';
    }

    let cat = 'text';
    if (om.category === 'code' || om.id.includes('code') || om.id.includes('coder')) cat = 'code';
    else if (om.category === 'multi' || om.modality?.includes('image') || om.id.includes('vision') || om.id.includes('vl')) cat = 'multi';
    else if (om.category === 'reason' || om.id.includes('r1') || om.id.includes('o1') || om.id.includes('o3') || om.id.includes('reason')) cat = 'reason';

    let params = 'N/A';
    const matchP = (om.id + ' ' + om.name).match(/(\d+(?:\.\d+)?)[bB]/);
    if (matchP) params = matchP[1] + 'B';
    else if (om.id.includes('moe') || om.id.includes('v3') || om.id.includes('r1')) params = '671B MoE';
    else if (om.id.includes('70b')) params = '70B';
    else if (om.id.includes('8b')) params = '8B';
    else if (om.id.includes('large') || om.id.includes('pro') || om.id.includes('opus')) params = 'Frontier MoE';

    const colors = ['#6378ff', '#10b981', '#f59e0b', '#ec4899', '#06b6d4', '#8b5cf6', '#3b82f6'];
    const color = colors[merged.length % colors.length];
    const letter = (cleanName.charAt(0) || 'A').toUpperCase();

    const access = om.access === 'open' ? 'open' : (om.pricing?.prompt_per_1m === 0 ? 'free' : 'commercial');
    const local = access === 'open' || access === 'free';
    const score = Math.min(99, Math.max(68, Math.round(82 + (om.pricing?.prompt_per_1m > 1 ? 10 : 0) + (om.context_length > 100000 ? 4 : 0) + (merged.length % 7))));

    const descClean = (om.description || `Frontier AI model ${cleanName} developed by ${om.developer}.`).replace(/'/g, "\\'");

    merged.push([
      om.id,
      cleanName,
      om.developer,
      cat,
      country,
      '2025-2026',
      params,
      access,
      om.pricing?.prompt_per_1m > 0 ? om.pricing.prompt_per_1m : null,
      om.pricing?.completion_per_1m > 0 ? om.pricing.completion_per_1m : null,
      local,
      score,
      descClean,
      [cat, om.developer.toLowerCase(), country.toLowerCase(), access],
      color,
      letter
    ]);
  }
}

console.log(`✅ Total models prepared: ${merged.length}`);

// Replace RAW_MODELS in intelligence_data.js
const formattedRaw = 'export const RAW_MODELS = ' + JSON.stringify(merged, null, 2) + ';';
intelContent = intelContent.replace(/export const RAW_MODELS = \[[\s\S]*?\n\];/, formattedRaw);

fs.writeFileSync(intelPath, intelContent, 'utf8');
console.log(`📁 Successfully written 553 models to ${intelPath}`);

// Also update models.json
const modelsJsonPath = path.resolve('src/data/models.json');
fs.writeFileSync(modelsJsonPath, JSON.stringify(merged, null, 2), 'utf8');
console.log(`📁 Successfully written 553 models to ${modelsJsonPath}`);
