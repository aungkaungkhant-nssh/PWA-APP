import { IonPage, IonContent, IonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import InstallPrompt from '../components/InstallPrompt';
import { App } from '@capacitor/app';

const Tab1: React.FC = () => {
  const history = useHistory();
  const [showExitAlert, setShowExitAlert] = useState(false);

  // Detect if running as installed PWA (standalone)
  const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;

  console.log('Is Standalone PWA:', isStandalone);

  useEffect(() => {
    // Only attach back button listener in PWA
    if (!isStandalone) return;

    const handlePopState = (event: PopStateEvent) => {
      // Only trigger alert if on Tab1 root
      if (history.location.pathname === '/tab1') {
        event.preventDefault();
        setShowExitAlert(true);
        history.push('/tab1'); // prevent actual back
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [history, isStandalone]);

  const exitApp = () => {
    if (isStandalone) {
      App.exitApp(); // works on Android
    } else {
      // In normal browser, do nothing or show a message
      alert('Close the tab to exit the app.');
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>Tab 1 Root</h1>
      </IonContent>

      <IonAlert
        isOpen={true}
        onDidDismiss={() => setShowExitAlert(false)}
        header="Exit App"
        message="Are you sure you want to exit?"
        buttons={[
          { text: 'Cancel', role: 'cancel' },
          { text: 'Exit', handler: exitApp }
        ]}
      />

      <InstallPrompt />
    </IonPage>
  );
};

export default Tab1;
