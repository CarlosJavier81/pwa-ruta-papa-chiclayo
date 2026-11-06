export type MapPointCategory = 'papa' | 'iglesia' | 'hotel' | 'restaurante' | 'punto' | 'seguridad' | 'transporte';

export interface MapPoint {
  id: string;
  name: string;
  category: MapPointCategory;
  lat: number;
  lng: number;
  description: string;
  address?: string;
  schedule?: string;
}

export type DirectoryCategory = 'hotel' | 'restaurante';

export interface DirectoryEntry {
  id: string;
  name: string;
  category: DirectoryCategory;
  address: string;
  phone: string;
  whatsapp: string;
  rating: number;
  priceRange: string;
  description: string;
  services: string[];
  lat: number;
  lng: number;
}

export interface GuideTip {
  id: string;
  icon: string;
  title: string;
  body: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
}

export const mapPoints: MapPoint[] = [
  {
    id: 'mp1',
    name: 'Aeropuerto Internacional Cap. FAP José A. Quiñones',
    category: 'transporte',
    lat: -6.7819,
    lng: -79.8306,
    description: 'Puerta de entrada aérea a Chiclayo. Llegada de peregrinos y autoridades.',
    address: 'Av. Bolognesi 800, Chiclayo',
  },
  {
    id: 'mp2',
    name: 'Plaza de Armas de Chiclayo',
    category: 'punto',
    lat: -6.7710,
    lng: -79.8400,
    description: 'Corazón de la ciudad. Punto de reunión y bienvenida oficial.',
    address: 'Plaza de Armas, Chiclayo',
  },
  {
    id: 'mp3',
    name: 'Catedral de Chiclayo - Santa María',
    category: 'iglesia',
    lat: -6.7708,
    lng: -79.8395,
    description: 'Sede principal de las celebraciones litúrgicas. Capacidad ampliada para la misa papal.',
    address: 'Av. Sáenz Peña 975, Chiclayo',
    schedule: 'Misas: 06:00, 08:00, 10:00, 18:00',
  },
  {
    id: 'mp4',
    name: 'Parque Principal - Escenario Papal',
    category: 'papa',
    lat: -6.7725,
    lng: -79.8410,
    description: 'Escenario principal donde el Santo Padre celebrará la misa multitudinaria. Acceso con ticket gratuito.',
    address: 'Av. Balta s/n, Chiclayo',
    schedule: 'Apertura de puertas: 05:00',
  },
  {
    id: 'mp5',
    name: 'Santuario de la Virgen de la Inmaculada',
    category: 'iglesia',
    lat: -6.7750,
    lng: -79.8380,
    description: 'Parada del recorrido papal. Bendición y saludo a los fieles.',
    address: 'Calle Tacna 240, Chiclayo',
  },
  {
    id: 'mp6',
    name: 'Hospital Nacional Almanzor Aguinaga Asenjo',
    category: 'seguridad',
    lat: -6.7680,
    lng: -79.8350,
    description: 'Puesto médico principal durante la visita. Atención 24 horas para emergencias.',
    address: 'Av. Quiñones 1190, Chiclayo',
    schedule: '24 horas',
  },
  {
    id: 'mp7',
    name: 'Terminal Terrestre Chiclayo',
    category: 'transporte',
    lat: -6.7760,
    lng: -79.8320,
    description: 'Llegada de buses de peregrinos desde el norte del país. Servicio especial reforzado.',
    address: 'Av. Víctor Raúl Haya de la Torre 600, Chiclayo',
  },
  {
    id: 'mp8',
    name: 'Comisaría de Chiclayo - Punto de Información',
    category: 'seguridad',
    lat: -6.7730,
    lng: -79.8420,
    description: 'Punto de información y seguridad ciudadana. Reporte de extravíos.',
    address: 'Calle San José 821, Chiclayo',
    schedule: '24 horas',
  },
  {
    id: 'mp9',
    name: 'Hotel Costa del Sol Wyndham Chiclayo',
    category: 'hotel',
    lat: -6.7745,
    lng: -79.8365,
    description: 'Alojamiento oficial. A 5 minutos del escenario papal.',
    address: 'Av. Luis Gonzáles 1015, Chiclayo',
  },
  {
    id: 'mp10',
    name: 'Restaurante Rústico',
    category: 'restaurante',
    lat: -6.7715,
    lng: -79.8390,
    description: 'Comida regional: arroz con pato, chirimpisco. Menú del día.',
    address: 'Av. Sáenz Peña 850, Chiclayo',
  },
];

export const directoryEntries: DirectoryEntry[] = [
  // --- HOTELES ---
  {
    id: 'h1',
    name: 'Hotel Costa del Sol Wyndham Chiclayo',
    category: 'hotel',
    address: 'Av. Luis Gonzáles 1015, Chiclayo',
    phone: '+5174227272',
    whatsapp: '980123456',
    rating: 4.6,
    priceRange: 'S/ 250 - 450',
    description: 'Hotel 4 estrellas con piscina, gimnasio y restaurante. A 5 min del escenario papal.',
    services: ['Wifi', 'Desayuno', 'Estacionamiento', 'Gimnasio', 'A/C', 'Piscina'],
    lat: -6.7745,
    lng: -79.8365,
  },
  {
    id: 'h2',
    name: 'Casa Andina Select Chiclayo',
    category: 'hotel',
    address: 'Federico Villarreal 115, Chiclayo',
    phone: '+517474234911',
    whatsapp: '970222334',
    rating: 4.5,
    priceRange: 'S/ 280 - 480',
    description: 'Hotel 4 estrellas con piscina al aire libre, spa, gimnasio y restaurante buffet. Excelente ubicación céntrica.',
    services: ['Wifi', 'Desayuno', 'Estacionamiento', 'Gimnasio', 'Piscina', 'A/C'],
    lat: -6.7731,
    lng: -79.8458,
  },
  {
    id: 'h3',
    name: 'Sunec Hotel Chiclayo',
    category: 'hotel',
    address: 'Manuel María Izaga 472, Chiclayo',
    phone: '+5174205110',
    whatsapp: '987654321',
    rating: 4.4,
    priceRange: 'S/ 160 - 280',
    description: 'Hotel contemporáneo que destaca por su piscina y bar en la azotea con vista panorámica a la ciudad.',
    services: ['Wifi', 'Desayuno', 'Restaurante', 'Bar', 'Piscina', 'A/C'],
    lat: -6.7728,
    lng: -79.8378,
  },
  {
    id: 'h4',
    name: 'Win&Win Hotel y Casino',
    category: 'hotel',
    address: 'Av. Francisco Bolognesi 756, Chiclayo',
    phone: '+51993505728',
    whatsapp: '987111223',
    rating: 4.3,
    priceRange: 'S/ 180 - 320',
    description: 'Amplio complejo hotelero tradicional con piscina exterior, dos restaurantes, bar y área de entretenimiento.',
    services: ['Wifi', 'Desayuno', 'Estacionamiento', 'Piscina', 'Restaurante', 'A/C'],
    lat: -6.7788,
    lng: -79.8351,
  },
  {
    id: 'h5',
    name: 'Hotel Mochiks Chiclayo',
    category: 'hotel',
    address: 'Calle Tacna 615, Chiclayo',
    phone: '+5174205485',
    whatsapp: '987222333',
    rating: 4.3,
    priceRange: 'S/ 140 - 240',
    description: 'Hotel céntrico ideal para turismo cultural, con restaurante de gastronomía local y amplios salones.',
    services: ['Wifi', 'Desayuno', 'Restaurante', 'A/C'],
    lat: -6.7712,
    lng: -79.8370,
  },
  {
    id: 'h6',
    name: 'Zentra Hotel',
    category: 'hotel',
    address: 'Leoncio Prado 919, Chiclayo',
    phone: '+51924048177',
    whatsapp: '987333444',
    rating: 4.1,
    priceRange: 'S/ 110 - 180',
    description: 'Alojamiento moderno y práctico con instalaciones impecables, ideal para peregrinos y estadías cortas.',
    services: ['Wifi', 'Desayuno', 'A/C'],
    lat: -6.7749,
    lng: -79.8402,
  },

  // --- RESTAURANTES ---
  {
    id: 'r1',
    name: 'Don Juan Plazuela',
    category: 'restaurante',
    address: 'Elías Aguirre 110, Chiclayo',
    phone: '+51923657673',
    whatsapp: '988000111',
    rating: 4.9,
    priceRange: 'S/ 35 - 75',
    description: 'Especialistas en ceviches, arroz con mariscos y cocina marina tradicional chiclayana con insumos frescos.',
    services: ['Para llevar', 'Mesas interiores', 'Reservas'],
    lat: -6.7698,
    lng: -79.8355,
  },
  {
    id: 'r2',
    name: 'Fiesta Restaurant - Sede Chiclayo',
    category: 'restaurante',
    address: 'Av. Salaverry 1820, Chiclayo',
    phone: '+51924516825',
    whatsapp: '988000222',
    rating: 4.4,
    priceRange: 'S/ 70 - 160',
    description: 'Alta gastronomía norteña de renombre internacional. Famoso por su ceviche caliente a las brasas y cabrito lechal.',
    services: ['Reservas', 'Estacionamiento', 'A/C'],
    lat: -6.7865,
    lng: -79.8492,
  },
  {
    id: 'r3',
    name: 'La B Restaurante | Chiclayo',
    category: 'restaurante',
    address: 'Av. Santa Victoria 789, Chiclayo',
    phone: '+51997527719',
    whatsapp: '988000333',
    rating: 4.7,
    priceRange: 'S/ 30 - 65',
    description: 'Platos criollos contemporáneos, pastas y excelente coctelería en la zona residencial y gastronómica de Santa Victoria.',
    services: ['Reservas', 'Mesas exteriores'],
    lat: -6.7812,
    lng: -79.8421,
  },
  {
    id: 'r4',
    name: 'URUMANKA BARRA RESTAURANTE',
    category: 'restaurante',
    address: 'Margaritas 396, Chiclayo',
    phone: '+51962751418',
    whatsapp: '988000444',
    rating: 4.6,
    priceRange: 'S/ 25 - 55',
    description: 'Barra marina e innovadora con variedad de tiraditos, arroces marineros y bebidas de autor en ambiente relajado.',
    services: ['Para llevar', 'Delivery'],
    lat: -6.7825,
    lng: -79.8440,
  },
  {
    id: 'r5',
    name: 'El Cántaro Restaurant Turístico',
    category: 'restaurante',
    address: '2 de Mayo 180, Lambayeque',
    phone: '+51948148892',
    whatsapp: '988000555',
    rating: 4.3,
    priceRange: 'S/ 35 - 80',
    description: 'Legendario restaurante de comida típica norteña: Arroz con Pato tradicional, Espesado y Causa Ferreñafana.',
    services: ['Estacionamiento', 'Mesas exteriores', 'Reservas'],
    lat: -6.7032,
    lng: -79.9051,
  },
];

export const guideTips: GuideTip[] = [
  {
    id: 't1',
    icon: 'ShieldCheck',
    title: 'Entradas personales e intransferibles',
    body: 'Todas las entradas (con código QR y CHL) son nominativas y personales. Está prohibida su reventa. Todos, incluidos los niños, necesitan su propia entrada y deben ir acompañados de un adulto responsable.',
  },
  {
    id: 't2',
    icon: 'Users',
    title: 'Límite de entradas en Joinnus',
    body: 'Para la Santa Misa en Pampas de Pimentel se permite hasta 3 entradas por persona. Para la Coronación de la Virgen en la Catedral, solo 1 entrada por persona (búscalas en Joinnus > "Mis entradas").',
  },
  {
    id: 't3',
    icon: 'Phone',
    title: 'Documento de identidad obligatorio',
    body: 'Para ingresar debes presentar tu entrada (digital o impresa) junto al mismo DNI, Carné de Extranjería o Pasaporte que registraste al solicitarla.',
  },
  {
    id: 't4',
    icon: 'Clock',
    title: 'Llegada anticipada y accesos',
    body: 'Revisa el horario indicado en tu entrada. Acude con anticipación: una vez cerrado el acceso a los sectores, no se permitirá el ingreso por ningún motivo.',
  },
  {
    id: 't5',
    icon: 'Sun',
    title: 'Mochila ligera recomendada',
    body: 'Prepara una mochila ligera con agua en botella de plástico, protector solar, gorra/sombrero, poncho impermeable, alimentos empaquetados (galletas, frutos secos) y un banco pequeño plegable.',
  },
  {
    id: 't6',
    icon: 'Heart',
    title: 'Permanencia de pie',
    body: 'No habrá sillas para el público general. Ven preparado para permanecer de pie durante la celebración (solo habrá asientos en zonas de adultos mayores y discapacidad).',
  },
  {
    id: 't7',
    icon: 'Droplets',
    title: 'Objetos prohibidos',
    body: 'Están prohibidos paraguas/sombrillas, cuchillos, tijeras, drones, selfie sticks, punteros láser, carteles rígidos grandes y estructuras de camping o sillas plegables grandes.',
  },
  {
    id: 't8',
    icon: 'MapPin',
    title: 'Encuentros específicos',
    body: 'Los eventos en Zaña, Santuario y USAT están dirigidos a públicos específicos con convocatoria previa, por lo que no son de ingreso libre para el público general.',
  },
];

export const checklistItems: ChecklistItem[] = [
  { id: 'c1', label: 'Entrada digital o impresa con código QR (Joinnus)' },
  { id: 'c2', label: 'Documento de identidad físico (DNI / Carné de Extranjería / Pasaporte)' },
  { id: 'c3', label: 'Botella de agua en envase de plástico (prohibido vidrio)' },
  { id: 'c4', label: 'Protector solar y gorra o sombrero' },
  { id: 'c5', label: 'Poncho impermeable' },
  { id: 'c6', label: 'Alimentos empaquetados (galletas, frutos secos, barras de cereal)' },
  { id: 'c7', label: 'Banco pequeño y plegable (opcional para descanso)' },
  { id: 'c8', label: 'Mochila ligera sin objetos prohibidos ni sombrillas' },
  { id: 'c9', label: 'Ropa cómoda y adecuada para estar de pie' },
];
