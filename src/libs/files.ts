const sep = '-'

/**
 * Takes a list of file paths and turns it into a tree. For each node you can attach own data using a callback.
 */
export const filePathsToTree = <Data>(paths: Object[], getData?: (node: Array<Data>) => Data) => {
  const results: Array<Data>[] = []

  return paths.reduce((currentResults, currentPath: any) => {
    const pathParts = currentPath.name.split(sep)
    const byPath: Record<string, Array<Data>> = {}

    pathParts.reduce((nodes: any, name: string, index: number, arr: any) => {
      let node: any | undefined = nodes.find((node: any) => node.name === name)
      const path = arr.slice(0, index + 1).join('/')

      if (!node) {
        node = {
          name,
          path: `/${path}`,
          children: [],
        }

        node.data = getData?.(node)
        nodes.push(node)
      }

      byPath[path] = node

      return node.children
    }, currentResults)

    return currentResults
  }, results)
}
