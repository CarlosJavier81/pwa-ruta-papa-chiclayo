interface HomeProps {
  onNavigate: (view: 'home' | 'mapa' | 'directorio' | 'info') => void;
}

export default function HomeView({ onNavigate }: HomeProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 px-4 pt-6 pb-24">
      {/* Banner de Bienvenida */}
      <div className="bg-navy-500 text-white rounded-2xl p-5 mb-6 shadow-card">
        <span className="text-xs uppercase font-bold tracking-widest text-gold-500">Guía Oficial PWA</span>
        <h1 className="font-display font-bold text-2xl mt-1">Ruta Papal Chiclayo</h1>
        <p className="text-xs text-navy-100 mt-2 leading-relaxed">
          Explora la ruta, consulta los puntos de interés, alojamientos y accesos recomendados.
        </p>
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
              <h2 className="font-bold text-navy-600 text-base">Servicios y Hospedajes</h2>
              <p className="text-xs text-gray-500">Restaurantes, hoteles y puntos clave</p>
            </div>
          </div>
          <span className="text-gray-400 text-lg font-bold">→</span>
        </button>

      </div>
    </div>
  );
}
