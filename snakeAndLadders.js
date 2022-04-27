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

const nextPosition = function (player, diceValue) {
  currentPosition = player.position + diceValue;
  if (isSnakeOrLadder(currentPosition)) {
    return displacePosition(currentPosition);
  }
  return currentPosition;
};

const createPlayerStats = function (player) {
  return {
    player: player.name,
    initialPosition: player.position,
  };
};

const gameIsOn = function (currentPlayer) {
  return currentPlayer.position < 10;
};

const playGame = function (players) {
  const playerSelector = cycle(players);
  let currentPlayer;
  do {
    currentPlayer = playerSelector();
    let diceValue = rollDice(6);
    
    const playerStats = createPlayerStats(currentPlayer);
    playerStats.diceValue = diceValue;

    currentPlayer.position = nextPosition(currentPlayer, diceValue);

    playerStats.finalPosition = currentPlayer.position;
    console.table(playerStats);
  } while(gameIsOn(currentPlayer));

  return currentPlayer.name;
};

console.log(playGame(players), 'won!!');
