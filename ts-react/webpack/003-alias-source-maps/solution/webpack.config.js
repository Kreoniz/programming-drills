const path = require("path");
module.exports = {
  devtool: "hidden-source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@app": path.resolve(__dirname, "src/app"),
      "@shared": path.resolve(__dirname, "src/shared"),
    },
  },
};
