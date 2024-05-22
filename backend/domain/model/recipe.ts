export class Recipe {
    readonly title: String;
    readonly description: String;
    readonly time: String;
    readonly difficulty: String;
    readonly category: String;
    readonly ingredients: Array<String>;


    constructor(recipe: {
            title: String;
            description: String;
            time: String;
            difficulty: String;
            category: String;
            ingredients: Array<String>;
    }) {
        this.title = recipe.title;
        this.description = recipe.description;
        this.time = recipe.time;
        this.difficulty = recipe.difficulty;
        this.category = recipe.category;
        this.ingredients = recipe.ingredients;
    
    }

}

export default Recipe;