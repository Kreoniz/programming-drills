const webpack = require("webpack");
module.exports = {
  module: {
    rules: [
      { test: /\.tsx?$/, use: ["babel-loader", "ts-loader"], exclude: /node_modules/ },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ __DEV__: JSON.stringify(process.env.NODE_ENV !== "production") }),
  ],
};
