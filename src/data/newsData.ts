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
    title: 'Nuevas señalizaciones instaladas en los puntos clave de la Ruta',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=600',
    date: '08 de Agosto, 2026',
    content: 'Se han completado los trabajos de marcado semántico y señalética QR en los principales atractivos turísticos y gastronómicos para facilitar el recorrido autónomo de los peregrinos.',
    url: 'https://larutadelpapaleonperu.com/confirmado-el-papa-leon-xiv-visitara-el-peru-del-11-al-17-de-noviembre/'
  },
  {
    id: '3',
    title: 'Gran feria gastronómica y cultural de la Ruta del Papa',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600',
    date: '05 de Agosto, 2026',
    content: 'Este fin de semana se reunirán los mejores exponentes de los platos típicos locales en una jornada que combina devoción, tradición culinaria y presentaciones artísticas en vivo.',
    url: 'https://larutadelpapaleonperu.com/confirmado-el-papa-leon-xiv-visitara-el-peru-del-11-al-17-de-noviembre/'
  }
];
