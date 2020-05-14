import { flow } from "fp-ts/lib/function";
import { lookup } from "fp-ts/lib/ReadonlyRecord";
import { pipe } from "fp-ts/lib/pipeable";

import * as Option from "fp-ts/lib/Option";

test("An Option is either something or nothing!", () => {
  const something = Option.some("thing");
  const nothing = Option.none;

  const operateOnAnOption = (x: Option.Option<string>) => {
    if (Option.isNone(x)) {
      return "The Option was empty...";
    } else {
      return `Found '${x.value}' inside the option!`;
    }
  };

  expect(operateOnAnOption(something)).toBe("Found 'thing' inside the option!");
  expect(operateOnAnOption(nothing)).toBe("The Option was empty...");
});

test("Instead of unwrapping the Option to work on the value, use Option.map to apply a function if there is something!", () => {
  const something = Option.some("boo");
  const upperCase = Option.map((x: string): string => x.toUpperCase());

  expect(upperCase(something)).toStrictEqual(Option.some("BOO"));
  expect(upperCase(Option.none)).toStrictEqual(Option.none); // If there is nothing you'll get back nothing!
});

test("Wrap dangerous null and undefined using Option's helper methods", () => {
  // Fill in the assertions!
  expect(Option.fromNullable(null)).toStrictEqual(Option.none); 
  expect(Option.fromNullable(undefined)).toStrictEqual(Option.none); 
  expect(Option.fromNullable("thing")).toStrictEqual(Option.some("thing")); 

  const validator = Option.fromPredicate((x:string) => x.length > 3)
  expect(validator("valid")).toStrictEqual(Option.some("valid")); 
  expect(validator("err")).toStrictEqual(Option.none); 
})

// test("use option to model a value which can be absent instead of null or undefined!", () => {
//   const curriedLookup = (x: string) => (y: Readonly<Record<string, unknown>>) => lookup(x, y);

//   const registerUser = (x: { username?: string; }) =>
//     pipe(
//       x,
//       curriedLookup("username"),
//       filter((t:string) => t.length > 3),
//       map((u) => `Welcome ${u}!`),
//       getOrElse(() => "Error!"),
//     );

//   expect(registerUser({ username: "Charlie" })).toBe("Welcome Charlie!");
//   expect(registerUser({ username: "xss" })).toBe("Error!");
//   expect(registerUser({})).toBe("Error!");
//   expect("I have refactored it!").toBe("I have refactored it!");
// });
