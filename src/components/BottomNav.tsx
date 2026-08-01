import { Home as HomeIcon, Map as MapIcon, BookOpen, ListChecks } from 'lucide-react';

export type TabId = 'home' | 'mapa' | 'directorio' | 'guia';

const tabs: { id: TabId; label: string; Icon: typeof MapIcon }[] = [
  { id: 'home', label: 'Inicio', Icon: HomeIcon },
  { id: 'mapa', label: 'Mapa', Icon: MapIcon },
  { id: 'directorio', label: 'Directorio', Icon: BookOpen },
  { id: 'guia', label: 'Guía', Icon: ListChecks },
];

export default function BottomNav({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (t: TabId) => void;
}) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-[1000] bg-white shadow-nav border-t border-navy-50">
      <div className="flex items-stretch justify-around px-2 pt-1.5 pb-2 safe-bottom">
        {tabs.map(({ id, label, Icon }) => {
          const on = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className="flex flex-col items-center gap-1 flex-1 py-1 transition"
            >
              <span
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  on ? 'bg-navy-500 text-gold-500 shadow-card scale-105' : 'text-navy-300'
                }`}
              >
                <Icon size={22} strokeWidth={on ? 2.5 : 2} />
              </span>
              <span
                className={`text-[11px] font-semibold tracking-wide ${
                  on ? 'text-navy-500' : 'text-navy-300'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
