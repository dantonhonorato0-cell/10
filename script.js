const tinomauro = document.getElementById('tinomauro');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let jumpHeight = 0;
let score = 0;
let gameOver = false;

function jump() {
  if (isJumping) return;
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
  const runnerRect = tinomauro.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    runnerRect.right > obstacleRect.left &&
    runnerRect.left < obstacleRect.right &&
    runnerRect.bottom > obstacleRect.top
  ) {
    gameOver = true;
    alert('Game Over! Sua pontuação: ' + score);
    resetGame();
  }
}

function resetGame() {
  score = 0;
  scoreDisplay.textContent = score;
  gameOver = false;
  obstacle.style.animation = 'moveObstacle 2s linear infinite';
}

function updateScore() {
  if (!gameOver) {
    score++;
    scoreDisplay.textContent = score;
  }
}

document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    jump();
  }
});

obstacle.addEventListener('animationiteration', () => {
  if (!gameOver) updateScore();
});

setInterval(() => {
  if (!gameOver) checkCollision();
}, 50);
