const firebaseConfig = {
    apiKey: "AIzaSyCSW7UMHtJDdRJga5oSEHgppvUsLRtagx0",
    authDomain: "jt25-fae27.firebaseapp.com",
    projectId: "jt25-fae27",
    storageBucket: "jt25-fae27.appspot.com",
    messagingSenderId: "590615766263",
    appId: "1:590615766263:web:95dc99f6487ba0693a1ff2",
    measurementId: "G-QB2Z7JDN2V"
  };
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();


var currentUser = null;
firebase.auth().onAuthStateChanged(
    (User)=> {
        currentUser = User;
        if (currentUser) {
            signIn.style.display = 'none';
            signOutLink.style.display = 'block';
    
            if (window.location.pathname.endsWith('loginSignUp.html')) {
                window.location.replace('index.html'); // Change to your login/sign-up page URL
            }
        }
    }
);


