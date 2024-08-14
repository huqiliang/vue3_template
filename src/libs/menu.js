export function findMenu(menus, key, value) {
  var o;
  menus.some(function iter(node) {
    if (node[key] === value) {
      o = node;
      return true;
    }
    return Array.isArray(node.children) && node.children.some(iter);
  });
  return o;
}
