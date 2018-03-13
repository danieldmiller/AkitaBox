# AkitaBox

JavaScript implementation of the "Game of Life" for AkitaBox. This project was based on coding exercise #1. The main function of the program is evolving generations through the "Game of Life". The input is a game board of cells, either alive (1) or dead (0). A new generation evolves from the previous generation based on the following rules:

```
0) A cell has up to eight neighbors (top, topright, right, bottomright, bottom, bottomleft, left, topleft)
1) Any live cell with fewer than two live neighbours dies (under-population)
2) Any live cell with two or three live neighbours lives on to the next generation (survival)
3) Any live cell with more than three live neighbours dies (overcrowding) 4) Any dead cell with exactly three live neighbours becomes a live cell (reproduction)
```

Example game board input:
```
01000
10011
11001
01000
10001
```

Subsequent generation:
```
00000
10111
11111
01000
00000
```

## Files

*  **index.html**  - HTML page containing a board div with cell divs. Next button evolves to the next generation.
*  **Main.js**     - Takes game board of cells input and creates a new board with Cell objects that are either alive (1) or dead (0).
                     Includes functions to listen for "next" button click and evolve to next generation.
*  **Board.js**    - Object class that holds a 2d-array of Cell objects. Includes functions to apply game rules, find neighbors 
                     of a cell, deep copy the 2d-array of Cell objects, and render the cells on the browser.
*  **Cell.js**     - Object class that stores the state of a cell. Includes functions to die, live, and check if a cell is alive.
*  **styles.css**  - Stylesheet that stylizes index.html.
    

## Getting Started

GitHub - https://github.com/danieldmiller/AkitaBox

In order to run this project, download the files located at the GitHub link and open the index.html file in a web browser.
Alternatively, a live version of the project can be visited at: https://danieldmiller.github.io/AkitaBox/

## Built With

* [JavaScript - ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Authors

* **Daniel Miller**
