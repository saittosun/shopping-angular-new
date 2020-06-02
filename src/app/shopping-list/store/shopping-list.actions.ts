import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';


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

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: {index: number, ingredient: Ingredient}) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;

  constructor(public payload: number) {}
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}

// tslint:disable-next-line:max-line-length
// it needs no payload because if we want to stop, I just want to reset the editedIngredient and the editedIngredientIndex to their initial values, so we don't need to change anything.
export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActions = AddIngredient |
                                  AddIngredients |
                                  UpdateIngredient |
                                  DeleteIngredient |
                                  StartEdit |
                                  StopEdit;
