// Unused imports are hints!
import { flow } from "fp-ts/lib/function";

test("compose your functions with flow", () => {
  const addFive = (x) => x + 5;
  const addTen = (x) => x + 10;

  const addFiveAndTen = flow(addFive, addTen) 

  expect(addFiveAndTen(10)).toBe(25);
});

test("flow composes functions from left to right", () => {
  const len = (x) => x.length;
  const triple = (x) => x * 3;

  const tripleLength = flow(len, triple) 

  expect(tripleLength("aaa")).toBe(9);
});