/**
 * Stores a 2d-array with the 8 neighbor locations relative to a cell
 * Column-major
 * @type {number[][]}
 */
let neighborhood = [
    [-1,0],   //top
    [-1, 1],  //topright
    [0, 1],   //right
    [1, 1],   //bottomright
    [1, 0],   //bottom
    [1, -1],  //bottomleft
    [0, -1],  //left
    [-1, -1]   //topleft
];

/**
 * Board.js class parses a game board of cells from a JSON file
 * and evolves generations by comparing a cell's neighbors
 * and updating based on a set of rules.
 * 
 * Contains an render method to display subsequent generations in browser
 * 
 * Holds a 2d array of Cell objects
 */
class Board {
    /**
     * Initializes a new board with height and width
     * @param {number} height - Row count of 2d array 
     * @param {number} width  - Column count of 2d array
     * @param {Cell[][]} cells - Pre-existing 2d array of Cell objects
     * @constructor
     */
    constructor(height, width, cells) {
        this.height = height;
        this.width = width;
        this.cells = cells === null ? Array(height).fill().map(()=>Array(width).fill()) : cells;
    }
    
    /**
     * Loops through cells 2d-array and kills/maintains/reproduces cells
     * 
     * Applies following rules on each cell:
     * 1) Any live cell with fewer than two live neighbours dies (under-population)
     * 2) Any live cell with two or three live neighbours lives on to the next generation (survival)
     * 3) Any live cell with more than three live neighbours dies (overcrowding)
     * 4) Any dead cell with exactly three live neighbours becomes a live cell (reproduction)
     * 
     * @param {Board} oldBoard - previous generation board, used for neighbor comparison without a changing board state
     */
    applyRules(oldBoard) {
        for(let i=0; i<this.cells.length; i++) {
            for(let j=0; j<this.cells[i].length; j++) {
                const cell = this.cells[i][j];
                const neighbors = oldBoard.getNeighbors(i, j);

                if(cell.isAlive()) {
                   if(neighbors.length < 2) {
                       cell.die(); //under-population
                   } else if(neighbors.length > 3) {
                        cell.die(); //overcrowding
                   } else if(neighbors.length === 2 || neighbors.length === 3) {
                        cell.live(); //survival
                   }
                } else if(!cell.isAlive()) {
                    if(neighbors.length === 3) {
                        cell.live(); //reproduction
                    }
                }
            }
        }
    }

    /**
     * Loops through neighborhood 2d-array, which stores neighbor locations relative to a cell.
     * If cell at neighbor location is in-bounds and alive, add its position to liveNeighbors
     * @param {number} row - Target cell row index
     * @param {number} col - Target cell col index
     */
    getNeighbors(row, col) {
        const liveNeighbors = []; //2d-array of live neighbors (y, x)

        neighborhood.forEach(arr => {
            if((row + arr[0]) >= 0 && (row + arr[0]) < this.height
            && (col + arr[1]) >= 0 && (col + arr[1]) < this.width
            && this.cells[row + arr[0]][col + arr[1]].isAlive()) { 
                liveNeighbors.push([(row + arr[0]), (col + arr[1])]);
            }
        });        

        return liveNeighbors;
    }

    /**
     * Returns a deep copy of the current object's 2d-array cells
     */
    cloneCells() {
        const newCells = new Array(this.height).fill().map(()=>Array(this.width).fill());
        for(let i=0; i<this.height; i++) {
            for(let j=0; j<this.width; j++) {
                newCells[i][j] = new Cell(this.cells[i][j].lifeState);
            }
        }

        return newCells;
    }

    /**
     * Renders grid of cell divs in #board div, 
     * with default class of "cell" for each cell div
     * 
     * Every cell div is reset to have class of "cell"
     *  
     * If cell is alive, corresponding div found via id is given "live" class
     */
    render() {
        const board = document.querySelector("#board");

        for(let i=0; i<this.cells.length; i++) {
            for(let j=0; j<this.cells[i].length; j++) {
                let cell = document.querySelector("#cell" + i + "-" + j);
                
                if(cell != null) {
                    //clear previous generation div classes
                    cell.classList = "cell"; 
                } else { 
                    //no element on the DOM with relevant id, create new cell div
                    cell = document.createElement("div");
                    cell.classList = "cell";
                    cell.id = "cell" + i + "-" + j;
                    cell.style.width = "30px";
                    cell.style.height = "30px";
                    board.appendChild(cell);
                }

                //Colorize living cells by giving them class "live"
                if(this.cells[i][j].isAlive()) {
                    cell.classList += " live";
                }
            }
            
            //break at end of each row
            const clear = document.createElement("div");
            clear.classList = "clear";
            board.appendChild(clear);
        }
        
    } 
}