module.exports = {
    env: {
        es2015: true,
        node: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        semi: ['warn', 'always'],
        indent: ['warn', 4, { SwitchCase: 1 }],
        'arrow-body-style': 'off',
        'import/prefer-default-export': 'off',
        'no-useless-catch': 'off',
        'no-console': 'off',
        'no-debugger': 'off',
        'no-unused-vars': 'warn',
        'no-prototype-builtins': 'off'
    },
};
