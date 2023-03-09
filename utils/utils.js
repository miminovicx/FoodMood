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
    },

    getInstructions: (steps) => {
        let instructions = [];

        for(var i = 0; i < steps.length; i++){
            let step = JSON.parse(JSON.stringify({
                "step" : steps[i]['number'],
                "instruction" : steps[i]['step']
            }));
            instructions.push(step);
        }
        
        return instructions;
    },

    getNutrition: (nutrients) => {
        let result = [];

        for(var i = 0; i < nutrients.length; i++){
            let nutrient = JSON.parse(JSON.stringify({
                "name" : nutrients[i]['name'],
                "amount" : nutrients[i]['amount'] + " " + nutrients[i]['unit']
            }));
            result.push(nutrient);
        }

        return result;
    }
}

module.exports = utils;