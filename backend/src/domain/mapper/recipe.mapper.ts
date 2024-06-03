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
                       ingredients,
                       image,
                     }: RecipePrisma): Recipe => {
    return new Recipe({
        recipe_id,
        title,
        description,
        steps,
        duration,
        difficulty,
        type,
        ingredients,
        image,
    });
};

const mapToRecipes = (recipes: RecipePrisma[]): Recipe[] => recipes.map(mapToRecipe);

export { mapToRecipe, mapToRecipes };