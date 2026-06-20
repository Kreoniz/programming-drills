const { container } = require("@rspack/core");
const { ModuleFederationPlugin } = container;
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "analytics",
      filename: "remoteEntry.js",
      exposes: { "./Dashboard": "./src/Dashboard" },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
  ],
};
