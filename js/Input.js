/**
 * Converts string input to a 2d number array
 * @param input - String of board with 0s and 1s. New rows separated by \n
 * @returns {Number[][]} result - 2d-array of cells
 */
function getInputAs2dArray(input) {
    const result = [];
    const arr = input.split("\n");
    for(let i=0; i<arr.length; i++) {
        let row = arr[i];
        let cells = row.split("").map(Number); //convert String[] into Number[]
        result.push(cells);
    }
    return result;
}

/** Click listener for rpentomino button to populate textarea with an R-Pentomino board */
document.querySelector("#rpentomino").addEventListener("click", () => {
    const rpentomino = "000000000000000\n000000000000000\n000000000000000\n000000000000000\n000000000000000\n000000000000000\n000000011000000\n000000110000000\n000000010000000\n000000000000000\n000000000000000\n000000000000000\n000000000000000\n000000000000000\n000000000000000";
    const textArea = document.querySelector("textarea");
    textArea.style.height = "200px";
    textArea.value = rpentomino;
});