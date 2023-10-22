// 'hello', 'Hello', 'Hello!!!'

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function exclaim(word) {
  return (word += "!!!");
}

let word = "hello";
let capitalizedWord = capitalize(word);
let exclaimedWord = exclaim(capitalizedWord);

console.log(word);
console.log(capitalizedWord);
console.log(exclaimedWord);

let testVar = 3;

let testFunc = (testVar) => {
  return testVar = 4;
}

testVar = testFunc(testVar);
console.log(testVar);