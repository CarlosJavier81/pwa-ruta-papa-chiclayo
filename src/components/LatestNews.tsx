import { useState } from 'react';
import { LATEST_NEWS, type NewsItem } from '@/data/newsData';

export default function LatestNews() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <section className="w-full my-6">
      {/* Encabezado de Sección */}
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-lg font-bold text-navy-600 flex items-center gap-2">
          <span>📰</span> Últimas Noticias
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

      {/* Modal Emergente de Noticia */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col relative animate-scale-up">
            
            {/* Botón Cerrar */}
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-3 right-3 z-10 bg-black/40 hover:bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition"
            >
              ✕
            </button>

            {/* Imagen del Modal */}
            <div className="h-52 w-full flex-shrink-0 bg-gray-100 relative">
              <img
                src={selectedNews.imageUrl}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Contenido del Modal */}
            <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-3">
              <span className="text-xs font-semibold text-gold-600">
                {selectedNews.date}
              </span>
              <h2 className="text-lg font-bold text-navy-600 leading-snug">
                {selectedNews.title}
              </h2>
              <hr className="border-gray-100" />
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {selectedNews.content}
              </p>
            </div>

            {/* Pie del Modal */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="bg-navy-500 hover:bg-navy-600 text-white font-bold text-sm py-2 px-6 rounded-xl transition"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
