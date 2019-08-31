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

var gameContainer = document.createElement('div');
gameContainer.setAttribute('id', 'game-container');
gameContainer.innerHTML = 'Welcome!<br><br><p>This is a simple Snakes and Ladders game<br>that is built with javascript to practice DOM manipulation.<br><br>Select mode to start!';
gameContainer.style.textAlign = 'center';
gameContainer.style.fontSize = '30px';
gameContainer.style.color = '#24305e';
document.body.appendChild(gameContainer);

for(var i = 0; i < 2; i ++) {
    var strMode = '';
    if(i === 0) {
        strMode = 'p1vp2';
    } else {
        strMode = 'p1vpc';
    }
    var modeLink = document.createElement('a');
    modeLink.setAttribute('href', 'game.html?mode=' + strMode);
    var modeImage = document.createElement('img');
    modeImage.setAttribute('src', 'img/' + strMode + '.png');
    modeImage.style.height = '200px';
    modeImage.style.width = '200px';
    modeImage.style.margin = '30px';
    modeLink.appendChild(modeImage);
    gameContainer.appendChild(modeLink);
}