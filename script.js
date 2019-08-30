for(var i = 0; i < 2; i++) {
    var sideContainer = document.createElement('div');
    sideContainer.setAttribute('class', 'side-container');
    document.body.appendChild(sideContainer);
    if(i === 0){
        sideContainer.style.float = 'left';
    } else {
        sideContainer.style.float = 'right';
    }
}

var leftSideContainer = document.getElementsByClassName('side-container')[0];

var button = document.createElement('button');
button.setAttribute('onclick', 'movePlayer()');
button.appendChild(document.createTextNode('ROLL DICE'));
button.style.float = 'left';
leftSideContainer.appendChild(button);

var diceMessage = document.createElement('div');
diceMessage.setAttribute('class', 'message');
leftSideContainer.appendChild(diceMessage);

var gameContainer = document.createElement('div');
gameContainer.setAttribute('id', 'game-container');
document.body.appendChild(gameContainer);

var oddRow = true;
for(var i = 100; i > 0; i--) {
    var box = document.createElement('div');
    box.setAttribute('id', 'box' + i);
    if(i % 10 === 0) {
        oddRow = !oddRow;
    }
    box.setAttribute('class', 'box');
    if(oddRow) {
        box.style.float = 'right';
    } else {
        box.style.float = 'left';
    }
    if(i % 2 === 0) {
        box.style.background = '#374785';
    } else {
        box.style.background = '#24305e';
    }
    
    box.appendChild(document.createTextNode(i));
    gameContainer.appendChild(box);
}

for(var i = 0; i < 2; i++) {
    var player = document.createElement('div');
    player.setAttribute('id', 'player' + (i + 1));
    document.getElementById('box1').appendChild(player);
}

var playerPosition = [1, 1]
var currentPlayer = 1;

function movePlayer() {
    var diceNumber = Math.ceil(Math.random() * 6);
    var diceMessagePlayer = 'Player ' + currentPlayer;
    switch(diceNumber){
        case 2:
            diceMessage.innerHTML = '<p>' + diceMessagePlayer + ' got Two!<p>';
        break;
        case 3:
            diceMessage.innerHTML = '<p>' + diceMessagePlayer + ' got Three!<p>';
        break;
        case 4:
            diceMessage.innerHTML = '<p>' + diceMessagePlayer + ' got Four!<p>';
        break;
        case 5:
            diceMessage.innerHTML = '<p>' + diceMessagePlayer + ' got Five!<p>';
        break;
        case 6:
            diceMessage.innerHTML = '<p>' + diceMessagePlayer + ' got Six!<br>Nice! :)<p>';
        break;
        default:
            diceMessage.innerHTML = '<p>' + diceMessagePlayer + ' got One!<p>';
    }
    console.log(diceNumber);
    for(var i = 1; i <= diceNumber; i++){
        setTimeout(function(){
            playerPosition[currentPlayer - 1]++;
            var destinationBox = document.getElementById('box' + playerPosition[currentPlayer - 1]);
            destinationBox.appendChild(document.getElementById('player' + (currentPlayer)));
            console.log('move');
        }, 400 * i);
    }
    if(diceNumber != 6){
        switchPlayer(diceNumber);
    }
}

function switchPlayer(timeout) {
    setTimeout(function() {
        console.log('masukswitch')
        if(currentPlayer === 1) {
            currentPlayer = 2;
            button.style.background = '#f76c6c';
        } else {
            currentPlayer = 1;
            button.style.background = '#f8e9a1';
        }
        console.log(currentPlayer);
    }, 400 * timeout + 1);
}