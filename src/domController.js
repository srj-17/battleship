import { changeTurn, getTurn } from "./driver.js";
import { playerOne, playerTwo, playerOneId, playerTwoId } from "./driver.js";
import { attack as computerAttack } from "./driver.js";
import { getWinner } from "./driver.js";

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
// input: gameboard object and the node to render under
function renderGameBoard(playerId, gameboard, node) {
    const SIZE = 10;
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            const cell = document.createElement("div");
            cell.classList.toggle("cell");
            node.appendChild(cell);

            // maybe redundant
            cell.classList.remove("occupied");
            cell.classList.remove("hit");

            // only if the gameboard is not occupied at (i, j),
            // gameboard[i][j] will be false,
            if (gameboard.gameboard[i][j]) cell.classList.toggle("occupied");

            // if the cell is hit, trackboard[i][j] is true
            if (gameboard.trackingGrid[i][j]) cell.classList.toggle("hit");

            cell.addEventListener("click", () => {
                if (getTurn() !== playerId && !gameboard.trackingGrid[i][j]) {
                    gameboard.receiveAttack([i, j]);
                    changeTurn();
                    renderWinner();
                }
            });
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
    renderGameBoard(playerOneId, playerOne.gameboard, playerOneGameboard);

    renderGameBoard(playerTwoId, playerTwo.gameboard, playerTwoGameboard);

    // add the turn class to gameboard who's current turn it is
    if (getTurn() === playerOneId) {
        playerTwoGameboard.classList.add("turn-to-receive-attack");
        playerOneGameboard.classList.remove("turn-to-receive-attack");
    } else {
        playerOneGameboard.classList.add("turn-to-receive-attack");
        playerTwoGameboard.classList.remove("turn-to-receive-attack");
    }
}

// show whose turn it is
const turnContainer = document.createElement("div");
turnContainer.classList.toggle("turn-container");
turnContainer.textContent = `Turn: Player-${getTurn()}`;
container.appendChild(turnContainer);

function changeTurnRender() {
    turnContainer.textContent = `Turn: Player-${getTurn()}`;
}

const winnerContainerDialog = document.createElement("dialog");
winnerContainerDialog.classList.toggle("winner-container-dialog");
body.appendChild(winnerContainerDialog);
const winnerContainer = document.createElement("div");
winnerContainer.classList.toggle("winner-container");
winnerContainerDialog.appendChild(winnerContainer);
const winnerText = document.createElement("div");
winnerText.classList.toggle("winner-text");
winnerContainer.appendChild(winnerText);
const buttonsContainer = document.createElement("div");
buttonsContainer.classList.toggle("dialog-buttons");
winnerContainer.appendChild(buttonsContainer);
const playAgainButton = document.createElement("button");
playAgainButton.classList.toggle("play-again-button");
playAgainButton.textContent = "Play Again";
const playAgainButtonContainer = document.createElement("div");
playAgainButtonContainer.classList.toggle("play-again-button-container");
playAgainButtonContainer.appendChild(playAgainButton);
buttonsContainer.appendChild(playAgainButtonContainer);

// show winner
function renderWinner() {
    const winnerId = getWinner();
    if (winnerId) {
        winnerText.textContent = `Winner: Player-${winnerId}`;
        winnerContainerDialog.showModal();
    }
}

container.appendChild(gameboardContainer);

// event listeners
gameboardContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("cell")) {
        renderBoards();
        changeTurnRender();
    }

    // computer makes a move immediately after the human move
    // playerTwo = computer
    // playerOne = real
    // when player two gets attacked, it attacks player one
    if (
        event.target.closest(".player-two-gameboard") &&
        event.target.classList.contains("cell") &&
        !event.target.classList.contains("hit")
    ) {
        computerAttack(playerOne);
        changeTurn();
        changeTurnRender();
        renderBoards();
        renderWinner();
    }
});

export default {
    renderBoards,
};
