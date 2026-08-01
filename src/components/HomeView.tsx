import { useState } from 'react';
import InstallPWA from '@/components/InstallPWA';
import { type TabId } from '@/components/BottomNav';
import { PhoneCall, AlertTriangle, ShieldAlert, HeartPulse, Flame, Ambulance, X } from 'lucide-react';

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

export default function HomeView({ onNavigate }: HomeProps) {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 px-4 pt-6 pb-24">
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
