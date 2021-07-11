module.exports = {
  env: {
    browser: false,
    es2021: true,
  },
  extends: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 'never',
  },
};
