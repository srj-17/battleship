import Ship from "./ship.js";

class Gameboard {
    // create a 10x10 grid
    constructor() {
        // gameboard has size 10 by default
        this.size = 10;

        this.gameboard = [];
        // initialize array with 10 arrays, false can be replaced with anything
        for (let i = 0; i < this.size; i++)
            this.gameboard = this.gameboard.concat([[false]]);

        // ships and their coordinates
        this.ships = {
            carrier: this.#createNewShip(5),
            battleship: this.#createNewShip(4),
            cruiser: this.#createNewShip(3),
            submarine: this.#createNewShip(3),
            destroyer: this.#createNewShip(2),
        };
    }

    #createNewShip(length) {
        const ship = {
            coordinates: null,
            orientation: "horizontal",
        };
        Object.setPrototypeOf(ship, new Ship(length));
        return ship;
    }

    #reconstructGameBoard() {
        // initialize each gameboard position to false
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                this.gameboard[x][y] = false;
            }
        }

        for (let ship in this.ships) {
            const shipCoordinates = this.ships[ship].coordinates;
            if (shipCoordinates !== null) {
                const { startCoordinates, endCoordinates } = shipCoordinates;

                // calculate the coordinates of the ship from start and end coordinates
                let allCoordinates = [];
                let [startXCoordinate, startYCoordinate] = startCoordinates;
                let [endXCoordinate, endYCoordinate] = endCoordinates;

                // if the ship is vertical
                if (this.ships[ship].orientation === "vertical") {
                    while (startYCoordinate <= endYCoordinate) {
                        allCoordinates = allCoordinates.concat([
                            [startXCoordinate, startYCoordinate],
                        ]);
                        startYCoordinate++;
                    }
                } else {
                    while (startXCoordinate <= endXCoordinate) {
                        allCoordinates = allCoordinates.concat([
                            [startXCoordinate, startYCoordinate],
                        ]);
                        startXCoordinate++;
                    }
                }

                // put the ship on those positions in the gameboard
                allCoordinates.forEach((coordinate) => {
                    const [x, y] = coordinate;
                    this.gameboard[x][y] = ship;
                });
            }
        }
    }

    placeShip(ship, startCoordinates, orientation = "horizontal") {
        const startXCoordinate = startCoordinates[0];
        const startYCoordinate = startCoordinates[1];
        if (orientation === "horizontal") {
            const shipLength = this.ships[ship].length;
            if (startXCoordinate + shipLength < this.size) {
                this.ships[ship].coordinates = {
                    startCoordinates,
                    endCoordinates: [
                        startXCoordinate + shipLength,
                        startYCoordinate,
                    ],
                };
                this.ships[ship].orientation = "horizontal";
            } else
                throw new Error(
                    "Can't fit ship in the board with given start coordinates",
                );
        } else {
            const shipLength = this.ships[ship].length;
            if (startYCoordinate + shipLength < this.size) {
                this.ships[ship].coordinates = {
                    startCoordinates,
                    endCoordinates: [
                        startXCoordinate,
                        startYCoordinate + shipLength,
                    ],
                };
                this.ships[ship].orientation = "vertical";
            } else
                throw new Error(
                    "Can't fit ship in the board with given start coordinates",
                );
        }

        this.#reconstructGameBoard();
    }

    getCoordinates(ship) {
        return this.ships[ship].coordinates;
    }

    getOrientation(ship) {
        return this.ships[ship].orientation;
    }

    getBoard() {
        return this.gameboard;
    }

    receiveAttack(coordinate) {
        // if attack hits the ship,
        const [xCoordinate, yCoordinate] = coordinate;
        console.log(this.gameboard[xCoordinate][yCoordinate]);
        if (this.gameboard[xCoordinate][yCoordinate] === false) return false;
        else return true;
        // send the hit function to the correct ship
        // record the coordinates
    }
}

export default Gameboard;
