var imagesNames = [];
var shuffled = [];
var flippedOver = [];
var gameBoard = document.getElementById('gameboard')
var gamePlay = false;
var playLock = false;
var cardFliped = -1;
var startButton = document.getElementById('start');
var massage = document.getElementById('message');

//event listeners
startButton.addEventListener('click', startGame);

function startGame(){
    startButton.style.display = 'none';
    if(!gamePlay){
        gamePlay = true;
        buildArray();
        shuffled = imagesNames.concat(imagesNames);
        shuffled = shuffleArray(shuffled);
        console.log(shuffled);
        buildBoard()
        message.innerHTML = 'Click any card';
     }
    console.log('STARTED!!');
}

function buildArray(){
    // Array for the images
    for (var i = 1; i <= 6; i++) {
        imagesNames.push(i+'.jpg');
    }
}

function shuffleArray(array){
    for (var i = array.length-1; i > 0; i--) {
        var indexToShuffle = Math.floor(Math.random() * (i+1));
        var element = array[i];
        array[i] = array[indexToShuffle];
        array[indexToShuffle] = element
    }
    return array;
}


function buildBoard(){
    var htmlString = '';
    var html = "";
    for (var i = 0; i < shuffled.length; i++) {
        console.log(shuffled[i]);
        htmlString += `
            <div class="gameCard">
                <div class="gameCard">
                    <image id="card` + i + `" src="images/back.jpg"
                        onclick="pickCard(` + i + `, this)"
                        class="flipImage">
                    </image>
                </div>
            </div>
        `;
    }
    gameBoard.innerHTML = htmlString;
    // gameBoard.innerHTML = html;
}

function inArray(value, array){
    return array.indexOf(value) > -1;
}

function cardFlip(t, cardIndex){
    t.src = "images/" + shuffled[cardIndex];
    flippedOver.push(t.id);
}

function hideCard(cardId) {
    var cardId = flippedOver.pop()
    document.getElementById(cardId).src = "images/back.jpg"
}

function pickCard(cardIndex, t){
    if (!inArray(t.id, flippedOver) && !playLock){
        if (cardFliped >= 0) {
            // SECOND CARD FLIPPED
            if (cardFliped != cardIndex) {
                cardFlip(t, cardIndex);
                var secondCard = cardIndex;
            }
            if (shuffled[secondCard] === shuffled[cardFliped]) {
                // is a match
                console.log('MAAATCH')
                message.innerHTML = 'Match Found!';
                playLock = false;
            } else {
                console.log('NOT A MATCH');
                // not match - Reflip cards
                playLock = true;
                message.innerHTML = 'Try Again!';
                timer = setTimeout(function () {
                    // hide the last two cards flipped
                    for (var i = 0; i < 2; i++) {
                        hideCard()
                    }
                    playLock = false;
                }, 1000);
            }
            cardFliped = -1;
        }else {
            // FIRST CARD FLIPPED
            cardFliped = cardIndex;
            cardFlip(t, cardIndex);
        }
    }

    if (shuffled.length === flippedOver.length){
        gameOver()
    }
}

function gameOver() {
    startButton.style.display = 'block';
    message.innerHTML = 'Click to start new game';
    gamePlay = false;
    shuffled = [];
    flippedOver = [];
    cardFliped = -1;
}
