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
        'prettier/react',
        'prettier',
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
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'camelcase': 'off',
        'no-var': 2,
        'no-console': ['warn', { 'allow': ['info', 'warn', 'error', 'log'] }],
        'no-shadow': 'off',
        'no-underscore-dangle': 'off',
        'jsx-a11y/anchor-is-valid': [ 'error', {
            'components': [ 'Link' ],
            'specialLink': [ 'to' ]
        }],
        'jsx-a11y/label-has-for': 'off',
        'no-unused-vars': ['error', {'varsIgnorePattern': 'styles'}],
        // TODO: enable this later for more specific 'object' shape and 'array' contents
        'react/forbid-prop-types': 'off',
        'no-plusplus': 'off'
    }
};
