
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    getAuth,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
    getFirestore,
    collection,
    doc,
    setDoc
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
const db = getFirestore(app);
const auth = getAuth(app);



auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log("User is signed in:", user);
        
        
        // GET THE ELEMENTS
        const name = document.getElementById("__NAME");
        const cardNumber = document.getElementById("__CARD_NUMBER");
        const expirationDate = document.getElementById("__EXPIRY");
        const cvv = document.getElementById("__CVV");
        const submitButton = document.getElementById("__BUTTON");

        async function submitHandler(e) {
            e.preventDefault();

            // Check if all the fields are filled and if not make the border red
            if (name.value === "") {
                name.style.border = "1px solid red";
                return;
            } else {
                name.style.border = "1px solid #00e509";
            }

            if (cardNumber.value === "") {
                cardNumber.style.border = "1px solid red";
                return;
            } else {
                cardNumber.style.border = "1px solid #00e509";
            }

            if (expirationDate.value === "") {
                expirationDate.style.border = "1px solid red";
                return;
            } else {
                expirationDate.style.border = "1px solid #00e509";
            }

            if (cvv.value === "") {
                cvv.style.border = "1px solid red";
                return;
            } else {
                cvv.style.border = "1px solid #00e509";
            }

            
            try {
                const formData = {
                    name: name.value,
                    cardNumber: cardNumber.value,
                    expirationDate: expirationDate.value,
                    cvv: cvv.value,
                    user_id: user.uid,
                };

                await setDoc(doc(db, "payment", user.uid), formData);

                console.log("Document written with ID: ", auth.currentUser.uid);
                window.location.href = "/solid/index.html";
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }

        submitButton.addEventListener("click", submitHandler);
    } else {
        // Redirect to login page or handle the case when the user is not signed in
        window.location.href = "login.html";
    }
});