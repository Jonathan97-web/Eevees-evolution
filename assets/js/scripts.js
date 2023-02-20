/* jshint esversion: 11 */


/* modal box for header */

let modal = document.getElementById("modal-memory");
let btn = document.getElementById("modal-button");
let span = document.getElementsByClassName("close-modal")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



let totalMatches = 0;


/* Memory board */
const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = true;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;


  this.classList.add('flip');

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


function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unFlipCards();
  if (isMatch) {
    totalMatches += 1;
    document.getElementById('matches').innerText = totalMatches;
    let cardCount = document.querySelectorAll('.card').length;

    if (totalMatches == (cardCount / 2)) {
      clearInterval(countDown);
      showWinScreen();
    }
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

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
/* Memory board end */

/* Timer for memory game */

/* Start game timer */
let countDown;

function startGame() {
  clearInterval(countDown)
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

const timeH = document.querySelector('.timer-memory');
timeH.addEventListener('click', startGame);
let timeSecond = 120;


function displayTime(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timeH.innerHTML = `${min<10 ? '0': ''}${min}:${sec<10 ? '0':''}${sec}`;
}

function endTime() {
  timeH.innerHTML = 'GAME OVER';
  lockBoard = true;
  timeH.removeEventListener('click', startGame);
}

/* Reset button */

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', reset);

function reset() {
  window.location.reload();
}


/* Win Screen */

function showWinScreen() {
  document.querySelector('.win-container').style.display = 'flex';


}
