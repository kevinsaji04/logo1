'use client';

import { createContext, useContext, useState } from 'react';

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]); // max 4 model objects
  const [showPanel, setShowPanel] = useState(false);

  const toggleModel = (model) => {
    setCompareList(prev => {
      const exists = prev.find(m => m.id === model.id);
      if (exists) return prev.filter(m => m.id !== model.id);
      if (prev.length >= 4) return prev; // max 4
      return [...prev, model];
    });
  };

  const removeModel = (id) => setCompareList(prev => prev.filter(m => m.id !== id));
  const clearAll = () => { setCompareList([]); setShowPanel(false); };
  const isSelected = (id) => compareList.some(m => m.id === id);

  return (
    <CompareContext.Provider value={{ compareList, toggleModel, removeModel, clearAll, isSelected, showPanel, setShowPanel }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
