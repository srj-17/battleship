import { changeTurn, getTurn } from "./driver.js";
import { playerOne, playerTwo, playerOneId, playerTwoId } from "./driver.js";
import { attack as computerAttack } from "./driver.js";
import { getWinner } from "./driver.js";
import { isGameboardInitialized, initializeGameboard } from "./driver.js";
import { changeShipPlaceMents } from "./player.js";

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
playerOneGameboardHeader.classList.toggle("gameboard-header");
playerOneGameboardHeader.textContent = "Player 1";
playerOneGameboardContainer.appendChild(playerOneGameboardHeader);

const playerTwoGameboardContainer = document.createElement("div");
playerTwoGameboardContainer.classList.toggle("player-two-gameboard-container");
gameboardContainer.appendChild(playerTwoGameboardContainer);
const playerTwoGameboardHeader = document.createElement("div");
playerTwoGameboardHeader.classList.toggle("player-two-gameboard-header");
playerTwoGameboardHeader.classList.toggle("gameboard-header");
playerTwoGameboardHeader.textContent = "Player 2";
playerTwoGameboardContainer.appendChild(playerTwoGameboardHeader);

function renderCoordinates(nodes) {
    nodes.forEach((node) => {
        const hCoordinatesList = [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
        ];
        const horizontalCoordinates = document.createElement("div");
        horizontalCoordinates.classList.toggle("horizontal-coordinates");
        hCoordinatesList.forEach((coordinate) => {
            const hCoordinate = document.createElement("div");
            hCoordinate.classList.toggle("h-coordinate");
            hCoordinate.classList.toggle("coordinate");
            hCoordinate.textContent = `${coordinate}`;
            horizontalCoordinates.appendChild(hCoordinate);
        });

        const vCoordinatesList = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
        ];
        const verticalCoordinates = document.createElement("div");
        verticalCoordinates.classList.toggle("vertical-coordinates");
        vCoordinatesList.forEach((coordinate) => {
            const vCoordinate = document.createElement("div");
            vCoordinate.classList.toggle("v-coordinate");
            vCoordinate.classList.toggle("coordinate");
            vCoordinate.textContent = `${coordinate}`;
            verticalCoordinates.appendChild(vCoordinate);
        });

        node.appendChild(horizontalCoordinates);
        node.appendChild(verticalCoordinates);
    });
}

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

function renderStartBoard(node) {
    // remove everything under the node
    node.innerHTML = "";

    const configContainer = document.createElement("div");
    configContainer.classList.toggle("config-container");
    node.appendChild(configContainer);

    const configHeader = document.createElement("div");
    configHeader.classList.toggle("config-header");
    configHeader.textContent =
        "Hello! First let's configure your gameboard before starting.";
    configContainer.appendChild(configHeader);

    // button that cycles through different configurations for player 1
    const configToggler = document.createElement("div");
    configToggler.classList.toggle("config-toggler");
    configContainer.appendChild(configToggler);

    const leftConfig = document.createElement("div");
    leftConfig.classList.toggle("left-config");
    configToggler.appendChild(leftConfig);

    const leftConfigButton = document.createElement("button");
    leftConfigButton.classList.toggle("left-config-button");
    leftConfigButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>`;
    leftConfig.appendChild(leftConfigButton);

    const selectConfig = document.createElement("div");
    selectConfig.classList.toggle("select-config");
    configToggler.appendChild(selectConfig);

    const selectConfigButton = document.createElement("button");
    selectConfigButton.classList.toggle("select-config-button");
    selectConfigButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;
    selectConfig.appendChild(selectConfigButton);

    const rightConfig = document.createElement("div");
    rightConfig.classList.toggle("right-config");
    configToggler.appendChild(rightConfig);

    const rightConfigButton = document.createElement("button");
    rightConfigButton.classList.toggle("right-config-button");
    rightConfigButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>`;
    rightConfig.appendChild(rightConfigButton);

    // configure the buttons
    leftConfigButton.addEventListener("click", () => {
        changeShipPlaceMents(-1);
        renderBoards();
    });
    rightConfigButton.addEventListener("click", () => {
        changeShipPlaceMents(1);
        renderBoards();
    });
    selectConfigButton.addEventListener("click", () => {
        initializeGameboard();
        renderBoards();
    });
}

function renderBoards() {
    // remove the previous render of the gameboards and coordinates
    // for player one
    const playerOneHCoordinates = playerOneGameboardContainer.querySelector(
        ".horizontal-coordinates",
    );
    if (playerOneHCoordinates)
        playerOneGameboardContainer.removeChild(playerOneHCoordinates);

    const playerOneVCoordinates = playerOneGameboardContainer.querySelector(
        ".vertical-coordinates",
    );
    if (playerOneVCoordinates)
        playerOneGameboardContainer.removeChild(playerOneVCoordinates);

    const prevPlayerOneGameboard = playerOneGameboardContainer.querySelector(
        ".player-one-gameboard",
    );
    if (prevPlayerOneGameboard)
        playerOneGameboardContainer.removeChild(prevPlayerOneGameboard);

    // for player two
    const playerTwoHCoordinates = playerTwoGameboardContainer.querySelector(
        ".horizontal-coordinates",
    );

    if (playerTwoHCoordinates)
        playerTwoGameboardContainer.removeChild(playerTwoHCoordinates);

    const playerTwoVCoordinates = playerTwoGameboardContainer.querySelector(
        ".vertical-coordinates",
    );
    if (playerTwoVCoordinates)
        playerTwoGameboardContainer.removeChild(playerTwoVCoordinates);

    const prevPlayerTwoGameboard = playerTwoGameboardContainer.querySelector(
        ".player-two-gameboard",
    );
    if (prevPlayerTwoGameboard) {
        playerTwoGameboardContainer.removeChild(prevPlayerTwoGameboard);
    }

    const prevStartBoard =
        playerTwoGameboardContainer.querySelector(".config-container");
    if (prevStartBoard) {
        playerTwoGameboardContainer.removeChild(prevStartBoard);
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

    // render horizontal and vertical coordinates under the given list of nodes,
    // how they'll be placed will be determined by css
    renderCoordinates([
        playerOneGameboardContainer,
        playerTwoGameboardContainer,
    ]);

    // render real player's gameboard under the playerOneGameboard node
    renderGameBoard(playerOneId, playerOne.gameboard, playerOneGameboard);

    if (isGameboardInitialized(playerOne)) {
        renderGameBoard(playerTwoId, playerTwo.gameboard, playerTwoGameboard);
    } else {
        renderStartBoard(playerTwoGameboardContainer);
    }

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
