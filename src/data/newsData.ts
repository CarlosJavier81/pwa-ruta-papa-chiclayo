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
    title: 'Rumbo a la Misa Central: Todo lo que debes saber sobre la gran Vigilia del Jueves 12 de Noviembre en Chiclayo',
    imageUrl: 'https://larutadelpapaleonperu.com/wp-content/uploads/2026/11/catedral.jpg',
    date: '7 de Noviembre, 2026',
    content: 'La expectativa en la “Capital de la Amistad” alcanza su punto máximo. En la antesala de las actividades oficiales de la visita del papa León XIV a Chiclayo, este jueves 12 de noviembre la ciudad se convertirá en el epicentro de la fe con una multitudinaria vigilia de bienvenida que marcará el inicio de jornadas históricas.',
    url: 'https://larutadelpapaleonperu.com/rumbo-a-la-misa-central-todo-lo-que-debes-saber-sobre-la-gran-vigilia-del-jueves-12-de-noviembre-en-chiclayo/'
  },
  {
    id: '2',
    title: 'Misa Masiva en Pimentel: León XIV Celebrará una Eucaristía Histórica el 13 de Noviembre',
    imageUrl: 'https://larutadelpapaleonperu.com/wp-content/uploads/2026/10/pampas-de-pimentel.jpg',
    date: '31 de Octubre, 2026',
    content: 'El Vaticano ha confirmado oficialmente la llegada del Santo Padre al territorio peruano. La visita apostólica del Papa León XIV se llevará a cabo del 11 al 17 de noviembre de 2026, consolidándose como un evento histórico de profunda relevancia fe, unidad e impacto turístico para el país.',
    url: 'https://larutadelpapaleonperu.com/misa-masiva-en-pimentel-leon-xiv-celebrara-una-eucaristia-historica-el-13-de-noviembre/'
  },
  {
    id: '3',
    title: 'Confirmado: El Papa León XIV visitará el Perú del 11 al 17 de noviembre',
    imageUrl: 'https://larutadelpapaleonperu.com/wp-content/uploads/2026/08/papa-leon-visita-peru.webp',
    date: '10 de Agosto, 2026',
    content: 'El viernes 13 de noviembre de 2026, el balneario de Pimentel se convertirá en el epicentro de la fe del norte del país. En el marco de su visita pastoral al Perú, el Papa León XIV (Robert Prevost) volverá a encontrarse con la comunidad chiclayana para liderar una histórica Eucaristía a orillas del Pacífico.',
    url: 'https://larutadelpapaleonperu.com/confirmado-el-papa-leon-xiv-visitara-el-peru-del-11-al-17-de-noviembre/'
  },  
];
