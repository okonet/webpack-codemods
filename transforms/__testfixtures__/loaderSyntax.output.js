module.exports = {
  module: {
    rules: [
      // Extended syntax
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            query: {
              modules: true
            }
          }
        ]
      },
      // Automatic -loader module name extension
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "scss-loader"
        ]
      },
      // Query params syntax
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader?modules&importLoaders=1"]
      },
      // Chaining loaders
      {
        test: /\.pcss$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      // Function syntax
      {
        test: /\.pcss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader",
          publicPath: "/dist"
        })
      }
    ]
  }
}
