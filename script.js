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