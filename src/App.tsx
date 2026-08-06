import { useState, useEffect } from 'react';

import HomeView from '@/components/HomeView';

import MapView from '@/components/MapView';

import DirectoryView from '@/components/DirectoryView';

import GuideView from '@/components/GuideView';

import BottomNav, { type TabId } from '@/components/BottomNav';

// Función auxiliar para enviar eventos de forma segura a GA4 / dataLayer
const sendGA4Event = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    ...params,
    debug_mode: true
  };

  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, eventPayload);
  } else if (Array.isArray((window as any).dataLayer)) {
    (window as any).dataLayer.push({
      event: eventName,
      ...eventPayload
    });
  } else {
    console.warn(`[GA4 Warning] No se pudo enviar "${eventName}". Falta el script de GA4 en index.html.`);
  }
};

export default function App() {

  // Inicia por defecto en 'inicio' para evitar problemas de renderizado del mapa en iOS

  const [tab, setTab] = useState<TabId>('inicio');

  useEffect(() => {
    // Verificar si la web se abrió en modo standalone (PWA instalada)
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (navigator as any).standalone === true;

    if (isStandalone) {
      const isIOS = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
      
      // Enviar evento de apertura de PWA usando la función segura
      sendGA4Event('pwa_session_start', {
        platform: isIOS ? 'ios' : 'android'
      });
    }
  }, []);

  return (

    <div className="fixed inset-0 bg-gray-50 text-navy-500 overflow-hidden">

      <div className="h-full w-full">

        {tab === 'inicio' && <HomeView onNavigate={(nextTab) => setTab(nextTab)} />}

        {tab === 'mapa' && <MapView />}

        {tab === 'directorio' && <DirectoryView />}

        {tab === 'guia' && <GuideView />}

      </div>

      <BottomNav active={tab} onChange={setTab} />

    </div>

  );

}
