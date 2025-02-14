import Gameboard from "./gameboard.js";

class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
    }
}

const realPlayer = new Player("real");

const computer = new Player("computer");

let currentPlacement = 0;
function changeShipPlaceMents(amount) {
    // use one of these placements
    const placements = [
        {
            computer: {
                carrier: {
                    coordinates: [0, 2],
                    orientation: "vertical",
                },
                battleship: {
                    coordinates: [4, 4],
                    orientation: "vertical",
                },
                cruiser: {
                    coordinates: [2, 1],
                    orientation: "horizontal",
                },
                submarine: {
                    coordinates: [7, 1],
                    orientation: "vertical",
                },
                destroyer: {
                    coordinates: [0, 8],
                    orientation: "vertical",
                },
            },
            real: {
                carrier: {
                    coordinates: [2, 7],
                    orientation: "horizontal",
                },
                battleship: {
                    coordinates: [2, 3],
                    orientation: "horizontal",
                },
                cruiser: {
                    coordinates: [3, 0],
                    orientation: "horizontal",
                },
                submarine: {
                    coordinates: [4, 5],
                    orientation: "horizontal",
                },
                destroyer: {
                    coordinates: [0, 1],
                    orientation: "vertical",
                },
            },
        },
        {
            computer: {
                carrier: {
                    coordinates: [5, 1],
                    orientation: "vertical",
                },
                battleship: {
                    coordinates: [0, 2],
                    orientation: "horizontal",
                },
                cruiser: {
                    coordinates: [2, 4],
                    orientation: "horizontal",
                },
                submarine: {
                    coordinates: [0, 0],
                    orientation: "horizontal",
                },
                destroyer: {
                    coordinates: [9, 3],
                    orientation: "vertical",
                },
            },
            real: {
                carrier: {
                    coordinates: [9, 4],
                    orientation: "vertical",
                },
                battleship: {
                    coordinates: [0, 2],
                    orientation: "vertical",
                },
                cruiser: {
                    coordinates: [7, 0],
                    orientation: "vertical",
                },
                submarine: {
                    coordinates: [3, 6],
                    orientation: "horizontal",
                },
                destroyer: {
                    coordinates: [1, 0],
                    orientation: "horizontal",
                },
            },
        },
        {
            computer: {
                carrier: {
                    coordinates: [7, 0],
                    orientation: "vertical",
                },
                battleship: {
                    coordinates: [1, 1],
                    orientation: "vertical",
                },
                cruiser: {
                    coordinates: [9, 1],
                    orientation: "vertical",
                },
                submarine: {
                    coordinates: [3, 5],
                    orientation: "horizontal",
                },
                destroyer: {
                    coordinates: [1, 8],
                    orientation: "horizontal",
                },
            },
            real: {
                carrier: {
                    coordinates: [0, 5],
                    orientation: "horizontal",
                },
                battleship: {
                    coordinates: [3, 0],
                    orientation: "vertical",
                },
                cruiser: {
                    coordinates: [7, 3],
                    orientation: "horizontal",
                },
                submarine: {
                    coordinates: [6, 5],
                    orientation: "vertical",
                },
                destroyer: {
                    coordinates: [0, 0],
                    orientation: "horizontal",
                },
            },
        },
    ];

    const chosenPlacement = placements[currentPlacement];
    // cycle through the given placements
    currentPlacement = Math.abs(currentPlacement + amount) % placements.length;
    const chosenPlacementComputer = chosenPlacement.computer;
    const chosenPlacementReal = chosenPlacement.real;

    for (const ship in chosenPlacementReal) {
        const shipName = `${ship}`;
        const shipCoordinates = chosenPlacementReal[ship].coordinates;
        const shipOrientation = chosenPlacementReal[ship].orientation;
        realPlayer.gameboard.placeShip(
            shipName,
            shipCoordinates,
            shipOrientation,
        );
    }

    for (const ship in chosenPlacementComputer) {
        const shipName = `${ship}`;
        const shipCoordinates = chosenPlacementReal[ship].coordinates;
        const shipOrientation = chosenPlacementReal[ship].orientation;
        computer.gameboard.placeShip(
            shipName,
            shipCoordinates,
            shipOrientation,
        );
    }
}

changeShipPlaceMents(1);

export default {
    real: realPlayer,
    computer: computer,
};

export { Player, changeShipPlaceMents };
