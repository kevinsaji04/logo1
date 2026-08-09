'use client';

import Link from 'next/link';

export default function IntelligenceNavbar({ activeSection = 'overview' }) {
  const links = [
    { href: '#overview', label: 'Overview' },
    { href: '#categories', label: 'Categories' },
    { href: '#models', label: 'All Models' },
    { href: '#rankings', label: 'Rankings' },
    { href: '/tree', label: '🌳 Evolutionary Tree', isRoute: true },
    { href: '#countries', label: 'Origins' },
    { href: '#clients', label: 'Top Clients' },
    { href: '#benchmarks', label: 'Benchmarks' },
    { href: '#compliance', label: 'Compliance' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0d14]/90 backdrop-blur-md border-b border-[#6378ff]/15 px-6 h-14 flex items-center gap-1 overflow-x-auto scrollbar-none">
      <Link href="/" className="font-bold text-sm text-[#6378ff] mr-4 whitespace-nowrap tracking-tight flex items-center gap-2">
        <span>🧠</span> AI Intel
      </Link>

      <div className="w-px h-5 bg-[#6378ff]/20 mx-2 flex-shrink-0" />

      <div className="flex items-center gap-1">
        {links.map((link) => {
          if (link.isRoute) {
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all whitespace-nowrap"
              >
                {link.label}
              </Link>
            );
          }

          return (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeSection === link.href.replace('#', '')
                  ? 'bg-[#1a2035] text-white font-semibold'
                  : 'text-[#8a94b0] hover:bg-[#1a2035]/60 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
