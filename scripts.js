/* Start game script */





/* Memory board */
const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
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

/* Memory board End */

/* Timer for memory game */

const timeH = document.querySelector('.timer-memory')
let timeSecond = 1;

displayTime(timeSecond)

const countDown = setInterval (()=>{
  timeSecond--;
  displayTime(timeSecond);
  if(timeSecond <= 0  ||  timeSecond < 1){
    endTime();
    clearInterval(countDown);
  }
},1000)

function displayTime(second){
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timeH.innerHTML = `${min<10 ? '0': ''}${min}:${sec<10 ? '0':''}${sec}`
}

function endTime() {
  timeH.innerHTML = 'GAME OVER'
  lockBoard = true;
}

/* Reset button */

const resetButton = document.querySelector('.reset-button');

function reset() {

  windows.reset

}



/* Win Screen */ 

function showWinScreen() {
  document.querySelector('win-container').style.display = 'flex';


}