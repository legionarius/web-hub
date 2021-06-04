// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const godotFolder = path.resolve(`${__dirname}/src/godot`);
module.exports = {
  chainWebpack: (config) => {
    const babelLoaderRule = config.module.rule("js");
    const eslintLoaderRule = config.module.rule("eslint");
    const godotLoaderRule = config.module.rule("godot");

    babelLoaderRule.exclude.add(godotFolder);
    eslintLoaderRule.exclude.add(godotFolder);
    godotLoaderRule
      .test(/\.(wasm|pck)$/)
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "godot/[name].[ext]",
      });
    config.resolve.extensions.delete(".wasm");
  },
};