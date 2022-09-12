import { initializeApp } from "firebase/app"; //initializeApp creates an app instances
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"; // for authentication
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  connectFirestoreEmulator,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjr2WYfA49TnacCZmccaAj4GI0WtHlEqg",
  authDomain: "crwn-clothing-a5bae.firebaseapp.com",
  projectId: "crwn-clothing-a5bae",
  storageBucket: "crwn-clothing-a5bae.appspot.com",
  messagingSenderId: "228767931672",
  appId: "1:228767931672:web:ca96ab43e14d974449926d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//CRUD action is going to happen using firebaseApp

const provider = new GoogleAuthProvider(); //inorder to use google authentication initialize provider
// GoogleAuthProvider is a class that we get from firebase authentication that is connect to google authentication

provider.setCustomParameters({
  prompt: "select_account",
});

//everytime somebody interact with our provider we want to force them to select an account

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
