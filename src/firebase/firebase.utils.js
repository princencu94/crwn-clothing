import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA6_-AXuJYTfS68E5ENmxdc662yM5CI1qc",
    authDomain: "crwn-clothing-c637c.firebaseapp.com",
    databaseURL: "https://crwn-clothing-c637c.firebaseio.com",
    projectId: "crwn-clothing-c637c",
    storageBucket: "crwn-clothing-c637c.appspot.com",
    messagingSenderId: "1053890277277",
    appId: "1:1053890277277:web:f7a58a0c62f5347fc58974",
    measurementId: "G-1BC175CDKL"
  };

  export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const {displayName, email} = userAuth;
      const created_At = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          created_At,
          ...additionalData
        })
      } catch(error) {
        console.log('Error creating User', error.message);
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

