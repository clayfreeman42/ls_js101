// undefined!

let color = "yellow";
let colors = ["red", "green", "blue"];

function updateColors(colors, color) {
  colors.push(color);
}

updateColors(colors);
console.log(colors);