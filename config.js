var config = {}
const rateLimit = require('express-rate-limit');

config.secretKey =  "hello";

config.https = {
    keyPath: "...",
    certPath: "..."
};

// cors options
config.corsOptions = {
    origin: 'https://localhost:3000/',
    methods: "POST,GET",
    optionsSuccessStatus: 200
}

// helmet options
config.helmetOptions = {

}

config.limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// database urls for prod and dev envs
config.mongoUrl = {
    local: "mongodb://localhost:27017/foodmood",
    prod: "...",
};

// rate limiting (limit of the queries done in a certain time)
config.rateLimit = {
    local: {},
    prod: {},
};

module.exports = config;