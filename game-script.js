var vsCpu = true;
var queryString = decodeURIComponent(window.location.search);
if(queryString.substring(queryString.length - 1) === '2') {
    vsCpu = false;
}

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

var diceMessage = document.createElement('div');
diceMessage.setAttribute('class', 'message');
leftSideContainer.appendChild(diceMessage);

homeLink = document.createElement('a');
homeLink.setAttribute('href', 'index.html');
var logo = document.createElement('img');
logo.setAttribute('src', 'img/logo.png');
logo.setAttribute('id', 'logo');
homeLink.appendChild(logo);
leftSideContainer.appendChild(homeLink);

var diceImage = document.createElement('img');
diceImage.setAttribute('src', 'img/dice1.png');
diceImage.setAttribute('id', 'dice-image');
leftSideContainer.appendChild(diceImage);

var button = document.createElement('button');
button.setAttribute('onclick', 'movePlayer()');
button.appendChild(document.createTextNode('ROLL DICE'));
button.style.float = 'left';
leftSideContainer.appendChild(button);

var box0 = document.createElement('div');
box0.setAttribute('id', 'box0');
box0.setAttribute('class', 'box');
leftSideContainer.appendChild(box0);

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
    
    box.innerHTML =  '<p>' + i + '<p>';
    gameContainer.appendChild(box);
}

var rightSideContainer = document.getElementsByClassName('side-container')[1];
var specialMessage = document.createElement('div');
specialMessage.setAttribute('class', 'message');
rightSideContainer.appendChild(specialMessage);

var ladders = {
    1: {destination: 38, margin: '475px 0 0 75px', height: '210px', width: '70px', transform: 'rotate(33deg)'},
    4: {destination: 14, margin: '560px 0 0 325px', height: '180px', width: '50px', transform: 'rotate(77deg)'},
    9: {destination: 31, margin: '495px 0 0 605px', height: '170px', width: '50px', transform: 'rotate(10deg)'},
    21: {destination: 42, margin: '423px 0 0 55px', height: '100px', width: '30px', transform: 'rotate(15deg)'},
    28: {destination: 84, margin: '95px 0 0 335px', height: '480px', width: '110px', transform: 'rotate(145deg)'},
    36: {destination: 44, margin: '415px 0 0 270px', height: '50px', width: '20px', transform: 'rotate(140deg)'},
    51: {destination: 67, margin: '210px 0 0 535px', height: '180px', width: '50px', transform: 'rotate(100deg)'},
    71: {destination: 91, margin: '75px 0 0 640px', height: '170px', width: '50px', transform: 'rotate(0deg)'},
    80: {destination: 100, margin: '75px 0 0 20px', height: '110px', width: '30px', transform: 'rotate(0deg)'}
};
for(point in ladders) {
    var ladder = document.createElement('img');
    ladder.setAttribute('src', 'img/ladder.png');
    ladder.style.zIndex = 1;
    ladder.style.position = 'absolute';
    ladder.style.margin = ladders[point].margin;
    ladder.style.height = ladders[point].height;
    ladder.style.width = ladders[point].width;
    ladder.style.transform = ladders[point].transform;
    document.body.appendChild(ladder);
}

var snakes = {
    16: {destination: 6, margin: '610px 0 0 310px', height: '80px', width: '80px', transform: 'rotate(180deg)'},
    47: {destination: 26, margin: '410px 0 0 360px', height: '120px', width: '120px', transform: 'rotate(250deg)'},
    48: {destination: 11, margin: '410px 0 0 480px', height: '200px', width: '200px', transform: 'rotate(190deg)'},
    56: {destination: 53, margin: '260px 0 0 330px', height: '160px', width: '160px', transform: 'rotate(140deg)'},
    62: {destination: 19, margin: '260px 0 0 0px', height: '350px', width: '230px', transform: 'rotate(215deg)'},
    64: {destination: 60, margin: '210px 0 0 60px', height: '180px', width: '180px', transform: 'rotate(300deg)'},
    87: {destination: 24, margin: '80px 0 0 230px', height: '490px', width: '290px', transform: 'rotate(237deg)'},
    93: {destination: 73, margin: '65px 0 0 470px', height: '110px', width: '110px', transform: 'rotate(237deg)'},
    98: {destination: 78, margin: '65px 0 0 140px', height: '110px', width: '110px', transform: 'rotate(237deg)'}
};
for(point in snakes) {
    var snake = document.createElement('img');
    snake.setAttribute('src', 'img/snake.png');
    snake.style.zIndex = 1;
    snake.style.position = 'absolute';
    snake.style.margin = snakes[point].margin;
    snake.style.height = snakes[point].height;
    snake.style.width = snakes[point].width;
    snake.style.transform = snakes[point].transform;
    document.body.appendChild(snake);
}

for(var i = 0; i < 2; i++) {
    var player = document.createElement('div');
    player.setAttribute('id', 'player' + (i + 1));
    document.getElementById('box0').appendChild(player);
}

var playerPosition = [0, 0];
var currentPlayer = 1;

function movePlayer() {
    button.disabled = true;
    var goBack = false;
    var diceNumber = Math.ceil(Math.random() * 6);
    diceImage.setAttribute('src', 'img/dice' + diceNumber + '.png');
    var messagePlayer = 'Player ' + currentPlayer;
    if(vsCpu) {
        if(currentPlayer === 1){
            messagePlayer = 'You';
            specialMessage.innerHTML = '';
        } else {
            messagePlayer = 'CPU';
        }
    } else {
        specialMessage.innerHTML = '';
    }
    if(diceNumber === 6) {
        if(vsCpu && currentPlayer === 2) {
            specialMessage.innerHTML = '<p>Oh no!<br>' + messagePlayer + ' got extra move!</p>';
        } else {
            specialMessage.innerHTML = '<p>One More Time!<br>' + messagePlayer + ' got extra move!</p>';
        }
    }
    switch(diceNumber){
        case 2:
            diceMessage.innerHTML = '<p>' + messagePlayer + ' got Two!<p>';
        break;
        case 3:
            diceMessage.innerHTML = '<p>' + messagePlayer + ' got Three!<p>';
        break;
        case 4:
            diceMessage.innerHTML = '<p>' + messagePlayer + ' got Four!<p>';
        break;
        case 5:
            diceMessage.innerHTML = '<p>' + messagePlayer + ' got Five!<p>';
        break;
        case 6:
            diceMessage.innerHTML = '<p>' + messagePlayer + ' got Six!<p>';
        break;
        default:
            diceMessage.innerHTML = '<p>' + messagePlayer + ' got One!<p>';
    }
    for(var i = 1; i <= diceNumber; i++){
        setTimeout(function(){
            if(!goBack){
                playerPosition[currentPlayer - 1]++;
            } else {
                playerPosition[currentPlayer - 1]--;
            }
            var destinationBox = document.getElementById('box' + playerPosition[currentPlayer - 1]);
            destinationBox.appendChild(document.getElementById('player' + (currentPlayer)));
            if(playerPosition[currentPlayer - 1] === 100) {
                goBack = true;
            }
        }, 400 * i);
    }
    snakeLadderMove(diceNumber, messagePlayer);
    switchPlayer(diceNumber);
}

function snakeLadderMove(timeout, messagePlayer) {
    setTimeout(function() {
        if(ladders[playerPosition[currentPlayer - 1]]) {
            playerPosition[currentPlayer - 1] = ladders[playerPosition[currentPlayer - 1]].destination;
            var destinationBox = document.getElementById('box' + playerPosition[currentPlayer - 1]);
            destinationBox.appendChild(document.getElementById('player' + (currentPlayer)));
            if(vsCpu && currentPlayer === 2){
                specialMessage.innerHTML = '<p>CPU got Ladder! :(<br>Try to catch up!<p>';
            } else {
                specialMessage.innerHTML = '<p>Up Up and Away! :)<br>' + messagePlayer + ' got Ladder!<p>';
            }
        } else if(snakes[playerPosition[currentPlayer - 1]]){
            playerPosition[currentPlayer - 1] = snakes[playerPosition[currentPlayer - 1]].destination;
            var destinationBox = document.getElementById('box' + playerPosition[currentPlayer - 1]);
            destinationBox.appendChild(document.getElementById('player' + (currentPlayer)));
            if(vsCpu && currentPlayer === 2){
                specialMessage.innerHTML = '<p>CPU got Snake! :)<br>Now\'s your chance!<p>';
            } else {
                specialMessage.innerHTML = '<p>Way Down We Go. :(<br>' + messagePlayer + ' got Snake.';
            }
        }
    }, 400 * (timeout + 1));
}

function switchPlayer(timeout) {
    setTimeout(function() {
        if(playerPosition[currentPlayer - 1] !== 100) {
            if(timeout !== 6) {
                if(currentPlayer === 1) {
                    currentPlayer = 2;
                    button.style.background = '#f76c6c';
                } else {
                    currentPlayer = 1;
                    button.style.background = '#f8e9a1';
                }
            }
            button.disabled = false;
            if(currentPlayer === 2 && vsCpu) {
                timeout++;
                movePlayer();
            }
        } else {
            button.style.display = 'none';
            if(currentPlayer === 2 && vsCpu) {
                specialMessage.innerHTML = '<p>You Lose. :(<br>Try your luck next time!<p>';
            } else {
                specialMessage.innerHTML = '<p>Congratulations! :)<br>Player ' + currentPlayer + ' Wins!<p>';
            }
        }
    }, 400 * (timeout + 1));
}