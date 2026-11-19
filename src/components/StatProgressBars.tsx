import { Heart, Flame, Sparkles } from 'lucide-react';
import type { CardStats } from '../types/character';

interface StatProgressBarsProps {
  stats: CardStats;
  compact?: boolean;
}

export function StatProgressBars({ stats, compact = false }: StatProgressBarsProps) {
  const items = [
    {
      key: 'health',
      label: 'Health',
      value: stats.health,
      min: 50,
      max: 150,
      percent: Math.round((stats.health / 150) * 100),
      icon: Heart,
      barClass: 'bg-gradient-to-r from-[#8f2938] via-[#c7424d] to-[#e9795c]',
      iconColor: 'text-[#eb796a]',
      valueColor: 'text-[#fcd6cb]',
    },
    {
      key: 'mana',
      label: 'Mana',
      value: stats.mana,
      min: 30,
      max: 100,
      percent: Math.round((stats.mana / 100) * 100),
      icon: Sparkles,
      barClass: 'bg-gradient-to-r from-[#4b2380] via-[#7c3aed] to-[#c084fc]',
      iconColor: 'text-[#c9a3ff]',
      valueColor: 'text-[#ead8ff]',
    },
    {
      key: 'strength',
      label: 'Strength',
      value: stats.strength,
      min: 10,
      max: 50,
      percent: Math.round((stats.strength / 50) * 100),
      icon: Flame,
      barClass: 'bg-gradient-to-r from-[#8a5b18] via-[#c68d2f] to-[#f4cf75]',
      iconColor: 'text-[#ecc46c]',
      valueColor: 'text-[#fae6b4]',
    },
  ];

  return (
    <div className={compact ? 'space-y-2' : 'grid grid-cols-1 gap-4 sm:grid-cols-3'}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.key}
            className={
              compact
                ? 'space-y-1'
                : 'rounded-md border border-[#7c5d32]/50 bg-[#120c1a]/90 px-3.5 py-3 shadow-[inset_0_1px_0_rgba(242,206,128,0.12)]'
            }
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 font-display text-xs font-bold tracking-wider text-[#d9bd8a]">
                <Icon className={`h-3.5 w-3.5 ${item.iconColor}`} aria-hidden="true" />
                {item.label}
              </span>
              <span className={`font-mono text-xs font-semibold tabular-nums ${item.valueColor}`}>
                {item.value} / {item.max}
              </span>
            </div>

            <div
              role="progressbar"
              aria-label={item.label}
              aria-valuenow={item.value}
              aria-valuemin={item.min}
              aria-valuemax={item.max}
              className={`${
                compact ? 'h-2' : 'mt-2 h-2.5'
              } w-full overflow-hidden rounded-full border border-[#5e4626]/70 bg-[#09060e]`}
            >
              <div
                className={`h-full rounded-full transition-[width] duration-300 ease-out ${item.barClass}`}
                style={{ width: `${Math.min(100, Math.max(8, item.percent))}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
