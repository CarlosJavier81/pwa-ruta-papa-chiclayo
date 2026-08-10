export interface NewsItem {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  content: string;
  url: string; // URL externa del post o noticia completa
}

export const LATEST_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Confirmado: El Papa León XIV visitará el Perú del 11 al 17 de noviembre',
    imageUrl: 'https://larutadelpapaleonperu.com/wp-content/uploads/2026/08/papa-leon-visita-peru.webp',
    date: '10 de Agosto, 2026',
    content: 'El Vaticano ha confirmado oficialmente la llegada del Santo Padre al territorio peruano. La visita apostólica del Papa León XIV se llevará a cabo del 11 al 17 de noviembre de 2026, consolidándose como un evento histórico de profunda relevancia fe, unidad e impacto turístico para el país.',
    url: 'https://larutadelpapaleonperu.com/confirmado-el-papa-leon-xiv-visitara-el-peru-del-11-al-17-de-noviembre/'
  },
  {
    id: '2',
    title: 'Visita del Papa León XIV a Perú: Últimas Noticias, Fechas e Itinerario Oficial',
    imageUrl: 'https://larutadelpapaleonperu.com/wp-content/uploads/2026/07/papa_leon_port.jpg',
    date: '08 de Agosto, 2026',
    content: 'La expectativa crece en todo el país por la visita del Papa León XIV a Perú. Tras la audiencia que el presidente interino José María Balcázar sostuvo con el Papa León XIV en el Vaticano el 18 de junio de 2026, el gobierno peruano confirmó que el Pontífice realizará una Visita Apostólica a Perú en noviembre. La noticia ha encendido el fervor religioso y ha puesto en marcha un despliegue logístico sin precedentes, especialmente en el norte del país.',
    url: 'https://larutadelpapaleonperu.com/visita-del-papa-leon-xiv-a-peru/'
  },
  {
    id: '3',
    title: 'Historias de Fe: Los Lugares Clave que Marcaron la Vida del Papa León XIV en Chiclayo',
    imageUrl: 'https://larutadelpapaleonperu.com/wp-content/uploads/2026/07/catedral_chiclayo_peru-1.webp',
    date: '05 de Agosto, 2026',
    content: 'Antes de liderar la Iglesia global desde el Vaticano, Robert Prevost caminó por las calles de Lambayeque como un pastor cercano a su comunidad. Descubre las parroquias, conventos y rincones chiclayanos donde dejó una huella imborrable de solidaridad, fe y gestión mucho antes de su regreso oficial en noviembre de 2026.',
    url: 'https://larutadelpapaleonperu.com/historias-de-fe-los-lugares-clave-que-marcaron-la-vida-del-papa-leon-xiv-en-chiclayo/'
  }
];
