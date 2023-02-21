var utils = {
    getIngredientsFromComplexArray: (complexIngredientsArray) => {
        let ingredients = [];

        for(var i = 0; i  < complexIngredientsArray.length; i++){
            let name = complexIngredientsArray[i]['name'];
            let quantity = complexIngredientsArray[i]['amount'] + " " + complexIngredientsArray[i]['unitShort'];
            let ingredientJson = JSON.parse(JSON.stringify({
                "name" : name,
                "quantity" : quantity
            }));
            ingredients.push(ingredientJson)
        }
        return ingredients;
    }
}

module.exports = utils;