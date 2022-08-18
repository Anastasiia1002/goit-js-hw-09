import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const myInput = document.querySelector('#datetime-picker');
const start = document.querySelector('button[data-start]');

let endDate;
start.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
      start.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    if (selectedDates[0] > new Date()) {
      start.disabled = false;
      endDate = selectedDates[0];
    }
  },
};

const fp = flatpickr(myInput, options);

start.addEventListener('click', () => {
  start.disabled = true;

  intervalId = setInterval(() => {
    let currentTime = new Date();
    let deltaTime = endDate - currentTime;

    if (deltaTime < 1000) {
      clearInterval(intervalId);
    }

    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;
    const day = `${Math.floor(deltaTime / DAY)}`.padStart(2, '0');
    const hour = `${Math.floor((deltaTime % DAY) / HOUR)}`.padStart(2, '0');
    const minut = `${Math.floor(((deltaTime % DAY) % HOUR) / MINUTE)}`.padStart(
      2,
      '0'
    );
    const second = `${Math.floor(
      (((deltaTime % DAY) % HOUR) % MINUTE) / SECOND
    )}`.padStart(2, '0');

    days.textContent = day;
    hours.textContent = hour;
    minutes.textContent = minut;
    seconds.textContent = second;
  }, 1000);
});
