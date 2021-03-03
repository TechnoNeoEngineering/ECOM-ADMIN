importScripts('https://www.gstatic.com/firebasejs/5.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.4.1/firebase-messaging.js');
firebase.initializeApp({
    apiKey: 'AIzaSyAbKIYQcpFmR8iG5Gef9pgbsidwQLHKtNw',
    authDomain: 'mindmaxecommerce-2a890.firebaseapp.com',
    databaseURL: 'https://mindmaxecommerce-2a890.firebaseio.com',
    projectId: 'mindmaxecommerce-2a890',
    storageBucket: 'mindmaxecommerce-2a890.appspot.com',
    messagingSenderId: '861256537618',
    appId: '1:861256537618:web:5cc18c3396882f4948aacb',
    measurementId: 'G-HXR8SR56SX',
});
const messaging = firebase.messaging();