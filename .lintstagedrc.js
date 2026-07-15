module.exports = {
  // Prettier & ESLint on all TS/JS/TSX/JSX files
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
  // Prettier on other files
  '*.{json,md,mdx,css,scss,yml,yaml}': ['prettier --write'],
  // Type check all TS files
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
};
