import { Recipe } from "../model/recipe";
import recipeDb from "../data-access/recipe.db"

const getAllRecipes = (): Promise<Recipe[]> => {
    return recipeDb.DBgetAllRecipes();
    return recipeDb.DBgetAllRecipes();
};

const getRecipeWithID = (id : number): Promise<Recipe> => {
    return recipeDb.DBgetRecipesWithID(id);
};

const searchRecipe = (search : string): Promise<Recipe[]> => {
    return recipeDb.DBsearchRecipe(search);
};



export default { getAllRecipes, getRecipeWithID,searchRecipe }