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
  {
    id: 'd1',
    name: 'Hotel Costa del Sol Wyndham Chiclayo',
    category: 'hotel',
    address: 'Av. Luis Gonzáles 1015, Chiclayo',
    phone: '+51980123456',
    whatsapp: '980123456',
    rating: 4.6,
    priceRange: 'S/ 250 - 450',
    description: 'Hotel 4 estrellas con piscina, gimnasio y restaurante. A 5 min del escenario papal.',
    services: ['Wifi', 'Desayuno', 'Estacionamiento', 'Gimnasio', 'A/C'],
    lat: -6.7745,
    lng: -79.8365,
  },
  {
    id: 'd2',
    name: 'Casa Andina Standard Chiclayo',
    category: 'hotel',
    address: 'Av. Larco 600, Chiclayo',
    phone: '+519702223344',
    whatsapp: '970222334',
    rating: 4.4,
    priceRange: 'S/ 180 - 320',
    description: 'Cadena nacional con habitaciones cómodas y desayuno buffet incluido.',
    services: ['Wifi', 'Desayuno', 'Estacionamiento'],
    lat: -6.7760,
    lng: -79.8375,
  },
  {
    id: 'd3',
    name: 'Hotel Sunec',
    category: 'hotel',
    address: 'Calle Washington 740, Chiclayo',
    phone: '+51987654321',
    whatsapp: '987654321',
    rating: 4.1,
    priceRange: 'S/ 120 - 200',
    description: 'Opción económica y céntrica, ideal para peregrinos. Habitaciones simples y limpias.',
    services: ['Wifi', 'Desayuno'],
    lat: -6.7700,
    lng: -79.8385,
  },
  {
    id: 'd4',
    name: 'Hotel Real Chiclayo',
    category: 'hotel',
    address: 'Av. José Balta 850, Chiclayo',
    phone: '+519871112233',
    whatsapp: '987111223',
    rating: 4.3,
    priceRange: 'S/ 200 - 350',
    description: 'Hotel boutique con restaurante de comida norteña y bar en la azotea.',
    services: ['Wifi', 'Desayuno', 'Restaurante', 'Bar', 'A/C'],
    lat: -6.7720,
    lng: -79.8410,
  },
  {
    id: 'd5',
    name: 'Restaurante Rústico',
    category: 'restaurante',
    address: 'Av. Sáenz Peña 850, Chiclayo',
    phone: '+519880001111',
    whatsapp: '988000111',
    rating: 4.5,
    priceRange: 'S/ 25 - 60',
    description: 'Comida regional lambayecana: arroz con pato, chirimpisco, ceviche.',
    services: ['Reservas', 'Para llevar', 'Mesas exteriores'],
    lat: -6.7715,
    lng: -79.8390,
  },
  {
    id: 'd6',
    name: 'Cevichería El Dorado',
    category: 'restaurante',
    address: 'Av. Bolognesi 1200, Chiclayo',
    phone: '+519880002222',
    whatsapp: '988000222',
    rating: 4.7,
    priceRange: 'S/ 30 - 70',
    description: 'El mejor ceviche de la región. Pescado fresco del día y mariscos.',
    services: ['Reservas', 'Delivery', 'Para llevar'],
    lat: -6.7690,
    lng: -79.8330,
  },
  {
    id: 'd7',
    name: 'Chifa Mandarin',
    category: 'restaurante',
    address: 'Calle San José 450, Chiclayo',
    phone: '+519880003333',
    whatsapp: '988000333',
    rating: 4.2,
    priceRange: 'S/ 20 - 45',
    description: 'Cocina chino-peruana. Chaufa, saltado y sopa wantán. Atención rápida.',
    services: ['Delivery', 'Para llevar'],
    lat: -6.7735,
    lng: -79.8415,
  },
  {
    id: 'd8',
    name: 'Picantería La Cantina',
    category: 'restaurante',
    address: 'Av. Balta 1100, Chiclayo',
    phone: '+519880004444',
    whatsapp: '988000444',
    rating: 4.4,
    priceRange: 'S/ 25 - 55',
    description: 'Picantería tradicional con chicha de jora y platos norteños.',
    services: ['Reservas', 'Mesas exteriores'],
    lat: -6.7740,
    lng: -79.8400,
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
