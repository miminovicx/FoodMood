var config = {}

config.secretKey =  "hello";

config.https = {
    keyPath: "...",
    certPath: "..."
};

// cors options
config.corsOptions = {
    origin: 'http://localhost:3000/',
    methods: ["POST"],
    optionsSuccessStatus: 200
}

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