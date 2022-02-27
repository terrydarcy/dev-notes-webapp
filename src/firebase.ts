// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, updateProfile, GithubAuthProvider} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARuaTwOF8WboxuH9w-U_kSsoIdaB4GDY4",
  authDomain: "dev-notes-a7a54.firebaseapp.com",
  projectId: "dev-notes-a7a54",
  storageBucket: "dev-notes-a7a54.appspot.com",
  messagingSenderId: "480743411254",
  appId: "1:480743411254:web:9d4562bb8a9440a826d297",
  measurementId: "G-E5PJB5MZ7R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const provider = new GithubAuthProvider();

export const _createUserWithEmailAndPassword: any = (username:string, email:string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    updateProfile(user, {displayName: username, photoURL: `https://picsum.photos/seed/${username}/200`});

     // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(error)
    // ..
  });
}

export const _signInWithEmailAndPassword = (email:string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
 
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(error)
  });
}

export const  _loginWithGitHub = async() => {
  await signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    if(credential) {
      const token = credential.accessToken;
     }

    // The signed-in user info.
    const user = result.user;
   }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    console.error(errorCode, errorMessage, email, credential);
  });
}


 
 