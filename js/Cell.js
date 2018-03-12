/**
 * Cell.js class stores the state of the cell (alive or dead - 0 or 1)
 * Contains isAlive() method to check state of cell
 * Contains die() and live() methods to set lifeState as alive or dead
 */
class Cell {
    /**
     * Initializes a new Cell object
     * @param {number} lifeState - 0=dead, 1=alive 
     * @constructor
     */
    constructor(lifeState) {
        this.lifeState = lifeState;
    }

    isAlive() {
        return this.lifeState === 1;
    }

    die() {
        this.lifeState = 0;
    }

    live() {
        this.lifeState = 1;
    }
}