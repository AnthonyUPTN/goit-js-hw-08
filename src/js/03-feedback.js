'use strict';
import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'feedback-form-state';
const feedbackFormEl = document.querySelector('.feedback-form');

const feedbackFormData = {};

const fillForm = form => {
  const formElements = form.elements;
  const localStorageFormData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (!localStorageFormData) {
    return;
  }

  const keys = Object.keys(localStorageFormData);

  for (const key of keys) {
    formElements[key].value = localStorageFormData[key];
  }
};

const formData = event => {
  const { target } = event;
  const contactFormElementName = target.name;
  const contactFormElementValue = target.value;

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(feedbackFormData));

  feedbackFormData[contactFormElementName] = contactFormElementValue;
};

feedbackFormEl.addEventListener('input', throttle(formData, 500));

feedbackFormEl.addEventListener('submit', event => {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
  feedbackFormEl.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
});

fillForm(feedbackFormEl);
