module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // Must stay last — reanimated 4 relies on the worklets transform.
    plugins: ["react-native-worklets/plugin"],
  };
};
