import { Recipe } from "../model/recipe";
import recipeDb from "../data-access/recipe.db"

const getAllRecipes = (): Promise<Recipe[]> => {
    return recipeDb.DBgetAllRecipes();
};

const getRecipeWithID = (id : number): Promise<Recipe> => {
    return recipeDb.DBgetRecipesWithID(id);
};



export default { getAllRecipes, getRecipeWithID }