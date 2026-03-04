let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let player1, player2;
let scores = {};

function startGame() {
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;

  if (!player1 || !player2) {
    alert("Please enter both names!");
    return;
  }

  // Fetch scores from localStorage
  scores[player1] = parseInt(localStorage.getItem(player1)) || 0;
  scores[player2] = parseInt(localStorage.getItem(player2)) || 0;

  document.getElementById("p1Info").innerText = `${player1}: ${scores[player1]}`;
  document.getElementById("p2Info").innerText = `${player2}: ${scores[player2]}`;

  document.getElementById("nameScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");

  createBoard();
  updateTurnText();
}

function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  boardState.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.addEventListener("click", () => handleClick(index));
    div.innerText = cell;
    board.appendChild(div);
  });
}

function handleClick(index) {
  if (boardState[index] !== "") return;

  boardState[index] = currentPlayer;
  createBoard();

  if (checkWin()) {
    let winner = currentPlayer === "X" ? player1 : player2;
    scores[winner]++;
    localStorage.setItem(winner, scores[winner]);
    showVictory(winner);
    return;
  }

  if (!boardState.includes("")) {
    showVictory("It's a Draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurnText();
}

function updateTurnText() {
  let name = currentPlayer === "X" ? player1 : player2;
  document.getElementById("turnText").innerText = `Turn: ${name}`;
}

function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return boardState[a] &&
           boardState[a] === boardState[b] &&
           boardState[a] === boardState[c];
  });
}

function showVictory(winner) {
  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("victoryScreen").classList.remove("hidden");
  document.getElementById("winnerText").innerText =
    winner === "It's a Draw!" ? winner : `${winner} Wins!`;
}

function restartGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  document.getElementById("victoryScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");
  createBoard();
  updateTurnText();
}
