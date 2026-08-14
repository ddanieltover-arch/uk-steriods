import React from 'react';
import { PerformanceScores } from '../../lib/pdp/pdp-content';

const ROWS: { key: keyof PerformanceScores; label: string }[] = [
  { key: 'strength', label: 'Strength' },
  { key: 'keepGains', label: 'Keep gains' },
  { key: 'popularity', label: 'Popularity' },
  { key: 'weightGain', label: 'Weight gain' },
  { key: 'fatWaterLoss', label: 'Fat / water loss' },
];

interface ProductPerformanceProfileProps {
  scores: PerformanceScores;
}

export const ProductPerformanceProfile: React.FC<ProductPerformanceProfileProps> = ({ scores }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="text-sm font-black text-slate-900">Performance Profile</h2>
      <p className="mt-0.5 text-[11px] font-medium text-slate-400">Rated / 5 from catalogue usage notes</p>
      <ul className="mt-4 space-y-3">
        {ROWS.map((row) => {
          const value = scores[row.key];
          return (
            <li key={row.key} className="grid grid-cols-[7.5rem_1fr_1.5rem] items-center gap-3">
              <span className="text-xs font-bold text-slate-600">{row.label}</span>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100" aria-hidden>
                <div
                  className="h-full rounded-full bg-teal-600"
                  style={{ width: `${(value / 5) * 100}%` }}
                />
              </div>
              <span className="text-right text-xs font-black text-slate-900">{value}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
