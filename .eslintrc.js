module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: ['.eslintrc.js', 'vite.config.ts', 'tailwind.config.js', 'postcss.config.js', 'prettier.config.js'],
    plugins: ['react', '@typescript-eslint', 'eslint-plugin-import-helpers'],
    rules: {
        'react/jsx-no-constructed-context-values': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'prettier/prettier': 'error',
        'react/function-component-definition': 'off',
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.tsx', '.ts'],
            },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'import-helpers/order-imports': [
            'error',
            {
                groups: ['/^react/', 'module', '/^@/', ['parent', 'sibling', 'index']],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                newlinesBetween: 'always',
            },
        ],
        'jsx-a11y/media-has-caption': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        "react/prop-types": "off"
    },
};
