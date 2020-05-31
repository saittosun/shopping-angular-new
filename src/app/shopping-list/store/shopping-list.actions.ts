import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredien.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

// this (Action) interface being implemented into add ingredient now forces us to structure the add ingredient class in a certain way. To be precise, we need to have a type property in the add ingredient class and that type is the identifier of this action.
export class AddIngredient implements Action {
  // that is a TypeScript feature which indicates to TypeScript that this must never be changed from outside
  readonly type = ADD_INGREDIENT;
  payload: Ingredient;
}
