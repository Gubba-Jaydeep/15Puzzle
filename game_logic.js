var grid
var moves
var pos
var colorPrimary
var init_grid = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]]

// Setup blank Canvas with Grid
function setup() {
    console.log("setup");
    var canvas = createCanvas(400, 400);
    canvas.parent('sketch-holder');
    noLoop();
    moves = 0;
    grid = blankGrid();
    pos = [grid.length - 1, grid.length - 1]
    // drawGrid()
    colorPrimary = Math.floor((Math.random() * dataColors.length) + 1) - 1
    shuffleData();
}

// Returns solved Grid
function blankGrid() {
    console.log("blank grid");
    return [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]]
}
function swapGridNumbers(a, b) {
    grid[a[0]][a[1]] = grid[a[0]][a[1]] ^ grid[b[0]][b[1]]
    grid[b[0]][b[1]] = grid[a[0]][a[1]] ^ grid[b[0]][b[1]]
    grid[a[0]][a[1]] = grid[a[0]][a[1]] ^ grid[b[0]][b[1]]
}
function moveDown() {
    if (pos[0] === 0) {
        return;
    }
    swapGridNumbers(pos, [pos[0] - 1, pos[1]])
    pos[0] = pos[0] - 1
    moves = moves + 1
}

function moveUp() {
    if (pos[0] === 3) {
        return;
    }
    swapGridNumbers(pos, [pos[0] + 1, pos[1]])
    pos[0] = pos[0] + 1
    moves = moves + 1
}

function moveRight() {
    if (pos[1] === 0) {
        return;
    }
    swapGridNumbers(pos, [pos[0], pos[1] - 1])
    pos[1] = pos[1] - 1
    moves = moves + 1
}

function moveLeft() {
    if (pos[1] === 3) {
        return;
    }
    swapGridNumbers(pos, [pos[0], pos[1] + 1])
    pos[1] = pos[1] + 1
    moves = moves + 1
}

function updateCanvas() {
    console.log("Update grid");
    drawGrid();
    select('#moves').html(moves);
    checkWin()
}
function getPosition(dataPosition) {
    if (dataPosition > 0 && dataPosition < 100) {
        return 0;
    }
    if (dataPosition > 100 && dataPosition < 200) {
        return 1;
    }
    if (dataPosition > 200 && dataPosition < 300) {
        return 2;
    }
    if (dataPosition > 300 && dataPosition < 400) {
        return 3;
    }
}
function mouseClicked() {
    y = getPosition(mouseX)
    x = getPosition(mouseY)
    if ((x + 1) === pos[0] && (y === pos[1])) {
        moveDown();
    }
    else if ((x === pos[0]) && ((y + 1) === pos[1])) {
        moveRight();
    }
    else if ((x - 1) === pos[0] && (y === pos[1])) {
        moveUp();
    }
    else if (x === pos[0] && ((y - 1) === pos[1])) {
        moveLeft();
    }
    else {
        return;
    }
    updateCanvas()
}
//test
function keyPressed() {  // i.e evrytime i press a key!
    let played = true;
    switch (keyCode) {
        case DOWN_ARROW:
            console.log("Down arrow!");
            moveDown();
            break;
        case UP_ARROW:
            console.log("Up arrow!");
            moveUp();
            break;
        case RIGHT_ARROW:
            console.log("Right arrow!");
            moveRight();
            break;
        case LEFT_ARROW:
            console.log("Left arrow!");
            moveLeft();
            break;
        default:
            played = false;
    }
    if (played) {
        //check if he won
    }
    updateCanvas()
}
// Draws the given grid over canvas
function drawGrid() {
    var w = 100;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            noFill();
            strokeWeight(0);
            let num = grid[i][j];
            stroke(0);
            if (num) {
                //create rectangle
                fill(dataColors[colorPrimary][Math.ceil(num / 4)]);
                rect(j * w, i * w, w, w);

                //fill number
                textAlign(CENTER, CENTER);
                noStroke();
                fill(0);
                textSize(56);
                text(num, j * w + w / 2, i * w + w / 2);
            }
            else {
                fill(dataColors[colorPrimary][Math.ceil(num / 4)]);
                rect(j * w, i * w, w, w);
            }
        }
    }
}

function shuffleData() {
    for (let i = 0; i < 60; i++) {
        let arrow = Math.floor((Math.random() * 4) + 1);
        if (arrow === 1) {
            moveUp();
        }
        else if (arrow === 2) {
            moveDown();
        }
        else if (arrow === 3) {
            moveLeft();
        }
        else if (arrow === 4) {
            moveRight();
        }
    }
    moves = 0
    select('#message').html("All the best");
    updateCanvas()
}
function resetData() {
    colorPrimary = Math.floor((Math.random() * dataColors.length) + 1) - 1
    grid = blankGrid()
    pos = [grid.length - 1, grid.length - 1]
    moves = 0
    select('#message').html("All the best");
    shuffleData()
}

function checkWin() {
    if (moves !== 0 && moves < 10 && JSON.stringify(grid) == JSON.stringify(init_grid)) {
        select('#message').html("Congrats Cheater 😺");
    }
    else if (moves !== 0 && JSON.stringify(grid) == JSON.stringify(init_grid)) {
        select('#message').html("You Rock...!");
        alert("You Win...🤩");
        console.log("You Win...🤩")
        moves = 0
    }
}
