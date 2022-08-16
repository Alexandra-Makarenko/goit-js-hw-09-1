import Notiflix from 'notiflix';

const form = document.querySelector('.form')
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');



form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const amount = Number(amountInput.value);
  let firstdelay = Number(delayInput.value);
  const step = Number(stepInput.value);
  if (amount > 0 && firstdelay > 0 && step > 0) {
    for (let i = 0; i < amount; i++) {
         createPromise(i+1, firstdelay).then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    firstdelay += step;
  }
  } else {
    Notiflix.Notify.failure('Please, insert another values');
  }
  
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)

  }
  )

}