import { useState } from 'react';
import { LATEST_NEWS, type NewsItem } from '@/data/newsData';

export default function LatestNews() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <section className="w-full mt-8">
      {/* Encabezado de Sección */}
      <div className="flex items-center justify-between mb-3.5 px-0.5">
        <h2 className="font-bold text-navy-600 text-base leading-tight">
        Últimas Noticias
        </h2>
        <span className="text-xs font-semibold text-gold-600 uppercase tracking-wider">
          Actualidad
        </span>
      </div>

      {/* Carrusel con Scroll Horizontal */}
      <div className="flex overflow-x-auto gap-4 px-4 pb-2 scrollbar-none snap-x snap-mandatory">
        {LATEST_NEWS.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedNews(item)}
            className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-card overflow-hidden border border-navy-50 cursor-pointer snap-start transition-transform active:scale-95"
          >
            <div className="h-36 w-full overflow-hidden bg-gray-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-3">
              <span className="text-[10px] font-medium text-navy-400 block mb-1">
                {item.date}
              </span>
              <h3 className="text-xs font-bold text-navy-600 line-clamp-2 leading-tight">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Emergente a Ancho Completo */}
      {selectedNews && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-navy-900/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedNews(null)}
        >
          <div 
            className="bg-white w-full h-[90vh] sm:h-[85vh] sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col relative animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Botón Cerrar (Cruz superior) */}
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-base backdrop-blur-md transition-all active:scale-90"
              aria-label="Cerrar noticia"
            >
              ✕
            </button>

            {/* Imagen del Modal */}
            <div className="h-60 w-full flex-shrink-0 bg-gray-100 relative">
              <img
                src={selectedNews.imageUrl}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Contenido Completo de la Noticia con espacio suficiente abajo (pb-28) */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-3 pb-28">
              <span className="text-xs font-semibold text-gold-600 uppercase tracking-wide">
                {selectedNews.date}
              </span>
              <h2 className="text-xl font-bold text-navy-600 leading-snug">
                {selectedNews.title}
              </h2>
              <hr className="border-gray-100 my-1" />
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {selectedNews.content}
              </p>

              {/* Botón "Leer más" */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a
                  href={selectedNews.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-navy-500 hover:bg-navy-600 text-white font-bold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm"
                >
                  <span>Leer más</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
