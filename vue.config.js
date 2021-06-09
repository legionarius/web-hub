// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const godotFolder = path.resolve(`${__dirname}/src/godot`);
module.exports = {
  chainWebpack: (config) => {
    const godotLoaderRule = config.module.rule("godot");
    godotLoaderRule
      .test(/\.(wasm|pck)$/)
      .use("file-loader")
      .loader("file-loader")
      .options({
        name(resourcePath, resourceQuery) {
          const filePath = resourcePath.replace(__dirname, "")
            .replace(/["\\"]/g, "/")
            .replace("/src/", "");
          return filePath;
        },
      });
    config.resolve.extensions.delete(".wasm");
  },
};
