import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import User from '../src/classes/User';
const userData = require('../src/data/users.js');
const repoData = require('../src/data/RecipeRepository-test-data.js');

describe('User', () => {
  let recipe1, recipe2, user1;

  beforeEach(() => {
      recipe1 = new Recipe(repoData.recipesList[0]);
      recipe2 = new Recipe(repoData.recipesList[1]);
      user1 = new User(userData.usersData[0]);
  }); 
  
  it('should be an object', () => {
    expect(user1).to.be.a('object');
  });

  it('should have a name', () => {
    expect(user1.name).to.equal('Saige O\'Kon');
  });

  it('should have an id', () => {
    expect(user1.id).to.equal(1);
  });

  it('should have an array of ingredients', () => {
    expect(user1.pantry).to.equal(userData.usersData[0].pantry);
  });

  it('should be able to hold recipes to cook', () => {
    expect(user1.recipesToCook).to.be.an('array');
  });

  beforeEach(() => {
    user1.addToCookList(recipe1);
    user1.addToCookList(recipe2);
  }); 

  it('should add a recipe to cook list', () => {
    expect(user1.recipesToCook).to.deep.equal([recipe1, recipe2]);
  });

  it('should filter by a given tag', () => {
    expect(user1.filterByTag('lunch')).to.deep.equal([recipe2]);
    expect(user1.filterByTag('snack')).to.deep.equal([recipe1]);
  });

  it('should return an empty array if the tag is not found', () => {
    expect(user1.filterByTag('cardboard')).to.deep.equal([]);
  });

  it('should filter by a given name', () => {
    expect(user1.filterByName("Maple")).to.deep.equal([recipe2]);
    expect(user1.filterByName("Cookie Cups")).to.deep.equal([recipe1]);
  });

  it('should return an empty array if the name is not found', () => {
    expect(user1.filterByName('My Gramma\'s Pot Roast')).to.deep.equal([]);
  });

  it('should be able to check the pantry for all needed ingredient quantities of a recipe to know if there are not enough', () => {
    expect(user1.checkPantry(recipe1)).to.deep.equal([
      { id: 20081, stockStatus: 'sufficient', recipeQ: 1.5, pantryQ: 5, unit: 'c' }, { id: 18372, stockStatus: 'sufficient', recipeQ: 0.5, pantryQ: 3, unit: 'tsp' }, { id: 1123, stockStatus: 'sufficient', recipeQ: 1, pantryQ: 8, unit: 'large' }, { id: 19335, stockStatus: 'sufficient', recipeQ: 0.5, pantryQ: 4, unit: 'c' },
      { id: 19206, stockStatus: 'not enough', recipeQ: 3, pantryQ: 2, unit: 'Tbsp' }, { id: 19334, stockStatus: 'empty', recipeQ: 0.5, pantryQ: 0, unit: 'c' }, { id: 2047, stockStatus: 'sufficient', recipeQ: 0.5, pantryQ: 6, unit: 'tsp' }, { id: 1012047, stockStatus: 'empty', recipeQ: 24, pantryQ: 0, unit: 'servings' },
      { id: 10019903, stockStatus: 'empty', recipeQ: 2, pantryQ: 0, unit: 'c' }, { id: 1145, stockStatus: 'sufficient', recipeQ: 0.5, pantryQ: 4, unit: 'c' }, { id: 2050, stockStatus: 'sufficient', recipeQ: 0.5, pantryQ: 4, unit: 'tsp' }
    ]);
  });

  it('should be able to check the pantry for all needed ingredient quantities of a recipe to know if there are enough', () => {
    user1.addToPantry(recipe1);
    expect(user1.checkPantry(recipe1)).to.deep.equal([
      { id: 20081, stockStatus: 'sufficient', recipeQ: 1.5, pantryQ: 5, unit: 'c' }, { id: 18372, stockStatus: 'sufficient', recipeQ: 0.5, pantryQ: 3, unit: 'tsp' }, { id: 1123, stockStatus: 'sufficient', recipeQ: 1, pantryQ: 8, unit: 'large' }, { id: 19335, stockStatus: 'sufficient', recipeQ: 0.5, pantryQ: 4, unit: 'c' },
      { id: 19206, stockStatus: 'sufficient', recipeQ: 3, pantryQ: 3, unit: 'Tbsp' }, { id: 19334, stockStatus: 'sufficient', recipeQ: 0.5, pantryQ: 0.5, unit: 'c' }, { id: 2047, stockStatus: 'sufficient', recipeQ: 0.5, pantryQ: 6, unit: 'tsp' }, { id: 1012047, stockStatus: 'sufficient', recipeQ: 24, pantryQ: 24, unit: 'servings' },
      { id: 10019903, stockStatus: 'sufficient', recipeQ: 2, pantryQ: 2, unit: 'c' }, { id: 1145, stockStatus: 'sufficient', recipeQ: 0.5, pantryQ: 4, unit: 'c' }, { id: 2050, stockStatus: 'sufficient', recipeQ: 0.5, pantryQ: 4, unit: 'tsp' }
    ]);
  });

  it('should be able to add missing ingredients to the pantry', () => {
    expect(user1.pantry).to.deep.equal(userData.usersData[0].pantry);
    user1.addToPantry(recipe1);
    expect(user1.pantry).to.deep.equal([
      { "amount": 4, "ingredient": 11297 }, { "amount": 10, "ingredient": 1082047 }, { "amount": 5, "ingredient": 20081 }, { "amount": 5, "ingredient": 11215 }, { "amount": 6, "ingredient": 2047 }, { "amount": 8, "ingredient": 1123 }, { "amount": 4, "ingredient": 11282 }, { "amount": 2, "ingredient": 6172 }, { "amount": 2, "ingredient": 2044 }, { "amount": 4, "ingredient": 2050 },
      { "amount": 3, "ingredient": 1032009 }, { "amount": 3, "ingredient": 5114 }, { "amount": 2, "ingredient": 1017 }, { "amount": 7, "ingredient": 18371 }, { "amount": 6, "ingredient": 1001 }, { "amount": 2, "ingredient": 99223 }, { "amount": 2, "ingredient": 1230 }, { "amount": 4, "ingredient": 9152 }, { "amount": 2, "ingredient": 10611282 }, { "amount": 2, "ingredient": 93607 }, 
      { "amount": 4, "ingredient": 14106 }, { "amount": 4, "ingredient": 1077 }, { "amount": 2, "ingredient": 6150 }, { "amount": 2, "ingredient": 1124 }, { "amount": 4, "ingredient": 10011693 }, { "amount": 2, "ingredient": 1102047 }, { "amount": 3, "ingredient": 19206 }, { "amount": 4, "ingredient": 1145 }, { "amount": 4, "ingredient": 1002030 }, { "amount": 2, "ingredient": 12061 },
      { "amount": 4, "ingredient": 19335 }, { "amount": 3, "ingredient": 15152 }, { "amount": 2, "ingredient": 9003 }, { "amount": 3, "ingredient": 18372 }, { "amount": 2, "ingredient": 2027 }, { "amount": 0.5, "ingredient": 19334 }, { "amount": 24, "ingredient": 1012047 },{ "amount": 2, "ingredient": 10019903 }
    ]);
  });

  it('should not add the needed ingredients more than once', ()=> {
    user1.addToPantry(recipe1);
    expect(user1.pantry).to.deep.equal([
      { "amount": 4, "ingredient": 11297 }, { "amount": 10, "ingredient": 1082047 }, { "amount": 5, "ingredient": 20081 }, { "amount": 5, "ingredient": 11215 }, { "amount": 6, "ingredient": 2047 }, { "amount": 8, "ingredient": 1123 }, { "amount": 4, "ingredient": 11282 }, { "amount": 2, "ingredient": 6172 }, { "amount": 2, "ingredient": 2044 }, { "amount": 4, "ingredient": 2050 },
      { "amount": 3, "ingredient": 1032009 }, { "amount": 3, "ingredient": 5114 }, { "amount": 2, "ingredient": 1017 }, { "amount": 7, "ingredient": 18371 }, { "amount": 6, "ingredient": 1001 }, { "amount": 2, "ingredient": 99223 }, { "amount": 2, "ingredient": 1230 }, { "amount": 4, "ingredient": 9152 }, { "amount": 2, "ingredient": 10611282 }, { "amount": 2, "ingredient": 93607 }, 
      { "amount": 4, "ingredient": 14106 }, { "amount": 4, "ingredient": 1077 }, { "amount": 2, "ingredient": 6150 }, { "amount": 2, "ingredient": 1124 }, { "amount": 4, "ingredient": 10011693 }, { "amount": 2, "ingredient": 1102047 }, { "amount": 3, "ingredient": 19206 }, { "amount": 4, "ingredient": 1145 }, { "amount": 4, "ingredient": 1002030 }, { "amount": 2, "ingredient": 12061 },
      { "amount": 4, "ingredient": 19335 }, { "amount": 3, "ingredient": 15152 }, { "amount": 2, "ingredient": 9003 }, { "amount": 3, "ingredient": 18372 }, { "amount": 2, "ingredient": 2027 }, { "amount": 0.5, "ingredient": 19334 }, { "amount": 24, "ingredient": 1012047 },{ "amount": 2, "ingredient": 10019903 }
    ]);
  });

  it('should be able to remove the needed ingredients of a recipe', () => {
    expect(user1.pantry).to.deep.equal([
      { "amount": 4, "ingredient": 11297 }, { "amount": 10, "ingredient": 1082047 }, { "amount": 5, "ingredient": 20081 }, { "amount": 5, "ingredient": 11215 }, { "amount": 6, "ingredient": 2047 }, { "amount": 8, "ingredient": 1123 }, { "amount": 4, "ingredient": 11282 }, { "amount": 2, "ingredient": 6172 }, { "amount": 2, "ingredient": 2044 }, { "amount": 4, "ingredient": 2050 },
      { "amount": 3, "ingredient": 1032009 }, { "amount": 3, "ingredient": 5114 }, { "amount": 2, "ingredient": 1017 }, { "amount": 7, "ingredient": 18371 }, { "amount": 6, "ingredient": 1001 }, { "amount": 2, "ingredient": 99223 }, { "amount": 2, "ingredient": 1230 }, { "amount": 4, "ingredient": 9152 }, { "amount": 2, "ingredient": 10611282 }, { "amount": 2, "ingredient": 93607 }, 
      { "amount": 4, "ingredient": 14106 }, { "amount": 4, "ingredient": 1077 }, { "amount": 2, "ingredient": 6150 }, { "amount": 2, "ingredient": 1124 }, { "amount": 4, "ingredient": 10011693 }, { "amount": 2, "ingredient": 1102047 }, { "amount": 3, "ingredient": 19206 }, { "amount": 4, "ingredient": 1145 }, { "amount": 4, "ingredient": 1002030 }, { "amount": 2, "ingredient": 12061 },
      { "amount": 4, "ingredient": 19335 }, { "amount": 3, "ingredient": 15152 }, { "amount": 2, "ingredient": 9003 }, { "amount": 3, "ingredient": 18372 }, { "amount": 2, "ingredient": 2027 }, { "amount": 0.5, "ingredient": 19334 }, { "amount": 24, "ingredient": 1012047 },{ "amount": 2, "ingredient": 10019903 }
    ]);
    user1.removeFromPantry(recipe1);
    expect(user1.pantry).to.deep.equal(userData.usersData[0].pantry);
  });

  it('should not remove ingredients if there are not enough in the pantry', () => {
    user1.removeFromPantry(recipe1);
    expect(user1.pantry).to.deep.equal(userData.usersData[0].pantry);
  });

  it('should not be able to cook a recipe if there are enough ingredients', () => {
    expect(user1.cookRecipe(recipe1)).to.equal(false);
  });

  it('should be able to cook a recipe if there are enough ingredients', () => {
    user1.addToPantry(recipe1);
    expect(user1.cookRecipe(recipe1)).to.equal(true);
  });

  it('should be able to determine the difference in ingredient amounts between the recipe and pantry', () => {
    let pantry = user1.checkPantry(recipe1);
    expect(user1.pantryMathing(pantry)).to.deep.equal([ 0.5, 1.5, 5, 2.5, 0, 0, 4.5, 0, 0, 2.5, 2.5 ]);
    pantry = user1.checkPantry(recipe2);
    expect(user1.pantryMathing(pantry)).to.deep.equal([ -1.5,  0, -1, -1, 4, -1, -0.25, -1, -24, -2, -1, -1 ]);
  });

});