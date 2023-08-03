let board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let startsFirst = true;
let currentPlayer = startsFirst;
let w;
let boardW, boardH;
let disp;
let depthSlider, depthScore;
let playerUI;
let game = true;

function setup() {
  const canvas = createCanvas(600, 500);
  canvas.parent("connect4");
  w = floor(width / 9);
  boardW = w * 9;
  boardH = w * 7;
  // playerUI = createDiv();
  disp = createP("").class("win-message");
  depthSlider = createSlider(0, 7, 5, 1)
    .class("depth-slider")
    .parent("depth-settings");
  depthScore = createP().class("depth-score").parent("depth-settings");
  createButton("Restart")
    .mousePressed(restart)
    .class("restart-button")
    .parent("player-ui");
}

function draw() {
  background(220);
  // console.log(boardW / 2)
  depthScore.html(depthSlider.value() + 1);
  disp.position(30, boardH);

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 9; j++) {
      stroke(0);
      strokeWeight(2);
      rectMode(CORNER);
      fill(0, 0, 255);
      rect(j * w, i * w, w);
      ellipseMode(CENTER);
      if (board[i][j] == 1) {
        fill(255, 0, 0);
      } else if (board[i][j] == -1) {
        fill(255, 255, 0);
      } else {
        fill(0);
      }
      strokeWeight(1);
      ellipse(j * w + w / 2, i * w + w / 2, (w / 4) * 3);
    }
  }
  win = checkWin(board);
  if (!game) {
    let c = checkWinBoard(board);
    stroke(0, 255, 0);
    strokeWeight(10);
    line(
      c.x1 * w + w / 2,
      c.y1 * w + w / 2,
      c.x2 * w + w / 2,
      c.y2 * w + w / 2
    );
  }
  if (!currentPlayer && game) {
    let bestmove = bestMove();
    nextTurn(board, bestmove, true);
    if (checkWin(board) == 1) {
      disp.html("YOU LOST");
      console.log("YOU LOST");
      game = false;
    }
  }
}

function mousePressed() {
  let validCols = checkValidCols(board);
  if (currentPlayer && mouseY < (width / 9) * 7 && game) {
    let col = floor(map(mouseX, 0, width, 0, 9));
    if (validCols.includes(col)) {
      nextTurn(board, col, false);
      currentPlayer = false;
      if (checkWin(board) == -1) {
        disp.html("YOU WON");
        console.log("YOU WON");
        game = false;
        return;
      }
    }
  }
}

function restart() {
  board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  disp.html("");
  game = true;
  currentPlayer = true;
}
