import { getWinner } from "../src/driver.js";
import { Player } from "../src/player.js";

test("getWinner returns false if there's no winner", () => {
    expect(getWinner()).toBe(false);
});

test("getWinner returns the winner if there's winner", () => {
    const playerOneMock = new Player("playerone");
    const SIZE = 10;
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            playerOneMock.gameboard.trackingGrid[i][j] = true;
        }
    }
    playerOneMock.gameboard.placeShip("carrier", [0, 0]);
    playerOneMock.gameboard.placeShip("battleship", [9, 2], "vertical");
    playerOneMock.gameboard.placeShip("cruiser", [5, 5]);
    playerOneMock.gameboard.placeShip("submarine", [4, 2]);
    playerOneMock.gameboard.placeShip("destroyer", [6, 7], "vertical");
    console.log(playerOneMock.gameboard.trackingGrid);

    expect(getWinner(playerOneMock)).toEqual(1);
});
