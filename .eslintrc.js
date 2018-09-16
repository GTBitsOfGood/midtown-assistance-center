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
        'no-plusplus': 'off',
        'no-unused-vars': ['error', {'varsIgnorePattern': 'styles'}],
        'jsx-a11y/anchor-is-valid': [ 'error', {
            'components': [ 'Link' ],
            'specialLink': [ 'to' ]
        }],
        'jsx-a11y/label-has-for': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/mouse-events-have-key-events': 'off',
        // TODO: enable this later for more specific 'object' shape and 'array' contents
        'react/forbid-prop-types': 'off',
        'react/jsx-no-target-blank': 'off'
    }
};
