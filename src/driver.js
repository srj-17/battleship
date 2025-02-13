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

export {
    playerOne,
    playerTwo,
    playerOneId,
    playerTwoId,
    getTurn,
    changeTurn,
    getWinner,
};
