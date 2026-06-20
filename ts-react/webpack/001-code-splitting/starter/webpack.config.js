module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  output: { filename: "bundle.js" },
  // TODO: add production-grade splitting.
};
