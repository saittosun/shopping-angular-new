import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from './../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})

// tslint:disable-next-line:max-line-length
// A resolver is essentially some code that runs before a route is loaded to ensure that certain data the route depends on is there. resolve is a generic interface which means we need to define which type of data it will resolve in the end and in our case, that will be the recipe data, so an array of recipes.
export class RecipesResolverService implements Resolve<Recipe[]> {
  // we now need to inject our data storage service here because that is the service that will make the HTTP request.
  constructor(private dataStorageService: DataStorageService) {}

  // tslint:disable-next-line:max-line-length
  // resolve interface forces us to add a resolve method here which gets data about the route, the activated route snapshot and which gets the current routing state, which is of type router state snapshot. Now please note that I'm not subscribing here but I'm simply not subscribing here because the resolver, this Angular feature will subscribe for me to basically find out once the data is there.  now, we should have a valid resolver that loads the data before this page is loaded.
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.dataStorageService.fetchRecipes();
  }
}
