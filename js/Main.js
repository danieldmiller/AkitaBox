let board; //Main Board object

/**
 * Populates cells 2d-array with Cell objects that are
 * either alive or dead (0 or 1)
 * 
 * Creates and renders new board with cells 2d-array
 */
function initializeBoard(cellArr) {
    let cells = Array(cellArr.length).fill().map(()=>Array(cellArr[0].length).fill());
    
    for(let i=0; i<cellArr.length; i++) {
        for(let j=0; j<cellArr[0].length; j++) {
            const cell = new Cell(cellArr[i][j]);
            if(cell == null) {
                cell = new Cell(0);
            }
            cells[i][j] = cell;
        }
    }

    board = new Board(cellArr.length, cellArr[0].length, cells);
    board.render();
}

/**
 * Click listener for submit button that converts textarea input to 2d number array. 
 * Passes the 2d-array to initializeBoard()
 */
document.querySelector("#submit").addEventListener("click", () => {
    const input = document.querySelector("textarea").value;
    const cellArr = getInputAs2dArray(input); //Input.js function that returns a 2d-array
                                              //of the ints from the text area input
    if(cellArr == null) {
        alert("Invalid input. Try again.");
        return;
    }
    //hide input section and show board section
    document.querySelector("#inputSection").style.display = "none";
    document.querySelector("#gameSection").style.display = "inline-block";

    initializeBoard(cellArr); 
});

/** Click listener for next button that evolves to next generation */
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