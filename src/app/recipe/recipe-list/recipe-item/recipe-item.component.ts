import { Recipe } from './../../recipe.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // @input allows us to bind this component property from outside
  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelected() {
    this.recipeSelected.emit();
  }


}
