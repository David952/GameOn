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
const modalContent = document.querySelector(".content");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBody = document.querySelector(".modal-body");
const modalConfirmation = document.querySelector(".modal-confirmation");
const formData = document.querySelectorAll(".formData");
const closeElement = document.querySelectorAll(".close");

// DOM Form
const form = document.querySelector("form");
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const quantityTournamentInput = document.getElementById("quantity");
const city = document.getElementsByName("location");
const useConditions = document.getElementById("checkbox1");

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
closeElement.forEach((btnElement) => btnElement.addEventListener("click", closeModal));

// Launch modal form
function launchModal() {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = "hidden";
  }, 600);
  modalbg.style.display = "block";
  modalContent.style.animationName = "modalopen";
}

// Close modal form
function closeModal() {
  document.body.style.overflow = "auto";
  modalContent.style.animationName = "modalclose";
  setTimeout(() => {
    modalbg.style.display = "none";
  }, 400)
  
}

// Show error message
function showError(inputElement, message) {
  const errorElement = inputElement.closest(".formData").querySelector("p");

  if (errorElement) {
    errorElement.classList.add("error-message");
    errorElement.textContent = message;
  }
  inputElement.classList.add("error-input");
}

// Clear error message
function clearError(inputElement) {
  const errorElement = inputElement.closest(".formData").querySelector("p");

  if (errorElement) {
    errorElement.classList.remove("error-message");
    errorElement.textContent = "";
  }
  inputElement.classList.remove("error-input");
}

// Error radio button
function radioBtnError(hasError) {
  const radioBtn = document.querySelectorAll('.formData .checkbox-label .checkbox-icon');

    if (radioBtn) {
      if (hasError) {
        radioBtn.forEach(radio => {
          radio.classList.add('error-border');
        });
      } else {
        radioBtn.forEach(radio => {
          radio.classList.remove('error-border');
        });
      }
    }
}

// Error checkbox
function checkboxError(inputElement, hasError) {
  const checkboxIcon = inputElement.closest(".formData").querySelector(".checkbox-icon");

  if (checkboxIcon) {
    if (hasError) {
      checkboxIcon.classList.add("error-border");
    } else {
      checkboxIcon.classList.remove("error-border");
    }
  }
}

// inputs form validation
function validateFirstName(firstName) {
  clearError(firstNameInput);

  if (firstName.trim().length < 2) {
    showError(firstNameInput, "Le prénom doit contenir au moins 2 caractères.");
    return false;
  }
  return true;
}

function validateLastName(lastName) {
  clearError(lastNameInput);

  if (lastName.trim().length < 2) {
    showError(lastNameInput, "Le nom de famille doit contenir au moins 2 caractères."
    );
    return false;
  }
  return true;
}

function validateEmail(email) {
  clearError(emailInput);

  const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegExp.test(email)) {
    showError(emailInput, "Veuillez saisir une adresse e-mail valide.");
    return false;
  }
  return true;
}

function validateBirthDate(birthDate) {
  clearError(birthDate);

  const today = new Date();
  const maxAgeDate = new Date();
  maxAgeDate.setFullYear(today.getFullYear() - 100);
  const minAgeDate = new Date();
  minAgeDate.setFullYear(today.getFullYear() - 13);

  const birthdateValue = new Date(birthDate.value);

  if (birthDate.value === "" || new Date(birthdateValue) >= minAgeDate || new Date(birthdateValue) <= maxAgeDate) {
    showError(birthDate, "Veuillez saisir une date de naissance valide. (Vous devez avoir 13 ans révolus.)");
    return false;
  }
  return true;
}

function validateQuantityTournament(quantityTournament) {
  clearError(quantityTournamentInput);

  if (Number.isNaN(quantityTournament) || quantityTournament === "") {
    showError(quantityTournamentInput, "Veuillez saisir une valeur numérique pour le nombre de tournois.");
    return false;
  }
  return true;
}

function validateCity(city) {
  let locationSelected = false;

  for (let i = 0; i < city.length; i++) {
    if (city[i].checked) {
      locationSelected = true;
      clearError(city[i]);
      radioBtnError(false);
      return city[i].value;
    }
  }

  if (!locationSelected) {
    for (let i = 0; i < city.length; i++) {
      showError(city[i], "Veuillez choisir une ville.");
    }
    radioBtnError(true);
  }
  return locationSelected;
}

function validateUseConditions(useConditions) {
  clearError(useConditions);
  checkboxError(useConditions, !useConditions.checked);

  if (!useConditions.checked) {
    showError(useConditions, "Veuillez cocher les conditions d'utilisation.");
    return false;
  }
  return true;
}

// Form validation
function validation() {
  let isFormValid = true;

  if (!validateFirstName(firstNameInput.value)) isFormValid = false;
  if (!validateLastName(lastNameInput.value)) isFormValid = false;
  if (!validateEmail(emailInput.value)) isFormValid = false;
  if (!validateBirthDate(birthDate)) isFormValid = false;
  if (!validateQuantityTournament(quantityTournamentInput.value)) isFormValid = false;
  if (!validateCity(city)) isFormValid = false;
  if (!validateUseConditions(useConditions)) isFormValid = false;

  return isFormValid;
}

// Form submit
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (validation()) {
    console.log("%cDonnées du formulaire", "font-weight: bold; text-decoration: underline");
    console.log("Prénom :", firstNameInput.value);
    console.log("Nom :", lastNameInput.value);
    console.log("E-mail :", emailInput.value);
    console.log("Date de naissance :", birthDate.value.split('-').reverse().join('/'));
    console.log("Nombre de tournois :", quantityTournamentInput.value);
    console.log("Ville :", validateCity(city));
    console.log("Conditions d'utilisation :", useConditions.checked);

    confirmationMessage();
    formReset();
  } else {
    console.log("Formulaire non valide.");
  }
});

// Show confirmation message
function confirmationMessage() {
  modalBody.style.display = "none";
  modalConfirmation.style.display = "flex";
  document.querySelector(".close").classList.add("close-confirmation");
}

// Form reset
function formReset() {
  const closeConfirmationElements = document.querySelectorAll(".close-confirmation, .confirmation-btn");
  closeConfirmationElements.forEach(element => {
    element.addEventListener("click", () => {
      form.reset();      
      setTimeout(() => {
        modalConfirmation.style.display = "none";
        modalBody.style.display = "block";
      }, 500);
      document.querySelector(".close").classList.remove("close-confirmation");
      closeModal();
      setTimeout(() => {
        console.clear();
      }, 550);
    });
  });
}