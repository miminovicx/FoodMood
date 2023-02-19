var mainMiddleware = require('../middlewares/main.middleware');

exports.mainView = (req, res, next) => {
    res.render("home/", { title: "OK" });
};

// main process
exports.process = async (req, res, next) => {
    try {
        // parsing request
        let ingredients = req.body.ingredients;
        let nbRecipes = req.body.nbRecipes;
        let maximize = req.body.maximize;

        // getting recipes from spoonacular api
        let recipesJson = await mainMiddleware.getRecipesJson(ingredients,nbRecipes,maximize);

        // let shortRecipesJson = mainMiddleware.getShortRecipesFromJson(recipesJson);

        res.setHeader('Content-Type', 'application/json');
        res.status = 200;
        res.json(recipesJson);

    } catch (error) {
        console.error(err);
        next(err);   
    }
};