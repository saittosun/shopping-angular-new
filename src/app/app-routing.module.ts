import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes',
    loadChildren: () => import('./recipe/recipe.module').then(
      m => m.RecipeModule
  )},
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(
      m => m.ShoppingListModule
    )
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(
      m => m.AuthModule
    )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      // tslint:disable-next-line:max-line-length
      // you're telling Angular generally we're using lazy loading, so it will not put all that code into one bundle, it will split it as we saw it but it will preload the bundles as soon as possible, so when we are on the auth page, it will already preload recipes and shopping list so that these code bundles are already available when we need them. The advantage is that the initial download bundles still is kept small because there, that code is not included and therefore the initial loading phase is fast but then when the user is browsing the page and we have some idle time anyways, then we preload these additional code bundles to make sure that subsequent navigation requests are faster, so we're getting the best of both worlds, a fast initial load and thereafter, fast subsequent loads.
      {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
   RouterModule
  ]
})
export class AppRoutingModule { }
