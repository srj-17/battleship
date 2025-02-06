import Gameboard from "../src/gameboard.js";

test("Gameboard exists", () => {
    expect(typeof new Gameboard()).toBe("object");
});

test("Ships can be placed on the board by specifying start coordinates", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip("battleship", [4, 4]);

    expect(gameboard.getCoordinates("battleship")).toEqual({
        startCoordinates: [4, 4],
        endCoordinates: [8, 4],
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
        endCoordinates: [4, 8],
    });
    expect(gameboard.getOrientation("battleship")).toEqual("vertical");
});

test.only("receiveAttack function works", () => {
    const gameboard = new Gameboard();

    expect(gameboard.receiveAttack([2, 2])).toBe(false);
});

test("receiveAttack attacks the ship if there's a ship in given position", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip("battleship", [4, 4], "vertical");

    expect(gameboard.receiveAttack([4, 5])).toBe(true);
});
