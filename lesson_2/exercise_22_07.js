// infinite loop - increments block scope var but while tests global scope var

let num = 1;

while (num < 3) {
  let num = 5;
  num += 1;
}

console.log(num);