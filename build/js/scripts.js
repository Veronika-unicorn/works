'use strict';
// form validation
const form = document.querySelector('.form__application');
const inputs = form.querySelectorAll('.form__application-input');

const errorsBlock = document.querySelector('.all-error');
const errField = document.querySelector('.field');
const errEmail = document.querySelector('.email');
const errPhone = document.querySelector('.phone');

const emailInput = document.querySelector('input[name=email]');
const phoneInput = document.querySelector('input[name=phone]');

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const PHONE_REGEXP = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const checkInputsPresence = () => {
  const errClass = 'error-visible';
  const errFieldClass = 'error';

  let formValid = true;

  const emailValid = EMAIL_REGEXP.test(emailInput.value);
  const phoneValid = PHONE_REGEXP.test(phoneInput.value);

  if (!emailInput.value.length && !phoneInput.value.length) {
    errField.classList.add(errClass);
    errorsBlock.classList.add(errClass);

    formValid = false;

    return formValid;
  } else {
    errField.classList.remove(errClass);
    errorsBlock.classList.remove(errClass);
  }

  if (!emailValid) {
    errEmail.classList.add(errClass);
    emailInput.parentElement.parentElement.classList.add(errFieldClass);

    formValid = false;
  } else {
    emailInput.parentElement.parentElement.classList.remove(errFieldClass);
    errEmail.classList.remove(errClass);
  }

  if (!phoneValid) {
    errPhone.classList.add(errClass);
    phoneInput.parentElement.parentElement.parentElement.classList.add(errFieldClass);

    formValid = false;
  } else {
    errPhone.classList.remove(errClass);
    phoneInput.parentElement.parentElement.parentElement.classList.remove(errFieldClass);
  }


  if (!formValid) {
    errorsBlock.classList.add(errClass);
  } else {
    errorsBlock.classList.remove(errClass);
  }

  return formValid;
};

const getFormData = () => {
  let data = {};

  for (let i = 0; i < inputs.length; i++) {
    data[inputs[i].name] = inputs[i].value;
  }

  return data;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  try {
    if (!checkInputsPresence()) {
      return;
    }

    axios.post('https://jsonplaceholder.typicode.com/posts', {
      body: getFormData(),
    });

    document.querySelector('.form__application').classList.add('hidden');
    document.querySelector('.successfull').classList.add('visible');

  } catch (e) {
    console.error(e);
  }
});

const mobileMenu = document.querySelector('.header__controls__inner');
const burgerCheckbox = document.querySelector('#checkbox-burger');
const main = document.querySelector('.main');

burgerCheckbox.oninput = () => {
  if (burgerCheckbox.checked) {
    mobileMenu.classList.add('menu-open');
    const mobileMenuHeight = document.querySelector('.menu-open').offsetHeight;
    main.style.paddingTop = mobileMenuHeight + 'px';
  } else {
    main.style.paddingTop = '0px';
    mobileMenu.classList.remove('menu-open');
  }
};

function phoneMask(phone) {
  return phone.replace(/\D/g, '')
    .replace(/^(\d)/, '($1')
    .replace(/^(\(\d{2})(\d)/, '$1) $2')
    .replace(/(\d{4})(\d{1,5})/, '$1-$2')
    .replace(/(-\d{5})\d+?$/, '$1');
}

function handleInput(e) {
  e.target.value = phoneMask(e.target.value);
}

phoneInput.addEventListener('input', handleInput, false);
