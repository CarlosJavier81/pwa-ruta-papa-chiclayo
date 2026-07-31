import { useState } from 'react';
import { guideTips, checklistItems } from '@/data/appData';

const iconMap: Record<string, string> = {
  Clock: '🕒',
  ShieldCheck: '🛡️',
  Droplets: '💧',
  Sun: '☀️',
  MapPin: '📍',
  Phone: '📱',
  Users: '👥',
  Heart: '❤️',
};

export default function GuideView() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const progress = Math.round((checked.size / checklistItems.length) * 100);

  return (
    <div className="h-full overflow-y-auto bg-gray-50 pb-24">
      <div className="bg-navy-500 text-white px-4 pt-5 pb-6">
        <h1 className="font-display font-bold text-xl">Guía del Peregrino</h1>
        <p className="text-sm text-navy-100 mt-0.5">Consejos y checklist para la misa papal</p>
      </div>

      {/* Tips */}
      <section className="px-4 pt-5">
        <h2 className="font-display font-bold text-navy-500 text-sm uppercase tracking-wider mb-3">
          Consejos útiles
        </h2>
        <div className="space-y-2.5">
          {guideTips.map((tip) => (
            <div key={tip.id} className="bg-white rounded-xl shadow-card border border-navy-50 p-3.5 flex gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-lg">
                {iconMap[tip.icon] ?? '💡'}
              </div>
              <div>
                <h3 className="font-semibold text-navy-500 text-sm">{tip.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{tip.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Checklist */}
      <section className="px-4 pt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-navy-500 text-sm uppercase tracking-wider">
            Checklist
          </h2>
          <span className="text-xs font-semibold text-navy-400">
            {checked.size}/{checklistItems.length}
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-card border border-navy-50 p-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-navy-50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-navy-500 w-9 text-right">{progress}%</span>
          </div>
        </div>

        <div className="space-y-2">
          {checklistItems.map((item) => {
            const on = checked.has(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition text-left ${
                  on ? 'bg-navy-50 border-navy-200' : 'bg-white border-navy-50'
                }`}
              >
                <span
                  className={`shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${
                    on ? 'bg-gold-500 border-gold-500' : 'border-navy-200 bg-white'
                  }`}
                >
                  {on && <span className="text-navy-600 text-xs font-bold leading-none">✓</span>}
                </span>
                <span className={`text-sm ${on ? 'text-navy-400 line-through' : 'text-navy-600'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="px-4 pt-6 pb-2">
        <p className="text-center text-xs text-navy-300">
          Que tengas una experiencia segura y bendecida. 🕊️
        </p>
      </div>
    </div>
  );
}
