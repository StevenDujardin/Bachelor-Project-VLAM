import { Recipe } from "../domain/model/recipe";
import recipeDb from "../domain/data-access/recipe.db"

const getAllRecipes = (): Promise<Recipe[]> => {
    return recipeDb.getAllRecipes();
};

export default { getAllRecipes }