module.exports = {
  extends: [require.resolve('@backstage/cli/config/eslint')],
  rules: {
    'no-console': 0,
    'indent': ['error', 2],
  },
};
