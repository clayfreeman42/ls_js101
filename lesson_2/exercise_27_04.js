// ["red", "green", "blue", "purple", "pink"]

let color1 = "purple";
let color2 = "pink";
let colors = ["red", "green", "blue"];

function updateColors(colors, color) {
  colors.push(color);
  return colors;
}

let newColors = updateColors(colors, color1);
updateColors(newColors, color2);
console.log(colors);