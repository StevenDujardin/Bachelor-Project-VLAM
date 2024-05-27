export class Recipe {
    readonly recipe_id: number;
    readonly title: string;
    readonly description: string;
    readonly steps: Array<string>;
    readonly duration: string;
    readonly difficulty: string;
    readonly type: string;
    readonly ingredients: Array<string>;


    constructor(recipe: {
            recipe_id: number;
            title: string;
            description: string;
            steps: Array<string>;
            duration: string;
            difficulty: string;
            type: string;
            ingredients: Array<string>;
    }) {
        this.recipe_id = recipe.recipe_id;
        this.title = recipe.title;
        this.description = recipe.description;
        this.steps = recipe.steps;
        this.duration = recipe.duration;
        this.difficulty = recipe.difficulty;
        this.type = recipe.type;
        this.ingredients = recipe.ingredients;
    
    }

}

export default Recipe;