const { defineConfig } = require("@rspack/cli");
const ReactRefreshPlugin = require("@rspack/plugin-react-refresh");
const isDev = process.env.NODE_ENV !== "production";
module.exports = defineConfig({
  mode: isDev ? "development" : "production",
  module: {
    rules: [{ test: /\.tsx?$/, loader: "builtin:swc-loader", options: { jsc: { parser: { syntax: "typescript", tsx: true }, transform: { react: { runtime: "automatic", refresh: isDev } } } } }],
  },
  plugins: [isDev && new ReactRefreshPlugin()].filter(Boolean),
  devServer: { historyApiFallback: true },
});
