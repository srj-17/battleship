function getAttackCoordinates() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

// takes player object as input
function attack(player) {
    let randomCoordinate = null;

    while (true) {
        randomCoordinate = getAttackCoordinates();
        let [randomX, randomY] = randomCoordinate;

        // only continue with the random coordinate if the that coordinate
        // has not already been attacked in the given player's gameboard
        if (!player.gameboard.trackingGrid[randomX][randomY]) break;
    }

    player.gameboard.receiveAttack(randomCoordinate);
}

export default {
    attack,
    getAttackCoordinates,
};
