const prompt = require("prompt-sync")();

// quantidade de jogadas até chega lá
// caminho das jogadas
// quantidade de tentativas

const board = [
  [2, 2, 1, 1, 1, 2, 2,],
  [2, 2, 1, 1, 1, 2, 2,],
  [1, 1, 1, 1, 1, 1, 1,],
  [1, 1, 1, 0, 1, 1, 1,],
  [1, 1, 1, 1, 1, 1, 1,],
  [2, 2, 1, 1, 1, 2, 2,],
  [2, 2, 1, 1, 1, 2, 2,],
];

let qtdTocos = 32;

const ultimoTocoPosition = {
  i: Number,
  j: Number
}

function restaUm() {

  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 7; x++) {

      // o elemento atual (x, y) sempre deverá ser uma peça (valor 1)
      if (board[y][x] !== 1) continue;

      // dá pra jogar pra uma peça abaixo
      if (y + 2 <= 6) {
        if (board[y + 2][x] === 0 && board[y + 1][x] === 1) {
          board[y][x] = 0;
          board[y + 1][x] = 0;
          board[y + 2][x] = 1;
          qtdTocos--;

          checaOsTocos();

          board[y][x] = 1;
          board[y + 1][x] = 1;
          board[y + 2][x] = 0;
          qtdTocos++;
        }
      }


      // dá pra jogar pra uma peça acima
      if (y - 2 >= 0) {
        if (board[y - 2][x] === 0 && board[y - 1][x] === 1) {
          board[y][x] = 0;
          board[y - 1][x] = 0;
          board[y - 2][x] = 1;
          qtdTocos--;

          checaOsTocos();

          board[y][x] = 1;
          board[y - 1][x] = 1;
          board[y - 2][x] = 0;
          qtdTocos++;
        }
      }


      // dá pra jogar pra uma peça à direita
      if (x + 2 <= 6) {
        if (board[y][x + 2] === 0 && board[y][x + 1] === 1) {
          board[y][x] = 0;
          board[y][x + 1] = 0;
          board[y][x + 2] = 1;
          qtdTocos--;

          checaOsTocos();

          board[y][x] = 1;
          board[y][x + 1] = 1;
          board[y][x + 2] = 0;
          qtdTocos++;
        }
      }

      // dá pra jogar pra uma peça à esquerda
      if (x - 2 >= 0) {
        if (board[y][x - 2] === 0 && board[y][x - 1] === 1) {
          board[y][x] = 0;
          board[y][x - 1] = 0;
          board[y][x - 2] = 1;
          qtdTocos--;

          checaOsTocos();

          board[y][x] = 1;
          board[y][x - 1] = 1;
          board[y][x - 2] = 0;
          qtdTocos++;
        }
      }
    }
  }
}

function checaOsTocos() {
  if (temAlgumaJogada()) {
    restaUm();
  } else if (qtdTocos === 1 && isLastTocoOnRightPosition()) {
    console.log("restou um");
    console.log("--------------------------------------------------------");
    printBoard();
  }
}

function temAlgumaJogada() {
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 7; x++) {

      if (board[y][x] !== 1) continue;

      // dá pra jogar pra baixo
      if (y + 2 <= 6)
        if (board[y + 2][x] === 0 && board[y + 1][x] === 1) {
          return true;
        }


      // dá pra jogar pra cima
      if (y - 2 >= 0)
        if (board[y - 2][x] === 0 && board[y - 1][x] === 1) {
          return true;
        }


      // dá pra jogar pra direita
      if (x + 2 <= 6)
        if (board[y][x + 2] === 0 && board[y][x + 1] === 1) {
          return true;
        }


      // dá pra jogar pra esquerda
      if (x - 2 >= 0)
        if (board[y][x - 2] === 0 && board[y][x - 1] === 1) {
          return true;
        }
    }
  }

  return false;
};

function printBoard() {
  let s = '  0 1 2 3 4 5 6\n';
  for (let y = 0; y < 7; y++) {
    s += `${y} `;
    for (let x = 0; x < 7; x++) {
      const el = board[y][x];
      if (el == 2) {
        s += '  ';
      } else {
        s += `${el} `
      }
    }
    s += '\n';
  }
  console.log(s);
}

function getCoordinateFromInput(input) {
  input.trim();

  let column = input.substr(0,1);
  let row = input.substr(input.length-1, 1);
  
  column = parseInt(column);
  row = parseInt(row);

  let point = {
    i: column,
    j: row
  }

  const areNotNumbers = Number.isNaN(column) || Number.isNaN(row);
   
  if (areNotNumbers) {
    const newInput = prompt("ERRO! Digite novamente a coordenada no formato i, j: ");
    point = getCoordinateFromInput(newInput);
  }
  
  const isOutOfBoard = ((point.i > 6 || point.j < 0) || (point.i > 6 || point.j < 0));
  const isOnEmptyArea = board[point.i][point.j] === 2

  if (isOutOfBoard || isOnEmptyArea) {
    const newInput = prompt("ERRO! Digite novamente a coordenada no formato i, j: ");
    point = getCoordinateFromInput(newInput);
  }
  
  return point;
}

function applyInputToBoard(initialInput, finalInput) {
  board[3][3] = 1;
  board[initialInput.i][initialInput.j] = 0;

  ultimoTocoPosition.i = finalInput.i;
  ultimoTocoPosition.j = finalInput.j;
}

function isLastTocoOnRightPosition() {
  return board[ultimoTocoPosition.i][ultimoTocoPosition.j] === 1;
}

function askForOptions() {
  console.log("-------------------------------------------");
  console.log("---------------- RESTA UM ----------------- ");
  console.log("-------------------------------------------");
  console.log("tabuleiro padrão: ");
  printBoard();
  console.log("0 - buracos");
  console.log("1 - peças\n");

  console.log("-------------------------------------------\n");
  const buracoInicialInput = prompt("Digite as coordenadas do buraco inicial no formato -> i, j: ");
  const buracoInicial = getCoordinateFromInput(buracoInicialInput);

  const ultimoTocoInput = prompt("Digite as coordenadas do ultimo toco no formato -> i, j: ");
  const ultimoToco = getCoordinateFromInput(ultimoTocoInput);

  applyInputToBoard(buracoInicial, ultimoToco);

  console.log("\n-------------------------------------------\n");
  console.log("Novo tabuleiro: ");
  printBoard();
}


askForOptions();

restaUm();