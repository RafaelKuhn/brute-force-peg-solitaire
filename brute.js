const readline = require('readline-sync');

// const inputX = console.log(readline.question("insira X (coordenada horizontal)"));
// const inputX = console.log(readline.question("insira Y"));

// trocar 0 para 2 e 2 para 0
//
// quantidade de jogadas até chega lá
// caminho das jogadas
// quantidade de tentativas
//
// ver como pôr input
// checar se o output condiz com o input

const board = [
  [0, 0, 1, 1, 1, 0, 0,],
  [0, 0, 1, 1, 1, 0, 0,],
  [1, 1, 1, 1, 1, 1, 1,],
  [1, 1, 1, 2, 1, 1, 1,],
  [1, 1, 1, 1, 1, 1, 1,],
  [0, 0, 1, 1, 1, 0, 0,],
  [0, 0, 1, 1, 1, 0, 0,],
];

let tocos = 32;

function restaUm() {
  // process.stdout.write(`tocos: ${tocos} \n`);

  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 7; x++) {
      // peça x, y sempre deverá ser 1
      if (board[y][x] !== 1) continue;

      // dá pra jogar pra uma peça abaixo
      if (y+2 <= 6) {
      if (board[y+2][x] === 2 && board[y+1][x] === 1) {
        // printBoard();
        // console.log("jogarei pra baixo");
        board[y][x] = 2;
        board[y+1][x] = 2;
        board[y+2][x] = 1;
        tocos--;
        // printBoard();

        checaTocos();
        
        // console.log("desfazendo bx");
        board[y][x] = 1;
        board[y+1][x] = 1;
        board[y+2][x] = 2;
        tocos++;
        // printBoard();
      }
      }


      // dá pra jogar pra uma peça acima
      if (y-2 >= 0) {
      if (board[y-2][x] === 2 && board[y-1][x] === 1) {
        // printBoard();
        // console.log("jogarei pra cima");
        board[y][x] = 2;
        board[y-1][x] = 2;
        board[y-2][x] = 1;
        tocos--;
        // printBoard();


        checaTocos();

        // console.log("desfazendo cima");
        board[y][x] = 1;
        board[y-1][x] = 1;
        board[y-2][x] = 2;
        tocos++;
        // printBoard();
      }
      }


      // dá pra jogar pra uma peça à direita
      if (x+2 <= 6) {
      if (board[y][x+2] === 2 && board[y][x+1] === 1) {
        // printBoard();
        // console.log("jogarei pra dir");
        board[y][x] = 2;
        board[y][x+1] = 2;
        board[y][x+2] = 1;
        tocos--;
        // printBoard();


        checaTocos();

        // console.log("desfazendo dir");
        board[y][x] = 1;
        board[y][x+1] = 1;
        board[y][x+2] = 2;
        tocos++;
        // printBoard();
      }
      }

      // dá pra jogar pra uma peça à esquerda
      if (x-2 >= 0) {
      if (board[y][x-2] === 2 && board[y][x-1] === 1) {
        // printBoard();
        // console.log("jogarei pra esq");
        board[y][x] = 2;
        board[y][x-1] = 2;
        board[y][x-2] = 1;
        tocos--;
        // printBoard();


        checaTocos();

        // console.log("desfazendo esq");
        board[y][x] = 1;
        board[y][x-1] = 1;
        board[y][x-2] = 2;
        tocos++;
        // printBoard();
      }
      }



    }
  }
}

function checaTocos() {
  // checa tocos
  if (temAlgumaJogada()) {
    restaUm();
  } else if (tocos === 1) {
    // console.log("recurse");
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
      if (y+2 <= 6)
      // 2 pra baixo não tem peça, 1 pra baixo tem
        if (board[y+2][x] === 2 && board[y+1][x] === 1) {
          // console.log("tem jogada BX");
          // printBoard();
          return true;
        }
      

      // dá pra jogar pra cima
      if (y-2 >= 0)
      // 2 pra cima não tem peça, 1 pra cima tem
        if (board[y-2][x] === 2 && board[y-1][x] === 1) {
          // console.log("tem jogada CIM");
          // printBoard();
          return true;
        }
      

      // dá pra jogar pra direita
      if (x+2 <= 6)
      // 2 pra direita não tem peça, 1 pra direita tem
        if (board[y][x+2] === 2 && board[y][x+1] === 1) {
          // console.log("tem jogada DR");
          // printBoard();
          return true;
        }


      // dá pra jogar pra esquerda
      if (x-2 >= 0)
      // 2 pra esquerda não tem peça, 1 pra esquerda tem
        if (board[y][x-2] === 2 && board[y][x-1] === 1) {
          // console.log("tem jogada ES");
          // printBoard();
          return true;
        }
    }
  }

  // console.log("não tem mais jogadas, voltando");
  return false;
};

function printBoard() {
  let s = '  0 1 2 3 4 5 6\n';
  for (let y = 0; y < 7; y++) {
    s += `${y} `;
    for (let x = 0; x < 7; x++) {
      const el = board[y][x];
      if (!el) {
        s += '  ';
      } else if (el === 2) {
        s += `0 `;
      } else {
        s += `${el} `
      }
    }
    s += '\n';
  }
  console.log(s);
}

// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

console.log("-------------------------------------------");
console.log("---------------- RESTA UM ----------------- ");
console.log("-------------------------------------------");
console.log("tabuleiro padrão: ");
printBoard();
console.log("0 - buracos");
console.log("1 - peças\n");

// console.log("insira coordenada do buraco");

restaUm();