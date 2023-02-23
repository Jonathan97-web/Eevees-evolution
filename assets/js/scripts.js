/* jshint esversion: 11 */

/* Modal functionality */
let modalInstructions = document.getElementById('modal-instructions');
let modalInstructionsBtn = document.getElementById('modal-instructions-btn');
let modalCloseBtns = document.querySelectorAll('.close-modal');

// open instructions modal
modalInstructionsBtn.addEventListener('click', function () {
  modalInstructions.style.display = 'block';
});

// close modal when 'close' btns clicked
modalCloseBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    btn.closest('.modal').style.display = 'none';
  });
});

// close modal parent when clicking outside of modal on window
window.addEventListener('click', function (event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});


let totalMoves = 0;
let totalMatches = 0;


/* Memory board */
const cards = document.querySelectorAll('.card');

let cardOneFlipped = false;
let boardLocked = true;
let cardOne, cardTwo;


function cardClicked() {
  // game over if no more time remaining
  if (timeSecond <= 0) {
    endTime();
  }

  // if the board is locked, do nothing
  if (boardLocked) return;

  // if re-clicking first card, do nothing
  if (this === cardOne) return;

  // increment total move counter
  totalMoves++;
  this.classList.add('flip'); // flip the card

  if (!cardOneFlipped) {
    // first card was clicked
    cardOneFlipped = true;
    cardOne = this;
    return;
  }

  // second card was clicked
  cardTwo = this;
  confirmCardsMatch();
}

/* check if first and second cards match data attribute */
function confirmCardsMatch() {
  let cardsMatch = cardOne.dataset.eevee === cardTwo.dataset.eevee;

  if (cardsMatch) {
    // success: match found, disable these two cards
    cardOne.classList.add('flip', 'matched', 'disable');
    cardTwo.classList.add('flip', 'matched', 'disable');
    // reset the cards for next round
    cardOneFlipped = false;
    boardLocked = false;
    cardOne = null;
    cardTwo = null;

    totalMatches += 1;
    document.getElementById('matches').innerText = totalMatches;
    let cardCount = document.querySelectorAll('.card').length;

    // check if all matches found for win condition
    if (totalMatches == (cardCount / 2)) {
      clearInterval(countDown);
      youWin();
    }
  } else {
    resetUnmatchedCards();
  }
}


function resetUnmatchedCards() {
  // cards don't match - reset them
  boardLocked = true;
  setTimeout(() => {
    cardOne.classList.remove('flip');
    cardTwo.classList.remove('flip');
    
    // reset the cards for next round
    cardOneFlipped = false;
    boardLocked = false;
    cardOne = null;
    cardTwo = null;
  }, 1000);
}


// Random order of cards on board
shuffleCards();

function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

cards.forEach(card => {
  card.addEventListener('click', cardClicked);
});



/* Start game functionality */
let countDown;

function startGame() {
  clearInterval(countDown);
  boardLocked = false;
  displayTime(timeSecond);
  // timer for memory game
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


// display the timer
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
  boardLocked = true;
  timeH.removeEventListener('click', startGame);
  // game over modal
  setTimeout(() => {
    document.getElementById('movestaken').innerText = totalMoves;
    document.getElementById('matchesfound').innerText = totalMatches;
    document.getElementById('modal-lose').style.display = 'block';
  }, 1000);
}

// Win screen modal
function youWin() {
  document.getElementById('totalmoves').innerText = totalMoves;
  document.getElementById('timeremain').innerText = `${timeSecond} seconds`;
  document.getElementById('modal-win').style.display = 'block';
  timeH.innerHTML = 'You Win!';
  boardLocked = true;
  timeH.removeEventListener('click', startGame);
}


/* Reset button */
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', reset);

// reset the entire game
function reset() {
  cards.forEach(card => {
    card.classList.remove('flip', 'matched', 'disable');
    card.addEventListener('click', cardClicked);
  });

  // small delay so you cannot see where the new cards will be
  setTimeout(() => {
    totalMoves = 0;
    totalMatches = 0;
    timeSecond = 60;
    document.getElementById('matches').innerText = totalMatches;
    boardLocked = false;
    cardOneFlipped = false;
    shuffleCards();
    startGame();
  }, 500);
}
