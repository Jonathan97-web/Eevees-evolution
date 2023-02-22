/* jshint esversion: 11 */

/* Modal functionality */

let modalInstructions = document.getElementById('modal-instructions');
let modalInstructionsBtn = document.getElementById('modal-instructions-btn');
let modalCloseBtns = document.querySelectorAll('.close-modal');

modalInstructionsBtn.addEventListener('click', function () {
  modalInstructions.style.display = 'block';
});

modalCloseBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    btn.closest('.modal').style.display = 'none';
  });

});

window.addEventListener('click', function (event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});


let totalMoves = 0;
let totalMatches = 0;


/* Memory board */
const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = true;
let firstCard, secondCard;

function flipCard() {
  // game over if no more time remaining
  if (timeSecond <= 0) {
    endTime();
  }

  // if the board is locked, do nothing
  if (lockBoard) return;

  // if re-clicking first card, do nothing
  if (this === firstCard) return;

  // increment total move counter
  totalMoves++;
  this.classList.add('flip'); // flip the card

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // second click
  secondCard = this;
  checkForMatch();
}

/* Win screen function */
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  // Checks for match and checks for win condition
  if (isMatch) {
    firstCard.classList.add('matched', 'disable');
    secondCard.classList.add('matched', 'disable');
    disableCards();
    totalMatches += 1;
    document.getElementById('matches').innerText = totalMatches;
    let cardCount = document.querySelectorAll('.card').length;

    if (totalMatches == (cardCount / 2)) {
      clearInterval(countDown);
      youWin();
    }
  } else {
    unFlipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unFlipCards() {
  // it doesn't match
  lockBoard = true;


  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);

}
// Resets board
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


// Random order of cards on board
shuffleCards();

function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

cards.forEach(card => card.addEventListener('click', flipCard));
/* Memory board end */

/* Timer for memory game */

/* Start game */
let countDown;

function startGame() {
  clearInterval(countDown);
  lockBoard = false;
  displayTime(timeSecond);

  countDown = setInterval(() => {
    timeSecond--;
    displayTime(timeSecond);
    if (timeSecond <= 0) {
      endTime();
      clearInterval(countDown);
    }
  }, 1000);
}
// Timer
const timeH = document.querySelector('.timer-memory');
timeH.addEventListener('click', startGame);
let timeSecond = 60;


function displayTime(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timeH.innerHTML = `${min<10 ? '0': ''}${min}:${sec<10 ? '0':''}${sec}`;
}
// Game over
function endTime() {
  cards.forEach(card => {
    card.classList.add('disable');
  });
  let unmatchedCards = document.querySelectorAll('.flip:not(.matched)');
  unmatchedCards.forEach(card => {
    card.classList.remove('flip');
  });
  timeH.innerHTML = 'GAME OVER';
  lockBoard = true;
  timeH.removeEventListener('click', startGame);
  setTimeout(() => {
    document.getElementById('movestaken').innerText = totalMoves;
    document.getElementById('matchesfound').innerText = totalMatches;
    document.getElementById('modal-lose').style.display = 'block';
  }, 1000);
}

// Win screen
function youWin() {
  document.getElementById('totalmoves').innerText = totalMoves;
  document.getElementById('timeremain').innerText = `${timeSecond} seconds`;
  document.getElementById('modal-win').style.display = 'block';
  timeH.innerHTML = 'You Win!';
  lockBoard = true;
  timeH.removeEventListener('click', startGame);
}


/* Reset button */

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', reset);

function reset() {
  cards.forEach(card => {
    card.classList.remove('flip', 'matched', 'disable');
    card.addEventListener('click', flipCard);
  });

  // Small delay so you cannot see where the new cards will be
  setTimeout(() => {
    totalMoves = 0;
    totalMatches = 0;
    timeSecond = 60;
    document.getElementById('matches').innerText = totalMatches;
    lockBoard = false;
    hasFlippedCard = false;
    shuffleCards();
    startGame();
  }, 500);
}