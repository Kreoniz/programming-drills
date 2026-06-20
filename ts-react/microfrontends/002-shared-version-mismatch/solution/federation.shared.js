const deps = require("./package.json").dependencies;
module.exports = {
  react: { singleton: true, strictVersion: true, requiredVersion: deps.react },
  "react-dom": { singleton: true, strictVersion: true, requiredVersion: deps["react-dom"] },
};
