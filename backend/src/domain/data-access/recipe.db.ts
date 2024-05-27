import { Recipe } from "../model/recipe"
import { mapToRecipe, mapToRecipes } from "../mapper/recipe.mapper";
import database from  "../../../util/database"
import { data } from "autoprefixer";


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
                ],
            },
        });
        return mapToRecipes(recipes);
    } catch (error) {
        throw new Error('Error searching recipes');
    }
};

  

  const DBfilterRecipes = async (type: string, difficulty: string, durations: string[]): Promise<Recipe[]> => {
  
    try {
      const recipes = await database.recipe.findMany({
        where: {
          ...(type && { type: { equals: type, mode: 'insensitive' } }),
          ...(difficulty && { difficulty: { equals: difficulty, mode: 'insensitive' } }),
          ...(durations && durations.length > 0 && { duration: { in: durations } }),
        },
      });
      return recipes;
    } catch (error) {
      throw new Error('Error filtering recipes');
    }
  };



const DBinsertRecipe = async (title: string, description: string, steps: Array<string>, duration: string, difficulty: string, type: string, ingredients: Array<string>): Promise<Recipe> => {
    const recipe = await database.recipe.create({
        data: {
            title: title,
            description: description,
            steps: steps,
            duration: duration,
            difficulty: difficulty,
            type: type,
            ingredients: ingredients
        }
    });
    return recipe;
}

export default { DBgetAllRecipes, DBgetRecipesWithID, DBinsertRecipe , DBsearchRecipe, DBfilterRecipes}



