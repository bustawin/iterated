module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
     'prettier/prettier': 'error'
    // Add custom rules here
    // e.g., '@typescript-eslint/explicit-function-return-type': 'off'
  }
};