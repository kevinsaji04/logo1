'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function IntelligenceNavbar({ activeSection = '' }) {
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get('tab') || 'directory';

  const links = [
    { href: '/?tab=directory', tab: 'directory', label: '🎛️ All Models' },
    { href: '/?tab=charts',    tab: 'charts',    label: '📊 Analytics & Charts' },
    { href: '/?tab=tasks',     tab: 'tasks',     label: '📋 Top Models' },
    { href: '/?tab=rankings',  tab: 'rankings',  label: '🏆 Rankings' },
    { href: '/?tab=origins',   tab: 'origins',   label: '🌍 Origins' },
    { href: '/?tab=clients',   tab: 'clients',   label: '💼 Top Clients' },
    { href: '/decision-tree',  isRoute: true,    section: 'decision-tree', label: '🎯 Decision Tree', isHighlight: true },
    { href: '/tree',           isRoute: true,    section: 'tree',          label: '🌳 Evolutionary Tree' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0d14]/95 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-6 h-14 flex items-center justify-center gap-1.5 overflow-x-auto scrollbar-none shadow-lg">
      <div className="flex items-center gap-1.5 shrink-0">
        {links.map((link) => {
          let isActive = false;
          if (link.isRoute) {
            isActive = activeSection === link.section;
          } else if (!activeSection || activeSection === 'home') {
            isActive = currentTab === link.tab;
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
                link.isHighlight
                  ? isActive
                    ? 'text-amber-200 bg-amber-500/25 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                    : 'text-amber-300 bg-amber-500/15 border-amber-500/30 hover:bg-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                  : link.section === 'tree'
                  ? isActive
                    ? 'text-emerald-300 bg-emerald-500/25 border-emerald-500/50'
                    : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25 hover:bg-emerald-500/20'
                  : isActive
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 bg-slate-900/60 border-slate-800/80 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
