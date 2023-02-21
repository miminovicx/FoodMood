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
            // let step = steps[i]['number'] + "- " + steps[i]['step'];
            let step = JSON.parse(JSON.stringify({
                "step" : steps[i]['number'],
                "instruction" : steps[i]['step']
            }));
            instructions.push(step);
        }
        
        return instructions;
    }
}

module.exports = utils;