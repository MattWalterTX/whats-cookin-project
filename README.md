# What's Cookin'?!

## Abstract
  - What's Cookin'?! is an application interface that allows you to browse various recipes, view their instructions and ingredients, make a list to cook as well as use a simple pantry with inventory management.

## Technologies
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- ![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

## Features
- User is randomly generated each load and may look through the recipes
- User can inspect individual recipe details and add a recipe to a list to be cooked.
- User can serach all recipes by name or tag, or they can serach within their favorite list only.
- Ingredients of the user's pantry are displyed in their current state.
- If they have enough ingredients they may choose to cook that recipe, which will remove items from the pantry.
- A list of missing required ingredients for a recipe may be added to the pantry.
- Testing for colorblindness using [Colorblindly Chrome pluggin](https://chrome.google.com/webstore/detail/colorblindly/floniaahmccleoclneebhhmnjgdfijgg?hl=en)
- 96% passing score on lighthouse!

## Possible Future Extensions
- Add ARIA tags to recipe card items for better a11y practices.
- Expand the search option to include multiple tags and partial word detection.
- Integration of a 3rd party library to allow reordering of our list of recipes.

### Learning Goals
- Implement ES6 classes that communicate to each other as needed
- Use object and array prototype methods to perform data manipulation
- Create a user interface that is easy to use and clearly displays information
- Write modular, reusable code that follows SRP (Single Responsibility Principle)
- Implement a robust testing suite using TDD
- Make network requests to retrieve data


### Visual Demo

![Brief features gif](https://media.giphy.com/media/tOOQInCof3O0BDwTAq/giphy.gif)

### Set Up
1. Clone the repo
   ```sh
   git clone git@github.com:MattWalterTX/whats-cookin-project.git
   ```
2. Install NPM packages and start server
   ```sh
   npm install
   npm start
   ``` 
3. Clone the API from the repo 
   ```sh
   git clone git@github.com:turingschool-examples/whats-cookin-api.git
   ```
4. CD into the API directory and start the local server
   ```sh
   npm install
   npm start
   ```
5. Enter the following url in your browser: http://localhost:8080/
6. Explore the website

## Sources
  - [MDN](http://developer.mozilla.org/en-US/)
  - [YouTube](https://www.youtube.com/)

## Contributors
  - [Matt Walter](https://github.com/MattWalterTX)
  - [Dana Truong](https://github.com/tramtram1130)
  - [Evan Swanson](https://github.com/EvanSSwanson)

## Project Specs
  - The project spec & rubric can be found [here](https://frontend.turing.edu/projects/whats-cookin-part-one.html) for part one and [here](https://frontend.turing.edu/projects/whats-cookin-part-two.html) for part two
 
