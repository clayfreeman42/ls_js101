// 'hello!!!' then 'Hello' then 'hello!!!'

function capitalize() {
  return word[0].toUpperCase() + word.slice(1);
}

function exclaim() {
  return (word += "!!!");
}

let word = "hello";
let capitalizedWord = capitalize(word);
let exclaimedWord = exclaim(capitalizedWord);

console.log(word);
console.log(capitalizedWord);
console.log(exclaimedWord);