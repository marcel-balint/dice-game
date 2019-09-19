var scores, roundScore, activePlayer, dice;
//fundamental game variables
scores = [0, 0];
roundScore = 0;
activePlayer = 0;


document.querySelector('.dice').style.display = "none";

document.getElementById('score-0').textContent = "0";
document.getElementById('score-1').textContent = "0";
document.getElementById('current-0').textContent = "0";
document.getElementById('current-1').textContent = "0";




document.querySelector('.btn-roll').addEventListener("click", function () {
    //1. Random number
    dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = "block";
    diceDOM.src = 'assets/images/dice-' + dice + '.png';


    //3. Update the round score if the rolled number was not 1
    if (dice !== 1) {
        //Add score
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        //Next player
        nextPlayer();

    }
});


document.querySelector(".btn-hold").addEventListener("click", function () {
    //Add current score to global score
    scores[activePlayer] += roundScore;

    //Update UI
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

    //Check if the player won the game
    if (scores[activePlayer] >= 20) {
        document.getElementById("name-" + activePlayer).textContent = "Winner!";
        document.querySelector('.dice').style.display = "none";
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');


    } else {
        //Next player
        nextPlayer();
    }
});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector(".dice").style.display = "none";
};