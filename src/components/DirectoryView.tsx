import { useMemo, useState } from 'react';
import { directoryEntries, type DirectoryCategory } from '@/data/appData';

type Filter = 'todos' | DirectoryCategory;

const filters: { key: Filter; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'hotel', label: 'Hoteles' },
  { key: 'restaurante', label: 'Restaurantes' },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-xs ${i <= Math.round(rating) ? 'text-gold-500' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
      <span className="text-xs text-navy-400 ml-1 font-semibold">{rating.toFixed(1)}</span>
    </div>
  );
}

function DirectoryCard({ entry }: { entry: (typeof directoryEntries)[number] }) {
  const waLink = `https://wa.me/51${entry.whatsapp}?text=${encodeURIComponent(
    `Hola, vengo desde la app "Ruta del Papa - Chiclayo" y quisiera información sobre: ${entry.name}.`
  )}`;

  return (
    <div className="bg-white rounded-2xl shadow-card border border-navy-50 overflow-hidden">
      <div className="px-4 pt-3 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span
              className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5 ${
                entry.category === 'hotel'
                  ? 'bg-navy-100 text-navy-600'
                  : 'bg-gold-100 text-gold-700'
              }`}
            >
              {entry.category === 'hotel' ? 'Hotel' : 'Restaurante'}
            </span>
            <h3 className="font-display font-bold text-navy-500 leading-tight">{entry.name}</h3>
            <p className="text-xs text-navy-300 mt-0.5">📍 {entry.address}</p>
          </div>
          <div className="text-right shrink-0">
            <Stars rating={entry.rating} />
            <p className="text-xs font-semibold text-navy-400 mt-1">{entry.priceRange}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{entry.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {entry.services.map((s) => (
            <span key={s} className="text-[11px] bg-navy-50 text-navy-500 px-2 py-0.5 rounded-full font-medium">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="flex border-t border-navy-50">
        <a
          href={`tel:${entry.phone}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-navy-500 text-sm font-semibold active:bg-navy-50 transition"
        >
          <span className="text-base leading-none">📞</span> Llamar
        </a>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#25D366] text-white text-sm font-semibold active:brightness-90 transition"
        >
          <span className="text-base leading-none">💬</span> WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function DirectoryView() {
  const [filter, setFilter] = useState<Filter>('todos');
  const [query, setQuery] = useState('');

  const list = useMemo(() => {
    return directoryEntries.filter((e) => {
      const matchCat = filter === 'todos' || e.category === filter;
      const q = query.trim().toLowerCase();
      const matchQ = !q || e.name.toLowerCase().includes(q) || e.address.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [filter, query]);

  return (
    <div className="h-full overflow-y-auto bg-gray-50 pb-24">
      <div className="bg-navy-500 text-white px-4 pt-5 pb-5">
        <h1 className="font-display font-bold text-xl">Directorio</h1>
        <p className="text-sm text-navy-100 mt-0.5">Hoteles y restaurantes cercanos</p>

        <div className="mt-4 relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o dirección..."
            className="w-full bg-white text-navy-600 placeholder:text-navy-200 rounded-full pl-10 pr-4 py-2.5 text-sm outline-none shadow-card"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-300 text-base">🔍</span>
        </div>

        <div className="flex gap-2 mt-3">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                filter === f.key ? 'bg-gold-500 text-navy-600' : 'bg-navy-400 text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        {list.length === 0 ? (
          <div className="text-center py-12 text-navy-300">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-sm">No se encontraron resultados.</p>
          </div>
        ) : (
          list.map((e) => <DirectoryCard key={e.id} entry={e} />)
        )}
      </div>
    </div>
  );
}
