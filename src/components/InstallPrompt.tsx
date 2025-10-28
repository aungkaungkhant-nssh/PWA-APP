import { IonButton, IonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);
  const [showManualInstall, setShowManualInstall] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isInStandalone =
      'standalone' in navigator && (navigator as any).standalone;
    const isChromium = /chrome|chromium|crios/i.test(userAgent);
    const isFirefox = /firefox|fxios/i.test(userAgent);

    // ✅ Handle Chromium browsers
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // ✅ Safari (manual Add to Home Screen)
    if ((isIOS || isSafari) && !isInStandalone) {
      setShowButton(true);
      setShowManualInstall(true);
    }

    // ✅ Firefox (manual Add to Home Screen)
    if (isFirefox) {
      setShowButton(true);
      setShowManualInstall(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        console.log('✅ User accepted install');
      } else {
        console.log('❌ User dismissed install');
      }
      setDeferredPrompt(null);
      setShowButton(false);
    } else {
      // Non-Chromium browsers → show manual message
      setShowManualInstall(true);
    }
  };

  return (
    <>
      {showButton && (
        <IonButton expand="block" onClick={handleInstallClick}>
          Install App
        </IonButton>
      )}

      {showManualInstall && (
        <IonAlert
          isOpen={true}
          header="Install App"
          message={`To install this app, ${/iphone|ipad/i.test(navigator.userAgent)
              ? "tap the Share icon in Safari and choose 'Add to Home Screen'."
              : /firefox|fxios/i.test(navigator.userAgent)
                ? "open the browser menu (⋮ or ☰) and select 'Add to Home Screen'."
                : "use your browser menu and select 'Install' or 'Add to Home Screen'."
            }`}
          buttons={['OK']}
          onDidDismiss={() => setShowManualInstall(false)}
        />
      )}
    </>
  );
};

export default InstallPrompt;
