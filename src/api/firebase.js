
//конфиг, который мы получили на сайте firebase
import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyCishWgMKqs8cs0D_kgmB2GN9GaAi_TMzk",
    authDomain: "gb-chatmy.firebaseapp.com",
    databaseURL: "https://gb-chatmy-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gb-chatmy",
    storageBucket: "gb-chatmy.appspot.com",
    messagingSenderId: "241893539443",
    appId: "1:241893539443:web:59c95375ff81cb205fb406",
    measurementId: "G-BJEFE7G8GR"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)//теперь везде, где нам нужен firebase, мы будем его использовать отсюда.

export const db = firebaseApp.database()//это наша база данных, с которой мы и будем работать