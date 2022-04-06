const areBothArrays = function (element1, element2) {
  return Array.isArray(element1) && Array.isArray(element2);
};

const areArraysEqual = function (firstArray, secondArray) {
  if (!areBothArrays(firstArray, secondArray)) {
    return false;
  }

  if (firstArray.length !== secondArray.length) {
    return false;
  }

  for (let index = 0; index < firstArray.length; index++) {
    if (!areEqual(firstArray[index], secondArray[index])) {
      return false;
    }
  }
  return true;
};

const areEqual = function (firstElement, secondElement) {
  if (areBothArrays(firstElement, secondElement)) {
    return areArraysEqual(firstElement, secondElement);
  }
  return firstElement === secondElement;
};

const includes = function (set, element) {
  for (let index = 0; index < set.length; index++) {
    if (areEqual(set[index], element)) {
      return true;
    }
  }
  return false;
};

const isAbsentEarlier = function (element, set) {
  return !includes(set, element);
};

const groupSimilarElements = function (element, set) {
  const setOfSimilarElements = [];

  for (let index = 0; index < set.length; index++) {
    if (areEqual(set[index], element)) {
      setOfSimilarElements.push(set[index]);
    }
  }
  return setOfSimilarElements;
};

const groupSimilarElementSets = function (set) {
  const setsOfSimilarElements = [];

  for (let index = 0; index < set.length; index++) {
    if (isAbsentEarlier(set[index], set.slice(0, index))) {
      setsOfSimilarElements.push(groupSimilarElements(set[index], set.slice(index)));
    }
  }
  return setsOfSimilarElements;
};

console.log(groupSimilarElementSets([1]));
console.log(groupSimilarElementSets([1, 2]));
console.log(groupSimilarElementSets([1, 2, 1]));
console.log(groupSimilarElementSets([1, 2, 1, 1]));
console.log(groupSimilarElementSets([1, 2, 1, [1], [1, [1]], [1, [1]]]));
