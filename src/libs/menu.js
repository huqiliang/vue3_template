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

export function setTabActive(to) {
  if (import.meta.env.MODE === 'frame') {
    const { setActiveMenu, app } = useAppStore();
    const { menuList } = toRefs(app);
    // 如果在 frame 模式下
    const menu = findMenu(menuList.value, 'path', to.path);
    if (menu) {
      setActiveMenu({ ...menu, query: to.query });
    }
  }
}
