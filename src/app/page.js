import { Suspense } from 'react';
import ModelGrid from '@/components/ModelGrid';

export const metadata = {
  title: 'NextGen AI Model Directory — 630 Models',
  description: 'Explore 630 cutting-edge AI models. Browse by category, developer, and modality.',
};

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0d14]" />}>
      <ModelGrid />
    </Suspense>
  );
}
