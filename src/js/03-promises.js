import Notiflix from 'notiflix';
//import 'notiflix/dist/notiflix-3.2.5.min.css';

const delayForm = document.querySelector('input[name="delay"]');
const stepForm = document.querySelector('input[name="step"]');
const amountForm = document.querySelector('input[name="amount"]');
const submitBtn = document.querySelector('button[type="submit"]');
const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);
function onFormSubmit(event) {
  event.preventDefault();

  let delay1 = delayForm.valueAsNumber;
  let amount = amountForm.valueAsNumber;
  let step = stepForm.valueAsNumber;

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay1);
    delay1 += step;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
