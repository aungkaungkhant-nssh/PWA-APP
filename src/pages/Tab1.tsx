import { IonPage, IonContent, IonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import InstallPrompt from '../components/InstallPrompt';
import { App } from '@capacitor/app';

const Tab1: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [showExitAlert, setShowExitAlert] = useState(false);

  // Check if running as standalone PWA
  const isStandalone =
    (window.navigator as any).standalone ||
    window.matchMedia('(display-mode: standalone)').matches;

  useEffect(() => {
    if (!isStandalone) return;

    const handlePopState = (event: PopStateEvent) => {
      // Trigger alert only on Tab1 root
      if (location.pathname === '/tab1') {
        event.preventDefault();
        setShowExitAlert(true);
        history.push('/tab1'); // prevent actual back
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [history, location, isStandalone]);

  const exitApp = () => {
    const platform = Capacitor.getPlatform(); // 'android', 'ios', 'web'
    if (platform === 'android' || platform === 'ios') {
      App.exitApp(); // works only on mobile
    } else {
      alert('Close the tab to exit the app.'); // fallback for web
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>Tab 1 Root</h1>
      </IonContent>

      <IonAlert
        isOpen={showExitAlert}
        onDidDismiss={() => setShowExitAlert(false)}
        header="Exit App"
        message="Are you sure you want to exit?"
        buttons={[
          { text: 'Cancel', role: 'cancel' },
          { text: 'Exit', handler: exitApp },
        ]}
      />

      <InstallPrompt />
    </IonPage>
  );
};

export default Tab1;
