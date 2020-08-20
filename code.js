//Variables for piece positions
const StartingPositionTop = 40;
const leftStartingPositionLeft = 50;
const rightStartingPositionLeft = 960;
const leftSelectedTop = 265;
const leftSelectedLeft = 350;
const rightSelectedTop = 265;
const rightSelectedLeft = 650;

//Round variables (yes, lots of variables. If I referenced anything more than once, I created a variable. Not sure what the rule is here.)
let compueterScore = 0;
let playerScore = 0;
let roundCount = 1;
let SelectedLeftGamePiecePosition;
let SelectedRightGamePiecePosition;
let rightGamePieces = document.getElementsByClassName("right-game-pieces");
let leftGamePieces = document.getElementsByClassName("left-game-pieces");
let leftRock = document.getElementById("left-rock");
let leftPaper = document.getElementById("left-paper");
let leftScissors = document.getElementById("left-scissors");
let rightRock = document.getElementById("right-rock");
let rightPaper = document.getElementById("right-paper");
let rightScissors = document.getElementById("right-scissors");
let resultsLabel = document.getElementById("result-label");
let resultsOverlay = document.getElementById("results-overlay");
let explosion = document.getElementById("explosion");

//Set or resets the board
function setPieces() {
  resultsLabel.style.setProperty("--visible", "hidden");
  explosion.style.setProperty("--visible", "hidden");
  resultsOverlay.style.setProperty("--zposition", 0);
  leftRock.style.setProperty("--left-rock", "url(/Assets/Images/happy-rock.webp)");
  leftPaper.style.setProperty("--left-paper", "url(/Assets/Images/happy-paper.webp)");
  leftScissors.style.setProperty("--left-scissors", "url(/Assets/Images/happy-scissors.png)");
  rightRock.style.setProperty("--right-rock", "url(/Assets/Images/happy-rock.webp)");
  rightPaper.style.setProperty("--right-paper", "url(/Assets/Images/happy-paper.webp)");
  rightScissors.style.setProperty("--right-scissors", "url(/Assets/Images/happy-scissors.png)");
  leftRock.style.setProperty('--left-rock-rotate', "rotate(0deg)")
  leftPaper.style.setProperty('--left-paper-rotate', "rotate(0deg)")
  leftScissors.style.setProperty('--left-scissors-rotate', "rotate(0deg)")
  rightRock.style.setProperty('--right-rock-rotate', "rotate(0deg)")
  rightPaper.style.setProperty('--right-paper-rotate', "rotate(0deg)")
  rightScissors.style.setProperty('--right-scissors-rotate', "rotate(0deg)")

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
  document.getElementById(SelectedRightGamePieceID)
  .style.setProperty("--top", rightSelectedTop + "px");
  document.getElementById(SelectedRightGamePieceID)
  .style.setProperty("--left", rightSelectedLeft + "px");
  selectedLeftPiece();
  whoWon(SelectedLeftGamePiecePosition, SelectedRightGamePiecePosition);
}

//Randomly select computer piece and set position
function selectedLeftPiece() {
  let randomPiece = Math.floor(Math.random() * 3);
  let SelectedLeftGamePieceID = leftGamePieces[randomPiece].id;
  SelectedLeftGamePiecePosition = randomPiece;
  document.getElementById(SelectedLeftGamePieceID)
  .style.setProperty("--top", leftSelectedTop + "px");
  document.getElementById(SelectedLeftGamePieceID)
  .style.setProperty("--left", leftSelectedLeft + "px");
}

//Compare player peice to computer piece, determine winner, update board and counts
function whoWon(leftPiece, rightPiece) {
  //Check for tie
  leftPiece == rightPiece ? 
  (resultsLabel.textContent = "Tie!") : 
  //Rock & paper combo
    (leftPiece == 0 || rightPiece == 0) & (leftPiece == 1 || rightPiece == 1) ?
    ((resultsLabel.textContent = "Paper Wins!"),
      leftPiece == 1 ? 
      (compueterScore++, 
        rightRock.style.setProperty('--right-rock', "url(/Assets/Images/sad-rock.webp"),
        rightRock.style.setProperty('--right-rock-rotate', "rotate(90deg)")) : 
        (playerScore++,
        leftRock.style.setProperty('--left-rock', "url(/Assets/Images/sad-rock.webp"),
        leftRock.style.setProperty('--left-rock-rotate', "rotate(-90deg)"))) : 
    //Rock & scissors combo
    (leftPiece == 0 || rightPiece == 0) & (leftPiece == 2 || rightPiece == 2) ?
    ((resultsLabel.textContent = "Rock Wins!"),
      leftPiece == 0 ? 
      (compueterScore++,
        rightScissors.style.setProperty('--right-scissors', "url(/Assets/Images/sad-scissors.png)"),
        (rightScissors.style.setProperty('--right-scissors-rotate', "rotate(180deg)"))) : 
      (playerScore++,
      leftScissors.style.setProperty('--left-scissors', "url(/Assets/Images/sad-scissors.png)"),
        leftScissors.style.setProperty('--left-scissors-rotate', "rotate(180deg)"))) : 
    //Paper & scissors combo
    (leftPiece == 1 || rightPiece == 1) & (leftPiece == 2 || rightPiece == 2) ?
    ((resultsLabel.textContent = "Scissors Wins!"),
      leftPiece == 2 ?
       (compueterScore++,
        rightPaper.style.setProperty('--right-paper', "url(/Assets/Images/sad-paper.webp)"),
        (rightPaper.style.setProperty('--right-paper-rotate', "rotate(90deg)"))) :
       (playerScore++,
       leftPaper.style.setProperty('--left-paper', "url(/Assets/Images/sad-paper.webp)"),
        leftPaper.style.setProperty('--left-paper-rotate', "rotate(-90deg)"))) :
       (resultsLabel.textContent = "Something is wrong... :(");

  //Update counts and board with results      
  resultsLabel.style.setProperty("--visible", "visible");
  explosion.style.setProperty("--visible", "visible");
  document.getElementById("computer-score").textContent = compueterScore;
  document.getElementById("player-score").textContent = playerScore;
  roundCount++;``
  document.getElementById("round-count").textContent = "Round " + roundCount;
  //Results overlay blocks user from clicking another piece until board is reset
  resultsOverlay.style.setProperty("--zposition", 9999);
  resultsOverlay.addEventListener("click", function () {
      setPieces();
    });
}

//Call initial setup of board
setPieces();
