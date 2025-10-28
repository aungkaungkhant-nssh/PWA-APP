import {
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
} from '@ionic/react';
import { triangle, ellipse, square } from 'ionicons/icons';


import Tab1 from '../pages/Tab1';
import Tab2 from '../pages/Tab2';
import Tab3 from '../pages/Tab3';
import ProtectedRoute from './ProtectedRoutes';
import { Route } from 'react-router';
import NotFound from '../pages/(errors)/NotFound';

interface AppRoutesProps {
    isAuthenticated: boolean;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ isAuthenticated }) => (
    <IonTabs>
        <IonRouterOutlet>
            <ProtectedRoute
                exact
                path="/tab1"
                component={Tab1}
                isAuthenticated={isAuthenticated}
            />
            <ProtectedRoute
                exact
                path="/tab2"
                component={Tab2}
                isAuthenticated={isAuthenticated}
            />
            <ProtectedRoute
                exact
                path="/tab3"
                component={Tab3}
                isAuthenticated={isAuthenticated}
            />
            <Route component={NotFound} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={triangle} />
                <IonLabel>Tab 1</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={ellipse} />
                <IonLabel>Tab 2</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={square} />
                <IonLabel>Tab 3</IonLabel>
            </IonTabButton>
        </IonTabBar>
    </IonTabs>
);

export default AppRoutes;
