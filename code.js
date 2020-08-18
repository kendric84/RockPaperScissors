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
let SelectedLeftGamePieceID;
let SelectedRightGamePieceID;
let SelectedLeftGamePiecePosition;
let SelectedRightGamePiecePosition;

function resetPieces() {
  //Set starting position on left game pieces
  document
    .getElementById("result-label")
    .style.setProperty("--visible", "hidden");

  let leftGamePieces = document.getElementsByClassName("left-game-pieces");
  for (let i = 0; i < leftGamePieces.length; i++) {
    leftGamePieces[i].style.setProperty(
      "--top",
      StartingPositionTop + i * 240 + "px"
    );
    leftGamePieces[i].style.setProperty(
      "--left",
      leftStartingPositionLeft + "px"
    );
  }

  //Add click event and set starting position on right game pieces
  let rightGamePieces = document.getElementsByClassName("right-game-pieces");
  for (let i = 0; i < rightGamePieces.length; i++) {
    rightGamePieces[i].addEventListener("click", function () {
      SelectedRightGamePiecePosition = i;
      SelectedRightGamePieceID = rightGamePieces[i].id;
      selectedRightPiece(SelectedRightGamePieceID);
      selectedLeftPiece();
      whoWon(SelectedLeftGamePiecePosition, SelectedRightGamePiecePosition);
    });
    rightGamePieces[i].style.setProperty(
      "--top",
      StartingPositionTop + i * 240 + "px"
    );
    rightGamePieces[i].style.setProperty(
      "--left",
      rightStartingPositionLeft + "px"
    );
  }
  document.getElementById("result-label").style.setProperty("--visible", "hidden");
}

function selectedLeftPiece() {
  let leftGamePieces = document.getElementsByClassName("left-game-pieces");
  let randomPiece = Math.floor(Math.random() * 3);
  SelectedLeftGamePieceID = leftGamePieces[randomPiece].id;
  SelectedLeftGamePiecePosition = randomPiece;
  document
    .getElementById(SelectedLeftGamePieceID)
    .style.setProperty("--top", leftSelectedTop + "px");
  document
    .getElementById(SelectedLeftGamePieceID)
    .style.setProperty("--left", leftSelectedLeft + "px");
}

function selectedRightPiece(SelectedRightGamePieceID) {
  resetPieces();
  document
    .getElementById(SelectedRightGamePieceID)
    .style.setProperty("--top", rightSelectedTop + "px");
  document
    .getElementById(SelectedRightGamePieceID)
    .style.setProperty("--left", rightSelectedLeft + "px");
}

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

  document.getElementById("result-label").style.setProperty("--visible", "visible");
  document.getElementById("computer-score").textContent = compueterScore;
  document.getElementById("player-score").textContent = playerScore;
  roundCount++;
  document.getElementById("round-count").textContent = "Round " + roundCount;
}

resetPieces();
