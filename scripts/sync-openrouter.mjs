import fs from 'fs';
import path from 'path';

/**
 * OpenRouter Live Catalog Sync Script
 * Fetches real-time model specs, pricing, context lengths, and architectures from OpenRouter API.
 */
async function syncOpenRouterCatalog() {
  console.log('🌐 Connecting to OpenRouter API (https://openrouter.ai/api/v1/models)...');
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'NextGen-AI-Directory-Sync/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API responded with status ${response.status}: ${response.statusText}`);
    }

    const payload = await response.json();
    const rawList = payload.data || [];
    console.log(`📦 Received ${rawList.length} AI models from OpenRouter.`);

    const formattedModels = rawList.map((model) => {
      const id = model.id;
      const parts = id.split('/');
      const rawDev = parts[0] || 'Unknown';
      const rawSlug = parts.slice(1).join('/') || id;

      // Developer formatting
      const devMap = {
        'openai': 'OpenAI',
        'anthropic': 'Anthropic',
        'google': 'Google',
        'meta-llama': 'Meta',
        'mistralai': 'Mistral AI',
        'deepseek': 'DeepSeek',
        'qwen': 'Alibaba / Qwen',
        'cohere': 'Cohere',
        '01-ai': '01.AI',
        'microsoft': 'Microsoft',
        'amazon': 'Amazon',
        'x-ai': 'xAI',
        'perplexity': 'Perplexity',
        'nousresearch': 'Nous Research',
      };
      const developer = devMap[rawDev.toLowerCase()] || (rawDev.charAt(0).toUpperCase() + rawDev.slice(1));

      // Clean name
      let name = model.name || rawSlug.replace(/[-_]/g, ' ');

      // Pricing calculation: OpenRouter prices are per-token strings -> convert to $/1M tokens
      const promptCost = model.pricing?.prompt ? parseFloat(model.pricing.prompt) : 0;
      const completionCost = model.pricing?.completion ? parseFloat(model.pricing.completion) : 0;
      const priceIn = promptCost > 0 ? Number((promptCost * 1_000_000).toFixed(4)) : 0;
      const priceOut = completionCost > 0 ? Number((completionCost * 1_000_000).toFixed(4)) : 0;

      // Context Window & Output Limits
      const contextLength = model.context_length || 128000;
      const maxOutput = model.top_provider?.max_completion_tokens || 8192;
      const isModerated = model.top_provider?.is_moderated ?? false;

      // Architecture & Modality
      const modality = model.architecture?.modality || 'text->text';
      let category = 'text';
      if (modality.includes('image') || modality.includes('multimodal')) category = 'multi';
      if (id.includes('coder') || id.includes('code') || id.includes('deepseek-coder')) category = 'code';
      if (id.includes('reason') || id.includes('r1') || id.includes('o1') || id.includes('o3')) category = 'reason';

      // Access model
      const isOpenWeights = priceIn === 0 && priceOut === 0 || id.includes('free') || id.includes('llama') || id.includes('deepseek') || id.includes('qwen') || id.includes('mistral');

      return {
        id,
        name,
        developer,
        category,
        context_length: contextLength,
        max_output_tokens: maxOutput,
        pricing: {
          prompt_per_1m: priceIn,
          completion_per_1m: priceOut,
          is_free: priceIn === 0 && priceOut === 0,
        },
        access: isOpenWeights ? 'open' : 'closed',
        modality,
        tokenizer: model.architecture?.tokenizer || 'unknown',
        instruct_type: model.architecture?.instruct_type || null,
        description: model.description || `Frontier AI model ${name} developed by ${developer}.`,
        is_moderated: isModerated,
        updated_at: new Date().toISOString(),
      };
    });

    // Ensure src/data directory exists
    const dataDir = path.resolve('src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const outputPath = path.join(dataDir, 'openrouter_models.json');
    fs.writeFileSync(outputPath, JSON.stringify(formattedModels, null, 2), 'utf-8');

    const metaPath = path.join(dataDir, 'openrouter_meta.json');
    fs.writeFileSync(metaPath, JSON.stringify({
      total_models: formattedModels.length,
      last_synced_at: new Date().toISOString(),
      source: 'https://openrouter.ai/api/v1/models',
      open_weights_count: formattedModels.filter(m => m.access === 'open').length,
      commercial_api_count: formattedModels.filter(m => m.access === 'closed').length,
    }, null, 2), 'utf-8');

    console.log(`\n🎉 Success! Synchronized ${formattedModels.length} models from OpenRouter.`);
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`📊 Metadata: ${metaPath}\n`);

  } catch (error) {
    console.error('❌ Failed to sync OpenRouter catalog:', error.message);
    process.exit(1);
  }
}

syncOpenRouterCatalog();
