const firebaseConfig = {
    apiKey: "AIzaSyCSW7UMHtJDdRJga5oSEHgppvUsLRtagx0",
    authDomain: "jt25-fae27.firebaseapp.com",
    projectId: "jt25-fae27",
    storageBucket: "jt25-fae27.appspot.com",
    messagingSenderId: "590615766263",
    appId: "1:590615766263:web:95dc99f6487ba0693a1ff2",
    measurementId: "G-QB2Z7JDN2V"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Select the form elements
  var loginEmail = document.getElementById('email');
  var loginPassword = document.getElementById('password');
  
  var registerFullName = document.getElementById('fullName');
  var registerBirthday = document.getElementById('birthday');
  var registerAddress = document.getElementById('address');
  var registerPhoneNumber = document.getElementById('phoneNumber');
  var registerEmail = document.getElementById('registerEmail');
  var registerPassword = document.getElementById('registerPassword');
  var registerConfirmPassword = document.getElementById('confirmPassword');
  
  // Create an event listener for the login button
  document.getElementById('login').addEventListener('click', function(event) {
    // Prevent the default form submission
    event.preventDefault();
  
    // Get the values of the input fields
    var email = loginEmail.value;
    var password = loginPassword.value;
  
    if (email == "" || password == "") {
        alert("Please fill out all fields");
        return false;
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        alert("Login Successful");
        window.location.href = "index.html";
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === 'auth/user-not-found') {
            alert('No user found with this email.');
        } else if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        }else if (errorCode === 'auth/invalid-email') {
            alert('Invalid Field.');
        }else{
            alert("Invalid Email or Password");
        }
    });
  });
  
  // Create an event listener for the register button
  document.getElementById('register').addEventListener('click', function(event) {
    // Prevent the default form submission
    event.preventDefault();
  
    // Get the values of the input fields
    var fullName = registerFullName.value;
    var birthday = registerBirthday.value;
    var address = registerAddress.value;
    var phoneNumber = registerPhoneNumber.value;
    var email = registerEmail.value;
    var password = registerPassword.value;
    var confirmPassword = registerConfirmPassword.value;

    if (password !== confirmPassword) {
        alert('Password do not match.');
        return; // Exit the function to prevent further execution
    }
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        console.log(user);
        alert("Registration Successful");
        window.location.href = "loginSignUp.html";
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === 'auth/email-already-in-use') {
            alert('Email already in use.');
        } else if (errorCode === 'auth/weak-password') {
            alert('Password should be at least 6 characters.');
        }else if (errorCode === 'auth/invalid-email') {
            alert('Invalid email.');
        }else{
            alert(errorMessage);
        }
    });
  });

  