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

        // Firestore-related code
        const form = document.getElementById("residence-form");

        // GET THE LOGOUT BUTTON
        const logout_button = document.getElementById("__LOGOUT");

        // SHOW THE LOGOUT BUTTON
        logout_button.style.display = "flex";

        // GET THE DATA
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const national_id = document.getElementById("national-id");
        const nationality = document.getElementById("nationality");
        const country = document.getElementById("country");
        const gender = document.getElementById("gender");

        async function submitHandler(e) {
            e.preventDefault();

            // Check if all the fields are filled and if not make the border red
            if (name.value === "") {
                name.style.border = "1px solid red";
                return;
            } else {
                name.style.border = "1px solid #00e509";
            }

            if (email.value === "") {
                email.style.border = "1px solid red";
                return;
            } else {
                email.style.border = "1px solid #00e509";
            }

            if (phone.value === "") {
                phone.style.border = "1px solid red";
                return;
            } else {
                phone.style.border = "1px solid #00e509";
            }

            if (national_id.value === "") {
                national_id.style.border = "1px solid red";
                return;
            } else {
                national_id.style.border = "1px solid #00e509";
            }

            if (nationality.value === "") {
                nationality.style.border = "1px solid red";
                return;
            } else {
                nationality.style.border = "1px solid #00e509";
            }

            if (country.value === "") {
                country.style.border = "1px solid red";
                return;
            } else {
                country.style.border = "1px solid #00e509";
            }

            if (gender.value === "") {
                gender.style.border = "1px solid red";
                return;
            } else {
                gender.style.border = "1px solid #00e509";
            }

            try {
                /*
                    1. get the users collection/user.uid document
                    2. create a subcollection called form
                    3. add the data to the subcollection
                */

                const userDocRef = doc(db, "users", user.uid);
                const formCollectionRef = collection(userDocRef, "form");

                const formData = {
                    name: name.value,
                    email: email.value,
                    "phone number": phone.value,
                    "national id": national_id.value,
                    nationality: nationality.value,
                    country_of_residence: country.value,
                    gender: gender.value,
                    user_id: user.uid,
                };

                const addedDocRef = await setDoc(doc(formCollectionRef, user.uid), formData);


                console.log("Document written with ID: ", auth.currentUser.uid);
                window.location.href = "/index.html";
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }

        // LOGOUT FUNCTION
        logout_button.addEventListener("click", () => {
            signOut(auth)
                .then(() => {
                    // redirect to login page
                    window.location.href = "/login.html";
                })
                .catch((error) => {
                    window.alert(error.message);
                });
        });

        form.addEventListener("submit", submitHandler);
    } else {
        // Redirect to login page or handle the case when the user is not signed in
        window.location.href = "login.html";
    }
});

// GET THE HOME BUTTON
const home_button = document.getElementById("__HOME");

home_button.addEventListener("click", () => {
    window.location.href = "/solid/index.html";
});
