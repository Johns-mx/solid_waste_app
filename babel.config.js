// eslint-disable-next-line no-undef
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv',
    {
      envName: 'APP_ENV',
      moduleName: '@env',
      path: '.env',
      // blocklist: null,
      // allowlist: null,
      // safe: false,
      // allowUndefined: true,
      // verbose: false,
    }],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
