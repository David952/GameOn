function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const btnClose = document.querySelector(".close");

// DOM Form
const form = document.querySelector("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthdate")
const quantityTournament = document.getElementById("quantity");
const city = document.getElementsByName("location");
const generalConditions = document.getElementById("checkbox1");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
btnClose.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// inputs form validation
function validateFirstName(firstName) {
    if (firstName.trim().length < 2) {
      throw new Error("Le prénom doit contenir au moins 2 caractères.");
    }
}

function validateLastName(lastName) {
    if (lastName.trim().length < 2) {
      throw new Error("Le nom de famille doit contenir au moins 2 caractères.");
    }
}

function validateEmail(email) {
    const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error("Veuillez saisir une adresse e-mail valide.");
    }
}

function validateBirthDate(birthdate) {
    const today = new Date();
    const maxAgeDate = new Date();
    maxAgeDate.setFullYear(today.getFullYear() - 100);
    const minAgeDate = new Date();
    minAgeDate.setFullYear(today.getFullYear() - 13);

    if (birthdate === "" || new Date(birthdate) >= minAgeDate || new Date(birthdate) <= maxAgeDate) {
      throw new Error("Veuillez saisir une date de naissance. (Vous devez avoir 13 ans révolus.)");
    }
}

function validateQuantityTournament(quantityTournament) {
    if (Number.isNaN(quantityTournament) || quantityTournament === "") {
      throw new Error("Veuillez saisir une valeur numérique pour le nombre de tournois.");
    }
}

function validateCity(city) {
    let locationSelected = false;
    
    for (let i = 0; i < city.length; i++) {
        if (city[i].checked) {
            locationSelected = true;
        }
    }

    if (!locationSelected) {
      throw new Error("Veuillez choisir une ville.");
    }
}

function validateGeneralConditions(generalConditions) {
    if (!generalConditions.checked) {
      throw new Error("Veuillez cocher les conditions générales.");
    }
}

// Form submit
form.addEventListener("submit", (event) => {
    event.preventDefault();

    try {
      validateFirstName(firstName.value);
      validateLastName(lastName.value);
      validateEmail(email.value);
      validateBirthDate(birthDate.value);
      validateQuantityTournament(quantityTournament.value);
      validateCity(city);
      validateGeneralConditions(generalConditions);

      console.log('Formulaire soumis avec succès !')
    } catch (error) {
        throw new Error(error.message);
    }
}) 