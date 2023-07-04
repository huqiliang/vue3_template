import { last } from 'lodash-es'

const sep = '-'

/**
 * Takes a list of file paths and turns it into a tree. For each node you can attach own data using a callback.
 */
export function filePathsToTree<Data>(paths: Object[], getData?: (node: Array<Data>) => Data) {
  const results: Array<Data>[] = []

  return paths.reduce((currentResults, currentPath: any) => {
    const { meta } = currentPath
    const pathParts = currentPath.name.split(sep)
    const byPath: Record<string, Array<Data>> = {}
    // eslint-disable-next-line array-callback-return
    pathParts.reduce((nodes: any, name: string, index: number, arr: any) => {
      let node: any | undefined = nodes.find((node: any) => node.name === name)
      const path = name === 'index' ? '' : arr.slice(0, index + 1).join('/')
      if (name !== 'all') { // 隐藏全局错误页面
        if (!node) {
          node = {
            name,
            path: name === 'index' ? '/' : `/${path}`,
            title: (last(arr) === name && meta) ? meta.title : '',
            children: [],
          }

          node.data = getData?.(node)
          nodes.push(node)
        }

        byPath[path] = node

        return node.children
      }
    }, currentResults)

    return currentResults
  }, results)
}
