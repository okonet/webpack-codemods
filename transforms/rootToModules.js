module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const ast = j(file.source);

  const webpackConfig = ast.find(j.ObjectExpression)

  let rootVal;
  webpackConfig
    .find(j.Identifier, { name: 'root' })
    .forEach(path => {
      rootVal = path.parent.value;
    })

  function findOrCreateModulesObjectExpression(ast) {
    let modulesIdent = webpackConfig
      .find(j.Property, { key: { name: 'modules' }})

    if (modulesIdent.size() === 0) {
      modulesIdent = webpackConfig
        .find(j.Property, { key: {name: 'root' }})
        .paths()[0].parent
    }

    return modulesIdent
  }

  if (rootVal) {
    const val = rootVal.value

    webpackConfig
      .find(j.Identifier, { name: 'root' })
      .forEach(path => {
        j(path.parent).remove()
      })

    return findOrCreateModulesObjectExpression(ast)
      .forEach(path => {
        path.get('value').node.elements.unshift(val)
      })
      .toSource();
  }
}
