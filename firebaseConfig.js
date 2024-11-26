import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCqI8ILVWCtAPFMrUBGmPuSC2__IVJNIeU",
    authDomain: "eventorganizerapp-de0a2.firebaseapp.com",
    projectId: "eventorganizerapp-de0a2",
    storageBucket: "eventorganizerapp-de0a2.firebasestorage.app",
    messagingSenderId: "333041844905",
    appId: "1:333041844905:web:b140298487ddb59a0f9fb8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
