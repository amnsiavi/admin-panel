module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-unused-vars': 'off', // Disabling the rule for no unused vars
    '@typescript-eslint/no-explicit-any': 'off', // Disabling explicit 'any' rule
  },
};
