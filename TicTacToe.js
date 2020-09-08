var board;
const player1 = 'X';
const player2 = 'O';
var currentPlayer = player1;
const winCombos =[
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
]

const cells = document.querySelectorAll('.cell');
startGame();
restart.addEventListener('click',startGame,false);

//This fuction sets up a new game with a blank board
function startGame(){
  board = Array.from(Array(9).keys());
  for(var i = 0; i < cells.length; i++){
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
}

//This fuction check to see if the spot that the player wants to play is valid
function checkValidMove(squareId){
  if(document.getElementById(squareId).innerText == ''){
    return true;
  }else{
    return false;
  }
}

//This fuction alternate player turns and set the current player to the correct player.
function getTurn(){
  if(currentPlayer == player1){
    currentPlayer = player2;
}else {
  currentPlayer = player1;
}
}

//This function place an appropriate mark inside the box that the user click.
function turn(squareId, player){
  board[squareId] = player;
  document.getElementById(squareId).innerText = player;
}

// This function check to see if the currentPlayer won
function checkWin(squareId, player){
  for(var i = 0; i < winCombos.length; i++){
    var num =parseInt(squareId);
    if(winCombos[i].includes(num)){
      var winCombo = winCombos[i];
      var win = 0;
      for(var count = 0; count < winCombo.length; count++){
        try {
          if(document.getElementById(winCombo[count]).innerText == player){
            win++;
            if(win == winCombo.length){
              return true;
            }
          }
        } catch (e){
        }
        }
      }
  }
  return false;
  // lopp through every wining index see if squareid and the related element is match
}

//This function will display the winning message
function displayWin(currentPlayer){
  document.getElementById("winningPlayer").innerText = currentPlayer;
  document.getElementById("winningMessageElement").style.visibility = "visible";
  setTimeout(() => { document.getElementById("winningMessageElement").style.visibility = "hidden"; }, 4000);
}

//This function will check to see if there's a tie
function checkTie(){
  for(var i = 0; i < 9; i++){
    console.log(board[i]);
    if(board[i] == 'O' || board[i] == 'X' ){
      console.log("equal O or X");
    return false;
    }
  }
  console.console.log("not equal O or X");
  return true;
}

function displayTie(){
    document.getElementById("winningPlayer").innerText = "Tie!";
    document.getElementById("message-text").style.visibility = "hidden";
    document.getElementById("winningMessageElement").style.visibility = "visible";
    setTimeout(() => { document.getElementById("winningMessageElement").style.visibility = "hidden"; }, 4000);

}

// This fuction will call the fuction to check if the user's input is a valid
// choice and call the turn method if it is
function turnClick(square){
  if(checkValidMove(square.target.id)){
    getTurn();
    turn(square.target.id, currentPlayer);
    if(checkTie()){
      displayTie();
    }
    if(checkWin(square.target.id,currentPlayer)){
      displayWin(currentPlayer);
      setTimeout(() => { startGame(); }, 4000);
    }
  }
}
