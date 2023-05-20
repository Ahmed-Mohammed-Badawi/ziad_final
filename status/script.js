import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
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

        // GET THE DATA
        const order = document.getElementById("order-id");
        const search = document.getElementById("search");
        const status = document.getElementById("status");
        const status_0 = document.getElementById("status_0");
        const status_1 = document.getElementById("status_1");
        const status_2 = document.getElementById("status_2");
        const status_3 = document.getElementById("status_3");

        async function searchOrder(e) {
            e.preventDefault();

            // Check if all the fields are filled and if not make the border red
            if (order.value === "") {
                order.style.border = "1px solid red";
                return;
            } else {
                order.style.border = "1px solid #00e509";
            }

            // Check if the VIN number is exists in the database
            // If exists, get the details and show them in the form
            // If not, show an error message
            const carsRef = collection(db, "TestAddCar");
            const q = query(carsRef, where("vin", "==", order.value));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.size > 0) {
                console.log(querySnapshot.docs[0].data());

                // if there is no status in the database make it 0
                if (querySnapshot.docs[0].data().car_status == undefined) {
                    const docRef = doc(
                        db,
                        "TestAddCar",
                        querySnapshot.docs[0].id
                    );
                    await updateDoc(docRef, {
                        car_status: 0,
                    });
                }

                // Show the details in the form
                status.style.display = "block";

                if (querySnapshot.docs[0].data().car_status == 0) {
                    status_0.innerText = "Status: in progress";
                    status_1.innerText = "Status: Not yet";
                    status_2.innerText = "Status: Not yet";
                    status_3.innerText = "Status: Not yet";
                } else if (querySnapshot.docs[0].data().car_status == 1) {
                    status_0.innerText = "Status: Done";
                    status_1.innerText = "Status: in progress";
                    status_2.innerText = "Status: Not yet";
                    status_3.innerText = "Status: Not yet";
                } else if (querySnapshot.docs[0].data().car_status == 2) {
                    status_0.innerText = "Status: Done";
                    status_1.innerText = "Status: Done";
                    status_2.innerText = "Status: in progress";
                    status_3.innerText = "Status: Not yet";
                } else if (querySnapshot.docs[0].data().car_status == 3) {
                    status_0.innerText = "Status: Done";
                    status_1.innerText = "Status: Done";
                    status_2.innerText = "Status: Done";
                    status_3.innerText = "Status: in progress";
                } else if (querySnapshot.docs[0].data().car_status == 4) {
                    status_0.innerText = "Status: Done";
                    status_1.innerText = "Status: Done";
                    status_2.innerText = "Status: Done";
                    status_3.innerText = "Status: Done";
                }
            } else {
                alert("The VIN number does not exist in the database");
                return;
            }
        }

        search.addEventListener("click", searchOrder);
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
