module.exports = {
    "extends": "airbnb",
    "rules": {
        "linebreak-style": 0,
        // `.jsx` extension cannot be used with React Native
        // https://github.com/airbnb/javascript/issues/982
        "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }]
    },
};