import { useState } from 'react';
import InstallPWA from '@/components/InstallPWA';
import { type TabId } from '@/components/BottomNav';
import { PhoneCall, AlertTriangle, ShieldAlert, HeartPulse, Flame, Ambulance, X, Utensils, MapPin, ExternalLink } from 'lucide-react';

interface HomeProps {
  onNavigate: (view: TabId) => void;
}

// Lista de números de emergencia en Chiclayo
const emergencyNumbers = [
  {
    name: 'Policía Nacional (Chiclayo)',
    number: '105',
    altNumber: '(074) 237777',
    icon: ShieldAlert,
    bgColor: 'bg-red-50 text-red-600',
  },
  {
    name: 'Bomberos (Salvadora Chiclayo N° 27)',
    number: '116',
    altNumber: '(074) 233333',
    icon: Flame,
    bgColor: 'bg-orange-50 text-orange-600',
  },
  {
    name: 'SAMU (Ambulancia)',
    number: '106',
    altNumber: '',
    icon: Ambulance,
    bgColor: 'bg-emerald-50 text-emerald-600',
  },
  {
    name: 'Serenazgo Chiclayo',
    number: '(074) 205210',
    altNumber: '(074) 227598',
    icon: PhoneCall,
    bgColor: 'bg-blue-50 text-blue-600',
  },
  {
    name: 'Hospital Las Mercedes (Emergencias)',
    number: '(074) 237021',
    altNumber: '',
    icon: HeartPulse,
    bgColor: 'bg-rose-50 text-rose-600',
  },
  {
    name: 'Hospital Almanzor Aguinaga (EsSalud)',
    number: '(074) 237821',
    altNumber: '',
    icon: HeartPulse,
    bgColor: 'bg-sky-50 text-sky-600',
  },
];

// Destacados de Chiclayo (Gastronomía y Turismo)
const chiclayoHighlights = [
  {
    id: 'h1',
    title: 'Ceviche a la Norteña',
    subtitle: 'Con tortitas de choclo y sarandaja',
    category: 'Gastronomía',
    badgeBg: 'bg-amber-500/90',
    image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=600&q=80',
    targetTab: 'directorio' as TabId,
  },
  {
    id: 'h2',
    title: 'Muelle de Pimentel',
    subtitle: 'Caballitos de totora y atardeceres',
    category: 'Destino Imperdible',
    badgeBg: 'bg-sky-600/90',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    targetTab: 'mapa' as TabId,
  },
  {
    id: 'h3',
    title: 'Arroz con Pato',
    subtitle: 'Tradición gastronómica de Lambayeque',
    category: 'Gastronomía',
    badgeBg: 'bg-amber-500/90',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    targetTab: 'directorio' as TabId,
  },
  {
    id: 'h4',
    title: 'Catedral de Chiclayo',
    subtitle: 'Arquitectura neoclásica en el Parque Principal',
    category: 'Cultura',
    badgeBg: 'bg-purple-600/90',
    image: 'https://images.unsplash.com/photo-1548625361-185675f3a027?auto=format&fit=crop&w=600&q=80',
    targetTab: 'mapa' as TabId,
  },
];

export default function HomeView({ onNavigate }: HomeProps) {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-gray-50 px-4 pt-6 pb-28">
      {/* Banner de Bienvenida */}
      <div className="bg-navy-500 text-white rounded-2xl p-5 mb-6 shadow-card">
        <span className="text-xs uppercase font-bold tracking-widest text-gold-500">Guía Chiclayo - Perú</span>
        <h1 className="font-display font-bold text-2xl mt-1">Ruta Papal Chiclayo</h1>
        <p className="text-xs text-navy-100 mt-2 leading-relaxed">
          Explora la ruta, consulta los puntos de interés, alojamientos y accesos recomendados.
        </p>

        {/* Botón / Instructivo de Instalación PWA */}
        <InstallPWA />
      </div>

      {/* Grid de Cards principales */}
      <div className="grid grid-cols-1 gap-4">
        {/* Card Principal: El Mapa */}
        <button
          onClick={() => onNavigate('mapa')}
          className="flex items-center justify-between bg-white border-2 border-gold-500 rounded-2xl p-4 shadow-sm active:scale-98 transition text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gold-100 text-gold-600 flex items-center justify-center text-2xl">
              🗺️
            </div>
            <div>
              <h2 className="font-bold text-navy-600 text-base">Mapa Interactivo</h2>
              <p className="text-xs text-gray-500">Ruta completa, templos y atractivos</p>
            </div>
          </div>
          <span className="text-navy-500 text-lg font-bold">→</span>
        </button>

        {/* Card 2: Servicios y Hospedajes */}
        <button
          onClick={() => onNavigate('directorio')}
          className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm active:scale-98 transition text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-500 flex items-center justify-center text-2xl">
              🏨
            </div>
            <div>
              <h2 className="font-bold text-navy-600 text-base">Directorio</h2>
              <p className="text-xs text-gray-500">Restaurantes, hoteles y puntos clave</p>
            </div>
          </div>
          <span className="text-gray-400 text-lg font-bold">→</span>
        </button>

        {/* Card 3: Teléfonos de Emergencia */}
        <button
          onClick={() => setShowEmergencyModal(true)}
          className="flex items-center justify-between bg-red-50/60 border border-red-200 rounded-2xl p-4 shadow-sm active:scale-98 transition text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-500 text-white flex items-center justify-center text-xl shadow-sm">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="font-bold text-red-950 text-base">Números de Emergencia</h2>
              <p className="text-xs text-red-700/80">Policía, Serenazgo, Bomberos y SAMU</p>
            </div>
          </div>
          <span className="text-red-500 text-lg font-bold">→</span>
        </button>
      </div>

      {/* SECCIÓN DESTACADOS: Gastronomía y Turismo en Chiclayo */}
      <div className="mt-7">
        <div className="flex items-center justify-between mb-3 px-0.5">
          <div>
            <h2 className="font-bold text-navy-600 text-base leading-tight">Descubre Chiclayo</h2>
            <p className="text-[11px] text-gray-500">Gastronomía y atardeceres moche</p>
          </div>
          <span className="text-[11px] bg-gold-100 text-gold-700 font-bold px-2.5 py-1 rounded-full border border-gold-200">
            Lambayeque
          </span>
        </div>

        {/* Carrusel Horizontal con Scroll Snap */}
        <div className="flex gap-3.5 overflow-x-auto pb-3 pt-1 -mx-4 px-4 scrollbar-none snap-x snap-mandatory">
          {chiclayoHighlights.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate(item.targetTab)}
              className="snap-start flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm active:scale-98 transition cursor-pointer flex flex-col justify-between"
            >
              {/* Imagen de Portada con Badge */}
              <div className="relative h-36 w-full bg-navy-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-300 hover:scale-105"
                  loading="lazy"
                />
                <span
                  className={`absolute top-2.5 left-2.5 ${item.badgeBg} backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm`}
                >
                  {item.category}
                </span>
              </div>

              {/* Información textual */}
              <div className="p-3.5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-bold text-navy-600 text-sm leading-snug">{item.title}</h3>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-gray-50 flex items-center justify-between text-[11px] font-bold text-navy-500">
                  <span className="flex items-center gap-1 text-gold-600">
                    {item.targetTab === 'directorio' ? <Utensils size={13} /> : <MapPin size={13} />}
                    Ver en {item.targetTab === 'directorio' ? 'Directorio' : 'Mapa'}
                  </span>
                  <ExternalLink size={13} className="text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Emergente de Contactos */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200">
            {/* Header Modal */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-red-500 text-white">
              <div className="flex items-center gap-2">
                <AlertTriangle size={20} className="text-gold-300" />
                <h3 className="font-bold text-lg">Emergencias Chiclayo</h3>
              </div>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenido Modal / Lista de Contactos */}
            <div className="p-4 overflow-y-auto space-y-3">
              <p className="text-xs text-gray-500 mb-2">
                Presiona cualquier botón para realizar la llamada directamente desde tu dispositivo:
              </p>

              {emergencyNumbers.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white transition"
                  >
                    <div className="flex items-center gap-3 pr-2">
                      <div className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <IconComp size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs text-navy-600 leading-tight">{item.name}</h4>
                        {item.altNumber && (
                          <span className="text-[10px] text-gray-400 block mt-0.5">Fijo: {item.altNumber}</span>
                        )}
                      </div>
                    </div>

                    <a
                      href={`tel:${item.number.replace(/[^0-9]/g, '')}`}
                      className="flex items-center gap-1.5 bg-red-600 text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow-sm hover:bg-red-700 active:scale-95 transition flex-shrink-0"
                    >
                      <PhoneCall size={14} />
                      <span>{item.number}</span>
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Footer Modal */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="w-full py-2.5 bg-navy-500 text-white text-xs font-bold rounded-xl active:scale-98 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
