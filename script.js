const tinomauro = document.getElementById('tinomauro');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
const gameArea = document.querySelector('.game');

let isJumping = false;
let jumpHeight = 0;
let score = 0;
let gameOver = false;
let gameStarted = false;
let scoreInterval = null;
let collisionInterval = null;

function jump() {
  if (isJumping || !gameStarted) return;
  isJumping = true;
  let upInterval = setInterval(() => {
    if (jumpHeight >= 100) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (jumpHeight <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        jumpHeight -= 10;
        tinomauro.style.bottom = jumpHeight + 'px';
      }, 20);
    }
    jumpHeight += 10;
    tinomauro.style.bottom = jumpHeight + 'px';
  }, 20);
}

function checkCollision() {
  if (!gameStarted) return;

  const runnerRect = tinomauro.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    runnerRect.right > obstacleRect.left &&
    runnerRect.left < obstacleRect.right &&
    runnerRect.bottom > obstacleRect.top
  ) {
    gameOver = true;
    stopGame();
    alert('Game Over! Sua pontuação: ' + score);
  }
}

function startGame() {
  if (gameStarted) return;

  gameStarted = true;
  gameOver = false;
  score = 0;
  scoreDisplay.textContent = score;

  obstacle.classList.remove('paused');
  startBtn.style.display = 'none';

  scoreInterval = setInterval(() => {
    score++;
    scoreDisplay.textContent = score;
  }, 200);

  collisionInterval = setInterval(() => {
    checkCollision();
  }, 50);
}

function stopGame() {
  gameStarted = false;
  obstacle.classList.add('paused');
  startBtn.style.display = 'block';

  clearInterval(scoreInterval);
  clearInterval(collisionInterval);
}

document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    jump();
  }
});

gameArea.addEventListener('touchstart', e => {
  e.preventDefault();
  jump();
});

startBtn.addEventListener('click', () => {
  startGame();
});
