// ['Hi', 'Bye'] then ['Hello', 'Goodbye']

let myWords = ['Hello', 'Goodbye'];
let myOtherWords = myWords;
myWords = ['Hi', 'Bye'];

console.log(myWords);
console.log(myOtherWords);