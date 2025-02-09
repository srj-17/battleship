import Gameboard from "../src/gameboard.js";

test("Gameboard exists", () => {
    expect(typeof new Gameboard()).toBe("object");
});

test("Ships can be placed on the board by specifying start coordinates", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip("battleship", [4, 4]);

    expect(gameboard.getCoordinates("battleship")).toEqual({
        startCoordinates: [4, 4],
        endCoordinates: [7, 4],
    });
    expect(gameboard.getOrientation("battleship")).toEqual("horizontal");
});

test("Ships don't place if the coordinates are outside of range ", () => {
    const gameboard = new Gameboard();

    expect(() => gameboard.placeShip("battleship", [10, 10])).toThrow();
    expect(() =>
        gameboard.placeShip("battleship", [10, 10], "vertical"),
    ).toThrow();
});

test("Ships place vertically if specified needed", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip("battleship", [4, 4], "vertical");

    expect(gameboard.getCoordinates("battleship")).toEqual({
        startCoordinates: [4, 4],
        endCoordinates: [4, 7],
    });
    expect(gameboard.getOrientation("battleship")).toEqual("vertical");
});

test("receiveAttack function works", () => {
    const gameboard = new Gameboard();

    expect(gameboard.receiveAttack([2, 2])).toBe(false);
});

test("receiveAttack attacks the ship if there's a ship in given position", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip("battleship", [4, 4], "vertical");

    expect(gameboard.receiveAttack([4, 5])).toBe(true);
    expect(gameboard.ships["battleship"].hits).toBe(1);
});

test("Track the attacks", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip("battleship", [4, 4], "vertical");
    gameboard.receiveAttack([4, 5]);
    gameboard.receiveAttack([3, 3]);

    expect(gameboard.trackingGrid[4][5]).toBe(true);
    expect(gameboard.trackingGrid[3][3]).toBe(true);
    expect(gameboard.trackingGrid[3][4]).toBe(false);
});

test("shows all ships are sunk when all of them are sunk", () => {
    const gameboard = new Gameboard();
    for (const ship in gameboard.ships) gameboard.ships[ship].sunk = true;

    expect(gameboard.areAllShipsSunk()).toBe(true);
});

test("Only place ships if the positions are clear", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip("cruiser", [1, 1]);
    gameboard.placeShip("battleship", [2, 1]);
    expect(gameboard.gameboard[2][1]).toBe("cruiser");
    expect(gameboard.gameboard[1][1]).toBe("cruiser");
    expect(gameboard.gameboard[3][1]).toBe("cruiser");
    expect(gameboard.gameboard[4][1]).toBe(false);
});

test("Only place ships if the positions are clear vertically", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip("cruiser", [1, 1], "vertical");
    gameboard.placeShip("battleship", [1, 2], "vertical");
    expect(gameboard.gameboard[1][2]).toBe("cruiser");
    expect(gameboard.gameboard[1][1]).toBe("cruiser");
    expect(gameboard.gameboard[1][3]).toBe("cruiser");
    expect(gameboard.gameboard[1][4]).toBe(false);
});
