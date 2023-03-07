/**
 * @controller Payment 
 */

const config = require('../config');
const stripe = require("stripe")(config.stripeKeys["STRIPE_SECRET_KEY"]);
const Users = require("../models/user")

exports.paymentView = (req, res, next) => {
    res.render("./payment",{user: req.user});
};

exports.pay = async (req, res, next) => {
    try {        
        const token = await createToken(req.body);
        if (token.error) {
            res.json({"success" : "error"});
        }
        if (!token.id) {
            res.json({"err" : "erreur"})
        }
    
        var amount = 10 * 100; // 10e
        const charge = await createCharge(token.id, amount);
        if (charge && charge.status == 'succeeded') { 
            res.setHeader('Content-Type', 'application/json');
            res.status = 200;
            // let a = 
            // res.json({"user": addCoins(req.user,10)});
            addCoins(req.user,10);
            // addCoins(req.user,10);
            res.redirect("/home");
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status = 400;
            res.json({"success" : "payment failed"}); 
        }
    } catch (err) {
        console.error(err);
        next(err);   
    }

}

const createToken = async (cardData) => {
    let token = {};
    try {
        token = await stripe.tokens.create({
            card: {
                number: cardData.cardNumber,
                exp_month: cardData.month,
                exp_year: cardData.year,
                cvc: cardData.cvv
            }
        });
    } catch (error) {
        switch (error.type) {
            case 'StripeCardError':
                token.error = error.message;
                break;
            default:
                token.error = error.message;
                break;
        }
    }
    return token;
}

const createCharge = async (tokenId, amount) => {
    let charge = {};
    try {
        charge = await stripe.charges.create({
            amount: amount,
            currency: 'eur',
            source: tokenId,
            description: 'payment test'
        });
    } catch (error) {
        charge.error = error.message;
    }
    return charge;
}

const addCoins = async(user, numberCoins) => {
    
    let temp = await Users.findById(user._id);
    let actualCoins = temp.coins;
    let userDb = await Users.findByIdAndUpdate(user._id,{
            coins : actualCoins + numberCoins,
    });
    return userDb;
}