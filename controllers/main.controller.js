/**
 * @controller main
 */

var mainMiddleware = require('../middlewares/main.middleware');

exports.mainView = (req, res, next) => {
    res.render("./home", { title: "OK" });
};

// main process
exports.process = async (req, res, next) => {
    try {
        // parsing request
        let ingredients = req.body.ingredients;
        let cuisine = req.body.cuisine;
        let excludeCuisine = req.body.excludeCuisine;
        let diet = req.body.diet;
        let intolerances = req.body.intolerances;
        let excludeIngredients = req.body.excludeIngredients;
        let maxReadyTime = req.body.maxReadyTime;
        let number = req.body.number;
        

        // getting recipes from spoonacular api
        let recipeJson = await mainMiddleware.getRecipeJson(ingredients,cuisine, excludeCuisine, 
                                                        diet, intolerances, excludeIngredients, 
                                                        maxReadyTime, number);
        
        if(recipeJson['totalResults'] == 0) res.json({ message: "No recipe available for your filters"});
        let cleanRecipesJson = mainMiddleware.getCleanRecipesJson(recipeJson);

        res.setHeader('Content-Type', 'application/json');
        res.status = 200;

        res.json(cleanRecipesJson);
    } catch (err) {
        console.error(err);
        next(err);   
    }
};