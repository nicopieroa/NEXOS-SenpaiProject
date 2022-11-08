const navBar = document.getElementById("navBar");
const navBarSpace = navBar.offsetTop;
const buttonLoggin = document.getElementById("buttonLoggin");
const theModal = document.getElementById("theModal");
const buttonCloseModal = document.getElementById("buttonCloseModal");
const backToHomeButoon = document.getElementById("backToHomeButoon");
const logginMyCompanyButton = document.getElementById("logginMyCompanyButton");
const logginMyOrganizationButton = document.getElementById(
  "logginMyOrganizationButton"
);
const slides = document.getElementsByClassName("cardsSlideContent");
const prevSlideArrow = document.getElementById("prevSlideArrow");
const nextSlideArrow = document.getElementById("nextSlideArrow");
const dots = document.getElementsByClassName("dot");
const textAreaInput = document.getElementById("message");
const characterCounterContainer = document.getElementById(
  "characterCounterContainer"
);
const typedCharactersSpan = document.getElementById("typedCharacters");
const maximumCharacters = 300;

let slideIndex = 1;

const navBarFixedOnScroll = () => {
  if (window.scrollY >= navBarSpace) {
    navBar.classList.add("navBarFixed");
  } else {
    navBar.classList.remove("navBarFixed");
  }
};

const displayModal = () => {
  theModal.style.display = "block";
};

const hideModal = () => {
  theModal.style.display = "none";
};

const buttonLogginChangeToMyCompany = () => {
  buttonLoggin.innerHTML = "HOLA EMPRESA";
  sessionStorage.setItem("loggin", "EMPRESA");
  hideModal();
};

const buttonLogginChangeToMyOrganization = () => {
  buttonLoggin.innerHTML = "HOLA ORGANIZACIÓN";
  sessionStorage.setItem("loggin", "ORGANIZACIÓN");
  hideModal();
};

const sessionStorageValue = () => {
  if (sessionStorage.getItem("loggin") != null)
    buttonLoggin.innerHTML = `HOLA ${sessionStorage.getItem("loggin")}`;
};

const showSlides = (n) => {
  let i;
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "flex";
  dots[slideIndex - 1].className += " active";
};

// Intento de sincronizar el slide que se muestra con su respectivo indicador del carrusel

// const plusSlides = (n) => {
//   showSlides((slideIndex += n));
// };
// dots.addEventListener("click", currentSlide);

//

const currentSlide = (n) => {
  showSlides((slideIndex = n));
};

showSlides(slideIndex);

const inputName = document.getElementById("inputName");
const inputEmail = document.getElementById("inputEmail");
const emailErrorMessage = document.getElementById("emailErrorMessage");

const nameValidation = (e) => {
  if (!isNaN(e.key)) {
    e.preventDefault();
  }
};

const emailValidation = (email) => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validRegex.test(String(email).toLowerCase());
};

const emailValidationFunction = () => {
  const email = inputEmail.value;
  if (!emailValidation(email)) {
    emailErrorMessage.innerHTML = "El email no es valido";
  } else {
    emailErrorMessage.innerHTML = "";
  }
};

inputEmail.addEventListener("keydown", emailValidationFunction);

// Character counter / No logre que funcione al 100%

const charactersCounterFunction = () => {
  const enteredValues = textAreaInput.value.length;
  if (enteredValues > maximumCharacters) {
    return false;
  }
  typedCharactersSpan.textContent = enteredValues;
  if (enteredValues < 200) {
    characterCounterContainer.classList.remove("textWarning");
    characterCounterContainer.classList.remove("textDanger");
  } else if (enteredValues >= 200 && enteredValues < 250) {
    characterCounterContainer.classList.add("textWarning");
    characterCounterContainer.classList.remove("textDanger");
  } else if (enteredValues >= 250) {
    characterCounterContainer.classList.remove("textWarning");
    characterCounterContainer.classList.add("textDanger");
  }
};

//

window.addEventListener("scroll", navBarFixedOnScroll);
window.addEventListener("load", sessionStorageValue);

buttonLoggin.addEventListener("click", displayModal);
buttonCloseModal.addEventListener("click", hideModal);
backToHomeButoon.addEventListener("click", hideModal);
logginMyCompanyButton.addEventListener("click", buttonLogginChangeToMyCompany);
logginMyOrganizationButton.addEventListener(
  "click",
  buttonLogginChangeToMyOrganization
);
prevSlideArrow.addEventListener("click", () => {
  showSlides((slideIndex += -1));
});
nextSlideArrow.addEventListener("click", () => {
  showSlides((slideIndex += 1));
});
inputName.addEventListener("keydown", nameValidation);
textAreaInput.addEventListener("keydown", charactersCounterFunction);
