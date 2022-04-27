const lakshmi = {
  name: 'Lakshmi',
  position: 0
};

const suresh = {
  name: 'Suresh Kumar',
  position: 0
};

const prasanna = {
  name: 'Prasanna',
  position: 0
};

const players = [lakshmi, prasanna, suresh];

const snakes = {
  8: 3, 24: 11, 32: 13, 48: 34, 64: 29, 82: 12, 95: 46, 99: 83 
};

const ladders = {
  5: 13, 19: 32, 26: 49, 31: 92, 47: 53, 59: 81, 73: 98, 84: 92
};

const board = {
  players: players,
  boardSize: 10,
  snakes: snakes,
  ladders: ladders
};

const cycle = function (collection) {
  let index = -1;
  return function () {
    index++;
    return collection[index % collection.length];
  };
};

const isEven = function (number) {
  return number % 2 === 0;
};
 
const rollDice = function (x) {
  return Math.ceil(Math.random() * x);
};

const isPerfectSquare = function (number) {
  return Math.sqrt(number) === Math.floor(Math.sqrt(number));
};

const isSnakeOrLadder = function (playerPosition) {
  return isPerfectSquare(playerPosition);
};

const didSnakeBite = function (playerPosition) {
  return isEven(playerPosition);
};

const displacePosition = function (position) {
  let valueToBeAdded = Math.sqrt(position);
  if (didSnakeBite(position)) {
    valueToBeAdded = -valueToBeAdded;
  }
  return valueToBeAdded + position;
};

const isSnake = function (snakes, position) {
  return snakes[position];
};

const isLadder = function (ladders, position) {
  return ladders[position];
};

const nextPosition = function (board, player, diceValue) {
  const position = player.position + diceValue;
  if (isSnake(board.snakes, position)) {
    return snakes[position];
  }
  if (isLadder(board.ladders, position)) {
    return ladders[position];
  }
  return position;
};

const createPlayerStats = function (player) {
  return {
    player: player.name,
    initialPosition: player.position,
  };
};

const gameIsOn = function (currentPlayer, boardSize) {
  return currentPlayer.position < boardSize;
};

const playGame = function (board) {
  const playerSelector = cycle(board.players);
  let currentPlayer;
  do {
    currentPlayer = playerSelector();
    let diceValue = rollDice(6);
    
    const playerStats = createPlayerStats(currentPlayer);
    playerStats.diceValue = diceValue;

    currentPlayer.position = nextPosition(board, currentPlayer, diceValue);

    playerStats.finalPosition = currentPlayer.position;
    console.table(playerStats);
  } while(gameIsOn(currentPlayer, board.boardSize));

  return currentPlayer.name;
};

console.log(playGame(board), 'won!!');
