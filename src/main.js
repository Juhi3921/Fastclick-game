'use strict';

// DOM
const playBtn = document.querySelector('.play-btn');
const pauseBtn = document.querySelector('.pause-btn');
const timer = document.querySelector('.timer');
const main = document.querySelector('.main');
const carrotCounter = document.querySelector('.carrot-counter');
const game = document.querySelector('.game-window');
const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;
const VisibleGameWidth = game.offsetWidth;
const visibleGameHeight = game.offsetHeight - headerHeight;
const notification = document.querySelector('.notification');
const notiText = document.querySelector('.notification__text');
const replayBtn = document.querySelector('.replay-btn');

// flage variables
let carrotCount;
let bugCount;
let totalSecs;
let countdown;

// Play game!!
playBtn.addEventListener('click', () => {
  // display pause btn
  playBtn.classList.add('pause');
  pauseBtn.classList.remove('pause');
  // how to remove delay?
  // Show bugs and carrots
  carrotCount = 1;
  createCarrots(carrotCount);
  bugCount = 20;
  createBugs(bugCount);
  //Timer Start
  totalSecs = 12;
  startTimer(totalSecs);
  countdown = setInterval(() => {
    totalSecs--;
    startTimer(totalSecs, countdown);
  }, 1000);
  //Show carror count
  carrotCounter.innerHTML = carrotCount;
});

// Game Pause
pauseBtn.addEventListener('click', () => {
  if (totalSecs <= 0) return;
  notification.classList.add('show-notification');
  notiText.innerHTML = 'Replay❓';
  clearInterval(countdown);
  countdown = null;
});

// Timer function
function startTimer(totalSecs, countdown) {
  if (totalSecs < 0) return;

  const minutes = Math.floor(totalSecs / 60);
  const seconds = totalSecs - minutes * 60;

  timer.innerHTML = `${String(minutes).padStart(2, '0')} : ${String(
    seconds
  ).padStart(2, '0')}`;

  if (totalSecs <= 0) {
    clearInterval(countdown);
    notification.classList.add('show-notification');
    notiText.innerHTML = 'You Lose 🥲';
    countdown = null;
  }
}

// Making Carrorts
function createCarrots(carrotCount) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < carrotCount; i++) {
    let uuid = self.crypto.randomUUID();
    const carrot = document.createElement('img');
    carrot.setAttribute('class', 'carrot');
    carrot.setAttribute('src', './asset/img/carrot.png');
    carrot.setAttribute('alt', 'carrot');
    carrot.setAttribute('data-click', uuid);

    const x = Math.random() * (VisibleGameWidth - 50);
    const y = Math.random() * (visibleGameHeight - 50);

    carrot.style.transform = `translate(${x}px, ${y}px)`;
    fragment.appendChild(carrot);
  }
  main.appendChild(fragment);
}

//Making Bugs
function createBugs(bugCount) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < bugCount; i++) {
    const bug = document.createElement('img');
    bug.setAttribute('class', 'bug');
    bug.setAttribute('src', './asset/img/bug.png');
    bug.setAttribute('alt', 'bug');

    const x = Math.random() * (VisibleGameWidth - 100);
    const y = Math.random() * (visibleGameHeight - 100);

    bug.style.transform = `translate(${x}px, ${y}px)`;
    fragment.appendChild(bug);
  }
  main.appendChild(fragment);
}

// Clicking Carrot
game.addEventListener('click', (e) => {
  if (!e.target.dataset.click) return;
  if (e.target.dataset.click) {
    e.target.remove();
    carrotCount--;
    carrotCounter.innerHTML = carrotCount;

    if (carrotCount <= 0) {
      notification.classList.add('show-notification');
      notiText.innerHTML = 'You Won 🥳';
      clearInterval(countdown);
      countdown = null;
    }
  }
});

// Clicking Bug
game.addEventListener('click', (e) => {
  let bugs = e.target.classList.contains('bug');

  if (bugs) {
    notification.classList.add('show-notification');
    notiText.innerHTML = 'You Lose 🥲';
    // how to stop the timer?
    clearInterval(countdown);
    countdown = null;
  }
});

replayBtn.addEventListener('click', () => {
  notification.classList.remove('show-notification');
  // clear(and pause) Timer
  clearInterval(countdown);
  countdown = null;
  // remove all elements(bugs and carrots)
  // Todo : bugs and carrots exist?
  document.querySelectorAll('.carrot').forEach((item) => item.remove());
  document.querySelectorAll('.bug').forEach((item) => item.remove());

  // another round
  carrotCount = 5;
  createCarrots(carrotCount);
  bugCount = 10;
  createBugs(bugCount);
  //Timer Start
  totalSecs = 12;
  startTimer(totalSecs);
  countdown = setInterval(() => {
    totalSecs--;
    startTimer(totalSecs, countdown);
  }, 1000);
  //Show carror count
  carrotCounter.innerHTML = carrotCount;
});
