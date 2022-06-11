const gameFactory = () => {
  let mark = "X";
  let board = [,,,,,,,,,];
  let announceText = document.querySelector("h2");
  let overlay = document.querySelector(".shadow");
  let turns = 0;

  const main = (index) => {
    turns++;
    board[index] = mark;
    updateDOM(index);
    checkWinner();
    mark == "X" ? mark = "O" : mark = "X";
    console.log(board);
  };

  const updateDOM = (index) => {
    let cell = document.querySelector(`[data-cell="${index}"]`);
    cell.setAttribute("class","cell");
    cell.setAttribute("style","cell");
    cell.textContent = mark;

    let currentPlayer = document.querySelector(".currentplayer");
    currentPlayer.textContent == "Player 1's turn" ? currentPlayer.textContent = "Player 2's turn" : currentPlayer.textContent = "Player 1's turn";
  }

  const checkWinner = () => {
    if (board[0]+board[1]+board[2] == "XXX") { announceMatch(1) };
    if (board[3]+board[4]+board[5] == "XXX") { announceMatch(1) };
    if (board[6]+board[7]+board[8] == "XXX") { announceMatch(1) };
    if (board[0]+board[3]+board[6] == "XXX") { announceMatch(1) };
    if (board[1]+board[4]+board[7] == "XXX") { announceMatch(1) };
    if (board[2]+board[5]+board[8] == "XXX") { announceMatch(1) };
    if (board[0]+board[4]+board[8] == "XXX") { announceMatch(1) };
    if (board[6]+board[4]+board[2] == "XXX") { announceMatch(1) };

    if (board[0]+board[1]+board[2] == "OOO") { announceMatch(2) };
    if (board[3]+board[4]+board[5] == "OOO") { announceMatch(2) };
    if (board[6]+board[7]+board[8] == "OOO") { announceMatch(2) };
    if (board[0]+board[3]+board[6] == "OOO") { announceMatch(2) };
    if (board[1]+board[4]+board[7] == "OOO") { announceMatch(2) };
    if (board[2]+board[5]+board[8] == "OOO") { announceMatch(2) };
    if (board[0]+board[4]+board[8] == "OOO") { announceMatch(2) };
    if (board[6]+board[4]+board[2] == "OOO") { announceMatch(2) };

    if (turns == 9) { announceMatch(0) }
  }

  const announceMatch = (winner) => {
    if (winner == 1) { announceText.textContent = "Player 1 wins!" };
    if (winner == 2) { announceText.textContent = "Player 2 wins!" };
    if (winner == 0) { announceText.textContent = "It is a draw!" };
    overlay.style.display = "flex";
  }

  return { main };
}

// Initial variables and event listeners

const cells = document.querySelectorAll(".play");
const playAgain = document.querySelector("button");
const game = gameFactory();

playAgain.addEventListener("click", () => window.location.reload());

cells.forEach( (x) => {
  x.addEventListener("click", () => {
    game.main(x.getAttribute("data-cell"))
  }, {once: true});
});
