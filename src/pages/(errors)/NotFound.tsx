import { IonPage, IonContent, IonText, IonButton, IonIcon } from '@ionic/react';
import { homeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './NotFound.css';

const NotFound: React.FC = () => {
    const history = useHistory();
    return (
        <IonPage>
            <IonContent fullscreen className="notfound-content">
                <div className="notfound-container">
                    <div className="notfound-wrapper">
                        <IonText color="medium">
                            <h1 className="notfound-title">404</h1>
                            <p className="notfound-message">
                                Oops! The page you're looking for doesn't exist.
                            </p>
                        </IonText>

                        <IonButton
                            expand="block"
                            className="notfound-button"
                            onClick={() => history.push('/')}
                        >
                            <IonIcon icon={homeOutline} slot="start" />
                            Go Home
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default NotFound;