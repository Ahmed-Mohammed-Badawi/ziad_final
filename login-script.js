import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
    getFirestore,
    setDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAjFD4P-32-B3AUsVTaKYI-immMc3EUcMs",
    authDomain: "graduation-project-c491c.firebaseapp.com",
    projectId: "graduation-project-c491c",
    storageBucket: "graduation-project-c491c.appspot.com",
    messagingSenderId: "550531965310",
    appId: "1:550531965310:web:ef9c973cd0b6272fd9132f",
    measurementId: "G-E3D5D9SBTD",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct");

const fullName = document.getElementById("fullName");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById(
    "confirm-password-signup"
);
const createacctbtn = document.getElementById("create-acct-btn");

const returnBtn = document.getElementById("return-btn");
const deletebtn = document.getElementById("Delete-user");

var email,
    password,
    fullNameValue,
    signupPassword,
    confirmSignupEmail,
    confirmSignUpPassword;

createacctbtn.addEventListener("click", function () {
    var isVerified = true;

    confirmSignupEmail = confirmSignupEmailIn.value;
    fullNameValue = fullName.value;

    if (!confirmSignupEmail) {
        window.alert("Please Enter a valid email address.");
        isVerified = false;
    }

    signupPassword = signupPasswordIn.value;
    confirmSignUpPassword = confirmSignUpPasswordIn.value;
    if (signupPassword != confirmSignUpPassword) {
        window.alert("Password fields do not match. Try again.");
        isVerified = false;
    }

    if (
        fullNameValue == null ||
        confirmSignupEmail == null ||
        signupPassword == null ||
        confirmSignUpPassword == null
    ) {
        window.alert("Please fill out all required fields.");
        isVerified = false;
    }

    if (isVerified) {
        createUserWithEmailAndPassword(auth, confirmSignupEmail, signupPassword)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;

                // Save user data to database firestore collection user with user id as document id
                const docRef = await setDoc(doc(db, "users", user.uid), {
                    name: fullNameValue,
                    email: confirmSignupEmail,
                    uid: user.uid,
                });

                console.log("Document written with ID: ", docRef);

                // save user data to database
                window.alert("Success! Account created.");
                window.location.href = "solid/index.html";
            })
            .catch((error) => {
                console.log(error);
                // ..
                window.alert("Error occurred. Try again.");
            });
    }
});

submitButton.addEventListener("click", function () {
    email = emailInput.value;
    console.log(email);
    password = passwordInput.value;
    console.log(password);

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("Success! Welcome back!");
            window.alert("Success! Welcome back!");

            if (user.email == "admin@admin.com") {
                window.location.href = "/admin/index.html";
            } else {
                window.location.href = "/solid/index.html";
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error occurred. Try again.");
            window.alert("Error occurred. Try again.");
        });
});

signupButton.addEventListener("click", function () {
    main.style.display = "none";
    createacct.style.display = "block";
});

returnBtn.addEventListener("click", function () {
    main.style.display = "block";
    createacct.style.display = "none";
});

//remove signed up user
deletebtn.addEventListener("click", function () {
    auth.currentUser
        .delete()
        .then(function () {
            window.alert("User Deleted.");
        })
        .catch(function (error) {
            window.alert("Error occurred. Try again.");
        });
});
