module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const ast = j(file.source);

  // Convert `query` to `options`
  ast
    .find(j.Identifier, { name: 'query' })
    .forEach(path => {
      j(path).replaceWith(j.identifier('options'))
    })

  // Convert `loaders` to `use`
  const loadersPaths = ast
    .find(j.Identifier, { name: 'loaders' })

  loadersPaths
    .filter(path => {
      const keys = path.parent.parent.node.properties.map(p => p.key.name)
      return keys.indexOf('test') > -1
      //return true
    })
    .forEach(path => {
      j(path).replaceWith(j.identifier('use'))
    });

  // Convert `loaders` to `rules`
  loadersPaths
    .filter(path => {
      const keys = path.parent.parent.node.properties.map(p => p.key.name)
      return keys.indexOf('test') < 0
    })
    .forEach(path => {
      j(path).replaceWith(j.identifier('rules'))
    });

  // Chaining loaders
  ast
    .find(j.Property, { key: { name: 'use' } })
    .filter(path => path.node.value.type === j.Literal.name)
    .map(path => path.get('value'))
    .forEach(path => {
      const loadersArray = path.value.value.split('!')
      j(path).replaceWith(
        j.arrayExpression(
          loadersArray.map(loader => j.literal(loader))
        )
      )
    });
  return ast.toSource()
}
