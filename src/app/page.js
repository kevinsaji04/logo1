import { Suspense } from 'react';
import ModelGrid from '@/components/ModelGrid';
import IntelligenceNavbar from '@/components/IntelligenceNavbar';

export const metadata = {
  title: 'NextGen AI Model Directory — 787 Models',
  description: 'Explore 787 cutting-edge AI models synced daily with OpenRouter. Browse by category, developer, modality, and hardware specs.',
};

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0d14]" />}>
      <div className="min-h-screen bg-[#0a0d14]">
        <IntelligenceNavbar activeSection="home" />
        <ModelGrid />
      </div>
    </Suspense>
  );
}
