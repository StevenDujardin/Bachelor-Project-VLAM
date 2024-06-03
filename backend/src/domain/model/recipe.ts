export class Recipe {
    readonly recipe_id: number;
    readonly title: string;
    readonly description: string;
    readonly steps: Array<string>;
    readonly duration: number;
    readonly difficulty: string;
    readonly type: string;
    readonly ingredients: Array<string>;
    readonly image: string;


    constructor(recipe: {
            recipe_id: number;
            title: string;
            description: string;
            steps: Array<string>;
            duration: number;
            difficulty: string;
            type: string;
            ingredients: Array<string>;
            image: string;
    }) {
        this.recipe_id = recipe.recipe_id;
        this.title = recipe.title;
        this.description = recipe.description;
        this.steps = recipe.steps;
        this.duration = recipe.duration;
        this.difficulty = recipe.difficulty;
        this.type = recipe.type;
        this.ingredients = recipe.ingredients;
        this.image = recipe.image;

    }

}

export default Recipe;