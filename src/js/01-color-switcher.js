const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled');
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  stopBtn.setAttribute('disabled', true);
  startBtn.removeAttribute('disabled');
});
