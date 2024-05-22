import { Recipe } from "../model/recipe"
import { mapToRecipe, mapToRecipes } from "../mapper/recipe.mapper";
import database from  "../../util/database"


const getAllRecipes = async (): Promise<Recipe[]> => {
    try {
        const recipes = await database.recipe.findMany();
        return mapToRecipes(recipes);
    } catch (error) {
        throw new Error('Error');
    }
};


export default { getAllRecipes}