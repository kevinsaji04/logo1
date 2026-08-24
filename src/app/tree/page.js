import { Suspense } from 'react';
import EvolutionaryTree from '@/components/EvolutionaryTree';
import IntelligenceNavbar from '@/components/IntelligenceNavbar';

export const metadata = {
  title: 'AI Evolutionary Tree — NextGen AI Directory',
  description: 'Interactive lineage chart of landmark AI architectures and language models.',
};

export default function TreePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070b14]" />}>
      <div className="min-h-screen bg-[#070b14]">
        <IntelligenceNavbar activeSection="tree" />
        <EvolutionaryTree />
      </div>
    </Suspense>
  );
}
