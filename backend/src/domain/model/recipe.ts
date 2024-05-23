export class Recipe {
    readonly recipe_id: number;
    readonly title: String;
    readonly description: String;
    readonly steps: Array<String>;
    readonly duration: String;
    readonly difficulty: String;
    readonly type: String;
    readonly ingredients: Array<String>;


    constructor(recipe: {
            recipe_id: number;
            title: String;
            description: String;
            steps: Array<String>;
            duration: String;
            difficulty: String;
            type: String;
            ingredients: Array<String>;
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