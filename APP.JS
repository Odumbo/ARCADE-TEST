let container = document.getElementById("gameContainer");
let squareArray = [];
let player1 = {
    name: "",
    char: ""
};
let player2 = {
    name: "",
    char: ""
};
let currentPlayer;

function gameOver (message){
    document.getElementById("Winner").innerHTML = message;
    container.style.display = "none";
    document.getElementById("gameOver").style.display = "block";
}

function isDraw(){
    let shouldReturn = true;
    squareArray.forEach(({state})=>{
    if (state == "") shouldReturn = false;
    });
    return shouldReturn;
}

function wonGame(){
    let lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
for (let i = 0; i < lines.length; i++){
    let [a, b, c] = lines[i];
    if (
    squareArray[a].state !== "" &&
    squareArray[a].state === squareArray[b].state &&
    squareArray[a].state === squareArray[c].state
    ){
        return true;
    }
}
        return false; 
}

class ClassSquare {
    constructor (element, index){
        this.element = element;
        this.index = index;
        this.state = "";
    }
    clicked(){
        this.state = currentPlayer.char;
        this.element.classList.remove("notClicked");
        this.element.onclick = function () {
            return false;
        };
        this.element.querySelector("p").innerHTML = this.state;
        if (wonGame()) {
            return gameOver("PLAY AGAIN, The Winner is " + currentPlayer.name);
        }
        if (isDraw()) {
            return gameOver ("PLAY AGAIN, It is A Draw");
        }
        if (currentPlayer === player1) {
            // in this if block, the currentPlayer is player1
            currentPlayer = player2
        } else {
            // in this else block, the currentPlayer is player2
            currentPlayer = player1
        }
    }
}

for (let index = 0; index < 9; index++){
    let div = document.createElement("div");
    div.classList.add ("square", "notClicked");
    let square = new ClassSquare (div, index);
    div.onclick = function(){
        square.clicked();
    }
    div.appendChild(document.createElement("p"));
    container.appendChild(div);
    squareArray.push(square);
}

const wrapper = document.querySelector(".wrapper"),
form = wrapper.querySelectorAll(".form"),
submitInput = form[0].querySelector('input[type="submit"]');

function setPlayers(e){
    e.preventDefault ();
    let formData = new FormData (form[0]);
    player1.name = formData.get('userField')
    player2.name = formData.get('userField2')
    const randomNumber = Math.floor(Math.random() * 2); // 0 - 1
    if(randomNumber === 1 ) {
        player1.char = "X";
        player2.char = "O";
        currentPlayer = player1 
    } else {
        player1.char = "O";
        player2.char = "X";
        currentPlayer = player2
    }
    alert ( currentPlayer.name +' ' +"goes first"); // change this alert so that it alerts a message saying "[PLAYERNAME] goes first"
}

document.addEventListener('DOMContentLoaded', function(){
    submitInput.addEventListener('click', setPlayers, false);
}, false);

//alert ( player1.name + '-' + player2.name );
