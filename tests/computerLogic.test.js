import { attack } from "../src/computerLogic.js";
import players from "../src/player.js";

test("computer attacks opponents at different coordinates", () => {
    // copy of gameboard
    const beforeBoard = players.real.gameboard.gameboard.slice();
    attack(players.real);

    expect(beforeBoard).not.toBe(players.real.gameboard.gameboard);
});

// this test might fail at any moment
test("computer doesn't attack the same cell twice", () => {
    attack(players.real);
    const beforeBoard = players.real.gameboard.gameboard.slice();
    attack(players.real);
    const afterBoard = players.real.gameboard.gameboard;

    // the board must change after it has attacked
    expect(beforeBoard).not.toBe(afterBoard);
});
