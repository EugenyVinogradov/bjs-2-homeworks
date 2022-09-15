function compareArrays(arr1, arr2) {
  let result;
  result = false;
return arr1.length === arr2.length && arr1.every((element, i) => element === arr2[i])
}

function advancedFilter(arr) {
  let resultArr;
  resultArr = arr.filter(element => element >= 0 && element % 3 === 0).map(element => element * 10);
  return resultArr; // array
}

