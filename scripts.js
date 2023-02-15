const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

    } else {
        // second click
        hasFlippedCard = false;
        secondCard = this;
    

        checkForMatch();
    }
}

  function checkForMatch() {

          if (firstCard.dataset.framework === secondCard.dataset.framework) {
            // it matches
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            // it doesn't match
            setTimeout(() => {
            firstCard.classList.remove('flip')
            secondCard.classList.remove('flip')
            }, 1200);
        }
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard)
  }

cards.forEach(card => card.addEventListener('click', flipCard));