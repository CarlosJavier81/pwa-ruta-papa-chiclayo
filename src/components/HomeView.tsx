import { useState } from 'react';
import InstallPWA from '@/components/InstallPWA';
import { type TabId } from '@/components/BottomNav';
import { 
  PhoneCall, 
  AlertTriangle, 
  ShieldAlert, 
  HeartPulse, 
  Flame, 
  Ambulance, 
  X, 
  Utensils, 
  MapPin, 
  ExternalLink, 
  ChevronRight, 
  Store,
  Compass,
  Landmark,
  CheckCircle2
} from 'lucide-react';

interface HomeProps {
  onNavigate: (view: TabId) => void;
}

// Interfaces para las estructuras de datos
interface Dish {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  recommendedPlaces: {
    name: string;
    address: string;
  }[];
}

interface Destination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
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

// Data de los 5 Platos Típicos
const chiclayoDishes: Dish[] = [
  {
    id: 'c1',
    name: 'Ceviche a la Norteña',
    tagline: 'Con tortitas de choclo y zarandaja',
    description: 'El clásico ceviche chiclayano preparado con pescado fresco del día, ají mochero, limón sutil y acompañado infaltablemente de tortitas de choclo doradas y zarandaja.',
    image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=600&q=80',
    recommendedPlaces: [
      { name: 'Restaurante El Cántaro', address: 'Calle Dos de Mayo 180, Lambayeque' },
      { name: 'La Rompe Ola', address: 'Av. Rivera del Mar, Pimentel' },
      { name: 'Cevicheria Mi Lanchita', address: 'Av. Bolognesi 534, Chiclayo' },
    ],
  },
  {
    id: 'c2',
    name: 'Arroz con Pato',
    tagline: 'Tradición Moche con chicha de jora',
    description: 'Emblemático plato preparado con pato tierno guisado en chicha de jora, culantro fresco y cerveza negra, servido con arroz graneado verdoso y salsa criolla.',
    image: 'https://jameaperu.com/assets/images/arroz-con-pato_800x534.webp',
    recommendedPlaces: [
      { name: 'Fiesta Gourmet', address: 'Av. Salaverry 1820, Chiclayo' },
      { name: 'El Rincón del Pato', address: 'Av. Leguía 620, Chiclayo' },
      { name: 'Restaurante Hebrón', address: 'Av. Balta 605, Chiclayo' },
    ],
  },
  {
    id: 'c3',
    name: 'Seco de Cabrito',
    tagline: 'Tierna carne con frijoles camanejos',
    description: 'Cabrito de leche macerado en chicha de jora y loche rayado, cocinado a fuego lento con culantro. Se sirve acompañado de jugosos frijoles y yuca sancochada.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM3avfamjmUWCxO6PLw-4UzJLMYt6DNlesKRXyM_clLQ&s=10',
    recommendedPlaces: [
      { name: 'Restaurante El Huaralino', address: 'La Victoria, Chiclayo' },
      { name: 'Sabor Norteño', address: 'Ca. Izaga 432, Chiclayo' },
      { name: 'Tradición Lambayecana', address: 'Km 7.5 Carretera a Pimentel' },
    ],
  },
  {
    id: 'c4',
    name: 'Espesado Chiclayano',
    tagline: 'Plato ancestral de choclo y loche',
    description: 'Un guiso prehispánico a base de choclo tierno molido con culantro y zapallo loche, servido tradicionalmente los días lunes con carne de pecho de res y arroz amarillo.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPQxPlWBi4CNEi7RFl3CfrBaY8Irr3rPtU9hf9vX3DTgX6134c4hbqlbk&s=10',
    recommendedPlaces: [
      { name: 'Restaurante La Poma', address: 'Ferrenafe / Chiclayo Centro' },
      { name: 'Picantería La Norteñita', address: 'Ca. San Martín 210, Chiclayo' },
      { name: 'El Rincón de antaño', address: 'Monsefú, Lambayeque' },
    ],
  },
  {
    id: 'c5',
    name: 'Chinguirito',
    tagline: 'Guiso/Ceviche de pez guitarra seco',
    description: 'Joyita de la gastronomía chiclayana preparada con tiras de pez guitarra seco y deshilachado, sazonado con limón sutil, cebolla roja, ají mochero y yuca.',
    image: 'https://cdn.tasteatlas.com/images/dishes/d1b7559fd70546c499a07c702bdabbfe.jpg?m=facebook',
    recommendedPlaces: [
      { name: 'Cevichería Los Mochicas', address: 'Pimentel, Lambayeque' },
      { name: 'El Cántaro', address: 'Calle Dos de Mayo 180, Lambayeque' },
      { name: 'Mar & Selva', address: 'Av. Grau 412, Chiclayo' },
    ],
  },
];

// Data de los 5 Destinos Turísticos Imperdibles
const chiclayoDestinations: Destination[] = [
  {
    id: 'd1',
    name: 'Balneario de Pimentel',
    tagline: 'Muelle histórico y caballitos de totora',
    description: 'El balneario más importante de Lambayeque. Destaca por su majestuoso e histórico muelle de madera, sus atardeceres dorados y los tradicionales pescadores en caballitos de totora.',
    image: 'https://images.myguide-cdn.com/peru/companies/pimentel-beach/large/pimentel-beach-630849.jpg',
    highlights: [
      'Paseo por el Muelle de Pimentel más largo del Perú',
      'Observación del arte de pesca en Caballitos de Totora',
      'Paseos en malecón y gastronomía marina frente al mar',
    ],
  },
  {
    id: 'd2',
    name: 'Museo Tumbas Reales de Sipán',
    tagline: 'El mayor hallazgo arqueológico del continente',
    description: 'Ubicado en Lambayeque (a 15 min de Chiclayo), este museo con arquitectura inspirada en las pirámides moche alberga el fabuloso tesoro de oro, plata y ornamentos del Señor de Sipán.',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
    highlights: [
      'Exposición de la tumba intacta del Gobernador Moche',
      'Más de 2,000 piezas de oro, plata y cobre dorado',
      'Recorrido con tecnología de proyección interactiva',
    ],
  },
  {
    id: 'd3',
    name: 'Santuario Histórico Bosque de Pómac',
    tagline: 'Naturaleza, algarrobos y pirámides Moche',
    description: 'Área natural protegida que alberga la mayor formación de algarrobos del planeta y el complejo arqueológico de Sicán con más de 30 pirámides trincadas en medio de la naturaleza.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
    highlights: [
      'Caminata hacia el Algarrobo Milenario',
      'Vista panorámica desde el Mirador Las Ventanas',
      'Avistamiento de aves endémicas de la costa norte',
    ],
  },
  {
    id: 'd4',
    name: 'Catedral y Parque Principal',
    tagline: 'El corazón neoclásico de Chiclayo',
    description: 'El punto de encuentro social de la ciudad. Su Catedral neoclásica diseñada en el siglo XIX destaca por sus tres arcos de portada y sus dos hermosas torres campanario.',
    image: 'https://images.unsplash.com/photo-1548625361-185675f3a027?auto=format&fit=crop&w=600&q=80',
    highlights: [
      'Paseo peatonal por los jardines del Parque Principal',
      'Visita interior a la Santa Iglesia Catedral',
      'Cercanía a la zona comercial y pasajes históricos',
    ],
  },
  {
    id: 'd5',
    name: 'Mercado Modelo y Mercado de Brujos',
    tagline: 'Misticismo, medicina tradicional y artesanía',
    description: 'Un rincón cultural fascinante y único en la región norte. En su interior se encuentra la sección de chamanismo y curanderismo con hierbas, amuletos y tradiciones ancestrales.',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=600&q=80',
    highlights: [
      'Pasillos de medicina tradicional y hierbas medicinales',
      'Venta de artesanías, sombreros de paja y recuerdos',
      'Experiencia inmersiva en el misticismo norteño',
    ],
  },
];

export default function HomeView({ onNavigate }: HomeProps) {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

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

      {/* SECCIÓN 1 GASTRONOMÍA: 5 Platos Típicos */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3.5 px-0.5">
          <div>
            <h2 className="font-bold text-navy-600 text-base leading-tight">Platos Típicos de Chiclayo</h2>
            <p className="text-[11px] text-gray-500">Sabor y tradición lambayecana</p>
          </div>
          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1">
            <Utensils size={12} /> Gastronomía
          </span>
        </div>

        {/* Grid de 2 Columnas */}
        <div className="grid grid-cols-2 gap-3">
          {chiclayoDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm active:scale-95 transition cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-28 w-full bg-navy-100 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  Ver opción <ChevronRight size={10} />
                </span>
              </div>

              <div className="p-3 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-bold text-navy-600 text-xs leading-snug line-clamp-1">{dish.name}</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2 leading-tight">
                    {dish.tagline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN 2 TURISMO: 5 Destinos Imperdibles */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3.5 px-0.5">
          <div>
            <h2 className="font-bold text-navy-600 text-base leading-tight">Destinos Imperdibles</h2>
            <p className="text-[11px] text-gray-500">Playas, museos y cultura Moche</p>
          </div>
          <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2.5 py-1 rounded-full border border-sky-200 flex items-center gap-1">
            <Compass size={12} /> Turismo
          </span>
        </div>

        {/* Grid de 2 Columnas */}
        <div className="grid grid-cols-2 gap-3">
          {chiclayoDestinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => setSelectedDestination(dest)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm active:scale-95 transition cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-28 w-full bg-navy-100 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  Explorar <ChevronRight size={10} />
                </span>
              </div>

              <div className="p-3 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-bold text-navy-600 text-xs leading-snug line-clamp-1">{dest.name}</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2 leading-tight">
                    {dest.tagline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL GASTRONOMÍA */}
      {selectedDish && (
        <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl max-h-[88vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="relative h-48 w-full bg-navy-900 flex-shrink-0">
              <img
                src={selectedDish.image}
                alt={selectedDish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-wider font-bold text-gold-400 bg-black/40 px-2 py-0.5 rounded backdrop-blur-md">
                  Gastronomía Chiclayana
                </span>
                <h3 className="font-bold text-xl leading-tight mt-1">{selectedDish.name}</h3>
              </div>
            </div>

            <div className="p-4 overflow-y-auto space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase text-navy-400 tracking-wider mb-1">Descripción</h4>
                <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {selectedDish.description}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Store size={15} className="text-gold-600" />
                  <h4 className="text-xs font-bold uppercase text-navy-600 tracking-wider">
                    ¿Dónde probarlo en Chiclayo?
                  </h4>
                </div>

                <div className="space-y-2">
                  {selectedDish.recommendedPlaces.map((place, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl border border-gray-100 bg-white shadow-2xs"
                    >
                      <div className="w-6 h-6 rounded-lg bg-gold-100 text-gold-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-xs text-navy-600 leading-tight">{place.name}</h5>
                        <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                          <MapPin size={11} className="flex-shrink-0" />
                          <span className="truncate">{place.address}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3.5 border-t border-gray-100 bg-gray-50 flex gap-2">
              <button
                onClick={() => {
                  setSelectedDish(null);
                  onNavigate('directorio');
                }}
                className="flex-1 py-2.5 bg-navy-500 text-white text-xs font-bold rounded-xl active:scale-98 transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Ver Huariques en Directorio</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TURISMO */}
      {selectedDestination && (
        <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl max-h-[88vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="relative h-48 w-full bg-navy-900 flex-shrink-0">
              <img
                src={selectedDestination.image}
                alt={selectedDestination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <button
                onClick={() => setSelectedDestination(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-wider font-bold text-sky-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-md">
                  Destino Turístico
                </span>
                <h3 className="font-bold text-xl leading-tight mt-1">{selectedDestination.name}</h3>
              </div>
            </div>

            <div className="p-4 overflow-y-auto space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase text-navy-400 tracking-wider mb-1">Acerca del Destino</h4>
                <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {selectedDestination.description}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Landmark size={15} className="text-sky-600" />
                  <h4 className="text-xs font-bold uppercase text-navy-600 tracking-wider">
                    ¿Qué hacer o ver aquí?
                  </h4>
                </div>

                <div className="space-y-2">
                  {selectedDestination.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl border border-gray-100 bg-sky-50/40"
                    >
                      <CheckCircle2 size={16} className="text-sky-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-navy-700 font-medium leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3.5 border-t border-gray-100 bg-gray-50 flex gap-2">
              <button
                onClick={() => {
                  setSelectedDestination(null);
                  onNavigate('mapa');
                }}
                className="flex-1 py-2.5 bg-sky-600 text-white text-xs font-bold rounded-xl active:scale-98 transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Ver Ubicación en el Mapa</span>
                <MapPin size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EMERGENCIAS */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200">
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
