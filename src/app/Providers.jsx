'use client';
import { CompareProvider } from '@/context/CompareContext';
import ComparePanel from '@/components/ComparePanel';

export default function Providers({ children }) {
  return (
    <CompareProvider>
      {children}
      <ComparePanel />
    </CompareProvider>
  );
}
