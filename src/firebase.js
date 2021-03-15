import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAaPY5OdUjx96CRx3VAzd_7TDVLNWqFT20",
  authDomain: "netflix-clone-6649c.firebaseapp.com",
  projectId: "netflix-clone-6649c",
  storageBucket: "netflix-clone-6649c.appspot.com",
  messagingSenderId: "800004261381",
  appId: "1:800004261381:web:8034c9ce86f6f921cbfe6c"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth }
export default db;