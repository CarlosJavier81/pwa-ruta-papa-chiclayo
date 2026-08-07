import { useEffect, useState } from 'react';

// Declaración de tipos para Google Analytics (gtag)
declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      eventParams?: Record<string, any>
    ) => void;
    deferredPwaPrompt?: any;
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Escuchar el evento antes de que React cargue para evitar perder la referencia
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPwaPrompt = e;
  });
}

// Función auxiliar para enviar eventos a GA4 de forma segura
const sendGA4Event = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    ...params,
    debug_mode: true // Muestra los eventos al instante en DebugView
  };

  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, eventPayload);
  } else if (Array.isArray((window as any).dataLayer)) {
    (window as any).dataLayer.push({
      event: eventName,
      ...eventPayload
    });
  } else {
    console.warn(`[GA4 Warning] No se pudo enviar el evento "${eventName}". El script de GA4 no está cargado en el HTML.`);
  }
};

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // 1. Verificar si la app ya está instalada o abierta en modo standalone
    const isApp = window.matchMedia('(display-mode: standalone)').matches 
      || (navigator as any).standalone 
      || document.referrer.includes('android-app://');
    
    if (isApp) {
      setIsStandalone(true);
      return;
    }

    // 2. Detectar si es un dispositivo iOS (iPhone / iPad)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 3. Revisar si el evento ya fue capturado globalmente
    if (window.deferredPwaPrompt) {
      setDeferredPrompt(window.deferredPwaPrompt);
      sendGA4Event('pwa_install_prompt_shown', { platform: 'android' });
    }

    // 4. Capturar el evento de instalación nativo en Android / Chrome
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      window.deferredPwaPrompt = e;
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Evento GA4: Se mostró el banner/botón de instalación disponible
      sendGA4Event('pwa_install_prompt_shown', { platform: 'android' });
    };

    // 5. Capturar cuando la instalación se completa exitosamente
    const handleAppInstalled = () => {
      sendGA4Event('app_install', {
        platform: isIosDevice ? 'ios' : 'android',
        method: 'native_prompt'
      });
      setDeferredPrompt(null);
      window.deferredPwaPrompt = null;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Función para activar la instalación en Android / Desktop
  const handleInstallClick = async () => {
    // 1. Enviar el evento a GA4 siempre que se haga clic
    sendGA4Event('pwa_install_click', {
      platform: isIOS ? 'ios' : 'android'
    });

    const activePrompt = deferredPrompt || window.deferredPwaPrompt;

    // 2. Verificar si tenemos guardado el evento nativo del navegador
    if (!activePrompt) {
      console.warn('El evento deferredPrompt no está disponible en este navegador/sesión.');
      return;
    }

    try {
      // 3. Mostrar el prompt nativo de instalación
      await activePrompt.prompt();

      // 4. Esperar a que el usuario responda
      const choiceResult = await activePrompt.userChoice;
      
      // 5. Enviar la decisión del usuario a GA4
      sendGA4Event('pwa_install_choice', {
        outcome: choiceResult.outcome // 'accepted' o 'dismissed'
      });

      // 6. Limpiar referencias
      setDeferredPrompt(null);
      window.deferredPwaPrompt = null;
    } catch (err) {
      console.error('Error al ejecutar el prompt de instalación:', err);
    }
  };

  // Función para rastrear cuando un usuario de iPhone abre la guía
  const handleToggleIOSGuide = () => {
    setShowIOSGuide((prev) => {
      const nextState = !prev;
      if (nextState) {
        sendGA4Event('pwa_ios_guide_opened', { platform: 'ios' });
      }
      return nextState;
    });
  };

  // Si ya está abierta dentro de la App instalada, no mostramos nada
  if (isStandalone) return null;

  return (
    <div className="w-full max-w-md mx-auto my-4 px-4">
      {/* Opción A: Botón directo para Android / Chrome / Desktop */}
      {!isIOS && (
        <button
          onClick={handleInstallClick}
          className="w-full bg-navy-500 hover:bg-navy-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 border border-gold-400"
        >
          <span className="text-xl">📱</span>
          <span>Instalar App en tu Celular</span>
        </button>
      )}

      {/* Opción B: Instructivo especial para iPhone (iOS) */}
      {isIOS && (
        <div className="bg-white border border-navy-100 rounded-2xl p-4 shadow-card">
          <button
            onClick={handleToggleIOSGuide}
            className="w-full flex items-center justify-between font-bold text-navy-600 text-sm"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">🍎</span> ¿Cómo instalar en iPhone?
            </span>
            <span className="text-gold-600">{showIOSGuide ? '▲' : '▼'}</span>
          </button>

          {showIOSGuide && (
            <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600 flex flex-col gap-2">
              <p className="font-semibold text-navy-500">Sigue estos sencillos pasos desde Safari:</p>
              <div className="flex items-start gap-2">
                <span className="bg-navy-50 text-navy-600 font-bold px-1.5 py-0.5 rounded">1</span>
                <span>Toca el botón <strong>Compartir</strong> en la barra inferior de Safari (el icono de la caja con la flecha hacia arriba ⎋).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-navy-50 text-navy-600 font-bold px-1.5 py-0.5 rounded">2</span>
                <span>Desplázate hacia abajo y selecciona <strong>"Añadir a la pantalla de inicio" (+)</strong>.</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
