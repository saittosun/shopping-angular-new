export class Ingredient {

  // tslint:disable-next-line:max-line-length
  // it will automatically give us properties with the names we specify here as argument names, so name and amount in this case and it will automatically assign the values we receive in this constructor to these newly created properties.
  constructor(public name: string, public amount: number) { }
}