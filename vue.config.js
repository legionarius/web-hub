module.exports = {
  chainWebpack: (config) => {
    const godotLoaderRule = config.module.rule("godot");
    godotLoaderRule
      .test(/\.(wasm|pck)$/)
      .use("file-loader")
      .loader("file-loader")
      .options({
        name(resourcePath) {
          const filePath = resourcePath
            .replace(__dirname, "")
            .replace(/["\\"]/g, "/")
            .replace("/src/", "");
          return filePath;
        },
      });
    config.resolve.extensions.delete(".wasm");
  },
};
