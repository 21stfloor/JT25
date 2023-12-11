

// Select the form elements
var loginEmail = document.getElementById('email');
var loginPassword = document.getElementById('password');
var loginEmailMobile = document.getElementById('loginEmailMobile');
var loginPasswordMobile = document.getElementById('loginPasswordMobile');

var registerFullName = document.getElementById('fullName');
var registerBirthday = document.getElementById('birthday');
var registerAddress = document.getElementById('address');
var registerPhoneNumber = document.getElementById('phoneNumber');
var registerEmail = document.getElementById('registerEmail');
var registerPassword = document.getElementById('registerPassword');
var registerConfirmPassword = document.getElementById('confirmPassword');

// Create an event listener for the login button
document.getElementById('login').addEventListener('click', function (event) {
    // Prevent the default form submission
    event.preventDefault();
    // Get the values of the input fields
    var email = loginEmail.value;
    var password = loginPassword.value;
    tryLogin(email, password);
});

document.getElementById('loginMobile').addEventListener('click', function (event) {
    // Prevent the default form submission
    event.preventDefault();
    // Get the values of the input fields
    var email = loginEmailMobile.value;
    var password = loginPasswordMobile.value;
    tryLogin(email, password);
});

function tryLogin(email, password) {
    

    if (email.trim() == "" || password.trim() == "") {
        bootbox.alert("Please fill out all fields");
        return false;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user);
            // alert("Login Successful");
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
            } else if (errorCode === 'auth/invalid-email') {
                alert('Invalid Field.');
            } else {
                alert("Invalid Email or Password");
            }
        });
}


document.getElementById('registerMobile').addEventListener('click', function (event) {
    // Prevent the default form submission
    event.preventDefault();
    var fullName = $('#fullNameMobile').val();
    var birthday = $('#birthdayMobile').val();
    var address = $('#addressMobile').val();
    var phoneNumber = $('#phoneNumberMobile').val();
    var email = $('#registerEmailMobile').val();
    var password = $('#registerPasswordMobile').val();
    var confirmPassword = $('#registerConfirmPasswordMobile').val();
    tryRegister(fullName, birthday, address, phoneNumber, email, password, confirmPassword);
});

// Create an event listener for the register button
document.getElementById('register').addEventListener('click', function (event) {
    // Prevent the default form submission
    event.preventDefault();
    var fullName = registerFullName.value;
    var birthday = registerBirthday.value;
    var address = registerAddress.value;
    var phoneNumber = registerPhoneNumber.value;
    var email = registerEmail.value;
    var password = registerPassword.value;
    var confirmPassword = registerConfirmPassword.value;
    tryRegister(fullName, birthday, address, phoneNumber, email, password, confirmPassword);
});

function tryRegister(fullName, birthday, address, phoneNumber, email, password, confirmPassword) {
    // Get the values of the input fields
    

    if (email.trim() == "" || fullName.trim() == "") {
        bootbox.alert("Please fill out all the required fields!");
        return false;
    }

    if (password.trim() != confirmPassword.trim()) {
        bootbox.alert('Password do not match!');
        return false;
    }

    if (password.trim().length < 6) {
        bootbox.alert("Password length must be at least 6 characters!");
        return false;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            var uid = user.uid; // Get the UID of the authenticated user
            console.log(user);
            // Save user data to Firestore
            db.collection('users').doc(uid).set({
                fullName: fullName,
                birthday: birthday,
                address: address,
                phoneNumber: phoneNumber,
                email: email,
                uid: uid // Save the UID in the document
            })
                .then(() => {
                    console.log("User data saved!");
                    bootbox.alert("Registration Successful");
                    window.location.href = "loginSignUp.html";
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                    bootbox.alert("Error saving user data.");
                });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            if (errorCode === 'auth/email-already-in-use') {
                bootbox.alert('Email already in use.');
            } else if (errorCode === 'auth/weak-password') {
                bootbox.alert('Password should be at least 6 characters.');
            } else if (errorCode === 'auth/invalid-email') {
                bootbox.alert('Invalid email.');
            } else {
                bootbox.alert(errorMessage);
            }
        });
}