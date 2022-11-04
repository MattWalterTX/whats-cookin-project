import './styles.css';
import apiCalls from './apiCalls';
import gatherData from './apiCalls';
import './images/turing-logo.png';
import Ingredient from './classes/Ingredient.js';
import Recipe from './classes/Recipe.js';
import RecipeRepository from './classes/RecipeRepository.js';
import User from './classes/User.js';

// Declare variables for linked methods compatibility
let usersData;
let ingredientsData;
let recipeData;
let currentUser;
let newRecipeRepo;
let recipeCards;

function makeAllHidden() {
  recipeGrid.classList.toggle('hidden');
}

// Declare function to instantiate all of our data to dashboard on load/ refresh.
function instantiateData() {
  Promise.all([
    gatherData('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users'),
    gatherData('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients'),
    gatherData('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes')
  ]).then(data => {
      usersData = data[0].usersData;
      ingredientsData = data[1].ingredientsData;
      recipeData = data[2].recipeData;
      loadUser();
  })
}


// Query Selectors
const allRecipesGrid = document.querySelector('#all-card-grid');
const favoriteRecipesGrid = document.querySelector('#fave-card-grid');
const greeting = document.querySelector('#greeting');
const homeView = document.querySelector('.home-view');
const savedRecipesView = document.querySelector('.save-view');
const singleRecipe = document.querySelector('.single-recipe');
const favoritesNavButton = document.querySelector('#saved-button')
const savedRecipesGrid = document.querySelector('.save-view');
const pantryView = document.querySelector('.pantry-view');
const mainSearchBar = document.querySelector('.main-search-bar');
const favoritedSearchBar = document.querySelector('.favorited-search-bar')
const favoriteButton = document.querySelector('.favorite-button');
const homeButton = document.querySelector('#buttonOfHome');
const pantryButton = document.querySelector('#pantry-button');
const pantryList = document.querySelector('#pantry-list');

// Event Listeners
window.addEventListener('load', instantiateData());
allRecipesGrid.addEventListener('click', showRecipe);
favoriteRecipesGrid.addEventListener('click', showRecipe);
mainSearchBar.addEventListener('keyup', filterRecipe);
favoritedSearchBar.addEventListener('keyup', searchFavoritedRecipes)
favoritesNavButton.addEventListener('click', viewFavoriteRecipes)
favoriteButton.addEventListener('click', addToFavorites);
homeButton.addEventListener('click', showAllRecipes);
pantryButton.addEventListener('click', showPantry);


// Functions
function loadUser() {
  currentUser = new User(
    usersData[Math.floor(Math.random() * usersData.length)]
  );
  recipeCards = recipeData.map(recipe => {
    const newCard = new Recipe (recipe);
    return newCard
  });
  newRecipeRepo = new RecipeRepository (recipeCards);
  renderUser(currentUser);
  renderAllRecipes(recipeCards);
  renderPantry()
  // console.log(currentUser) // DONT FORGET TO REMOVE
}

function renderUser(user) {
  greeting.innerHTML = '';
  greeting.innerHTML = `<h1 class="personalized-greeting"> Welcome to What\'s Cookin\',<br>${user.name}!</h1>`;
}

function renderAllRecipes(data) {
  allRecipesGrid.innerHTML = '';
  allRecipesGrid.innerHTML = 
    data.map(recipe => `<li class="recipe-card">
      <h3 class="" id="recipe-title">${recipe.name}</h3>
      <img class="recipe-image-all" id="${recipe.id}" src="${recipe.image}">
      <h3 class="recipe-tags-all">
        ${recipe.tags}
      </h3>
    </li>`).join('');
}

function renderFavoriteRecipes(data) {
  favoriteRecipesGrid.innerHTML = '';
  favoriteRecipesGrid.innerHTML = 
    data.map(recipe => `<li class="recipe-card">
    <h3 class="" id="recipe-title">${recipe.name}</h3>
    <img class="recipe-image-all" id="${recipe.id}" src="${recipe.image}">
    <h3 class="recipe-tags-all">
      ${recipe.tags}
    </h3>
  </li>`).join('');
}

function renderPantry() {
  const render = currentUser.pantry.map(ing => {
    let newIng = ingredientsData.find(i => i.id === ing.ingredient);
    let recMatch = recipeData.find(recipe => recipe.ingredients.find(z => z.id === ing.ingredient));
    let newUnit = recMatch.ingredients.find(ingred => ingred.id === ing.ingredient)
    // console.log('newUnit: ', newUnit);

    const newObj = {
      name: (newIng && newIng.name) || "Undefined",
      amount: ing.amount,
      units: newUnit.quantity.unit
    }
    return `<ul>${newObj.name} ${newObj.amount} ${newObj.units}</ul>`
  });
  pantryList.innerHTML = '';
  pantryList.innerHTML = 
    `${render.join('')}`
}

function filterRecipe() {
  const recipeSearch = mainSearchBar.value;
  const filteredRecipes = newRecipeRepo.filterByName(recipeSearch);
  renderAllRecipes(filteredRecipes);
}

function searchFavoritedRecipes() {
  const recipeSearch = favoritedSearchBar.value;
  const filteredRecipes = currentUser.filterByName(recipeSearch);
  renderFavoriteRecipes(filteredRecipes)
}

function showRecipe(event) {
  homeView.classList.add('hidden');
  savedRecipesView.classList.add('hidden');
  singleRecipe.classList.remove('hidden');
  window.scrollTo(0, 0);

  const recipe = newRecipeRepo.recipes.find(recipe => {
    return recipe.id === parseInt(event.target.id)
  });
  const ingredients = recipe.ingredients.map(ing => {
    const foundIng = ingredientsData.find(i => i.id === ing.id);
    return `<li>${foundIng.name}: ${ing.quantity.amount} ${ing.quantity.unit}</li>`
  });
  const instructions = recipe.instructions.map(inst => {
    return `<li>${inst.instruction}</li>`
  });

  singleRecipe.innerHTML = '';
  singleRecipe.innerHTML = 
    `<img src="${recipe.image}"></img>
    <h2 class="single-recipe-name">${recipe.name}</h2>
    <button class="favorite-button" id="${recipe.id}">Add to Favorites</button>
    <section class="single-recipe-contents">
      <section>
        <div>Ingredients List</div>
        ${ingredients.join('')}
        <div>Total Cost</div>
        ${recipe.returnIngredientCost(ingredientsData)}
        <br>
        <button class="cook-button" id="${recipe.id}">Let's Cook!</button>
      </section>
      <section> 
        <div>Instructions</div>
        <ol>${instructions.join('')}</ol>
      </section>
    </section>`;
  const favoriteButton = document.querySelector('.favorite-button');
  favoriteButton.addEventListener('click', addToFavorites);
}

function addToFavorites(event) {
  let favoritedRecipe = newRecipeRepo.recipes.find(recipe => {
    if (recipe.id === parseInt(event.target.id)) {
      return recipe
    }
  })
  if(!currentUser.recipesToCook.includes(favoritedRecipe)) {
    currentUser.addToCookList(favoritedRecipe)
  }
//  console.log(currentUser)
}

function viewFavoriteRecipes() {
  greeting.classList.add('hidden');
  homeView.classList.add('hidden');
  mainSearchBar.classList.add('hidden');
  singleRecipe.classList.add('hidden');
  pantryView.classList.add('hidden');
  savedRecipesView.classList.remove('hidden');
  favoritedSearchBar.classList.remove('hidden');
  renderFavoriteRecipes(currentUser.recipesToCook)
}

// As a user, I should be able to filter recipes by a tag. (Extension option: by multiple tags)
// render page view/ unhide form of grid containing all recipe card objects WITH SELECTED TAG for All Recipes Page display (may as well reuse code for render?)
// invoke with searchbar handler? Maybe easier to set a static list of all tag names to use as preset 'filters'? probably not.
// invoke on recipe page with handler on click of tag name


// As a user, I should be able to search recipes by their name. (Extension option: by name or ingredients)
// searchbar should have a handler to search all recipes and filter by entered/ selected name OR tag

function showAllRecipes() {
  greeting.classList.remove('hidden');
  savedRecipesGrid.classList.add('hidden');
  singleRecipe.classList.add('hidden');
  pantryView.classList.add('hidden');
  greeting.classList.remove('hidden');
  homeView.classList.remove('hidden');
  mainSearchBar.classList.remove('hidden')
  favoritedSearchBar.classList.add('hidden');
  renderAllRecipes(recipeData);
}

function showPantry() {
  savedRecipesGrid.classList.add('hidden');
  singleRecipe.classList.add('hidden');
  homeView.classList.add('hidden');
  favoritedSearchBar.classList.add('hidden');
  mainSearchBar.classList.remove('hidden')
  pantryView.classList.remove('hidden');
  renderPantry()
}