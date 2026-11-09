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
    console.warn(`[GA4 Warning] No se pudo enviar el evento "${eventName}". El script de GA4 no está cargado en el HTML.`);
  }
};

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isAlreadyInstalled, setIsAlreadyInstalled] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // 1. Verificar si la app corre como PWA instalada (Standalone)
    const checkStandalone = () => {
      const isApp = 
        window.matchMedia('(display-mode: standalone)').matches || 
        window.matchMedia('(display-mode: window-controls-overlay)').matches ||
        (navigator as any).standalone === true ||
        document.referrer.includes('android-app://');

      if (isApp) {
        setIsStandalone(true);
      }
    };

    checkStandalone();

    // 2. Verificar si la app ya fue marcada como instalada en este navegador web (localStorage)
    const installedFlag = localStorage.getItem('pwa_already_installed');
    if (installedFlag === 'true') {
      setIsAlreadyInstalled(true);
    }

    // 3. Detectar si es un dispositivo iOS (iPhone / iPad)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 4. Revisar si el evento ya fue capturado globalmente
    if (window.deferredPwaPrompt) {
      setDeferredPrompt(window.deferredPwaPrompt);
      sendGA4Event('pwa_install_prompt_shown', { platform: 'android' });
    }

    // 5. Capturar el evento de instalación nativo en Android / Chrome
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      window.deferredPwaPrompt = e;
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      sendGA4Event('pwa_install_prompt_shown', { platform: 'android' });
    };

    // 6. Capturar cuando la instalación finaliza con éxito
    const handleAppInstalled = () => {
      localStorage.setItem('pwa_already_installed', 'true');
      setIsAlreadyInstalled(true);
      
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

  const handleInstallClick = async () => {
    sendGA4Event('pwa_install_click', {
      platform: isIOS ? 'ios' : 'android'
    });

    const activePrompt = deferredPrompt || window.deferredPwaPrompt;

    if (!activePrompt) {
      console.warn('El evento deferredPrompt no está disponible en este navegador/sesión.');
      return;
    }

    try {
      setIsInstalling(true);
      await activePrompt.prompt();

      const choiceResult = await activePrompt.userChoice;
      
      sendGA4Event('pwa_install_choice', {
        outcome: choiceResult.outcome 
      });

      if (choiceResult.outcome === 'accepted') {
        localStorage.setItem('pwa_already_installed', 'true');
        setIsAlreadyInstalled(true);
      }

      setDeferredPrompt(null);
      window.deferredPwaPrompt = null;
    } catch (err) {
      console.error('Error al ejecutar el prompt de instalación:', err);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleToggleIOSGuide = () => {
    setShowIOSGuide((prev) => {
      const nextState = !prev;
      if (nextState) {
        sendGA4Event('pwa_ios_guide_opened', { platform: 'ios' });
      }
      return nextState;
    });
  };

  // SI ESTÁ ABIERTA DENTRO DE LA APP INSTALADA: No muestra nada
  if (isStandalone) {
    return null;
  }

  // SI ESTÁ EN LA WEB Y EL NAVEGADOR RECUERDA QUE YA SE INSTALÓ: Muestra el mensaje en la web
  if (isAlreadyInstalled) {
    return (
      <div className="w-full max-w-md mx-auto my-4 px-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-center gap-2.5 shadow-sm">
          <span className="text-xl">✅</span>
          <span className="text-xs font-bold text-emerald-800">
            La app ya está instalada en la pantalla de inicio de tu celular
          </span>
        </div>
      </div>
    );
  }

  // SI ESTÁ EN LA WEB Y AÚN NO SE INSTALA: Muestra el botón o guía habitual
  return (
    <div className="w-full max-w-md mx-auto my-4 px-4">
      {/* Opción A: Botón directo para Android / Chrome / Desktop */}
      {!isIOS && (
        <button
          onClick={handleInstallClick}
          disabled={isInstalling}
          className="w-full bg-navy-500 hover:bg-navy-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 border border-gold-400 disabled:opacity-70"
        >
          {isInstalling ? (
            <>
              <span className="animate-spin text-lg">⏳</span>
              <span>Preparando instalación...</span>
            </>
          ) : (
            <>
              <span className="text-xl">📱</span>
              <span>Instalar App en tu Celular</span>
            </>
          )}
        </button>
      )}

      {/* Opción B: Instructivo para iPhone (iOS) */}
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
