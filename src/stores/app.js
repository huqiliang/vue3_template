import { acceptHMRUpdate, defineStore } from 'pinia';
import _ from 'lodash-es';
import { findMenu } from '~/libs/menu';
import project from '../../project.config.json';

export const useAppStore = defineStore(
  'app',
  () => {
    const app = reactive({
      appCode: project.appCode,
      tabList: [],
      menuList: [],
      activeMenu: {}
    });
    const setMenuList = (menuList, route) => {
      const { tabList } = toRefs(app);
      const { path, query } = route;
      const menu = findMenu(menuList, 'path', path);
      if (menu && tabList.value.length === 0) {
        setActiveMenu({ ...menu, query });
      }
      app.menuList = menuList;
    };
    const setActiveMenu = (menu) => {
      const { tabList, activeMenu } = toRefs(app);
      const tabMenu = _.find(tabList.value, ['id', menu.id]);
      if (!tabMenu) {
        tabList.value.push(menu);
      }
      activeMenu.value = menu;
    };
    const setActiveMenuById = (id) => {
      const { menuList } = app;
      const menu = findMenu(menuList, 'id', id);
      setActiveMenu(menu);
    };
    // 返回
    return { app, setMenuList, setActiveMenu, setActiveMenuById };
  },
  { persist: true }
);
