import players from "../src/player.js";

test("there are 2 players, real and computer", () => {
    expect(Object.keys(players)).toHaveLength(2);
    expect(players.real).toBeDefined();
    expect(players.computer).toBeDefined();
});
