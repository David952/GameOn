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
const closeElement = document.querySelectorAll(".close, .confirmation-btn");

// DOM Form
const form = document.querySelector("form");
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const quantityTournamentInput = document.getElementById("quantity");
const city = document.getElementsByName("location");
const generalConditions = document.getElementById("checkbox1");

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
closeElement.forEach((btnElement) => btnElement.addEventListener("click", closeModal));

// Launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Show error message
function showError(inputElement, message) {
  const errorElement = inputElement.nextElementSibling;
  console.log(errorElement)
  if (errorElement) {
    errorElement.classList.add("error-message");
    errorElement.textContent = message;
  }
  inputElement.classList.add("error-input");
}

// Clear error message
function clearError(inputElement) {
  const errorElement = inputElement.nextElementSibling;
  if (errorElement) {
    errorElement.classList.remove("error-message");
    errorElement.textContent = "";
  }
  inputElement.classList.remove("error-input");
}

// inputs form validation
function validateFirstName(firstName) {
  clearError(firstNameInput);
  if (firstName.trim().length < 2) {
    showError(firstNameInput, "Le prénom doit contenir au moins 2 caractères.");
    return false
  }
  return true
}

function validateLastName(lastName) {
  clearError(lastNameInput);
  if (lastName.trim().length < 2) {
    showError(lastNameInput, "Le nom de famille doit contenir au moins 2 caractères.");
    return false
  }
  return true
}

function validateEmail(email) {
  clearError(emailInput);
  const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
  if (!emailRegExp.test(email)) {
    showError(emailInput, "Veuillez saisir une adresse e-mail valide.");
    return false
  }
  return true
}

function validateBirthDate(birthDate) {
  clearError(birthDate);

  const today = new Date();
  const maxAgeDate = new Date();
  maxAgeDate.setFullYear(today.getFullYear() - 100);
  const minAgeDate = new Date();
  minAgeDate.setFullYear(today.getFullYear() - 13);

  const birthdateValue = new Date(birthDate.value)

  if (
    birthDate.value === "" ||
    new Date(birthdateValue) >= minAgeDate ||
    new Date(birthdateValue) <= maxAgeDate
  ) {
    showError(birthDate, "Veuillez saisir une date de naissance valide. (Vous devez avoir 13 ans révolus.)");
    return false
  }
  return true
}

function validateQuantityTournament(quantityTournament) {
  clearError(quantityTournamentInput);

  if (Number.isNaN(quantityTournament) || quantityTournament === "") {
    showError(quantityTournamentInput, "Veuillez saisir une valeur numérique pour le nombre de tournois.")
    return false
  }
  return true
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
  clearError(generalConditions);

  if (!generalConditions.checked) {
    showError(generalConditions, "Veuillez cocher les conditions générales.");
    return false
  }
  return true
}

// Form submit
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isFormValid = true;

  if (!validateFirstName(firstNameInput.value)) isFormValid = false;
  if (!validateLastName(lastNameInput.value)) isFormValid = false;
  if (!validateEmail(emailInput.value)) isFormValid = false;
  if (!validateBirthDate(birthDate)) isFormValid = false;
  if (!validateQuantityTournament(quantityTournamentInput.value)) isFormValid = false;
  if (!validateCity(city)) isFormValid = false;
  if (!validateGeneralConditions(generalConditions)) isFormValid = false;

  if (isFormValid) {
    console.log("Formulaire soumis avec succès !");
  } else {
    console.log("Formulaire non valide.");
  }
});