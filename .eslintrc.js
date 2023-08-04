module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "ecmaVersion": "latest",
        "es2021": true,
        "jest":true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "semi": ["warn", "always"],
        "quotes": ["warn", "single"]
    }
}
