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

const players = [lakshmi, prasanna];

const snakes = {
  8: 3, 24: 11, 32: 13, 48: 34, 64: 29, 82: 12, 95: 46, 99: 83 
};

const ladders = {
  5: 13, 19: 32, 26: 49, 31: 92, 47: 53, 59: 81, 73: 98, 84: 92
};

const board = {
  boardSize: 10,
  snakes: snakes,
  ladders: ladders
};

const game = {
  board: board,
  players: players
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

const isSnake = function (board, position) {
  return !!board.snakes[position];
};

const isLadder = function (board, position) {
  return !!board.ladders[position];
};

const nextPosition = function (board, player, diceValue) {
  const position = player.position + diceValue;
  if (isSnake(board, position)) {
    return board.snakes[position];
  }
  if (isLadder(board, position)) {
    return board.ladders[position];
  }
  return position;
};

const createPlayerStats = function (player) {
  return {
    player: player.name,
    initialPosition: player.position,
  };
};

const gameIsOn = function (currentPlayer, board) {
  return currentPlayer.position < board.boardSize;
};

const playGame = function (game) {
  const playerSelector = cycle(game.players);
  let currentPlayer;
  do {
    currentPlayer = playerSelector();
    let diceValue = rollDice(6);
    
    const playerStats = createPlayerStats(currentPlayer);
    playerStats.diceValue = diceValue;

    currentPlayer.position = nextPosition(game.board, currentPlayer, diceValue);

    playerStats.finalPosition = currentPlayer.position;
    console.table(playerStats);
  } while(gameIsOn(currentPlayer, game.board));

  return currentPlayer.name;
};

console.log(playGame(game), 'won!!');
