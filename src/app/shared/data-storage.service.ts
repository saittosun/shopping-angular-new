import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from './recipe.service';
import { Recipe } from '../recipe/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipes() {
    //  this retrieves our list of recipes which are now temporarily stored in that constant.
    const recipes = this.recipeService.getRecipes();
    // tslint:disable-next-line:max-line-length
    // we can send a put request to a specific URL to overwrite all the data that is stored under that node. put request, just like a post request, needs data to work, we need to tell Angular what to put on this URL so to say or what to attach to this request and that will be our recipes here of course. this alone will not send the HTTP request, instead that request will only be sent as soon as we subscribe.
    // tslint:disable-next-line:max-line-length
    // we got two routes we could take here, we can return our observable here by adding the return keyword and then we can subscribe in the component where we're calling store recipes. Now in our case here, that will be the header component because that is where our buttons are and in the end, I'm not interested in subscribing in that component because I don't want to show a loading spinner, though of course you could do that but here I just don't want to and therefore, there is no need for me to subscribe in the component because the component in this scenario will not be interested in whether that request is done or not.
    this.http
      .put(
        'https://angular-maxi-shopping.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  // tslint:disable-next-line:max-line-length
  // just as before, the question is, where do we want to subscribe? And the answer is, where are we interested in the response? Are we interested in the header component? Well not really in my opinion. What would we do with the recipes here, we're not using the recipes in the header? So I'm not really caring about the recipes here and hence there is no strong reason to subscribe here. Instead, it would be fine to just subscribe in the data storage service where we already inject the recipes service because maybe we can do something with the recipes service then to push or to move our fetched recipes into that recipes service which in the end is the place where we do manage our recipes.
  fetchRecipes() {
    // tslint:disable-next-line:max-line-length
    // I only want to take one value from that observable and thereafter, it should automatically unsubscribe. So this manages the subscription for me, gives me the latest user and unsubscribes and I'm not getting future users because I just want to get them on demand when fetch recipes is called, so whenever this code executes. I don't want to set up an ongoing subscription which gives me users at a point of time I don't need them anymore.
    // tslint:disable-next-line:max-line-length
    // It waits for the first observable, for the user observable to complete which will happen after we took the latest user. Thereafter, it gives us that user, so in exhaustMap we pass in a function, there we get the data from that previous observable and now we return a new observable in there which will then replace our previous observable in that entire observable chain.
    return this.http
      .get<Recipe[]>(
        'https://angular-maxi-shopping.firebaseio.com/recipes.json',
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        // tslint:disable-next-line:max-line-length
        // The tap operator allows us to execute some code here in place without altering the data that is funneled through that observable. So in here, we will get our recipes array indeed and I will simply set the recipes in a service then as before but now I will not subscribe here anymore but instead, return this call to this HTTP service and that means that in the header component, we now have to subscribe here and you don't even have to pass in a function if you're not caring about the response anyways.
        tap(recipes => {
          // console.log(recipes);
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
