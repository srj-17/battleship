import players from "./player.js";

const body = document.querySelector("body");

// make gameboard in the dom
const container = document.createElement("div");
container.classList.toggle("container");
body.appendChild(container);

const header = document.createElement("div");
header.classList.toggle("header");
header.textContent = "BattleShip";
container.appendChild(header);

const gameboardContainer = document.createElement("div");
gameboardContainer.classList.toggle("gameboard-container");

const playerOneGameboardContainer = document.createElement("div");
playerOneGameboardContainer.classList.toggle("player-one-gameboard-container");
gameboardContainer.appendChild(playerOneGameboardContainer);
const playerOneGameboardHeader = document.createElement("div");
playerOneGameboardHeader.classList.toggle("player-one-gameboard-header");
playerOneGameboardHeader.textContent = "Player 1";
playerOneGameboardContainer.appendChild(playerOneGameboardHeader);

const playerTwoGameboardContainer = document.createElement("div");
playerTwoGameboardContainer.classList.toggle("player-two-gameboard-container");
gameboardContainer.appendChild(playerTwoGameboardContainer);
const playerTwoGameboardHeader = document.createElement("div");
playerTwoGameboardHeader.classList.toggle("player-two-gameboard-header");
playerTwoGameboardHeader.textContent = "Player 2";
playerTwoGameboardContainer.appendChild(playerTwoGameboardHeader);

// make a 10x10 grid in gameboard for placing ships
// for player 1 (real)
// input: gameboard 2d array and the node to render under
function renderGameBoard(gameboard, node) {
    const SIZE = 10;
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            const cell = document.createElement("div");
            cell.classList.toggle("cell");
            node.appendChild(cell);

            // different color if that particular cell of gameboard has ship
            if (gameboard[i][j]) {
                cell.style.backgroundColor = "black";
            }
        }
    }
}

function renderBoards() {
    // remove the previous render of the gameboards
    const prevPlayerOneGameboard = playerOneGameboardContainer.querySelector(
        ".player-one-gameboard",
    );
    if (prevPlayerOneGameboard) {
        playerOneGameboardContainer.removeChild(prevPlayerOneGameboard);
    }

    const prevPlayerTwoGameboard = playerTwoGameboardContainer.querySelector(
        ".player-two-gameboard",
    );
    if (prevPlayerTwoGameboard) {
        playerTwoGameboardContainer.removeChild(prevPlayerTwoGameboard);
    }

    // add new renders
    const playerOneGameboard = document.createElement("div");
    playerOneGameboard.classList.toggle("player-one-gameboard");
    playerOneGameboard.classList.toggle("gameboard");
    playerOneGameboardContainer.appendChild(playerOneGameboard);

    const playerTwoGameboard = document.createElement("div");
    playerTwoGameboard.classList.toggle("player-two-gameboard");
    playerTwoGameboard.classList.toggle("gameboard");
    playerTwoGameboardContainer.appendChild(playerTwoGameboard);

    // render real player's gameboard under the playerOneGameboard node
    renderGameBoard(players.real.gameboard.gameboard, playerOneGameboard);

    renderGameBoard(players.computer.gameboard.gameboard, playerTwoGameboard);
}

container.appendChild(gameboardContainer);

renderBoards();

export default {
    renderBoards,
};
