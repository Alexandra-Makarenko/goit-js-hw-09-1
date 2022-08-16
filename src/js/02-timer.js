import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  input: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  daysTimer: document.querySelector('[data-days]'),
  hoursTimer: document.querySelector('[data-hours]'),
  minutesTimer: document.querySelector('[data-minutes]'),
 secondsTimer: document.querySelector('[data-seconds]'),
    }
let timerId = null;
let currentDate = {};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() > options.defaultDate.getTime()) {
          refs.startButton.removeAttribute('disabled')
        } else {
            Notiflix.Notify.warning("Please choose a date in the future");
          refs.startButton.setAttribute("disabled", "disabled");
         }          
  },
};

flatpickr(refs.input, options);

refs.startButton.addEventListener('click', startTimer)

function startTimer() {

  let choosenDate = Date.parse(refs.input.value);
  

  timerId = setInterval(() => {    
    currentDate = new Date().getTime();
    let result = convertMs(choosenDate - currentDate);
    if (choosenDate > currentDate) {
    refs.daysTimer.textContent = result.days;
    refs.hoursTimer.textContent = result.hours;
    refs.minutesTimer.textContent = result.minutes;
    refs.secondsTimer.textContent = result.seconds;     
    } else {
      clearInterval(timerId);
   }
    
  }, 1000);
  
  refs.startButton.setAttribute("disabled", "true");
  refs.input.nextSibling.setAttribute("disabled", "true");
 
}



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value){
  return String(value).padStart(2,'0')
}
