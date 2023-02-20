const fetch = require("node-fetch");

let API_KEY = "ba86d73b307849fbbe7c6c6b20341aab";
let API_URL = "https://api.spoonacular.com/recipes/complexSearch"

let mainMiddleware = {
    getRecipesJson: async (ingredients,cuisine, excludeCuisine, diet, intolerances, 
                        excludeIngredients, maxReadyTime, number) => {
        try {            
            // a voir
            // let instructionsRequired=true
            
            let fillIngredients = true;
            let addRecipeInformation = true;
            let addRecipeNutrition = false;
        
            // building url for the request
            let url = API_URL + "?apiKey=" + API_KEY + "&fillIngredients=" + fillIngredients 
                    + "&addRecipeInformation=" + addRecipeInformation
                    + "&addRecipeNutrition=" + addRecipeNutrition;

            if(ingredients) url += "&includeIngredients=" + ingredients;
            if(cuisine) url += "&cuisine=" + cuisine;
            if(excludeCuisine) url += "&excludeCuisine=" + excludeCuisine;
            if(diet) url += "&diet=" + diet;
            if(intolerances) url += "&intolerances=" + intolerances;
            if(excludeIngredients) url += "&excludeIngredients=" + excludeIngredients;
            if(maxReadyTime) url += "&maxReadyTime=" + maxReadyTime;
            if(number) url += "&number=" + number;

            // console.log("url = ",url);

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
    }

};

module.exports = mainMiddleware;
