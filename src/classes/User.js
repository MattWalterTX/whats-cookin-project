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

    filterByTag = (tag) => {
        const filteredList = this.recipesToCook.filter(recipe => {
          let tags = Object.values(recipe.tags)
          if (tags.includes(tag.toLowerCase())) {
            return recipe
          }
        })
        return filteredList
      }

    filterByName = (name) => {
        const filteredList = this.recipesToCook.filter(recipe => {
          let lowerCaseRecipeName = recipe.name.toLowerCase()
          if(name !== ' ' && lowerCaseRecipeName.includes(name.toLowerCase())) {
            return recipe
          }
        })
        return filteredList
      }

    updatePantry(recipe) {
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

    addToPantry(recipe) {
        const pantryStatus = this.checkPantry(recipe)
        const forPostRequest = pantryStatus.filter(userIng => {
            if (userIng.stockStatus !== 'sufficient') {
                return userIng
            }
        })
        .map(userIng => {
                return {userID: this.id, ingredientID: userIng.id, ingredientModification: (userIng.recipeQ - userIng.pantryQ)}
        })
        return forPostRequest
    }

    removeFromPantry(recipe) {
        const pantryStatus = this.checkPantry(recipe)
        const forPostRequest = pantryStatus.filter(userIng => {
            if (userIng.stockStatus === 'sufficient') {
                return userIng
            }
        })
        .map(userIng => {
                return {userID: this.id, ingredientID: userIng.id, ingredientModification: (userIng.pantryQ - userIng.recipeQ)}
        })
        console.log(forPostRequest)
        return forPostRequest
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
                obj['unit'] = rIng.quantity.unit;
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
                        obj['unit'] = rIng.quantity.unit;
                        pantryStatus.push(obj);
                    }
                    if(pIng.ingredient === rIng.id && pIng.amount < rIng.quantity.amount) {
                        let obj = {};
                        obj['id'] = rIng.id;
                        obj['stockStatus'] = 'not enough';
                        obj['recipeQ'] = rIng.quantity.amount;
                        obj['pantryQ'] = pIng.amount;
                        obj['unit'] = rIng.quantity.unit;
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
        // console.log(pantry)
        const mathTotals = this.pantryMathing(pantry)
        // console.log(mathTotals)
        if (mathTotals.every(total => total >= 0)) {
            return true
        } else {
            return false
        }  
    }
    pantryMathing(data) {
        const totals = data.map(ingredient => {
            return ingredient.pantryQ - ingredient.recipeQ
        })
        return totals
    }
};

export default User