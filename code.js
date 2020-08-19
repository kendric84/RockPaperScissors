//Variables for piece positions
const StartingPositionTop = 40;
const leftStartingPositionLeft = 50;
const rightStartingPositionLeft = 960;
const leftSelectedTop = 265;
const leftSelectedLeft = 350;
const rightSelectedTop = 265;
const rightSelectedLeft = 650;

//Round variables
let compueterScore = 0;
let playerScore = 0;
let roundCount = 1;
let SelectedLeftGamePiecePosition;
let SelectedRightGamePiecePosition;
let rightGamePieces = document.getElementsByClassName("right-game-pieces");
let leftGamePieces = document.getElementsByClassName("left-game-pieces");

//Set or resets the board
function setPieces() {
  document.getElementById("result-label").style.setProperty("--visible", "hidden");
  document.getElementById("results-overlay").style.setProperty("--zposition", 0);

  //Set starting position on left game pieces
  for (let i = 0; i < leftGamePieces.length; i++) {
    leftGamePieces[i].style.setProperty("--top", StartingPositionTop + i * 240 + "px");
    leftGamePieces[i].style.setProperty("--left", leftStartingPositionLeft + "px");
  }

  //Set starting position on right game pieces
  for (let i = 0; i < rightGamePieces.length; i++) {
    rightGamePieces[i].style.setProperty("--top", StartingPositionTop + i * 240 + "px");
    rightGamePieces[i].style.setProperty("--left", rightStartingPositionLeft + "px");
  }
}

//Create click event on right pieces
for (let i = 0; i < rightGamePieces.length; i++) {
  rightGamePieces[i].addEventListener("click", function () {
    selectedRightPiece(rightGamePieces[i].id, i);
  });
}

/*Position piece selected by player,
call function for computer selection,
call function to determine winner
*/
function selectedRightPiece(SelectedRightGamePieceID, SelectedRightGamePiecePosition) {
  document.getElementById(SelectedRightGamePieceID).style.setProperty("--top", rightSelectedTop + "px");
  document.getElementById(SelectedRightGamePieceID).style.setProperty("--left", rightSelectedLeft + "px");
  selectedLeftPiece();
  whoWon(SelectedLeftGamePiecePosition, SelectedRightGamePiecePosition);
}

//Randomly select computer piece and set position
function selectedLeftPiece() {
  let randomPiece = Math.floor(Math.random() * 3);
  let SelectedLeftGamePieceID = leftGamePieces[randomPiece].id;
  SelectedLeftGamePiecePosition = randomPiece;
  document.getElementById(SelectedLeftGamePieceID).style.setProperty("--top", leftSelectedTop + "px");
  document.getElementById(SelectedLeftGamePieceID).style.setProperty("--left", leftSelectedLeft + "px");
}

//Compare player peice to computer piece, determine winner, update board and counts
function whoWon(leftPiece, rightPiece) {
  //Check for tie
  leftPiece == rightPiece
    ? (document.getElementById("result-label").textContent = "Tie!")
    : //Rock & paper combo
    (leftPiece == 0 || rightPiece == 0) & (leftPiece == 1 || rightPiece == 1)
    ? ((document.getElementById("result-label").textContent = "Paper Wins!"),
      leftPiece == 1 ? compueterScore++ : playerScore++)
    : //Rock & scissors combo
    (leftPiece == 0 || rightPiece == 0) & (leftPiece == 2 || rightPiece == 2)
    ? ((document.getElementById("result-label").textContent = "Rock Wins!"),
      leftPiece == 0 ? compueterScore++ : playerScore++)
    : //Paper & scissors combo
    (leftPiece == 1 || rightPiece == 1) & (leftPiece == 2 || rightPiece == 2)
    ? ((document.getElementById("result-label").textContent = "Scissors Wins!"),
      leftPiece == 2
        ? (compueterScore = compueterScore + 1)
        : (playerScore = playerScore + 1))
    : (document.getElementById("result-label").textContent =
        "Something is wrong... :(");

  //Update counts and board with results      
  document.getElementById("result-label").style.setProperty("--visible", "visible");
  document.getElementById("computer-score").textContent = compueterScore;
  document.getElementById("player-score").textContent = playerScore;
  roundCount++;
  document.getElementById("round-count").textContent = "Round " + roundCount;
  //Results overlay blocks user from clicking another piece until board is reset
  document.getElementById("results-overlay").style.setProperty("--zposition", 9999);
  document.getElementById("results-overlay").addEventListener("click", function () {
      setPieces();
    });
}

//Call initial setup of board
setPieces();
