import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAKC0e2eMb_RHj7HYqcpgMe8vzw81lc_5c",
    authDomain: "floof-store-db-100db.firebaseapp.com",
    databaseURL: "https://floof-store-db-100db.firebaseio.com",
    projectId: "floof-store-db-100db",
    storageBucket: "floof-store-db-100db.appspot.com",
    messagingSenderId: "975894049886",
    appId: "1:975894049886:web:bcf674dd65db83caebf0cf",
    measurementId: "G-C09R4BDKGF"
  }

  //For storing the user Data in Firebase
  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get();

      if(!snapShot.exists) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();

          try {
              await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData
              })
          } catch(error) {
              console.log('error creating user', error.message);
          }
      }

      return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;