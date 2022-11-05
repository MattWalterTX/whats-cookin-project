import Ingredient from "./Ingredient";
//import { modifyUserData } from '../scripts';


class User {
    constructor(user) {
        this.name = user.name;
        this.id = user.id;
        this.pantry = user.pantry || [];
        this.recipesToCook = [];
    };

    addToCookList(recipe) {
        this.recipesToCook.push(recipe);
    };

    filterByTag(tag) {
        return this.recipesToCook.filter(recipe => recipe.tags.includes(tag));
    };

    filterByName = (name) => {
        const filteredList = this.recipesToCook.filter(recipe => {
          let lowerCaseRecipeName = recipe.name.toLowerCase()
          if(name !== ' ' && lowerCaseRecipeName.includes(name.toLowerCase())) {
            return recipe
          }
        })
        console.log(filteredList)
        return filteredList
      }

    addToPantry(recipe) {
        const pantryStatus = this.checkPantry(recipe);
        return pantryStatus.forEach(objIng => {
            if(objIng.stockStatus === 'not enough') {
            return this.pantry.forEach(userIng => {
                if(userIng.ingredient === objIng.id) {
                    userIng.amount += (objIng.recipeQ - objIng.pantryQ);
                    };
                });
            };
            if(objIng.stockStatus === 'empty') {
                let obj = {};
                obj['ingredient'] = objIng.id;
                obj['amount'] = objIng.recipeQ;
                this.pantry.push(obj);
            };
        });
    };

    checkPantry(recipe) {
        let pantryStatus = [];
        let pantryIdsArray = this.pantry.reduce((acc, ing) => {
            acc.push(ing.ingredient);
            return acc;
        }, []);

        //console.log(pantryIdsArray)

        recipe.ingredients.forEach(rIng => {
            if(!pantryIdsArray.includes(rIng.id)) {
                let obj = {};
                obj['id'] = rIng.id;
                obj['stockStatus'] = 'empty';
                obj['recipeQ'] = rIng.quantity.amount;
                obj['pantryQ'] = 0;
                pantryStatus.push(obj);
                }
            return this.pantry.forEach(pIng => {
                if(pantryIdsArray.includes(rIng.id)) {
                    if(pIng.ingredient === rIng.id && pIng.amount >= rIng.quantity.amount) {
                        let obj = {};
                        obj['id'] = rIng.id;
                        obj['stockStatus'] = 'sufficient';
                        obj['recipeQ'] = rIng.quantity.amount;
                        obj['pantryQ'] = pIng.amount;
                        pantryStatus.push(obj);
                    }
                    if(pIng.ingredient === rIng.id && pIng.amount < rIng.quantity.amount) {
                        let obj = {};
                        obj['id'] = rIng.id;
                        obj['stockStatus'] = 'not enough';
                        obj['recipeQ'] = rIng.quantity.amount;
                        obj['pantryQ'] = pIng.amount;
                        pantryStatus.push(obj);
                    };
                } ;
            });
        });
        //console.log(pantryStatus);
        return pantryStatus;
    };
    cookRecipe(recipe) {
        const pantry = this.checkPantry(recipe)
        console.log(pantry)
        const mathTotals = this.pantryMathing(pantry)
        console.log(mathTotals)
        if (mathTotals.every(total => total >= 0)) {
            console.log('Cooking!')
        } else {
            console.log('booooo')
        }
        // if good cook it
       
    }
    pantryMathing(data) {
        const totals = data.map(ingredient => {
            return ingredient.pantryQ - ingredient.recipeQ
        })
        return totals
    }
};

export default User