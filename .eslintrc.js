module.exports = {
  env: {
    browser: true,
    commonjs: true
  },
  extends: ['standard-with-typescript', 'plugin:react/recommended'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/semi': 'off'
  }
};
