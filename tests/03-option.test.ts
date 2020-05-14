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

test("Use these helper methods to easily create Options", () => {
  // Fill in the assertions!
  expect(Option.fromNullable(null)).toStrictEqual(undefined); 
  expect(Option.fromNullable(undefined)).toStrictEqual(undefined); 
  expect(Option.fromNullable("thing")).toStrictEqual(undefined); 

  const validator = Option.fromPredicate((x:string) => x.length > 3)
  expect(validator("valid")).toStrictEqual(undefined); 
  expect(validator("err")).toStrictEqual(undefined); 

  const throwIfInvalid = (s:string) => { if(s.length <= 3) { throw new Error("Error!") } else { return s } }
  expect(Option.tryCatch(() => throwIfInvalid("valid"))).toStrictEqual(undefined) 
  expect(Option.tryCatch(() => throwIfInvalid("err"))).toStrictEqual(undefined) 
})

test("Options make working nullables much safer by forcing you to handle the none case", () => {
  const aDangerousLookupFunction = (k: string) => (data: object) => data[k];
  const welcomeUser = (x: string) => `Welcome ${x}!`;

  const registerUser = (data) =>
    pipe(data, aDangerousLookupFunction("username"), welcomeUser);

  expect(registerUser({ username: "Charles" })).toBe("Welcome Charles!");
  expect(registerUser({})).toBe("Error!");
});


test("Refactor and fix this unsafe and buggy code with Options and pipes!", () => {
  const dodgyUserApi = {
    charlie: "{ posts : 20 }",
    stephen: "{ 'posts' : 0 }",
  };
  // Refactor the following two functions
  const getNumberOfUsersPosts = (username: string) => {
    let userDataJson = dodgyUserApi[username];
    if (!userDataJson) {
      try {
        let userData = JSON.parse(userDataJson);
        return userData["posts"]
      } catch (e) {
        return null
      }
    } else {
      return null
    }
  };
  const displayNumberOfUsersPosts = (username:string) => {
    let numberOfUsersPosts = getNumberOfUsersPosts(username)
    if(!numberOfUsersPosts){
      return `Error getting number of user ${username}'s posts`
    } else {
      return `${username} has ${numberOfUsersPosts} posts`
    }
  }

  // Fix the bug exposed by this failing test
  expect(displayNumberOfUsersPosts("stephen")).toBe("stephen has 0 posts")

  expect(displayNumberOfUsersPosts("unknown")).toBe("Error getting number of user unknown's posts")
  expect(displayNumberOfUsersPosts("charlie")).toBe("Error getting number of user charlie's posts")
});
