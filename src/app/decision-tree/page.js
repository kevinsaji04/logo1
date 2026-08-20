import IntelligenceNavbar from '@/components/IntelligenceNavbar';
import ModelDecisionTree from '@/components/ModelDecisionTree';

export const metadata = {
  title: 'AI Model Decision Tree — NextGen AI Directory',
  description: 'Interactive decision tree wizard to find the optimal AI model for coding, reasoning, media, search, and chat.',
};

export default function DecisionTreePage() {
  return (
    <div className="min-h-screen bg-[#0a0d14]">
      <IntelligenceNavbar activeSection="decision-tree" />
      <ModelDecisionTree />
    </div>
  );
}
