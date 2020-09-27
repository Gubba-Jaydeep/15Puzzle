// Symmetry corresponding to the number of reflections. Change the number for different number of reflections 
let symmetry = 6;

let angle = 360 / symmetry;
let slider;

function setup() {

  var canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder-for-kaleidoscope');
  angleMode(DEGREES);
  background(127);
}
function windowResized() {
  if (windowWidth<600){
    resizeCanvas(windowWidth*0.9, windowWidth*0.9);
    background(127);
  }
  
}
// Save File Function
function saveFile() {
  save('design.jpg');
}

// Clear Screen function
function clearScreen() {
  background(127);
}

// Full Screen Function
function screenFull() {
  let fs = fullscreen();
  fullscreen(!fs);
}

function draw() {
  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    if (mouseIsPressed) {
      select('#message').html("Thats Fantasticc!")
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        let sw = select('#thicknessSlider').value();
        strokeWeight(sw);
        line(mx, my, pmx, pmy);
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
}
