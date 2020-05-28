import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  reqistered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line:max-line-length
  // now with that, the idea of course is that we emit a new user, we next a new user, whenever we have one we login or also when we logout, when we clear the user, when the user becomes invalid or the token expired.
  // Subject will inform all places in the application about when our user changes.
  // tslint:disable-next-line:max-line-length
  // it behaves just like the other subject, which means we can call next, to emit a value and we can subscribe to it to be informed about new values. The difference is that behavior subject also gives subscribers immediate access to the previously emitted value even if they haven't subscribed at the point of time that value was emitted. That means we can get access to be currently active user even if we only subscribe after that user has been emitted. So this means when we fetch data and we need that token at this point of time, even if the user logged in before that point of time which will have been the case, we get access to that latest user. Now therefore behavior subject also needs to be initialized with a starting value, which in my case will be null here, it has to be a user object and null is a valid replacement because I don't want to start off with a user.
  user = new BehaviorSubject<User>(null);


  constructor(private http: HttpClient,
              private router: Router) { }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  //  it should send the request to that sign up url therefore we will need the httpclient to be injected.
  signup(email: string, password: string) {
    // tslint:disable-next-line:max-line-length
    // This interface we just generated between these angled brackets so that we inform typescript that this post request will yield as a response in which body we find data in this format.
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpbMNSaO0FaHu31J5JBul6256nHi1jWHA',
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        // tslint:disable-next-line:max-line-length
        // tap was an operator that allows us to perform some action without changing the response. So it steps into that observable chain but it doesn't stop it, block it or change it, it just run some code with the data you get back from the observable, so with the response in this case.
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDpbMNSaO0FaHu31J5JBul6256nHi1jWHA',
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    // tslint:disable-next-line:max-line-length
    // this is the timestamp in milliseconds, here therefore we need to multiply the seconds with 1000 to convert this to milliseconds as well and this gives us the expiration date in milliseconds and by wrapping this with new date as I'm doing it, this will convert it back to a date object which is a concrete timestamp in a date object form and not in milliseconds anymore. So this is the expiration date which we now can pass as a fourth argument here to that user constructor, here it is.
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    // so to set this or emit this as our now currently logged in user in this application.
    this.user.next(user);
    // tslint:disable-next-line:max-line-length
    // this allows you to write an item to the local storage and to store data there. userData is basically the key by which you will be able to retrieve it later and then you have to write some data to that key, you can store some data there. Now the data I want to store there should just be that user object because that contains all the data I want to save. we have to convert it to a string. We can do that with the JSON object and the stringify method, that is built into Javascript and it simply serializes a Javascript object, it converts a Javascript object to a string version of it so to say, so to text and that text is getting stored in the local storage.
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
  }
}
