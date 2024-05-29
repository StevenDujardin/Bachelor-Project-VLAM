import { Recipe } from "../model/recipe"
import { mapToRecipe, mapToRecipes } from "../mapper/recipe.mapper";
import { data } from "autoprefixer";
import database from  "../../util/database"
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

//Edit recipe
const DBeditRecipe = async (
    recipe_id: number, 
    title?: string, 
    description?: string, 
    steps?: string[], 
    duration?: number, 
    difficulty?: string, 
    type?: string, 
    ingredients?: string[]
): Promise<Recipe> => {
    try {
        // Create an object with the fields to be updated, only including the fields that are not undefined
        const updateData: { 
            title?: string, 
            description?: string, 
            steps?: string[], 
            duration?: number, 
            difficulty?: string, 
            type?: string, 
            ingredients?: string[] 
        } = {};

        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (steps !== undefined) updateData.steps = steps;
        if (duration !== undefined) updateData.duration = duration;
        if (difficulty !== undefined) updateData.difficulty = difficulty;
        if (type !== undefined) updateData.type = type;
        if (ingredients !== undefined) updateData.ingredients = ingredients;

        // Update the recipe with the given recipe_id
        const recipe = await database.recipe.update({
            where: { recipe_id: recipe_id },
            data: updateData,
        });

        return mapToRecipe(recipe);
    } catch (error) {
        throw new Error('Error updating recipe');
    }
};

//Delete recipe

const DBdeleteRecipeWithID = async (recipe_id: number): Promise<Recipe> => {
    const recipe = await database.recipe.delete({
        where:{
            recipe_id: recipe_id
        }
    });
    return mapToRecipe(recipe);
}
  

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

//Find ingredient by Name
const DBgetIngredientIDByName = async (name: string ): Promise<number> => {
    try {
        const ingredient = await database.ingredient.findFirstOrThrow({
            where: {
                name: name,
        }
    });
        return ingredient.ingredient_id;
    } catch (error) {
        throw new Error('Error');
    }
};


//Delete ingredient by id
const DBdeleteIngredientByID = async (ingredient_id: number): Promise<Ingredient> => {
    const ingredient = await database.ingredient.delete({
        where:{
            ingredient_id: ingredient_id,
        }
    });
    return ingredient;
}

export default { DBgetAllRecipes, DBgetRecipesWithID, DBinsertRecipe , DBsearchRecipe, DBfilterRecipes, DBgetAllIngredients, DBeditRecipe, DBdeleteRecipeWithID, DBdeleteIngredientByID, DBgetIngredientIDByName}



