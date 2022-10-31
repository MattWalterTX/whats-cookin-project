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
      currentUser = new User(
        usersData[Math.floor(Math.random() * usersData.length)]
      );
      recipeCards = recipeData.map(recipe => {
        const newCard = new Recipe (recipe);
        return newCard
      });
      newRecipeRepo = new RecipeRepository (recipeCards);
      loadUser();
  })
}

// Query Selectors
const allRecipesGrid = document.querySelector('#all-card-grid');
const greeting = document.querySelector('#greeting');
const homeView = document.querySelector('.home-view');
const singleRecipe = document.querySelector('.single-recipe');
const savedRecipesGrid = document.querySelector('.save-view');
const searchBar = document.querySelector('.search-bar');
const favoriteRecipes = document.querySelector('#fave-card-grid');
const favoriteButton = document.querySelector('#favorite-button');


// Event Listeners
window.addEventListener('load', instantiateData());
allRecipesGrid.addEventListener('click', showRecipe);
searchBar.addEventListener('keyup', filterRecipe);
favoriteButton.addEventListener('click', addToFavorites);


// Functions
function loadUser() {
  renderUser(currentUser);
  // renderIngredientsData();
  renderAllRecipes(recipeCards);
}

function renderUser(user) {
  greeting.innerHTML = '';
  greeting.innerHTML = `<h1 class="personalized-greeting"> Welcome to What\'s Cookin\',<br>${user.name}!</h1>`;
}

function renderAllRecipes(data) {
  allRecipesGrid.innerHTML = '';
  allRecipesGrid.innerHTML = 
    data.map(recipe => `<li class="recipe-card">
      <h3> class="" id="recipe-title">${recipe.name}</h3>
      <img id="${recipe.id}" src="${recipe.image}">
      <div class="">
        ${recipe.tags}
      </div>
    </li>`).join('');
}

function filterRecipe() {

  const recipeSearch = searchBar.value;
  const filteredRecipes = newRecipeRepo.filterByName(recipeSearch);
  renderAllRecipes(filteredRecipes);
}

function showRecipe(event) {
  greeting.classList.add('hidden');
  homeView.classList.add('hidden');
  savedRecipesGrid.classList.add('hidden');
  singleRecipe.classList.remove('hidden');

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

  singleRecipe.innerHTML = 
    `<img src="${recipe.image}"></img>
    <h2 class="single-recipe-name">${recipe.name}</h2>
    <button id="${recipe.id}">Add to Favorites</button>
    <section class="single-recipe-contents">
      <section>
        <div>Ingredients List</div>
        ${ingredients.join('')}
      </section>
      <section> 
        <div>Instructions</div>
        <ol>${instructions.join('')}</ol>
      </section>
    </section>`;
}

function addToFavorites() {

}


// As a user, I should be able to filter recipes by a tag. (Extension option: by multiple tags)
// render page view/ unhide form of grid containing all recipe card objects WITH SELECTED TAG for All Recipes Page display (may as well reuse code for render?)
// invoke with searchbar handler? Maybe easier to set a static list of all tag names to use as preset 'filters'? probably not.
// invoke on recipe page with handler on click of tag name


// As a user, I should be able to search recipes by their name. (Extension option: by name or ingredients)
// searchbar should have a handler to search all recipes and filter by entered/ selected name OR tag
