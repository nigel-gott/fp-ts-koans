import { pipe } from "fp-ts/lib/pipeable";
import { flow } from "fp-ts/lib/function";

test("pipe sends the first argument through the following pipeline of functions!", () => {
  const multiplyBy = (x:number) => (y:number) => x * y
  const add = (x:number) => (y:number) => x + y

  const usingPipe = (x:number) => undefined; 
  const usingFlow = (x:number) => flow(multiplyBy(10), add(5))(x); 

  expect(usingPipe(2)).toBe(usingFlow(2));
});