
import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  fetchCountries,
  renderCardMarkup,
  renderListMarkup,
  clearMarkup,
} from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');

const debounceFormInput = debounce(FormInput, DEBOUNCE_DELAY);
inputRef.addEventListener('input', debounceFormInput);

function FormInput(event) {
  event.preventDefault();
  const country = event.target.value.trim().toLowerCase();
  if (!country) {
    clearMarkup();
    return;
  }

  fetchCountries(country)
    .then(data => {
      clearMarkup();
      if (data.length === 1) {
        renderCardMarkup(data);
      } else {
        if (data.length >= 2 && data.length <= 10) {
          renderListMarkup(data);
        } else {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      }
    })
    .catch(error => {
      clearMarkup();
      Notify.failure('Oops, there is no country with that name');
      console.log(error.message);
    });
}