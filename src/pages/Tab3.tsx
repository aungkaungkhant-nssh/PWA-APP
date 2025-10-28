import { IonPage } from '@ionic/react';
import './Tab3.css';
import { useEffect, useState } from 'react';

const Tab3: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!location) return <p>Loading location...</p>;
  return (
    <IonPage>
      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lng}</p>
    </IonPage>
  );
};

export default Tab3;
