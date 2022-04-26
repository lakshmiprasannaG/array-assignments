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
 
const randomNum = function (x) {
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

const nextPosition = function (player, diceValue) {
  currentPosition = player.position + diceValue;
  if (isSnakeOrLadder(currentPosition)) {
    return displacePosition(currentPosition);
  }
  return currentPosition;
};

const maxBy = function (property) {
  return function (a, b) {
    return a[property] > b[property] ? a : b;
  };
};

const getWinner = function (players) {
  return players.reduce(maxBy('position'));
};

const playerStats = function (player) {
  return {
    player: player.name,
    initialPosition: player.position,
  };
};

const playGame = function (players) {
  const player = cycle(players);
  let currentPlayer ;
  // let currentPlayer = players[0];
  
  do {
    currentPlayer = player();
    let diceValue = randomNum(6);
    
    const currentPlayerStats = playerStats(currentPlayer);
    currentPlayerStats.diceValue = diceValue;

    currentPlayer.position = nextPosition(currentPlayer, diceValue);

    currentPlayerStats.finalPosition = currentPlayer.position;
    console.table(currentPlayerStats);
  } while (currentPlayer.position < 10);

  return getWinner(players).name;
};

const players = [lakshmi, prasanna, suresh];

console.log(playGame(players), 'won!!');
