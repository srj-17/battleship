let recentlyAttackedCoordinate = null;
let recentlyHit = false;

function recordCoordinate(coordinate) {
    recentlyAttackedCoordinate = coordinate;
}

function recordHit() {
    recentlyHit = true;
}

function clearHit() {
    recentlyHit = false;
}

function getAttackCoordinates() {
    if (recentlyHit) {
        const [recentlyAttackedX, recentlyAttackedY] =
            recentlyAttackedCoordinate;
        const neighbors = [
            [recentlyAttackedX, recentlyAttackedY + 1],
            [recentlyAttackedX, recentlyAttackedY - 1],
            [recentlyAttackedX + 1, recentlyAttackedY],
            [recentlyAttackedX - 1, recentlyAttackedY],
        ];

        // select a random neighbor
        const coordinateToAttack =
            neighbors[Math.floor(Math.random() * neighbors.length)];
        return coordinateToAttack;
    } else {
        return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    }
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

    recordCoordinate(randomCoordinate);
    console.log(recentlyHit, randomCoordinate);

    // receiveAttack returns true if the attack hits the ship
    const hitsShip = player.gameboard.receiveAttack(randomCoordinate);

    if (hitsShip) recordHit();
    else clearHit();
}

export { attack };
