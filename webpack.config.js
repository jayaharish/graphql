const path = require("path");
module.exports = {
  mode: "development",
  entry: path.join(__dirname, "app", "index.ts"),
  watch: true,
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  target: "node",
  module: {
    rules: [
      {
        test: /.ts$/,
        include: [path.resolve(__dirname, "app")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
