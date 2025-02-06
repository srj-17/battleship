import Ship from "../src/ship.js";

test("Ship is creating ships", () => {
    expect(typeof new Ship() === "object").toBeTruthy();
});
