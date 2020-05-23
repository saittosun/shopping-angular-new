// tslint:disable-next-line:max-line-length
// the idea here is that this model stores all the core data that makes up a user and even helps us with validating whether that token is still valid because remember, I said that the token would expire after one hour and we'll need to therefore also find out not only if a token exists but if it is still valid and I want to manage this in this model.

// tslint:disable-next-line:max-line-length
// Now why underscore and why private? Private because the token should not be retrievable like this, instead when the user or you as a developer want to get access to the token, you should actually be required to do that in a way that will automatically check the validity and this can be achieved by adding a getter here with the get keyword which I'll name token now.
export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  // tslint:disable-next-line:max-line-length
  // A getter here looks like a function, we add parentheses and then a function body but you actually access it like a property, so you will be able to do something like user.token. This is how you will be able to access this because it's a getter, it's a special type of property you could say, it's a property where you can write code that runs when you try to access this property, so it's property plus plus you could say. A getter also means that the user can't overwrite this, so setting user token to something new, this will throw an error because it's only a getter not a setter.
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
