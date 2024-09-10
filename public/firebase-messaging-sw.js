// // Scripts for firebase and firebase messaging
// importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// // Initialize the Firebase app in the service worker by passing the generated config

// const firebaseConfig = {
//     apiKey: "AIzaSyCwFzyViZX9BbIbFbkd9fRTtm4ShlFtPpw",
//     authDomain: "plywoodbazar-86c65.firebaseapp.com",
//     projectId: "plywoodbazar-86c65",
//     storageBucket: "plywoodbazar-86c65.appspot.com",
//     messagingSenderId: "396248724713",
//     appId: "1:396248724713:web:978c6f268eedb639876c78"
// };
// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// const messaging = firebase.messaging();
// // console.log(messaging, "MESSAGING");

// messaging.onBackgroundMessage(function (payload) {
//     console.log("Received background message ", payload);

//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });
