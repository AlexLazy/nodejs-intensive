const common = [
  "features/**/*.feature", // Specify our feature files
  "--require-module ts-node/register", // Load TypeScript module
  "--require features/**/*.ts", // Load step definitions
].join(" ");

module.exports = {
  default: common,
};
