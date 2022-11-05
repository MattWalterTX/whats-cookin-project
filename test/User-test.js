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
});