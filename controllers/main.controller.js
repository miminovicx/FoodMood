var mainMiddleware = require('../middlewares/main.middleware');

exports.mainView = (req, res, next) => {
    res.render("home/", { title: "OK" });
};

// main process
exports.process = async (req, res, next) => {
    try {
        // (ingredients,cuisine, excludeCuisine, diet, intolerances, 
            // excludeIngredients, instructionsRequired, maxReadyTime, number) 

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
        let recipesJson = await mainMiddleware.getRecipesJson(ingredients,cuisine, excludeCuisine, 
                                                        diet, intolerances, excludeIngredients, 
                                                        maxReadyTime, number);

        // let shortRecipesJson = mainMiddleware.getShortRecipesFromJson(recipesJson);

        res.setHeader('Content-Type', 'application/json');
        res.status = 200;
        res.json(recipesJson);

    } catch (error) {
        console.error(err);
        next(err);   
    }
};