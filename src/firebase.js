import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBBAZHBG3PfCnkwFOaPkB0jKFwfu8NV2rk",
    authDomain: "netflix-is.firebaseapp.com",
    projectId: "netflix-is",
    storageBucket: "netflix-is.appspot.com",
    messagingSenderId: "900523192613",
    appId: "1:900523192613:web:6d88103701c1ca2c996acc",
    measurementId: "G-NKFMFYC60S"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth}
export default db;