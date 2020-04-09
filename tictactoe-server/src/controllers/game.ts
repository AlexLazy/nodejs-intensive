let field = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let currentPlayer = 1;

export const getField = () => field;

export const presetField = (newField: number[][]) => (field = newField);

export const makeMove = (x: number, y: number) => {
  if (field[y - 1][x - 1]) return false;
  field[y - 1][x - 1] = currentPlayer;
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  return true;
};

export const reset = () => {
  currentPlayer = 1;
  field = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
};

export const resetField = (newField: []) => (field = newField);

export const setCurrentPlayer = (player: number) => (currentPlayer = player);

export const checkWinner = () => {
  let winner = 0;

  if (
    (field[0][0] === 1 && field[0][1] === 1 && field[0][2] === 1) ||
    (field[1][0] === 1 && field[1][1] === 1 && field[1][2] === 1) ||
    (field[2][0] === 1 && field[2][1] === 1 && field[2][2] === 1) ||
    (field[0][0] === 1 && field[1][0] === 1 && field[2][0] === 1) ||
    (field[0][1] === 1 && field[1][1] === 1 && field[2][1] === 1) ||
    (field[0][2] === 1 && field[1][2] === 1 && field[2][2] === 1) ||
    (field[0][0] === 1 && field[1][1] === 1 && field[2][2] === 1) ||
    (field[0][2] === 1 && field[1][1] === 1 && field[2][0] === 1)
  )
    winner = 1;

  if (
    (field[0][0] === 2 && field[0][1] === 2 && field[0][2] === 2) ||
    (field[1][0] === 2 && field[1][1] === 2 && field[1][2] === 2) ||
    (field[2][0] === 2 && field[2][1] === 2 && field[2][2] === 2) ||
    (field[0][0] === 2 && field[1][0] === 2 && field[2][0] === 2) ||
    (field[0][1] === 2 && field[1][1] === 2 && field[2][1] === 2) ||
    (field[0][2] === 2 && field[1][2] === 2 && field[2][2] === 2) ||
    (field[0][0] === 2 && field[1][1] === 2 && field[2][2] === 2) ||
    (field[0][2] === 2 && field[1][1] === 2 && field[2][0] === 2)
  )
    winner = 2;

  return winner;
};
