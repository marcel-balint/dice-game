let scores, roundScore, activePlayer, dice, gamePlaying;

init();

document.querySelector(".dice").style.display = "none";

document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //1. Random number
    dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "assets/images/dice-" + dice + ".png";

    //3. Update the round score if the rolled number was not 1
    if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.getElementById("current-" + activePlayer).textContent =
        roundScore;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //Add current score to global score
    scores[activePlayer] += roundScore;

    //Update UI
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    const input = document.querySelector(".final-score").value;
    let winningScore;

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    //Check if the player won the game
    if (scores[activePlayer] >= winningScore) {
      document.getElementById("name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document.querySelector(".btn-new").classList.add("pulsate");

      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".btn-new").classList.remove("pulsate");
  document.querySelector(".player-0-panel").classList.add("active");
}

document.querySelector(".rules-btn").addEventListener("click", function () {
  const box = document.querySelector(".box-rules");
  box.style.display = "block";
  setTimeout(() => {
    box.style.opacity = "1";
  }, 10);
});

document.querySelector(".close").addEventListener("click", function () {
  const box = document.querySelector(".box-rules");
  box.style.opacity = "0";
  setTimeout(() => {
    box.style.display = "none";
  }, 300); // Wait for the transition to complete (0.3s)
});
