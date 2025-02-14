import players from "./player.js";
export { attack } from "./computerLogic.js";

const playerOne = players.real;
const playerTwo = players.computer;

const playerOneId = 1;
const playerTwoId = 2;

// turn variable to keep track of which player's turn it is
// by default, it's real player's (player 1's) turn
let turn = 1;
function changeTurn() {
    if (turn === 1) turn = 2;
    else turn = 1;
}

const getTurn = () => turn;

// if all ships of the player has been busted, he is the loser
function isPlayerLoser(player) {
    const SIZE = player.gameboard.getGameBoard().length;
    const gameboard = player.gameboard.getGameBoard();
    const trackingGrid = player.gameboard.trackingGrid;

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (gameboard[i][j]) {
                if (!trackingGrid[i][j]) {
                    return false;
                }
            }
        }
    }

    return true;
}

// returns false if there's no winner, winner player id if there is
// named parameters just for making the function pure (testing purposes)
function getWinner(playerOne = players.real, playerTwo = players.computer) {
    if (isPlayerLoser(playerOne)) return playerTwoId;
    if (isPlayerLoser(playerTwo)) return playerOneId;
    return false;
}

function isGameboardInitialized(player) {
    const gameboard = player.gameboard.getGameBoard();
    const SIZE = gameboard.length;
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            // gameboard is initialized even if only one of
            // its coordinates has a ship
            // TODO: or should I make it so that gameboard is only initialized
            // only when 5 + 4 + 3 + 3 + 2 = 17 cells are initialized?
            if (gameboard[i][j]) {
                return true;
            }
        }
    }

    return false;
}

function areDuplicates(array) {
    for (const element of array) {
        const arrWithoutElem = array.toSpliced(array.indexOf(element), 1);
        if (arrWithoutElem.includes(element)) return true;
    }

    return false;
}

function areValidCoordinates(configForm) {
    const xCoordinateList = Array.from(configForm.querySelectorAll(".input-x"));
    const yCoordinateList = Array.from(configForm.querySelectorAll(".input-y"));

    const xCoordinateValues = xCoordinateList.map((element) => element.value);
    const yCoordinateValues = yCoordinateList.map((element) => element.value);

    // return true only if there are no duplicates in both the value arrays
    return (
        !areDuplicates(xCoordinateValues) && !areDuplicates(yCoordinateValues)
    );
}

export {
    playerOne,
    playerTwo,
    playerOneId,
    playerTwoId,
    getTurn,
    changeTurn,
    getWinner,
    isGameboardInitialized,
    areValidCoordinates,
    areDuplicates,
};
