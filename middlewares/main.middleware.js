/**
 * @middleware main
 */

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
            
            // setting default
            if(!number){
                number = 3;
            }
            url += "&number=" + number;

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

    getCleanRecipesJson: (recipeJson) => {
        try {
            let recipe = recipeJson['results'];
            let result = [];
            for(var i = 0; i < recipe.length; i++) {

                let id = recipe[i]['id'];
                let title = recipe[i]['title'];
                let readyInMinutes = recipe[i]['readyInMinutes'];
                let image = recipe[i]['image'];
                
                let usedIngredients = utils.getIngredientsFromComplexArray(recipe[i]['usedIngredients']);
                let unusedIngredients = utils.getIngredientsFromComplexArray(recipe[i]['unusedIngredients']);
                let missingIngredients = utils.getIngredientsFromComplexArray(recipe[i]['missedIngredients']);
                
                let instructions =[];
                if(recipe[i]['analyzedInstructions'].length != 0) instructions = utils.getInstructions(recipe[i]['analyzedInstructions'][0]['steps']);
                
                let nutrition = utils.getNutrition(recipe[i]['nutrition']['nutrients']);
    
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
                result.push(cleanRecipe);
            }
            
            return result;
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
};

module.exports = mainMiddleware;
