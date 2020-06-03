import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState = {
  ingredients: [
    new Ingredient('apples', 5),
    new Ingredient('tomato', 10)
  ],
  // tslint:disable-next-line:max-line-length
  // we need more than just the ingredients because now for a shopping list to effectively update the different parts of our application that are involved here
  // tslint:disable-next-line:max-line-length
  // we don't need the types, we need values because this is an object we're creating, not a type definition. So the ingredient with which I start will be null and the number will be minus one, it's not zero because zero would already be a valid index, minus one is not.
  editedIngredient: null,
  editedIngredientIndex: -1
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
    case ShoppingListActions.UPDATE_INGREDIENT:
      // let's get that one ingredient that we want to edit.
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        // I'm copying the old ingredients properties to then overwrite them here
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        // tslint:disable-next-line:max-line-length
        // Filter will always return a new array, so it will automatically give us a copy and filter is a function built into Javascript that will take an array, run a certain function which you pass in as an argument on every element in the array and if your function which you pass into filter if that function returns true, then the element for which it's executing this will be part of the new array filter returns, otherwise it will not. I want to return true for every element where the index is not equal to the index we're looking for because if I return true, then the element will be kept, if I return false, it will be filtered out and I only want to filter out one element and that is the element with the index we're trying to delete.
        ingredients: state.ingredients.filter((ingredient, ingredietIndex) => {
          return ingredietIndex !== state.editedIngredientIndex;
        })
      };
      case ShoppingListActions.START_EDIT:
        return {
          ...state,
          editedIngredientIndex: action.payload,
          editedIngredient: {...state.ingredients[action.payload]}
        };
      case ShoppingListActions.STOP_EDIT:
        return {
          ...state,
          editedIngredient: null,
          editedIngredientIndex: -1
        };
    default:
      return state;
  }
}
