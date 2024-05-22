import { Recipe as RecipePrisma } from "@prisma/client"
import { Recipe } from "../model/recipe";

const mapToRecipe = ({
                       title,
                       description,
                       time,
                       difficulty,
                       category, 
                       ingredients
                     }: RecipePrisma): Recipe => {
    return new Recipe({
        title,
        description,
        time,
        difficulty,
        category,
        ingredients
    });
};

const mapToRecipes = (recipes: RecipePrisma[]): Recipe[] => recipes.map(mapToRecipe);

export { mapToRecipe, mapToRecipes };