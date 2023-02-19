const fetch = require("node-fetch");

let API_KEY = "ba86d73b307849fbbe7c6c6b20341aab";
let API_URL = "https://api.spoonacular.com/recipes/findByIngredients"

let mainMiddleware = {
    getRecipesJson: async (ingredients,nbRecipes,maximize) => {
        try {
            // building url for the request
            let url =
              API_URL + "?apiKey=" + API_KEY + 
              "&ingredients=" + ingredients ;
              if(nbRecipes) url += "&number=" + nbRecipes;
              if(maximize) url += "&ranking=" + maximize;
      
            console.log(url);
            let settings = { method: "Get" };
            let out;
      
            await fetch(url, settings)
              .then((res) => res.json())
              .then((json) => {
                out = json;
            });

            console.log(out);
            return out;
        } catch (err) {
            console.error(err);
            next(err);
        }
        return false;
    }

};

module.exports = mainMiddleware;
