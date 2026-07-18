'use strict';

const LEAF_SIZE = 80;
const FOURLEAF_COUNT = 10;
const RABBIT_COUNT = 15;
const GAME_DURATION_SEC = 10;

const gameBtn = document.querySelector('.game-btn');
const replyBtn = document.querySelector('.replay-btn');
const gameField = document.querySelector('.game-field');
const fieldRect = gameField.getBoundingClientRect();
const timerIndicator = document.querySelector('.timer');
const scoreBoard = document.querySelector('.score-board');
const notif = document.querySelector('.notification');
const notifText = document.querySelector('.notification__text');

const bgSound = document.querySelector('.audio-bg');
const bgBtn = document.querySelector('.bg-btn');

// Sound effects
const soundFourLeaf = new Audio('./asset/sound/leaf-pull.wav');
const soundRabbit = new Audio('./asset/sound/rabbit-pull.wav');
const soundWin = new Audio('./asset/sound/game-win.wav');
const soundLose = new Audio('./asset/sound/alert.wav');

let started = false;
let timer = undefined;
let score = 0;

// Event
gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

gameField.addEventListener('click', onFieldClick);

replyBtn.addEventListener('click', () => {
  removeAlert();
  startGame();
});

bgBtn.addEventListener('click', () => {
  if (started) {
    playBgSound();
  }
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  bgSound.play();
}

function stopGame() {
  started = false;
  stopGameTimer();
  showAlert('REPLAY❓');
  hideGameButton();
  pauseSound(bgSound);
  playSound(soundLose);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(soundWin);
    pauseSound(bgSound);
  } else {
    playSound(soundLose);
    pauseSound(bgSound);
  }
  stopGameTimer();
  showAlert(win ? 'YOU WON 🥳' : 'YOU LOST 😢');
}

function initGame() {
  score = 0;
  gameField.innerHTML = '';
  updateScoreBoard();
  addItem('four-leaf', FOURLEAF_COUNT, './asset/image/four-leaf.png');
  addItem('rabbit', RABBIT_COUNT, './asset/image/rabbit.png');
}

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches('.four-leaf')) {
    score++;
    playSound(soundFourLeaf);
    target.remove();
    updateScoreBoard();
    if (score === FOURLEAF_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.rabbit')) {
    playSound(soundRabbit);
    finishGame(false);
  }
}

// Button
function showStopButton() {
  const icon = gameBtn.querySelector('.fa-solid');
  icon.classList.remove('fa-play');
  icon.classList.add('fa-stop');
  gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

// Timer and Scoreboard
function showTimerAndScore() {
  timerIndicator.style.visibility = 'visible';
  scoreBoard.style.visibility = 'visible';
}

function updateScoreBoard() {
  scoreBoard.textContent = FOURLEAF_COUNT - score;
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);

  timer = setInterval(() => {
    --remainingTimeSec;
    updateTimerText(remainingTimeSec);
    if (remainingTimeSec <= 0) {
      stopGameTimer();
      finishGame(score === FOURLEAF_COUNT);
      return;
    }
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  timerIndicator.textContent = `
  ${String(minutes).padStart(2, '0')} : 
  ${String(seconds).padStart(2, '0')}
  `;
}

function stopGameTimer() {
  clearInterval(timer);
}
// Alert
function showAlert(message) {
  notif.classList.add('show-notification');
  notifText.textContent = message;
}

function removeAlert() {
  notif.classList.remove('show-notification');
}

// Sound
function playBgSound() {
  const icon = bgBtn.querySelector('.fa-solid');
  if (bgSound.paused) {
    icon.classList.remove('fa-volume-xmark');
    icon.classList.add('fa-volume-high');
    playSound(bgSound);
  } else {
    icon.classList.add('fa-volume-xmark');
    icon.classList.remove('fa-volume-high');
    bgBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    pauseSound(bgSound);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function pauseSound(sound) {
  sound.pause();
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - LEAF_SIZE;
  const y2 = fieldRect.height - LEAF_SIZE;

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const item = new Image();
    item.src = imgPath;
    item.alt = className;
    item.className = className;
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    fragment.appendChild(item);
  }
  gameField.appendChild(fragment);
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
