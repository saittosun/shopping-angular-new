import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

// tslint:disable-next-line:max-line-length
// this (Action) interface being implemented into add ingredient now forces us to structure the add ingredient class in a certain way. To be precise, we need to have a type property in the add ingredient class and that type is the identifier of this action.
export class AddIngredient implements Action {
  // that is a TypeScript feature which indicates to TypeScript that this must never be changed from outside
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export type ShoppingListActions = AddIngredient | AddIngredients;
