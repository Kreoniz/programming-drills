const deps = require("./package.json").dependencies;
module.exports = {
  react: deps.react,
  "react-dom": deps["react-dom"],
  // TODO: make shared config strict and singleton.
};
