import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';

describe('Recipe', () => {
    let recipe1;
    const recipeData = [
        {
          "id": 595736,
          "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
          "ingredients": [
            {
              "id": 20081,
              "quantity": {
                "amount": 1.5,
                "unit": "c"
              }
            },
            {
              "id": 18372,
              "quantity": {
                "amount": 0.5,
                "unit": "tsp"
              }
            },
            {
              "id": 1123,
              "quantity": {
                "amount": 1,
                "unit": "large"
              }
            },
            {
              "id": 19335,
              "quantity": {
                "amount": 0.5,
                "unit": "c"
              }
            },
            {
              "id": 19206,
              "quantity": {
                "amount": 3,
                "unit": "Tbsp"
              }
            },
            {
              "id": 19334,
              "quantity": {
                "amount": 0.5,
                "unit": "c"
              }
            },
            {
              "id": 2047,
              "quantity": {
                "amount": 0.5,
                "unit": "tsp"
              }
            },
            {
              "id": 1012047,
              "quantity": {
                "amount": 24,
                "unit": "servings"
              }
            },
            {
              "id": 10019903,
              "quantity": {
                "amount": 2,
                "unit": "c"
              }
            },
            {
              "id": 1145,
              "quantity": {
                "amount": 0.5,
                "unit": "c"
              }
            },
            {
              "id": 2050,
              "quantity": {
                "amount": 0.5,
                "unit": "tsp"
              }
            }
          ],
          "instructions": [
            {
              "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
              "number": 1
            },
            {
              "instruction": "Add egg and vanilla and mix until combined.",
              "number": 2
            },
            {
              "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
              "number": 3
            },
            {
              "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
              "number": 4
            },
            {
              "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
              "number": 5
            },
            {
              "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
              "number": 6
            }
          ],
          "name": "Loaded Chocolate Chip Pudding Cookie Cups",
          "tags": [
            "antipasti",
            "starter",
            "snack",
            "appetizer",
            "antipasto",
            "hor d'oeuvre"
          ]
        },
        {
          "id": 678353,
          "image": "https://spoonacular.com/recipeImages/678353-556x370.jpg",
          "ingredients": [
            {
              "id": 1009016,
              "quantity": {
                "amount": 1.5,
                "unit": "cups"
              }
            },
            {
              "id": 9003,
              "quantity": {
                "amount": 2,
                "unit": ""
              }
            },
            {
              "id": 20027,
              "quantity": {
                "amount": 1,
                "unit": "tablespoon"
              }
            },
            {
              "id": 1002046,
              "quantity": {
                "amount": 1,
                "unit": "tablespoon"
              }
            },
            {
              "id": 11215,
              "quantity": {
                "amount": 1,
                "unit": "clove"
              }
            },
            {
              "id": 1012046,
              "quantity": {
                "amount": 1,
                "unit": "tablespoon"
              }
            },
            {
              "id": 19911,
              "quantity": {
                "amount": 0.25,
                "unit": "cup"
              }
            },
            {
              "id": 16112,
              "quantity": {
                "amount": 1,
                "unit": "tablespoon"
              }
            },
            {
              "id": 10010062,
              "quantity": {
                "amount": 24,
                "unit": "ounce"
              }
            },
            {
              "id": 1102047,
              "quantity": {
                "amount": 4,
                "unit": "servings"
              }
            },
            {
              "id": 16124,
              "quantity": {
                "amount": 1,
                "unit": "tablespoon"
              }
            },
            {
              "id": 1016168,
              "quantity": {
                "amount": 1,
                "unit": "tablespoon"
              }
            }
          ],
          "instructions": [
            {
              "instruction": "Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!",
              "number": 1
            }
          ],
          "name": "Maple Dijon Apple Cider Grilled Pork Chops",
          "tags": [
            "lunch",
            "main course",
            "main dish",
            "dinner"
          ]
        }
    ];
    const steps = [
        'Step 1: In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.',
        'Step 2: Add egg and vanilla and mix until combined.',
        'Step 3: Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.',
        'Step 4: Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.',
        'Step 5: Bake for 9 to 10 minutes, or until you see the edges start to brown.',
        'Step 6: Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.'
      ];
    const ingredientSample = [
        {
            "id": 20081,
            "name": "wheat flour",
            "estimatedCostInCents": 142
          },
          {
            "id": 18372,
            "name": "bicarbonate of soda",
            "estimatedCostInCents": 582
          },
          {
            "id": 1123,
            "name": "eggs",
            "estimatedCostInCents": 472
          },
          {
            "id": 19335,
            "name": "sucrose",
            "estimatedCostInCents": 902
          },
          {
            "id": 19206,
            "name": "instant vanilla pudding",
            "estimatedCostInCents": 660
          },
          {
            "id": 19334,
            "name": "brown sugar",
            "estimatedCostInCents": 559
          },
          {
            "id": 2047,
            "name": "salt",
            "estimatedCostInCents": 280
          },
          {
            "id": 1012047,
            "name": "fine sea salt",
            "estimatedCostInCents": 528
          },
          {
            "id": 10019903,
            "name": "semi sweet chips",
            "estimatedCostInCents": 253
          },
          {
            "id": 1145,
            "name": "unsalted butter",
            "estimatedCostInCents": 617
          },
          {
            "id": 2050,
            "name": "vanilla",
            "estimatedCostInCents": 926
          },
    ];
    const expectedNames = [
        'wheat flour',
        'bicarbonate of soda',
        'eggs',
        'sucrose',
        'instant vanilla pudding',
        'brown sugar',
        'salt',
        'fine sea salt',
        'semi sweet chips',
        'unsalted butter',
        'vanilla'
      ];
    beforeEach(() => {
        recipe1 = new Recipe(recipeData[0]);
    });

    it('should be a function', () => {
      expect(Recipe).to.be.a('function');
    });
  
    it('should be an instance of Recipe', () => {
      expect(recipe1).to.be.an.instanceof(Recipe);
    }); 

    it('should store the recipe id from the data', () => {
      expect(recipe1.id).to.equal(recipeData[0].id);
    }); 

    it('should store the recipe image from the data', () => {
      expect(recipe1.image).to.equal(recipeData[0].image);
    }); 

    it('should store recipe ingredients from the data', () => {
      expect(recipe1.ingredients).to.equal(recipeData[0].ingredients);
    }); 

    it('should store recipe instructions from the data', () => {
      expect(recipe1.instructions).to.equal(recipeData[0].instructions);
    }); 

    it('should store the recipe name from the data', () => {
      expect(recipe1.name).to.equal(recipeData[0].name);
    }); 

    it('should store recipe tags from the data', () => {
        expect(recipe1.tags).to.equal(recipeData[0].tags);
    });

    it('should return ingredient names', () => {
        expect(recipe1.returnIngredientNames(ingredientSample)).to.deep.equal(expectedNames);
    });

    it('should return total ingredient cost', () => {
        expect(recipe1.returnIngredientCost(ingredientSample)).to.equal('177.76');
    });

    it('should return the instructions', () => {
        expect(recipe1.returnInstructions()).to.deep.equal(steps);
    });

});