module.exports = {
    "parser": "babel-eslint",
    "extends": ["airbnb", "exponent"],
    "rules": {
        "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }]
    },
    "globals": {
        "fetch": true,
    } 
};