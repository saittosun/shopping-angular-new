import { Ingredient } from '../../shared/ingredient.model';

import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('apples', 5),
    new Ingredient('tomato', 10)
  ]
};

export function shoppingListReducer(
  state = initialState,
  // tslint:disable-next-line:max-line-length
  // the first shopping list actions here is simply the alias I'm using here for our bundled import and you could name this differently, the .shopping list actions then refers to this union type I have down there which kind of combines add ingredient and add ingredients and now TypeScript knows that an action is either of these two types and therefore we get no error here.
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          action.payload
        ]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...action.payload
        ]
      };
    default:
      return state;
  }
}
