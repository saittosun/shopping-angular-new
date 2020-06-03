// tslint:disable-next-line:max-line-length
// depending on the type which we have, we return a new state and that is how a reducer function always works, data in data out, no asynchronous code, it's all synchronous, so we only have synchronous code in here and we always return a new object which will be used to replace the old state for this part of the application, so for the shopping list here and this return state is what NgRx will in the end register for the shopping list slice of the overall AppState, of the App store it manages here. So this is what we added, we added this reducer and regarding the actions, we also added an actions file where we for one defined unique identifiers for all our actions, these are simply strings that identify each action and then the action itself is not just this identifier but it's a complete object based on classes we define in here. Each action needs to have a type property where we do store the string identifier for the action but in addition, we might also have a payload, so a property which can be set to attach data to that action and we needed that for example for adding an ingredient, though we also have an action, the delete action which has no extra data because it doesn't need any. Now this entire setup was really a lot of work, we have to be honest there, adding the reducer, adding the actions, injecting the store, dispatching actions, that is a lot of overhead work and using the normal shopping list service definitely was easier there and therefore using a service with subjects is a more than fine alternative to using NgRx. So it's mainly that initial setup that requires a lot of work, once that is set up it's actually quite fast to work with NgRx.
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
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
