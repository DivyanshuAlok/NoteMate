module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['import'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/order': [
      'warn',
      {
        groups: [
          ['builtin'], // Node.js and third-party packages
          'external',
          'internal', // Internal imports (e.g., @redux/hooks, @themes/spacing)
          ['parent', 'sibling'], // Relative imports
        ],
        pathGroups: [
          {
            pattern:
              '@{redux,themes,assets,components,conf,hooks,navigation,storage,thunk,slice,screens,themes,colors,utils,models,app,network,common,services,context,constants,skeletonLoader}/**', // Match internal imports
            group: 'internal',
            position: 'before', // Ensure internal imports are placed before relative imports
          },
          {
            pattern: '@**', // Match imports starting with @ (like @react-navigation/native, @redux/hooks, etc.)
            group: 'external',
            position: 'after', // Ensure @ imports come last (after other external packages)
          },
          {
            pattern: 'react**', // Match imports starting with @ (like @react-navigation/native, @redux/hooks, etc.)
            group: 'builtin',
            position: 'after', // Ensure @ imports come last (after other external packages)
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'never', // Ensure a blank line between groups
        alphabetize: {order: 'asc', caseInsensitive: true}, // Sort alphabetically
      },
    ],
  },
};
