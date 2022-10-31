class RecipeRepository {
  constructor(recipes) {
    this.recipes = recipes
  }

  filterByTag = (tag) => {
    const filteredList = this.recipes.filter(recipe => {
      let tags = Object.values(recipe.tags)
      if (tags.includes(tag.toLowerCase())) {
        return recipe
      }
    })
    return filteredList
  }
  
  filterByName = (name) => {
    const filteredList = this.recipes.filter(recipe => {
      let lowerCaseRecipeName = recipe.name.toLowerCase()
      if(lowerCaseRecipeName.includes(name.toLowerCase())) {
        return recipe
      }
    })
    return filteredList
  }
}
export default RecipeRepository
