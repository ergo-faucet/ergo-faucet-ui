export default {
  '**/*.{ts,tsx}': () => 'npm run type-check',
  '*.{js,ts}': 'npm run test -- related -- --run',
  '*': 'prettier --ignore-unknown --write',
  '*.{js,jsx,ts,tsx}': 'npm run lint',
};
