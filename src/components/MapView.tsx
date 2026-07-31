import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapaRuta from '@/mapa-ruta.json';

type MapPointCategory = 'iglesia' | 'museo' | 'playa' | 'naturaleza';

interface GeoJSONDescription {
  '@type': string;
  value: string;
}

interface GeoJSONProperties {
  name: string;
  description: GeoJSONDescription | string;
  styleUrl: string;
  icon: string;
}

interface GeoJSONFeature {
  type: 'Feature';
  geometry: { type: 'Point'; coordinates: [number, number, number] };
  properties: GeoJSONProperties;
}

interface GeoJSONCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

const data = mapaRuta as GeoJSONCollection;

const categoryConfig: Record<MapPointCategory, { label: string; color: string; emoji: string }> = {
  iglesia: { label: 'Iglesias y conventos', color: '#FFD600', emoji: '✚' },
  museo: { label: 'Museos', color: '#9C27B0', emoji: '🏛' },
  playa: { label: 'Playas', color: '#0288D1', emoji: '🌊' },
  naturaleza: { label: 'Naturaleza', color: '#7CB342', emoji: '🌿' },
};

function categoryFromStyle(styleUrl: string): MapPointCategory {
  if (styleUrl.includes('1670')) return 'iglesia';
  if (styleUrl.includes('1636')) return 'museo';
  if (styleUrl.includes('1681')) return 'playa';
  if (styleUrl.includes('1720')) return 'naturaleza';
  return 'iglesia';
}

function descriptionText(desc: GeoJSONDescription | string): string {
  if (typeof desc === 'string') return desc;
  return desc.value;
}

function makeIcon(color: string, emoji: string) {
  return L.divIcon({
    className: 'ruta-marker',
    html: `<div style="background:${color};width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;"><span style="transform:rotate(45deg);color:#1a1a1a;font-size:15px;font-weight:700;">${emoji}</span></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

export default function MapView() {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<{ marker: L.Marker; category: MapPointCategory }[]>([]);
  const [activeCats, setActiveCats] = useState<Set<MapPointCategory>>(new Set(Object.keys(categoryConfig) as MapPointCategory[]));
  const [showLegend, setShowLegend] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [-6.77, -79.84],
      zoom: 10,
      zoomControl: true,
      attributionControl: true,
    });
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    markersRef.current = data.features.map((f) => {
      const [lng, lat] = f.geometry.coordinates;
      const cat = categoryFromStyle(f.properties.styleUrl);
      const cfg = categoryConfig[cat];
      const m = L.marker([lat, lng], { icon: makeIcon(cfg.color, cfg.emoji) }).addTo(map);
      m.bindPopup(
        `<div style="font-family:Inter,sans-serif;min-width:200px;max-width:260px;">
          <div style="font-weight:700;color:#1D3557;font-size:14px;margin-bottom:4px;">${f.properties.name}</div>
          <div style="font-size:11px;color:${cfg.color};text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;font-weight:600;">${cfg.label}</div>
          <div style="font-size:13px;color:#333;line-height:1.45;">${descriptionText(f.properties.description)}</div>
        </div>`
      );
      return { marker: m, category: cat };
    });

    const bounds = L.latLngBounds(data.features.map((f) => [f.geometry.coordinates[1], f.geometry.coordinates[0]] as [number, number]));
    map.fitBounds(bounds, { padding: [40, 40] });

    setTimeout(() => map.invalidateSize(), 200);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const active = activeCats;
    markersRef.current.forEach(({ marker, category }) => {
      if (active.has(category)) {
        if (!mapRef.current!.hasLayer(marker)) marker.addTo(mapRef.current!);
      } else {
        mapRef.current!.removeLayer(marker);
      }
    });
  }, [activeCats]);

  const toggle = (c: MapPointCategory) => {
    setActiveCats((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const recenter = () => {
    if (!mapRef.current) return;
    const bounds = L.latLngBounds(data.features.map((f) => [f.geometry.coordinates[1], f.geometry.coordinates[0]] as [number, number]));
    mapRef.current.fitBounds(bounds, { padding: [40, 40] });
  };

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {/* Header */}
      <div className="absolute top-0 inset-x-0 z-[500] bg-navy-500 text-white px-4 pt-3 pb-3 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-lg leading-tight">Mapa de la Ruta</h1>
            <p className="text-xs text-navy-100">Chiclayo - Visita Papal</p>
          </div>
          <button
            onClick={() => setShowLegend((s) => !s)}
            className="flex items-center gap-1.5 bg-gold-500 text-navy-600 px-3 py-1.5 rounded-full text-xs font-semibold shadow-card active:scale-95 transition"
          >
            <span className="text-sm leading-none">☰</span> Filtros
          </button>
        </div>
      </div>

      {/* Legend / Filter panel */}
      {showLegend && (
        <div className="absolute top-[72px] inset-x-0 z-[500] bg-white px-4 py-3 shadow-card border-t border-navy-100">
          <div className="grid grid-cols-2 gap-2">
            {(Object.entries(categoryConfig) as [MapPointCategory, { label: string; color: string }][]).map(([key, cfg]) => {
              const on = activeCats.has(key);
              return (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-xs font-medium transition ${
                    on ? 'border-navy-500 bg-navy-50 text-navy-600' : 'border-gray-200 bg-gray-50 text-gray-400'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full border border-white shadow-sm" style={{ background: cfg.color }} />
                  {cfg.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Recenter button */}
      <button
        onClick={recenter}
        className="absolute bottom-24 right-4 z-[500] bg-white text-navy-500 w-11 h-11 rounded-full shadow-card flex items-center justify-center active:scale-95 transition"
        aria-label="Ver toda la ruta"
      >
        <span className="text-xl leading-none">⊙</span>
      </button>
    </div>
  );
}
