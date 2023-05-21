import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    getAuth,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    doc,
    getDocs,
    getDoc,
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

// GET THE SELECT OF CAR TYPE
const car_type = document.getElementById("car_type");
const car_model = document.getElementById("car_model");

const bmw_models = ["X2", "X3", "X4", "X5", "X6"];
const mercedes_models = ["A-180", "C-180", "E-200"];
const slectanOption = ["Select an option"];

car_type.addEventListener("change", (e) => {
    if (e.target.value === "BMW") {
        // Remove all the options from the car_model select
        car_model.innerHTML = "";

        // Add a list of BMW models to the car_model select
        bmw_models.forEach((model) => {
            const option = document.createElement("option");
            option.value = model;
            option.innerHTML = model;
            car_model.appendChild(option);
        });
    } else if (e.target.value === "Mercedes") {
        // Remove all the options from the car_model select
        car_model.innerHTML = "";
        // Add a list of Mercedes models to the car_model select
        mercedes_models.forEach((model) => {
            const option = document.createElement("option");
            option.value = model;
            option.innerHTML = model;
            car_model.appendChild(option);
        });
    } else {
        // Remove all the options from the car_model select
        // Remove all the options from the car_model select
        car_model.innerHTML = "";
        slectanOption.forEach((model) => {
            const option = document.createElement("option");
            option.value = model;
            option.innerHTML = model;
            car_model.appendChild(option);
        });
    }
});

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log("User is signed in:", user);

        // Firestore-related code
        const form = document.getElementById("car_details-form");

        // GET THE LOGOUT BUTTON
        const logout_button = document.getElementById("__LOGOUT");

        // SHOW THE LOGOUT BUTTON
        logout_button.style.display = "flex";

        // GET THE DATA
        const vin = document.getElementById("vin_number");
        const type = document.getElementById("car_type");
        const model = document.getElementById("car_model");
        const color = document.getElementById("car_color");
        const country = document.getElementById("car_country");
        const engine = document.getElementById("car_engine");
        const year_of_manufacturing = document.getElementById(
            "year_of_manufacturing"
        );

        async function submitHandler(e) {
            e.preventDefault();

            // Check if all the fields are filled and if not make the border red
            if (vin.value === "") {
                vin.style.border = "1px solid red";
                return;
            } else {
                vin.style.border = "1px solid #00e509";
            }

            if (type.value === "") {
                type.style.border = "1px solid red";
                return;
            } else {
                type.style.border = "1px solid #00e509";
            }

            if (model.value === "") {
                model.style.border = "1px solid red";
                return;
            } else {
                model.style.border = "1px solid #00e509";
            }

            if (color.value === "") {
                color.style.border = "1px solid red";
                return;
            } else {
                color.style.border = "1px solid #00e509";
            }

            if (country.value === "") {
                country.style.border = "1px solid red";
                return;
            } else {
                country.style.border = "1px solid #00e509";
            }

            if (engine.value === "") {
                engine.style.border = "1px solid red";
                return;
            } else {
                engine.style.border = "1px solid #00e509";
            }

            if (year_of_manufacturing.value === "") {
                year_of_manufacturing.style.border = "1px solid red";
                return;
            } else {
                year_of_manufacturing.style.border = "1px solid #ccc";
            }

            // Check if the VIN number is not exists in the database
            // If exists, show an error message
            // If not, add the car details to the database
            const carsRef = collection(db, "car_details");
            const q = query(carsRef, where("vin", "==", vin.value));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.size > 0) {
                alert("The VIN number already exists in the database");
                return;
            }

            try {
                const docRef = await addDoc(collection(db, "car_details"), {
                    vin: vin.value,
                    type: type.value,
                    model: model.value,
                    color: color.value,
                    country: country.value,
                    engine: engine.value,
                    year_of_manufacturing: year_of_manufacturing.value,
                    user_id: user.uid,
                    car_status: 0,
                });
                console.log("Document written with ID: ", docRef.id);
                // window.location.href = "/solid/index.html";
            } catch (e) {

                console.error("Error adding document: ", e);
            }

            // GET FROM THE DB in the place "cars: collection / [type.value]: collection / [model.value]: collection / [engine.value]: document";
            // IF THE DOCUMENT EXISTS, SHOW THE CAR DETAILS
            // IF NOT, SHOW AN ERROR MESSAGE
            const carRef = doc(collection(db, "cars", type.value, model.value), engine.value);
            const carSnapshot = await getDoc(carRef);

            if (carSnapshot.exists()) {
                // Car document exists, retrieve the data
                const carData = carSnapshot.data();
                // Display or process the car data as needed
                const overlay = document.getElementById("__OVERLAY");
                const car_details = document.getElementById("__CAR_DETAILS");
                const close_button = document.getElementById("__CLOSE");
                const pay_button = document.getElementById("__PAY");
                const custom_tax = document.getElementById("__CUSTOM_TAX")
                const development_fees = document.getElementById("__DEVELOPMENT_FEES")
                const price = document.getElementById("__PRICE")
                const schudule_tax = document.getElementById("__SCHEDULE_TAX")
                const totalValue = document.getElementById("__TOTAL_VALUE")
                const value_added_tax = document.getElementById("__VALUE_ADDED_TAX")

                // SHOW THE CAR DETAILS
                overlay.classList.remove("HIDDEN");
                car_details.classList.remove("HIDDEN");
                // HIDE THE FORM
                close_button.addEventListener("click", () => {
                    car_details.classList.add("HIDDEN");
                    overlay.classList.add("HIDDEN");
                });

                // SET THE CAR DETAILS TO THE CAR DETAILS DIV
                custom_tax.innerText = carData.customs_tax;
                development_fees.innerText = carData.development_fees;
                price.innerText = carData.price;
                schudule_tax.innerText = carData.schedule_tax;
                totalValue.innerText = carData.total_value;
                value_added_tax.innerText = carData.value_added_tax;

                // PAY BUTTON
                pay_button.addEventListener("click", () => {
                    window.location.href = "/payment/payment.html";
                });

            } else {
                // Car document does not exist
                console.log("Error: Car not found");
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
