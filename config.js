var config = {}

config.secretKey = {
    local: "hello",
    prod: "nothello"
};

config.https = {
    keyPath: "...",
    certPath: "..."
};

// cors whitelisted urls in prod and dev environments
config.cors = {
    whitelist: {
        local: [],
        prod: [],
    }
};

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