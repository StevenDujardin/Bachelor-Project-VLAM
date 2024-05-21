export class Recipe {
    readonly title: String;
    readonly description: String;
    readonly time: String;
    readonly difficulty: String;
    readonly category: String;

    constructor(recipe: {
            title: String;
            description: String;
            time: String;
            difficulty: String;
            category: String;
    }) {
        this.title = recipe.title;
        this.description = recipe.description;
        this.time = recipe.time;
        this.difficulty = recipe.difficulty;
        this.category = recipe.category;
    
    }

}

export default Recipe;