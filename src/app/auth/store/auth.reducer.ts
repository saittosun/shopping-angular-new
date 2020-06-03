import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
}

const initialState = {
  user: null
};

export function authReducer(
  state = initialState,
  // tslint:disable-next-line:max-line-length
  // Now this double name might be confusing but again, the first part here is just this container name of all the things that are exported by the file and then with a dot we accessed the different exported things, like our string identifiers or this auth actions union type.
  action: AuthActions.AuthActions) {
  console.log(state);
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}
