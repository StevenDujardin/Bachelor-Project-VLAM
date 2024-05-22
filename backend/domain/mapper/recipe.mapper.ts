import { Recipe as RecipePrisma } from "@prisma/client"
import { Recipe } from "../model/recipe";

const mapToRecipe = ({
                    recipe_id,
                       title,
                       description,
                       steps,
                       duration,
                       difficulty,
                       type, 
                       ingredients
                     }: RecipePrisma): Recipe => {
    return new Recipe({
        recipe_id,
        title,
        description,
        steps,
        duration,
        difficulty,
        type,
        ingredients
    });
};

const mapToRecipes = (recipes: RecipePrisma[]): Recipe[] => recipes.map(mapToRecipe);

export { mapToRecipe, mapToRecipes };