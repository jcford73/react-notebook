module.exports = {
    env: {
        es6: true,
        node: true,
    },
    overrides: [{
        files: ['**/*.js'],
        extends: ['airbnb-base'],
        // plugins: ['prettier'],
        globals: {
            Atomics: 'readonly',
            SharedArrayBuffer: 'readonly',
        },
        parserOptions: {
            ecmaVersion: 2018,
            sourceType: 'module',
        },
        rules: {
            indent: ['warn', 4],
            'class-methods-use-this': 'off',
            'no-param-reassign': 'off',
            camelcase: 'off',
            'no-unused-vars': 'warn',
            semi: ['warn', 'always'],
            'arrow-body-style': 'off',
            'import/prefer-default-export': 'off',
            'import/no-named-as-default': 'off',
            'import/no-named-as-default-member': 'off',
            'import/no-unresolved': 'off',
            'import/extensions': ['warn', 'never'],
            'no-prototype-builtins': 'off',
            'no-plusplus': 'off',
        },
    }],
};
