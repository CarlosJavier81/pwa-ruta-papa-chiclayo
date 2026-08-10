export interface NewsItem {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  content: string;
}

export const LATEST_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'El Papa Francisco y el legado de León XIII en la Encíclica Rerum Novarum',
    imageUrl: 'https://images.unsplash.com/photo-1548625361-1851e36787cf?auto=format&fit=crop&q=80&w=600',
    date: '10 de Agosto, 2026',
    content: 'Un recorrido detallado por la influencia histórica del Papa León XIII en la doctrina social de la Iglesia y cómo sus enseñanzas continúan vigentes en las celebraciones e itinerarios de la Ruta del Papa.'
  },
  {
    id: '2',
    title: 'Nuevas señalizaciones instaladas en los puntos clave de la Ruta',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=600',
    date: '08 de Agosto, 2026',
    content: 'Se han completado los trabajos de marcado semántico y señalética QR en los principales atractivos turísticos y gastronómicos para facilitar el recorrido autónomo de los peregrinos.'
  },
  {
    id: '3',
    title: 'Gran feria gastronómica y cultural de la Ruta del Papa',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600',
    date: '05 de Agosto, 2026',
    content: 'Este fin de semana se reunirán los mejores exponentes de los platos típicos locales en una jornada que combina devoción, tradición culinaria y presentaciones artísticas en vivo.'
  }
];
