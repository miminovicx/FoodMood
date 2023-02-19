const fetch = require("node-fetch");

let API_KEY = "ba86d73b307849fbbe7c6c6b20341aab";
let API_URL = "https://api.spoonacular.com/recipes/findByIngredients"

let mainMiddleware = {
    getRecipesJson: async (ingredients,nbRecipes,maximize) => {
        try {
            // if(!ingredients) res.json(err)

            // setting default values
            if(!nbRecipes) nbRecipes = 1;
            if(!maximize) maximize = 2;

            // building url for the request
            let url =
              API_URL + "?apiKey=" + API_KEY + 
              "&ingredients=" + ingredients + 
              "&number=" + nbRecipes +
               "&ranking=" + maximize;
      
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
