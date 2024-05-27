import { Recipe } from "../model/recipe"
import { mapToRecipe, mapToRecipes } from "../mapper/recipe.mapper";
import database from  "../../../util/database"
import { data } from "autoprefixer";
import { Ingredient } from "@prisma/client";


//Get all recipes
const DBgetAllRecipes = async (): Promise<Recipe[]> => {
    try {
        const recipes = await database.recipe.findMany();
        return mapToRecipes(recipes);
    } catch (error) {
        throw new Error('Error');
    }
};

//Get recipe with ID
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

//Search recipe
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

  

//Filter recipes
const DBfilterRecipes = async (type: string, difficulty: string, duration: number): Promise<Recipe[]> => {
    try {
      const recipes = await database.recipe.findMany({
        where: {
          ...(type && { type: { equals: type, mode: 'insensitive' } }),
          ...(difficulty && { difficulty: { equals: difficulty, mode: 'insensitive' } }),
          ...(duration && { duration: { lte: duration } }),
        },
      });
      return mapToRecipes(recipes);
    } catch (error) {
      throw new Error('Error filtering recipes');
    }
  };



//Add recipe
const DBinsertRecipe = async (title: string, description: string, steps: Array<string>, duration: number, difficulty: string, type: string, ingredients: Array<string>): Promise<Recipe> => {
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
    return mapToRecipe(recipe);
}


//Get all ingredients
const DBgetAllIngredients = async (): Promise<Ingredient[]> => {
    try {
        const ingredients = await database.ingredient.findMany();
        return ingredients;
    } catch (error) {
        throw new Error('Error');
    }
};


export default { DBgetAllRecipes, DBgetRecipesWithID, DBinsertRecipe , DBsearchRecipe, DBfilterRecipes, DBgetAllIngredients}



