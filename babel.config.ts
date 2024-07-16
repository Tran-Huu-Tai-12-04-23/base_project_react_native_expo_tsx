module.exports = function (api: any) {
  api.cache(true);
  return {
    presets: [
      [
        // 'module:metro-react-native-babel-preset',
        "babel-preset-expo",
        {
          jsxRuntime: "automatic",
        },
      ],
    ],
    plugins: ["react-native-reanimated/plugin"],
  };
};
