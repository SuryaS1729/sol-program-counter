import { expect, test } from "bun:test";

test("account is initialized", () => {
  expect(sum(1, 2)).toBe(3);
});

function sum(a: number, b: number) {
  return a + b;
}
