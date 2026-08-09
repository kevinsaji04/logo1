const config = {
  Text:       { color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',    icon: '≡' },
  Image:      { color: 'bg-pink-500/10 text-pink-400 border-pink-500/20',    icon: '⊡' },
  Video:      { color: 'bg-orange-500/10 text-orange-400 border-orange-500/20', icon: '▶' },
  Audio:      { color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', icon: '♪' },
  'Code/Agent':{ color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: '</>' },
  Search:     { color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',    icon: '⌕' },
};

export default function CategoryBadge({ category }) {
  const c = config[category] || config.Text;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${c.color}`}>
      <span className="text-[10px]">{c.icon}</span>
      {category}
    </span>
  );
}
