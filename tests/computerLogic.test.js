import computerLogic from "../src/computerLogic.js";
import Gameboard from "../src/gameboard.js";

test("computer can attack the board", () => {
    const gameboard = new Gameboard();
    computerLogic.attack([2, 2]);
});
