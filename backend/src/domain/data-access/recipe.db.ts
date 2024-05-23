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

const DBsearchRecipe = async (search: string): Promise<Recipe[]> => {
    try {
        const recipes = await database.recipe.findMany({
            where: {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                    { ingredients: { has: search } },
                ],
            },
        });
        return mapToRecipes(recipes);
    } catch (error) {
        throw new Error('Error searching recipes');
    }
};






export default { DBgetAllRecipes, DBgetRecipesWithID, DBsearchRecipe}
