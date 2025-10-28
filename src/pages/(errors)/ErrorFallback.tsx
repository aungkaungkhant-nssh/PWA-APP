import { IonPage, IonContent, IonText, IonButton, IonIcon } from '@ionic/react';
import { alertCircleOutline, refreshOutline } from 'ionicons/icons';
import './ErrorFallback.css';
import { ErrorFallbackProps } from '../../interfaces/uiInterface';

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
    <IonPage>
        <IonContent fullscreen className="error-content">
            <div className="error-container">
                <div className="error-wrapper">
                    <IonIcon
                        icon={alertCircleOutline}
                        className="error-icon"
                        color="danger"
                    />

                    <IonText color="dark">
                        <h1 className="error-title">Something went wrong</h1>
                    </IonText>

                    <div className="error-message-box">
                        <IonText color="medium">
                            <p className="error-message">{error.message}</p>
                        </IonText>
                    </div>

                    <IonButton
                        expand="block"
                        className="error-button"
                        onClick={resetErrorBoundary}
                    >
                        <IonIcon icon={refreshOutline} slot="start" />
                        Try Again
                    </IonButton>
                </div>
            </div>
        </IonContent>
    </IonPage>
);

export default ErrorFallback;