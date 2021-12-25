module.exports = {
    overrides: [
        {
            files: ['./src/**/*.js'],
            env: {
                browser: true,
                es2015: true,
                jest: true,
                node: true,
            }
        },
        {
            files: ['./src/**/*.jsx'],
            env: {
                browser: true,
                es2015: true,
                jest: true,
                node: true,
            },
            extends: [
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:react/jsx-runtime',
            ],
            parser: '@babel/eslint-parser',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 2015,
                sourceType: 'module',
            },
            plugins: ['react'],
            rules: {
                'indent': ['warn', 4],
                'react/jsx-indent': ['warn', 4, {checkAttributes: true, indentLogicalExpressions: true}],
                'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
                'no-console': 'off',
                'no-debugger': 'off',
                'no-useless-catch': 'off',
                'no-unused-vars': 'warn',
                'no-prototype-builtins': 'off',
                semi: ['warn', 'always'],
            },
            settings: {
                react: {
                    version: 'detect',
                },
            },
        }],
};
