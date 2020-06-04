import {Actions, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Effect } from '@ngrx/effects';

import {environment} from '../../../environments/environment';
import * as AuthActions from './auth.actions';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  reqistered?: boolean;
}

// tslint:disable-next-line:max-line-length
// it will never be injected itself so it doesn't need to be provided but it needs @injectable so that things can be injected into this class and we are injecting actions and the HttpClient, otherwise we would get errors,
@Injectable()
export class AuthEffects {
  // tslint:disable-next-line:max-line-length
  // Once we did login, if we did succeed, I of course want to dispatch my login action so that the reducer can take over and create that user object. So therefore, we need to return a new action here at the end of our effects chain here and in addition, we also need to add a special decorator to this auth login property here to turn it into an effect @ngrx/effects is able to pick up later, that is the @effect decorator and effect simply is imported from @ngrx/effects. This is required for @ngrx/effects to pick up this property as an effect, so basically as an effect it wants to handle, it wants to subscribe to and so on. And the next step as I mentioned is of course then also that we return a new action here at the end and since we're in an observable chain, returning a new action simply means that we have to return a new observable.
  @Effect()
  // don't call subscribe here, @ngrx/effects will subscribe for you
  authLogin = this.actions$.pipe(
    // tslint:disable-next-line:max-line-length
    // ofType simply allows you to define a filter for which types of effects you want to continue in this observable pipe you're creating, in this observable stream here because you can have multiple effects by adding multiple properties to your class here and you can simply define different types of effects that you want to handle in each chain.
    // tslint:disable-next-line:max-line-length
    // this says is only continue in this observable chain if the action that we're reacting to here is of type login start, all other actions will not trigger this effect here, only login start will and you could add multiple actions here by the way if you want to run the same code for different actions.
    ofType(AuthActions.LOGIN_START),
    // tslint:disable-next-line:max-line-length
    // a switchMap which allows us, which is imported from rxjs/operators, which allows us to create a new observable by taking another observable's data. So here we get our auth data and we know since we're filtering for the login start action, that the type of this will be auth actions login start, now referring to the class. So this is our type of data and in switchMap, we now can return a new observable and the new observable I want to return here of course uses the Angular HTTP client to send our login request, so just what we previously did in the login function in our service.
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        environment.firebaseAPIKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      )
      // tslint:disable-next-line:max-line-length
      // We can call pipe on that inner observable too, previously we hadn't done this but now we need to do it here. This allows us to add operators on this inner observable, not on the overall observable chain
      .pipe(
        map(resData => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          return of(new AuthActions.Login({
            email: resData.email,
            userId: resData.localId,
            token: resData.idToken,
            expirationDate
          }));
        }),
        catchError(error => {
          // tslint:disable-next-line:max-line-length
          // most importantly and that is super important to understand, here we have to return a non-error observable so that our overall stream doesn't die and since switchMap returns the result of this inner observable stream as a new observable to the outer chain here, returning a non-error observable in catch error is crucial, so that this erroneous observable in here still yields a non-error observable which is picked up by switchMap which is then returned to this overall stream, to this overall observable chain.
          // Of which is simply a utility function for creating a new observable, a new observable without an error
          return of();
        })
      );
    })
  );

  constructor(private actions$: Actions,
              private http: HttpClient) {}
}
