module.exports = {
  module: {
    loaders: [
      // Extended syntax
      {
        test: /\.css$/,
        loaders: [
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
          "style",
          "css",
          "scss"
        ]
      },
      // Query params syntax
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader?modules&importLoaders=1"]
      },
      // Chaining loaders
      {
        test: /\.pcss$/,
        use: "style-loader!css-loader!postcss-loader"
      },
      // Function syntax
      {
        test: /\.pcss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader", { publicPath: "/dist" })
      }
    ]
  }
}
