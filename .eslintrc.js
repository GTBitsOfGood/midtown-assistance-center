module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    extends: [
        'airbnb',
        // 'plugin:node/recommended',
        'prettier',
        'prettier/react'
    ],
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        sourceType: 'module'
    },
    plugins: ['react', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        camelcase: 'off',
        'no-var': 2,
        'no-console': ['warn', { allow: ['info', 'warn', 'error'] }]
    }
};
