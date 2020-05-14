import * as Option from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

test("An Option is either something or nothing!", () => {
  const something: Option.Option<string> = Option.some("boo");
  const nothing: Option.Option<string> = Option.none;

  const upperCase = (x: Option.Option<string>) => {
    // TODO Implement using Option.isSome or Option.isNone
  };

  expect(upperCase(something)).toBe("BOO");
  expect(upperCase(nothing)).toBe("Nothing");
});

test("Instead of unwrapping the Option to work on the value, use Option.map to apply a function if there is something!", () => {
  const something = Option.some("boo");
  const upperCase = Option.map(undefined); // Implement me!

  expect(upperCase(something)).toStrictEqual(Option.some("BOO"));
  expect(upperCase(Option.none)).toStrictEqual(Option.none); // If there is nothing you'll get back nothing!
});

test("Options make working nullables much safer by forcing you to handle the none case", () => {
  const aDangerousLookupFunction = (k: string) => (data: object) => data[k];
  const welcomeUser = (x: string) => `Welcome ${x}!`;

  const registerUser = (data) =>
    pipe(data, aDangerousLookupFunction("username"), welcomeUser);

  expect(registerUser({ username: "Charles" })).toBe("Welcome Charles!");
  expect(registerUser({})).toBe("Error!");
});
