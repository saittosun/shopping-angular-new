import { Ingredient } from './../shared/ingredient.model';

export class Recipe {
 public name: string;
 public description: string;
 public imagePath: string;
 public ingredients: Ingredient[];

  // tslint:disable-next-line:max-line-length
  // I'll also add a constructor to it so that we can instantiate this with the new keyword and pass the arguments right to the constructor, constructor is simply a built-in function every class has and which will be executed once you create a new instance of this class
  constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
