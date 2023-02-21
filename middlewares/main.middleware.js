const fetch = require("node-fetch");
const { use } = require("passport");
var utils = require('../utils/utils.js');

let API_KEY = "ba86d73b307849fbbe7c6c6b20341aab";
let API_URL = "https://api.spoonacular.com/recipes/complexSearch"

let mainMiddleware = {

    getRecipeJson: async (ingredients,cuisine, excludeCuisine, diet, intolerances, 
                        excludeIngredients, maxReadyTime, number) => {
        try {            
            // a voir
            let instructionsRequired=true
            
            let fillIngredients = true;
            let addRecipeInformation = true;
            let addRecipeNutrition = true;
        
            // building url for the request
            let url = API_URL + "?apiKey=" + API_KEY + "&fillIngredients=" + fillIngredients 
                    + "&addRecipeInformation=" + addRecipeInformation
                    + "&addRecipeNutrition=" + addRecipeNutrition
                    + "&instructionsRequired" + instructionsRequired;

            if(ingredients) url += "&includeIngredients=" + ingredients;
            if(cuisine) url += "&cuisine=" + cuisine;
            if(excludeCuisine) url += "&excludeCuisine=" + excludeCuisine;
            if(diet) url += "&diet=" + diet;
            if(intolerances) url += "&intolerances=" + intolerances;
            if(excludeIngredients) url += "&excludeIngredients=" + excludeIngredients;
            if(maxReadyTime) url += "&maxReadyTime=" + maxReadyTime;
            if(number) url += "&number=" + number;

            let settings = { method: "Get" };
      
            let out = await fetch(url, settings)
              .then((res) => res.json())
              .then((json) => {
                return json;
            });
            
            return out;
        } catch (err) {
            console.error(err);
            next(err);
        }
        return false;
    },

    getCleanRecipeJson: (recipeJson) => {
        try {
            let recipe = recipeJson['results'][0];
            let id = recipe['id'];
            let title = recipe['title'];
            let readyInMinutes = recipe['readyInMinutes'];
            let image = recipe['image'];
            
            let usedIngredients = utils.getIngredientsFromComplexArray(recipe['usedIngredients']);
            let unusedIngredients = utils.getIngredientsFromComplexArray(recipe['unusedIngredients']);
            let missingIngredients = utils.getIngredientsFromComplexArray(recipe['missedIngredients']);

            let instructions = utils.getInstructions(recipe['analyzedInstructions'][0]['steps']);

            let nutrition = utils.getNutrition(recipe['nutrition']['nutrients']);

            let cleanRecipe = JSON.parse(JSON.stringify({
                "id" : id,
                "title" : title,
                "readyInMinutes" : readyInMinutes,
                "usedIngredients" : usedIngredients,
                "unusedIngredients" : unusedIngredients,
                "missingIngredients" : missingIngredients,
                "instructions" : instructions,
                "image" : image,
                "nutrition" : nutrition
            }));

            return cleanRecipe;
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
};

module.exports = mainMiddleware;
