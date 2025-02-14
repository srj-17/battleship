import Gameboard from "./gameboard.js";

class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
    }
}

const realPlayer = new Player("real");

const computer = new Player("computer");
computer.gameboard.placeShip("carrier", [0, 1]);
computer.gameboard.placeShip("battleship", [1, 5]);
computer.gameboard.placeShip("cruiser", [1, 3]);
computer.gameboard.placeShip("submarine", [7, 0], "vertical");
computer.gameboard.placeShip("destroyer", [9, 8], "vertical");

export default {
    real: realPlayer,
    computer: computer,
};

export { Player };
