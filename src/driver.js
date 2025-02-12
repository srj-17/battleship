import players from "./player.js";
export { attack } from "./computerLogic.js";

const playerOne = players.real;
const playerTwo = players.computer;

const playerOneId = 1;
const playerTwoId = 2;

// turn variable to keep track of which player's turn it is
let turn = 1;
function changeTurn() {
    if (turn === 1) turn = 2;
    else turn = 1;
}

const getTurn = () => turn;

export { playerOne, playerTwo, playerOneId, playerTwoId, getTurn, changeTurn };
