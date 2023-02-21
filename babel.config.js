module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
      }],
      ['module-resolver', {
        'alias': {
          '@fonst': './assets/fonts',
          '@assets': './assets',
          '@style': './src/style',
          '@navigators': './src/navigators',
          '@components': './src/components',
          '@screens': './src/screens',
          '@hooks': './src/hooks',
          '@config': './src/config',
          '@utils': './src/utils',
        },
      },
      ],
    ],
  };
};
