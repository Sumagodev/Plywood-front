import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
    apiKey: "AIzaSyCwFzyViZX9BbIbFbkd9fRTtm4ShlFtPpw",
    authDomain: "plywoodbazar-86c65.firebaseapp.com",
    projectId: "plywoodbazar-86c65",
    storageBucket: "plywoodbazar-86c65.appspot.com",
    messagingSenderId: "396248724713",
    appId: "1:396248724713:web:978c6f268eedb639876c78"
};
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);



export const fetchToken = () => {
    return getToken(messaging, { vapidKey: "BMV-xQ5V8lsREwo--GPAct5_p0OkLTmdcfXSzIROeza2K16eMZQeMp6x6fyxJ_VPzekVS-wFySbrG1b99u4yJUs" })
        .then((currentToken) => {
            if (currentToken) {
                return currentToken;
            } else {
                return null;
            }
        })
        .catch((err) => {
            return null;
        });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
