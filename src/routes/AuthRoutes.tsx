import { Route, Redirect } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import Login from '../pages/(auth)/Login';
import Register from '../pages/(auth)/Register';
import NotFound from '../pages/(errors)/NotFound';

const AuthRoutes: React.FC = () => (
    <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/">
            <Redirect to="/login" />
        </Route>
        <Route component={NotFound} />
    </IonRouterOutlet>
);

export default AuthRoutes;
