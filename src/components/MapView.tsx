import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapaRuta from '@/mapa-ruta.json';

type MapPointCategory = 'iglesia' | 'museo' | 'playa' | 'naturaleza' | 'arqueologia';

interface GeoJSONDescription {
  '@type': string;
  value: string;
}

interface GeoJSONProperties {
  name: string;
  description: GeoJSONDescription | string;
  styleUrl: string;
  icon: string;
  website?: string;  // 👈 Nuevo opcional
  facebook?: string; // 👈 Nuevo opcional
  instagram?: string; // 👈 Nuevo opcional
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

interface MarkerData {
  id: string;
  name: string;
  category: MapPointCategory;
  coordinates: [number, number];
  marker: L.Marker;
}

const data = mapaRuta as GeoJSONCollection;

const categoryConfig: Record<MapPointCategory, { label: string; color: string; emoji: string }> = {
  iglesia: { label: 'Iglesias y conventos', color: '#FFD600', emoji: '✚' },
  museo: { label: 'Museos', color: '#9C27B0', emoji: '🏛' },
  playa: { label: 'Playas', color: '#0288D1', emoji: '🌊' },
  naturaleza: { label: 'Naturaleza', color: '#7CB342', emoji: '🌿' },
  arqueologia: { label: 'Zonas Arqueológicas', color: '#E65100', emoji: '🏺' },
};

function categoryFromStyle(styleUrl: string): MapPointCategory {
  if (styleUrl.includes('1670')) return 'iglesia';
  if (styleUrl.includes('1636')) return 'museo';
  if (styleUrl.includes('1681')) return 'playa';
  if (styleUrl.includes('1720')) return 'naturaleza';
  if (styleUrl.includes('1505')) return 'arqueologia';
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

function makeUserIcon() {
  return L.divIcon({
    className: 'user-location-marker',
    html: `<div style="position:relative;width:24px;height:24px;">
      <div style="position:absolute;inset:0;background:#2563EB;border-radius:50%;opacity:0.3;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
      <div style="position:absolute;inset:3px;background:#2563EB;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>
    </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

// Generador de enlaces para apps externas de GPS
function buildGpsUrls(destLat: number, destLng: number, userCoords?: [number, number] | null) {
  const originParam = userCoords ? `&origin=${userCoords[0]},${userCoords[1]}` : '';
  const gmaps = `https://www.google.com/maps/dir/?api=1${originParam}&destination=${destLat},${destLng}&travelmode=driving`;
  const waze = `https://waze.com/ul?ll=${destLat},${destLng}&navigate=yes`;
  return { gmaps, waze };
}

export default function MapView() {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<MarkerData[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [activeCats, setActiveCats] = useState<Set<MapPointCategory>>(
    new Set(Object.keys(categoryConfig) as MapPointCategory[])
  );
  const [expandedCat, setExpandedCat] = useState<MapPointCategory | null>(null);
  const [showLegend, setShowLegend] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // Función para construir la tarjeta HTML con botones de navegación GPS
  const createPopupContent = (name: string, label: string, color: string, desc: string, lat: number, lng: number, userPos?: [number, number] | null,website?: string,
  facebook?: string, instagram?: string) => {
    const { gmaps, waze } = buildGpsUrls(lat, lng, userPos);
    
    // Generar botones de links oficiales solo si existen
  let linksHtml = '';
  if (website || facebook || instagram) {
    linksHtml = `
      <div style="border-top:1px solid #E2E8F0;margin-top:8px;padding-top:6px;display:flex;align-items:center;gap:6px;">
        <span style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;">Info:</span>
        ${website ? `<a href="${website}" target="_blank" rel="noopener noreferrer" style="background:#F1F5F9;color:#1E293B;padding:4px 8px;border-radius:4px;font-size:11px;font-weight:600;text-decoration:none;display:flex;align-items:center;gap:3px;">🌐 Web</a>` : ''}
        ${facebook ? `<a href="${facebook}" target="_blank" rel="noopener noreferrer" style="background:#E0F2FE;color:#0369A1;padding:4px 8px;border-radius:4px;font-size:11px;font-weight:600;text-decoration:none;">📘 FB</a>` : ''}
        ${instagram ? `<a href="${instagram}" target="_blank" rel="noopener noreferrer" style="background:#FCE7F3;color:#BE185D;padding:4px 8px;border-radius:4px;font-size:11px;font-weight:600;text-decoration:none;">📷 IG</a>` : ''}
      </div>
    `;
  }

  return `<div style="font-family:Inter,sans-serif;min-width:210px;max-width:260px;">
    <div style="font-weight:700;color:#1D3557;font-size:14px;margin-bottom:4px;">${name}</div>
    <div style="font-size:11px;color:${color};text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;font-weight:600;">${label}</div>
    <div style="font-size:12px;color:#4A5568;line-height:1.4;margin-bottom:12px;">${desc}</div>
    
    ${linksHtml}

    <div style="border-top:1px solid #E2E8F0;margin-top:8px;padding-top:8px;display:flex;flex-direction:column;gap:6px;">
      <span style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;">Cómo llegar:</span>
      <div style="display:flex;gap:6px;">
        <a href="${gmaps}" target="_blank" rel="noopener noreferrer" style="flex:1;background:#2563EB;color:#fff;text-align:center;padding:6px 8px;border-radius:6px;font-size:11px;font-weight:600;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:4px;">
          <span>🗺️</span> Google Maps
        </a>
        <a href="${waze}" target="_blank" rel="noopener noreferrer" style="background:#33CCFF;color:#1A202C;text-align:center;padding:6px 8px;border-radius:6px;font-size:11px;font-weight:700;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:4px;">
          <span>🚗</span> Waze
        </a>
      </div>
    </div>
  </div>`;
};

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

    markersRef.current = data.features.map((f, idx) => {
      const [lng, lat] = f.geometry.coordinates;
      const cat = categoryFromStyle(f.properties.styleUrl);
      const cfg = categoryConfig[cat];
      const m = L.marker([lat, lng], { icon: makeIcon(cfg.color, cfg.emoji) }).addTo(map);

      m.bindPopup(
        createPopupContent(
          f.properties.name,
          cfg.label,
          cfg.color,
          descriptionText(f.properties.description),
          lat,
          lng,
          userLocation,
          f.properties.website,   // 👈 Pasar website
          f.properties.facebook,  // 👈 Pasar facebook
          f.properties.instagram  // 👈 Pasar instagram
        )
      );

      return {
        id: `marker-${idx}`,
        name: f.properties.name,
        category: cat,
        coordinates: [lat, lng],
        marker: m,
      };
    });

    if (data.features.length > 0) {
      const bounds = L.latLngBounds(
        data.features.map((f) => [f.geometry.coordinates[1], f.geometry.coordinates[0]] as [number, number])
      );
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      });
    }, 400);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Actualizar el HTML de los popups si la ubicación del usuario cambia
  useEffect(() => {
    if (!userLocation) return;
    data.features.forEach((f, idx) => {
      const item = markersRef.current[idx];
      if (item && item.marker) {
        const cat = item.category;
        const cfg = categoryConfig[cat];
        item.marker.setPopupContent(
          createPopupContent(
            f.properties.name,
            cfg.label,
            cfg.color,
            descriptionText(f.properties.description),
            item.coordinates[0],
            item.coordinates[1],
            userLocation
          )
        );
      }
    });
  }, [userLocation]);

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

  const toggleCategory = (c: MapPointCategory) => {
    setActiveCats((prev) => {
      const next = new Set(prev);
      if (next.has(c)) {
        next.delete(c);
        if (expandedCat === c) setExpandedCat(null);
      } else {
        next.add(c);
        setExpandedCat(c);
      }
      return next;
    });
  };

  const toggleExpand = (e: React.MouseEvent, c: MapPointCategory) => {
    e.stopPropagation();
    setExpandedCat((prev) => (prev === c ? null : c));
  };

  const selectPoint = (item: MarkerData) => {
    if (!mapRef.current) return;

    if (!activeCats.has(item.category)) {
      setActiveCats((prev) => new Set(prev).add(item.category));
    }

    mapRef.current.flyTo(item.coordinates, 16, { duration: 1.2 });
    item.marker.openPopup();
    setShowLegend(false);
  };

  const handleGetUserLocation = () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización.');
      return;
    }

    setIsLocating(true);

    const successCallback = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const userLatLng: [number, number] = [latitude, longitude];

      setUserLocation(userLatLng);

      if (!mapRef.current) return;

      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng(userLatLng);
      } else {
        userMarkerRef.current = L.marker(userLatLng, {
          icon: makeUserIcon(),
          zIndexOffset: 1000,
        })
          .addTo(mapRef.current)
          .bindPopup(
            `<div style="font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#1D3557;text-align:center;">
              📍 Tu ubicación actual
            </div>`
          );
      }

      mapRef.current.flyTo(userLatLng, 15, { duration: 1.2 });
      userMarkerRef.current.openPopup();
      setIsLocating(false);
    };

    const errorCallback = (error: GeolocationPositionError) => {
      console.warn('Error en GPS:', error.message);

      if (error.code === error.TIMEOUT || error.code === error.POSITION_UNAVAILABLE) {
        navigator.geolocation.getCurrentPosition(
          successCallback,
          () => {
            setIsLocating(false);
            alert(
              '⚡ El GPS de tu dispositivo tardó en responder.\n\nPor favor, vuelve a presionar el botón de ubicación en unos segundos.'
            );
          },
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
        );
      } else if (error.code === error.PERMISSION_DENIED) {
        setIsLocating(false);
        alert('Para ver tu ubicación, activa los permisos de GPS/Ubicación en los ajustes de tu navegador.');
      } else {
        setIsLocating(false);
        alert('No pudimos obtener tu ubicación. Por favor, intenta presionar el botón nuevamente.');
      }
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 0,
    });
  };

  const recenter = () => {
    if (!mapRef.current || data.features.length === 0) return;
    const bounds = L.latLngBounds(
      data.features.map((f) => [f.geometry.coordinates[1], f.geometry.coordinates[0]] as [number, number])
    );
    mapRef.current.fitBounds(bounds, { padding: [40, 40] });
  };

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {/* Header */}
      <div className="absolute top-0 inset-x-0 z-[500] bg-navy-500 text-white px-4 pt-5 pb-3 shadow-card">
        <div>
          <h1 className="font-display font-bold text-lg leading-tight">Mapa de la Ruta</h1>
          <p className="text-xs text-navy-100">Chiclayo - Visita Papal</p>
        </div>
      </div>

      {/* Panel Flotante de Filtros */}
      {showLegend && (
        <div className="absolute bottom-48 right-4 left-4 sm:left-auto z-[500] bg-white p-3.5 rounded-2xl shadow-xl border border-navy-100 sm:max-w-[280px] max-h-[55vh] flex flex-col">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gray-100 flex-shrink-0">
            <span className="text-xs font-bold text-navy-600 uppercase tracking-wider">Filtros y Puntos</span>
            <button
              onClick={() => setShowLegend(false)}
              className="text-gray-400 hover:text-gray-600 text-xs font-bold px-1"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-2 overflow-y-auto pr-1">
            {(Object.entries(categoryConfig) as [MapPointCategory, { label: string; color: string }][]).map(
              ([key, cfg]) => {
                const isActive = activeCats.has(key);
                const isExpanded = expandedCat === key;
                const categoryItems = markersRef.current.filter((m) => m.category === key);

                return (
                  <div key={key} className="flex flex-col rounded-lg border border-gray-200 overflow-hidden bg-white">
                    <div
                      onClick={() => toggleCategory(key)}
                      className={`flex items-center justify-between px-2.5 py-2 cursor-pointer transition ${
                        isActive ? 'bg-navy-50/60' : 'bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-3 h-3 rounded-full border border-white shadow-sm flex-shrink-0"
                          style={{ background: cfg.color }}
                        />
                        <span className="text-xs font-semibold text-navy-600 truncate">{cfg.label}</span>
                        <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.2 rounded-full font-bold">
                          {categoryItems.length}
                        </span>
                      </div>

                      {categoryItems.length > 0 && (
                        <button
                          onClick={(e) => toggleExpand(e, key)}
                          className="text-gray-400 hover:text-navy-600 px-1 text-xs font-bold"
                          aria-label="Desplegar lista"
                        >
                          {isExpanded ? '▲' : '▼'}
                        </button>
                      )}
                    </div>

                    {isExpanded && isActive && (
                      <div className="flex flex-col bg-white border-t border-gray-100 py-1">
                        {categoryItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => selectPoint(item)}
                            className="text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gold-100/50 hover:text-navy-600 transition flex items-center justify-between border-b border-gray-50 last:border-none"
                          >
                            <span className="truncate pr-2">• {item.name}</span>
                            <span className="text-[10px] text-gold-600 font-bold">Ver →</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* Botones Flotantes Inferiores */}
      <div className="absolute bottom-20 right-4 z-[500] flex flex-col gap-2.5 items-end">
        <button
          onClick={() => setShowLegend((s) => !s)}
          className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-full shadow-card active:scale-95 transition text-xs font-bold ${
            showLegend ? 'bg-navy-500 text-white' : 'bg-gold-500 text-navy-600'
          }`}
        >
          <span className="text-sm leading-none">☰</span> Filtros
        </button>

        <button
          onClick={handleGetUserLocation}
          disabled={isLocating}
          className="bg-white text-navy-600 w-11 h-11 rounded-full shadow-card flex items-center justify-center active:scale-95 transition border border-gray-100 disabled:opacity-50"
          aria-label="Mi Ubicación Actual"
          title="Mi Ubicación Actual"
        >
          <span className={`text-lg leading-none ${isLocating ? 'animate-spin' : ''}`}>
            {isLocating ? '🌀' : '🎯'}
          </span>
        </button>

        <button
          onClick={recenter}
          className="bg-white text-navy-500 w-11 h-11 rounded-full shadow-card flex items-center justify-center active:scale-95 transition border border-gray-100"
          aria-label="Ver toda la ruta"
          title="Ver toda la ruta"
        >
          <span className="text-xl leading-none">⊙</span>
        </button>
      </div>
    </div>
  );
}
