import { IonButton, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
import { useHistory } from 'react-router-dom';

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

export const initFacebook = () => {
  return new Promise<void>((resolve) => {
    // Avoid multiple initializations
    if (window.FB) {
      resolve();
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_CLIENT_ID,
        xfbml: true,
        version: 'v24.0',
      });
      resolve();
    };

    // Load SDK dynamically
    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  });
};

const Tab2: React.FC = () => {
  const [fbReady, setFbReady] = useState(false);
  const history = useHistory();

  useEffect(() => {
    initFacebook().then(() => setFbReady(true));
  }, []);

  const loginWithFacebook = () => {
    if (!fbReady) {
      console.log('Facebook SDK not ready yet');
      return;
    }

    window.FB.login(
      (response: any) => {
        console.log("repsonse", response)
        if (response.authResponse) {
          window.FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo: any) => {
            console.log('User Info:', userInfo);
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      { scope: 'public_profile' }
    );
  };

  const goToTab1 = () => {
    history.push('/tab1');
    window.history.replaceState({ isRoot: true, cameFromOtherTab: false }, '');
  };

  return (
    <IonPage>
      <button onClick={loginWithFacebook}>Login with Facebook helo</button>
      <IonButton onClick={goToTab1}>Go to Tab1</IonButton>
      {/* <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  const decoded = jwtDecode(credentialResponse.credential)
                  console.log('Decoded user info:', decoded);
                }
              }}
              onError={() => console.log('Login Failed')}
            /> */}
    </IonPage>
  );
};

export default Tab2;
