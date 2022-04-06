const areBothArrays = function (firstElement, secondElement) {
  const isArray = Array.isArray;
  return isArray(firstElement) && isArray(secondElement);
};

const areEqual = function (firstElement, secondElement) {
  if (!areBothArrays(firstElement, secondElement)) {
    return firstElement === secondElement;
  }

  if (firstElement.length !== secondElement.length) {
    return false;
  }

  for (let index = 0; index < firstElement.length; index++) {
    if (!areEqual(firstElement[index], secondElement[index])) {
      return false;
    }
  }
  return true;
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

const groupBy = function (list) {
  let groups = [];

  for (let index = 0; index < list.length; index++) {
    let groupIndex = firstIndexOf(groups, list[index]);
    if (groupIndex < 0) {
      groupIndex = groups.push([]) - 1;
    }
    groups[groupIndex].push(list[index]);
  }
  return groups;
};

console.log(groupBy([1]));
console.log(groupBy([1, 2]));
console.log(groupBy([1, 2, 1]));
console.log(groupBy([1, 2, 1, 1]));
console.log(groupBy([1, 2, 1, [1], [1, [1]], [1, [1]]]));
