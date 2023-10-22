// ['Hi', 'Goodbye'] then 'Hello' (assignment of an element
// in a array is a primitive! )

let myWords = ['Hello', 'Goodbye'];
let myWord = myWords[0];
myWords[0] = 'Hi';

console.log(myWords);
console.log(myWord);