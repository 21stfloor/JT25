import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, addDoc, collection, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCSW7UMHtJDdRJga5oSEHgppvUsLRtagx0",
    authDomain: "jt25-fae27.firebaseapp.com",
    projectId: "jt25-fae27",
    storageBucket: "jt25-fae27.appspot.com",
    messagingSenderId: "590615766263",
    appId: "1:590615766263:web:95dc99f6487ba0693a1ff2",
    measurementId: "G-QB2Z7JDN2V"
  };

  // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        // const firebaseConfig = {
        //   apiKey: "AIzaSyCSW7UMHtJDdRJga5oSEHgppvUsLRtagx0",
        //   authDomain: "jt25-fae27.firebaseapp.com",
        //   projectId: "jt25-fae27",
        //   storageBucket: "jt25-fae27.appspot.com",
        //   messagingSenderId: "590615766263",
        //   appId: "1:590615766263:web:95dc99f6487ba0693a1ff2",
        //   measurementId: "G-QB2Z7JDN2V"
        // };
      
        // Initialize Firebase
        export const app = initializeApp(firebaseConfig);
  
// export  const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


var currentUser = null;
auth.onAuthStateChanged(
    (User)=> {
        currentUser = User;
        if (currentUser) {
            signIn.style.display = 'none';
            signOutLink.style.display = 'block';
            $('#designerLink').show();
    
            let path = window.location.pathname;
            if (path.endsWith('loginSignUp.html')) {
                window.location.replace('index.html'); // Change to your login/sign-up page URL
            }
        }
        else{
            $('#designerLink').hide();
        }
    }
);


