const input = [
    [0,1,0,0,0],
    [1,0,0,1,1],
    [1,1,0,0,1],
    [0,1,0,0,0],
    [1,0,0,0,1]
];

let board = new Board(input.length, input[0].length, null);

/** 
 * Initial load of Game of Life.
 * 
 * Start by populating the board's cells 2d-array with
 * new Cell objects that are alive or dead (0 or 1) based on input
 * 
 * Renders initial generation 
 */
function init() {
    populateBoardInitially();
    board.render();
}
init();

/**
 * Populates board.cells 2d-array with Cell objects that are
 * either alive or dead (0 or 1)
 */
function populateBoardInitially() {
    for(let i=0; i<board.height; i++) {
        for(let j=0; j<board.width; j++) {
            const cell = new Cell(input[i][j]);
            board.cells[i][j] = cell;
        }
    }
}

/**
 * Click listener for next button that evolves to next generation
 */
document.querySelector("#next").addEventListener("click", () => {
    nextGeneration();
});

/**
 * Creates a new board with a deep copy of the current board's cells 2d-array
 * Evolves to next generation by applying Game of Life rules
 * Renders new board to the div #board and sets the current board to the new board
 */
function nextGeneration() {
    const newBoard = new Board(board.height, board.width, board.cloneCells());
    newBoard.applyRules(board);
    newBoard.render();
    board = newBoard;
}



