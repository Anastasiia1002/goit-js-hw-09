const btnStop = document.querySelector('[data-stop]');
const btnStart = document.querySelector('[data-start]');
const bodyBGC = document.querySelector('body');

let timerId = null;
btnStop.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
btnStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    bodyBGC.style.backgroundColor = getRandomHexColor();
    btnStop.disabled = false;
    btnStart.disabled = true;
  }, 1000);
});
btnStop.disabled = true;
btnStop.addEventListener('click', () => {
  btnStop.disabled = true;
  btnStart.disabled = false;
  clearInterval(timerId);
});
