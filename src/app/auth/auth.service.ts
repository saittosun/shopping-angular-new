import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';

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
  user = new Subject<User>();

  constructor(private http: HttpClient) { }

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
