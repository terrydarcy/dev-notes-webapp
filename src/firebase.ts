// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";

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

export const _createUserWithEmailAndPassword: any = (username:string, email:string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("user signed in..." + user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  

}