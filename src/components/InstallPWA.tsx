import { useEffect, useState } from 'react';

// Declaración de tipos para Google Analytics (gtag)
declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      eventParams?: Record<string, any>
    ) => void;
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Función auxiliar para enviar eventos a GA4 de forma segura
const sendGA4Event = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
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

    // 3. Capturar el evento de instalación nativo en Android / Chrome
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Evento GA4: Se mostró el banner/botón de instalación disponible
      sendGA4Event('pwa_install_prompt_shown', { platform: 'android' });
    };

    // 4. Capturar cuando la instalación se completa exitosamente
    const handleAppInstalled = () => {
      sendGA4Event('app_install', {
        platform: isIosDevice ? 'ios' : 'android',
        method: 'native_prompt'
      });
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Función para activar la instalación en Android
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Evento GA4: Clic en el botón "Instalar App"
    sendGA4Event('pwa_install_click', { platform: 'android' });

    // Mostrar el prompt nativo de instalación
    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    // Evento GA4: Resultado de la elección del usuario
    sendGA4Event('pwa_install_choice', {
      outcome: choiceResult.outcome // 'accepted' o 'dismissed'
    });

    if (choiceResult.outcome === 'accepted') {
      setDeferredPrompt(null);
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
      {/* Opción A: Botón directo para Android / Chrome */}
      {deferredPrompt && (
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
