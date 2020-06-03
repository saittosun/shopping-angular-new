import {Actions, ofType} from '@ngrx/effects';

import * as AuthActions from './auth.actions';

export class AuthEffects {
  // don't call subscribe here, @ngrx/effects will subscribe for you
  authLogin = this.actions$.pipe(
    // tslint:disable-next-line:max-line-length
    // ofType simply allows you to define a filter for which types of effects you want to continue in this observable pipe you're creating, in this observable stream here because you can have multiple effects by adding multiple properties to your class here and you can simply define different types of effects that you want to handle in each chain.
    // tslint:disable-next-line:max-line-length
    // this says is only continue in this observable chain if the action that we're reacting to here is of type login start, all other actions will not trigger this effect here, only login start will and you could add multiple actions here by the way if you want to run the same code for different actions.
    ofType(AuthActions.LOGIN_START)
  );

  constructor(private actions$: Actions) {}
}
