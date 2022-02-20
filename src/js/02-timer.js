import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let start = true; //

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
let timerID = null;
if (start) {
  btnStart.setAttribute('disabled', true);
}
const refs = {
  dataDays: timer.querySelector('[data-days]'),
  dataHours: timer.querySelector('[data-hours]'),
  dataMinutes: timer.querySelector('[data-minutes]'),
  dataSeconds: timer.querySelector('[data-seconds]'),
};
const options = {
  // Включает выбор времени
  enableTime: true,
  //  выбора времени в 24-часовом режиме без выбора AM/PM,
  // если включено.
  time_24hr: true,
  //   Устанавливает начальную выбранную дату
  defaultDate: new Date(),
  //   Регулирует шаг ввода минут
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date().getTime()) {
      start = false;
      btnStart.setAttribute('disabled', true);
      alert('Please choose a date in the future');
    }
    btnStart.removeAttribute('disabled', true);
    start = true;
    btnStart.addEventListener('click', function startTimer() {
      function time() {
        let countTime = selectedDates[0].getTime() - Date.now();
        btnStart.setAttribute('disabled', true);
        input.setAttribute('disabled', true);

        convertMs(countTime);
      }
      timerID = setInterval(time, 1000);
    });
  },
};

flatpickr('input#datetime-picker', options);

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

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  refs.dataDays.textContent = days;
  refs.dataHours.textContent = hours;
  refs.dataMinutes.textContent = minutes;
  refs.dataSeconds.textContent = seconds;

  // return {days, hours, minutes, seconds};
}
