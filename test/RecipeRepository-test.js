import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
const data = require('../src/data/RecipeRepository-test-data.js');

describe('RecipeRepository', () => {
  let recipesList, recipeRepo;

  beforeEach(() => {
    recipesList = data.recipesList;
    recipeRepo = new RecipeRepository(recipesList);
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('Should be able to store recipes', () => {
    expect(recipeRepo.recipes).to.be.an('array');
  });

  it('should store all available recipes that were passed into the constructor', () => {
    expect(recipeRepo.recipes.length).to.equal(4);
  });

  it('Should be able to filter recipes by tag', () => {
    expect(recipeRepo.filterByTag('side dish')).to.deep.equal([data.recipesList[2], data.recipesList[3]]);
    expect(recipeRepo.filterByTag('snack')).to.deep.equal([recipesList[0]]);
  });

  it('should return an empty array if the tag is not found', () => {
    expect(recipeRepo.filterByTag('cardboard')).to.deep.equal([]);
  });

  it('Should be able to filter recipes by name', () => {
    expect(recipeRepo.filterByName('sauce')).to.deep.equal([recipesList[2]]);
    expect(recipeRepo.filterByName('pork chop')).to.deep.equal([recipesList[1]]);
  });

  it('should return an empty array if the name is not found', () => {
    expect(recipeRepo.filterByName('My Gramma\'s Pot Roast')).to.deep.equal([]);
  });

  it('Should not be case-sensitive when filtering recipes by name', () => {
    expect(recipeRepo.filterByName('SaUCe')).to.deep.equal([recipesList[2]]);
    expect(recipeRepo.filterByName('PORK chop')).to.deep.equal([recipesList[1]]);
  });

  it('Should not return a recipe that does not exist', () => {
    expect(recipeRepo.filterByName('taco')).to.deep.equal([]);
    expect(recipeRepo.filterByName('lemon cake')).to.deep.equal([]);
  });

  it('Should not return any recipe if the search is blank', () => {
    expect(recipeRepo.filterByName(' ')).to.deep.equal([]);
  });

})