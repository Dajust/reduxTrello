function arrayToList(arr) {
  let prevObj = null;
  for (var i = arr.length; i >= 0; i--) {
    prevObj = {rest:prevObj, value:arr[i]}
  }
  return prevObj;
}

let listFromArray = arrayToList([1, 2, 3]);
console.log(listFromArray);

//
// function recursArrayToList(arr) {
//   function buildList(prevObj, arr) {
//     if (arr.length == 1) {
//       console.log(prevObj, arr[0]);
//       return prevObj = {value : arr[0], rest : prevObj}
//     }
// 
//     return {value: arr.shift(), rest : buildList(prevObj, arr)}
//   }
//
//   buildList(null, arr);
// }
//
// recursArrayToList([1, 2, 3]);


function listToArray(list) {
  let arr = [];
  while(list.value){
    arr.push(list.value);
    list = list.rest;
  }
  return arr;
}

let arrayFromList = listToArray(listFromArray);
console.log(arrayFromList);
