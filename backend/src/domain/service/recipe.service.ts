import { Recipe } from "../model/recipe";
import recipeDb from "../data-access/recipe.db"

const getAllRecipes = (): Promise<Recipe[]> => {
    return recipeDb.getAllRecipes();
};

export default { getAllRecipes }