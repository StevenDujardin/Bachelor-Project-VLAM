import { Recipe } from "../model/recipe"
import { mapToRecipe, mapToRecipes } from "../mapper/recipe.mapper";
import database from  "../../../util/database"


const DBgetAllRecipes = async (): Promise<Recipe[]> => {
    try {
        const recipes = await database.recipe.findMany();
        return mapToRecipes(recipes);
    } catch (error) {
        throw new Error('Error');
    }
};

const DBgetRecipesWithID = async (id: number ): Promise<Recipe> => {
    try {
        const recipe = await database.recipe.findFirstOrThrow({
            where: {
                recipe_id: id,
        }
    });
        return mapToRecipe(recipe);
    } catch (error) {
        throw new Error('Error');
    }
};


export default { DBgetAllRecipes, DBgetRecipesWithID}
