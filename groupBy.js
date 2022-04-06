const areBothArrays = function (firstElement, secondElement) {
  const isArray = Array.isArray;
  return isArray(firstElement) && isArray(secondElement);
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

const firstIndexOf = function (groups, element) {
  for (let index = 0; index < groups.length; index++) {
    if (includes(groups[index], element)) {
      return index;
    }
  }
  return -1;
};

const accumulateGroup = function (groups, element) {
  const index = firstIndexOf(groups, element);
  if (index < 0) {
    groups.push([element]);
    return groups;
  }
  groups[index].push(element);
  return groups;
};

const groupBy = function (list) {
  let groups = [];

  for (let index = 0; index < list.length; index++) {
    groups = accumulateGroup(groups, list[index]);
  }
  return groups;
};

console.log(groupBy([1]));
console.log(groupBy([1, 2]));
console.log(groupBy([1, 2, 1]));
console.log(groupBy([1, 2, 1, 1]));
console.log(groupBy([1, 2, 1, [1], [1, [1]], [1, [1]]]));
