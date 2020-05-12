// Unused imports are hints!
import { flow } from "fp-ts/lib/function";

test("compose your functions with flow", () => {
  const addFive = (x) => x + 5;
  const addTen = (x) => x + 10;

  const addFiveAndTen = undefined;

  expect(addFiveAndTen(10)).toBe(25);
});

test("flow composes functions from left to right", () => {
  const len = (x) => x.length;
  const triple = (x) => x * 3;

  const tripleLength = undefined;

  expect(tripleLength("aaa")).toBe(9);
});

test("composing incompatible functions can be caught by the compiler if typed!", () => {
  const len = (c: string): number => c.length;
  const triple = (n: number): number => n * 3;

  let tripleLength;
  // Uncomment and check out the type error!
  // tripleLength = flow(triple, len);

  expect(tripleLength("aaa")).toBe(9);
});
