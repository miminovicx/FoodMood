var mainMiddleware = require('../middlewares/main.middleware');

exports.mainView = (req, res, next) => {
    res.render("home/", { title: "OK" });
};

// main process
exports.process = (req, res, next) => {
    try {
        let ingredients = req.body.ingredients;
        let nbRecipes = req.body.nbRecipes;
        let maximize = req.body.maximize;

        let recipesJson = mainMiddleware.getRecipesJson(ingredients,nbRecipes,maximize);
        // console.log(recipesJson);
        res.setHeader('Content-Type', 'application/json');
        res.status = 200;
        res.json({body : recipe});

    } catch (error) {
        console.error(err);
        next(err);   
    }
};