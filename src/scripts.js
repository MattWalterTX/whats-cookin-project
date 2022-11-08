//IMPORTS
import './styles.css';
import './images/turing-logo.png';
import Recipe from './classes/Recipe.js';
import RecipeRepository from './classes/RecipeRepository.js';
import User from './classes/User.js';

//GLOBAL VARIABLES
let usersData;
let ingredientsData;
let recipeData;
let currentUser;
let newRecipeRepo;
let recipeCards;
let currentRecipe;
let pantryUpdateArea;

//API CALLS
let gatherData = (url) => {
  return fetch(url)
    .then(response => response.json())
    .catch(err => console.log(err))
};

function instantiateData() {
  Promise.all([
    gatherData('http://localhost:3001/api/v1/users'),
    gatherData('http://localhost:3001/api/v1/ingredients'),
    gatherData('http://localhost:3001/api/v1/recipes')
  ]).then(data => {
      usersData = data[0];
      ingredientsData = data[1];
      recipeData = data[2];
      loadUser();
  });
};

function addToUserData(data) {
  const num = data.recipeQ - data.pantryQ;
  fetch('http://localhost:3001/api/v1/users', {
    method: 'POST',
    body: JSON.stringify({
      userID: currentUser.id,
      ingredientID: data.id,
      ingredientModification: num
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .catch(err => console.log(err));
};

function subtractFromUserData(data) {
  const num = -data.recipeQ;
  fetch('http://localhost:3001/api/v1/users', {
    method: 'POST',
    body: JSON.stringify({
      userID: currentUser.id,
      ingredientID: data.id,
      ingredientModification: num
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .catch(err => console.log(err));
};

//QUERY SELECTORS
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

//GLOBAL EVENT LISTENERS
window.addEventListener('load', instantiateData);
mainSearchBar.addEventListener('keyup', filterRecipe);
favoritedSearchBar.addEventListener('keyup', searchFavoritedRecipes)
favoritesNavButton.addEventListener('click', viewFavoriteRecipes)
favoriteButton.addEventListener('click', addToFavorites);
homeButton.addEventListener('click', showAllRecipes);
pantryButton.addEventListener('click', showPantry);

//FUNCTIONS
function loadUser() {
  currentUser = new User(
  usersData[Math.floor(Math.random() * usersData.length)]
  );
  recipeCards = recipeData.map(recipe => {
    const newCard = new Recipe (recipe);
    return newCard;
  });
  newRecipeRepo = new RecipeRepository (recipeCards);
  renderUser(currentUser);
  renderAllRecipes(recipeCards);
  renderPantry();
};

function renderUser(user) {
  greeting.innerHTML = '';
  greeting.innerHTML = `<h1 class="personalized-greeting"> Welcome to What\'s Cookin\',<br>${user.name}!</h1>`;
};

function renderAllRecipes(data) {
  allRecipesGrid.innerHTML = '';
  allRecipesGrid.innerHTML = 
    data.map(recipe => `<li class="recipe-card">
      <h3 class="recipe-title-all" id="recipe-title">${recipe.name}</h3>
      <button class="image-button" id="${recipe.id}"><img class="recipe-image-all" id="${recipe.id}" src="${recipe.image}" alt="${recipe.name}"></button>
      <h3 class="recipe-tags-all">
        ${recipe.tags}
      </h3>
    </li>`).join('');
  const imageButton = document.querySelectorAll('.image-button');
  imageButton.forEach(image => {
    image.addEventListener('click', showRecipe);
  });
};

function renderFavoriteRecipes(data) {
  favoriteRecipesGrid.innerHTML = '';
  favoriteRecipesGrid.innerHTML = 
    data.map(recipe => `<li class="recipe-card">
    <div class="title-container">
      <h3 class="recipe-title-favorited" id="recipe-title">${recipe.name}</h3>
    </div>
    <button class="image-button" id="${recipe.id}"><img class="recipe-image-all" id="${recipe.id}" src="${recipe.image}"></button>
    <div class="tag-container">
      <h3 class="recipe-tags-all">
          ${recipe.tags}
      </h3>
    </div>
    <button class="remove-button" id="${recipe.id}">Remove from Favorites</button>
  </li>`).join('');
  const imageButton = document.querySelectorAll('.image-button');
  const removeFromFavoritesButton = document.querySelectorAll('.remove-button');
  imageButton.forEach(image => {
    image.addEventListener('click', showRecipe);
  });
  removeFromFavoritesButton.forEach(button => {
    button.addEventListener('click', removeFromFavorites);
  });
};

function removeFromFavorites(event) {
  let recipeToRemove = currentUser.recipesToCook.findIndex(recipe => {
    return recipe.id === parseInt(event.target.id);
  });
  currentUser.recipesToCook.splice(recipeToRemove, 1);
  renderFavoriteRecipes(currentUser.recipesToCook);
};

function renderPantry() {
  const render = currentUser.pantry.map(ing => {
    let newIng = ingredientsData.find(i => i.id === ing.ingredient);
    let recMatch = recipeData.find(recipe => recipe.ingredients.find(z => z.id === ing.ingredient));
    let newUnit = recMatch.ingredients.find(ingred => ingred.id === ing.ingredient);

    const newObj = {
      name: (newIng && newIng.name) || "Undefined",
      amount: ing.amount,
      units: newUnit.quantity.unit
    };
    if(newObj.amount !== 0) {
      return `<ul>${newObj.name}: ${newObj.amount} ${newObj.units}</ul>`;
    }
  });
  pantryList.innerHTML = '';
  pantryList.innerHTML = 
    `${render.join('')}`
};

function filterRecipe() {
  const recipeSearch = mainSearchBar.value;
  let filteredRecipesByName = newRecipeRepo.filterByName(recipeSearch);
  let filteredRecipesByNameAndTag = filteredRecipesByName.concat(newRecipeRepo.filterByTag(recipeSearch));
  renderAllRecipes(filteredRecipesByNameAndTag);
}

function searchFavoritedRecipes() {
  const recipeSearch = favoritedSearchBar.value;
  let filteredRecipesByName = currentUser.filterByName(recipeSearch);
  let filteredRecipesByNameAndTag = filteredRecipesByName.concat(currentUser.filterByTag(recipeSearch));
  renderFavoriteRecipes(filteredRecipesByNameAndTag);
}

function showRecipe(event) {
  homeView.classList.add('hidden');
  savedRecipesView.classList.add('hidden');
  singleRecipe.classList.remove('hidden');
  window.scrollTo(0, 0);

  const recipe = newRecipeRepo.recipes.find(recipe => {
    return recipe.id === parseInt(event.target.id);
  });

  currentRecipe = newRecipeRepo.recipes.find(recipe => {
    return recipe.id === parseInt(event.target.id);
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
    `<div class="top-section-container">
    <img class="single-recipe-image" src="${recipe.image}" alt="${recipe.name}"></img>
      <div class="top-right-mini-container">
        <button class="cook-button" id="${recipe.id}">Let's Cook!</button>
        <button class="add-missing-button" id="${recipe.id}">Add Missing Ingredients to Pantry!</button>
        <div class="pantry-update-area">
        </div>
      </div>
    </div>
    <h2 class="single-recipe-name">${recipe.name}</h2>
    <button class="favorite-button" id="${recipe.id}">Add to Favorites</button>
    <section class="single-recipe-contents">
      <section>
        <div>Ingredients List</div>
        ${ingredients.join('')}
        <div>Total Cost</div>
        $${recipe.returnIngredientCost(ingredientsData)}
        <br>
      </section>
      <section> 
        <div>Instructions</div>
        <ol>${instructions.join('')}</ol>
      </section>
    </section>`;
  const favoriteButton = document.querySelector('.favorite-button');
  const cookButton = document.querySelector('.cook-button');
  const addIngsButton = document.querySelector('.add-missing-button');
  pantryUpdateArea = document.querySelector('.pantry-update-area');
  favoriteButton.addEventListener('click', addToFavorites);
  cookButton.addEventListener('click', letsCook);
  addIngsButton.addEventListener('click', addIngredients);
};

function addToFavorites(event) {
  let favoritedRecipe = newRecipeRepo.recipes.find(recipe => {
    if (recipe.id === parseInt(event.target.id)) {
      return recipe;
    };
  });
  if (!currentUser.recipesToCook.includes(favoritedRecipe)) {
    currentUser.addToCookList(favoritedRecipe);
  };
};

function letsCook() {
  const pantryStatus = currentUser.checkPantry(currentRecipe);
  const insufficientArray = pantryStatus.filter(obj => obj.stockStatus === 'not enough' || obj.stockStatus === 'empty');
  if(insufficientArray.length === 0) {
    currentUser.removeFromPantry(currentRecipe);
    pantryStatus.forEach(ing => {
      subtractFromUserData(ing)
    });
    pantryUpdateArea.innerHTML = '';
    pantryUpdateArea.innerHTML = `<h3 class="pantry-update-info">Recipe cooked! Ingredients have been removed from your pantry.</h3>`;
  }
  else {
    pantryUpdateArea.innerHTML = '';
    pantryUpdateArea.innerHTML = `<h3 class="pantry-update-info">${displayMissingIngredients(pantryStatus)}</h3>`;
  };
};

function displayMissingIngredients(pantryStatus) {
  const missingIngs = [];
  pantryStatus.forEach(obj => {
    const correctIng = ingredientsData.find(ing => ing.id === obj.id);
    if(obj.stockStatus === 'not enough' || obj.stockStatus === 'empty') {
      missingIngs.push(` ${(obj.recipeQ - obj.pantryQ)} ${obj.unit} of ${correctIng.name}`);
    };
  });
    missingIngs[missingIngs.length - 1] = ` and ${missingIngs[missingIngs.length - 1]}`;
    return `You are missing: ${missingIngs}. Add them to your pantry to cook the recipe!`;
};

function addIngredients() {
  const pantryStatus = currentUser.checkPantry(currentRecipe);
  const insufficientArray = pantryStatus.filter(obj => obj.stockStatus === 'not enough' || obj.stockStatus === 'empty');
  if(insufficientArray.length === 0) {
    pantryUpdateArea.innerHTML = '';
    pantryUpdateArea.innerHTML = `<h3 class="pantry-update-info">There is nothing to add; you have all the required ingredients!</h3>`;
  }
  else {
    currentUser.addToPantry(currentRecipe)
    insufficientArray.forEach(ing => {
      addToUserData(ing)
    });

    pantryUpdateArea.innerHTML = '';
    pantryUpdateArea.innerHTML = `<h3 class="pantry-update-info">Ingredients added!</h3>`;
  };
};

function viewFavoriteRecipes() {
  greeting.classList.add('hidden');
  homeView.classList.add('hidden');
  mainSearchBar.classList.add('hidden');
  singleRecipe.classList.add('hidden');
  pantryView.classList.add('hidden');
  savedRecipesView.classList.remove('hidden');
  favoritedSearchBar.classList.remove('hidden');
  renderFavoriteRecipes(currentUser.recipesToCook);
};

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
};

function showPantry() {
  savedRecipesGrid.classList.add('hidden');
  singleRecipe.classList.add('hidden');
  homeView.classList.add('hidden');
  favoritedSearchBar.classList.add('hidden');
  mainSearchBar.classList.remove('hidden')
  pantryView.classList.remove('hidden');
  renderPantry();
};
