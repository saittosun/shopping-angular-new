// import { Recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';
// import { RecipeService } from './../shared/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  // selectedRecipe: Recipe;
  constructor() { }

  ngOnInit(): void {
    // this.recipeService.recipeSelected.subscribe(
    //   (recipe: Recipe) => {
    //     this.selectedRecipe = recipe;
    //   }
    // )
  }

}
