/**
 * Fonction pour éditer la navigation responsive.
 * Ajoute ou retire la classe "responsive" à l'élément de navigation.
 */
function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Sélection des éléments du DOM
const modalbg = document.querySelector(".bground");
const modalContent = document.querySelector(".content");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBody = document.querySelector(".modal-body");
const modalConfirmation = document.querySelector(".modal-confirmation");
const formData = document.querySelectorAll(".formData");
const closeElement = document.querySelectorAll(".close");

// Sélection des éléments du formulaire
const form = document.querySelector("form");
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const quantityTournamentInput = document.getElementById("quantity");
const city = document.getElementsByName("location");
const useConditions = document.getElementById("checkbox1");

// Écouteur d'événement pour l'affichage de la modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Écouteur d'événement pour la fermeture de la modal
closeElement.forEach((btnElement) => btnElement.addEventListener("click", closeModal));

/**
 * Afficher la modal.
 * Montre la modal avec une animation et désactive le défilement de la page.
 */
function launchModal() {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = "hidden";
  }, 600);
  modalbg.style.display = "block";
  modalContent.style.animationName = "modalopen";
}

/**
 * Fermer la modal.
 * Cache la modal avec une animation et réactive le défilement de la page.
 */
function closeModal() {
  document.body.style.overflow = "auto";
  modalContent.style.animationName = "modalclose";
  setTimeout(() => {
    modalbg.style.display = "none";
  }, 400)
}

/**
 * Afficher un message d'erreur.
 * @param {HTMLElement} inputElement - L'élément input associé à l'erreur.
 * @param {string} message - Le message d'erreur à afficher.
 */
function showError(inputElement, message) {
  const errorElement = inputElement.closest(".formData").querySelector("p");

  if (errorElement) {
    errorElement.classList.add("error-message");
    errorElement.textContent = message;
  }
  inputElement.classList.add("error-input");
}

/**
 * Effacer un message d'erreur.
 * @param {HTMLElement} inputElement - L'élément input associé à l'erreur.
 */
function clearError(inputElement) {
  const errorElement = inputElement.closest(".formData").querySelector("p");

  if (errorElement) {
    errorElement.classList.remove("error-message");
    errorElement.textContent = "";
  }
  inputElement.classList.remove("error-input");
}

/**
 * Gérer les erreurs des boutons radio.
 * @param {boolean} hasError - Indique si une erreur doit être affichée.
 */
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

/**
 * Gestion des erreurs des cases à cocher.
 * @param {HTMLElement} inputElement - L'élément input associé à l'erreur.
 * @param {boolean} hasError - Indique si une erreur doit être affichée.
 */
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

/**
 * Valider le prénom.
 * @param {string} firstName - Le prénom à valider.
 * @returns {boolean} - Retourne true si le prénom est valide sinon false.
 */
function validateFirstName(firstName) {
  clearError(firstNameInput);

  if (firstName.trim().length < 2) {
    showError(firstNameInput, "Le prénom doit contenir au moins 2 caractères.");
    return false;
  }
  
  return true;
}

/**
 * Valider le nom de famille.
 * @param {string} lastName - Le nom de famille à valider.
 * @returns {boolean} - Retourne true si le nom de famille est valide sinon false.
 */
function validateLastName(lastName) {
  clearError(lastNameInput);

  if (lastName.trim().length < 2) {
    showError(lastNameInput, "Le nom de famille doit contenir au moins 2 caractères.");
    return false;
  }

  return true;
}

/**
 * Valider l'adresse e-mail.
 * @param {string} email - L'adresse e-mail à valider.
 * @returns {boolean} - Retourne true si l'adresse e-mail est valide sinon false.
 */
function validateEmail(email) {
  clearError(emailInput);

  const emailRegExp = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");
  if (!emailRegExp.test(email)) {
    showError(emailInput, "Veuillez saisir une adresse e-mail valide.");
    return false;
  }

  return true;
}

/**
 * Valider la date de naissance.
 * @param {HTMLElement} birthDate - L'élément input de la date de naissance.
 * @returns {boolean} - Retourne true si la date de naissance est valide sinon false.
 */
function validateBirthDate(birthDate) {
  clearError(birthDate);

  const today = new Date();
  const maxAgeDate = new Date();
  maxAgeDate.setFullYear(today.getFullYear() - 100);
  const minAgeDate = new Date();
  minAgeDate.setFullYear(today.getFullYear() - 13);

  const birthdateValue = new Date(birthDate.value);

  if (birthDate.value === "" || birthdateValue >= minAgeDate || birthdateValue <= maxAgeDate) {
    showError(birthDate, "Veuillez saisir une date de naissance valide. (Vous devez avoir 13 ans révolus.)");
    return false;
  }
  
  return true;
}

/**
 * Valider le nombre de tournois.
 * @param {string} quantityTournament - Le nombre de tournois à valider.
 * @returns {boolean} - Retourne true si le nombre de tournois est valide sinon false.
 */
function validateQuantityTournament(quantityTournament) {
  clearError(quantityTournamentInput);

  if (Number.isNaN(quantityTournament) || quantityTournament === "") {
    showError(quantityTournamentInput, "Veuillez saisir une valeur numérique pour le nombre de tournois.");
    return false;
  }

  return true;
}

/**
 * Valider la sélection de la ville.
 * @param {NodeList} city - Les boutons radio de sélection de la ville.
 * @returns {boolean} - Retourne true si une ville est sélectionnée sinon false.
 */
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

/**
 * Valider l'acceptation des conditions d'utilisation.
 * @param {HTMLElement} useConditions - L'élément checkbox des conditions d'utilisation.
 * @returns {boolean} - Retourne true si les conditions sont acceptées sinon false.
 */
function validateUseConditions(useConditions) {
  clearError(useConditions);
  checkboxError(useConditions, !useConditions.checked);

  if (!useConditions.checked) {
    showError(useConditions, "Veuillez cocher les conditions d'utilisation.");
    return false;
  }

  return true;
}

/**
 * Validation de l'ensemble du formulaire.
 * @returns {boolean} - Retourne true si le formulaire est valide sinon false.
 */
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

// Ajout de l'écouteur d'événement pour la soumission du formulaire
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

/**
 * Afficher le message de confirmation.
 */
function confirmationMessage() {
  modalBody.style.display = "none";
  modalConfirmation.style.display = "flex";
  document.querySelector(".close").classList.add("close-confirmation");
}

/**
 * Réinitialiser le formulaire.
 */
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