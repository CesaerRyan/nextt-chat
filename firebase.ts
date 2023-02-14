import { getApps, getApp, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBEijIYL7rmSUQrioal7G0mB05IBjJRIiU",
    authDomain: "chagpt-nextjs.firebaseapp.com",
    projectId: "chagpt-nextjs",
    storageBucket: "chagpt-nextjs.appspot.com",
    messagingSenderId: "398162228763",
    appId: "1:398162228763:web:58671174a7987a1efa6abe",
    measurementId: "G-ZGGFTSTYPJ"
  };
  

  const app = getApps.length > 0 ? getApp(): initializeApp(firebaseConfig)

  const db = getFirestore(app)

  export {db}