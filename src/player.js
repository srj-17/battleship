import Gameboard from "./gameboard.js";

class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
    }
}

export default {
    real: new Player("real"),
    computer: new Player("computer"),
};
