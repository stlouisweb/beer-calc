/* eslint-env jest */

const brewCalc = require("../");

describe("brewCalc", () => {
  it("should return argument", () => {
    expect(brewCalc.SRM("test")).toBe("test");
  });
});
