<script setup>
import _ from 'lodash-es';
import { findMenu } from '~/libs/menu';
const { tabList } = useAppStore();
const props = defineProps({
  menuList: Array
});
const route = useRoute();
const { menuList } = props;

const layout = import.meta.env.VITE_LAYOUT;
const getTitle = (item) => {
  return item?.meta?.title || item?.title || item.name || item.path;
};
const getPath = (item) => {
  return layout === 'native' ? item.name : item.path;
};

const selectMenu = (path) => {
  const menu = _.find(tabList, ['path', path]);
  if (!menu) {
    tabList.push(findMenu(menuList, 'path', path));
  }
};
</script>

<template>
  <Menu accordion width="auto" theme="dark" :active-name="route.path" @on-select="selectMenu">
    <template v-for="item in menuList" :key="item.path">
      <Submenu v-if="item.children && item.children.length > 0" :name="getPath(item)">
        <template #title>
          {{ getTitle(item) }}
        </template>
        <InfiniteMenu :menu-list="item.children" />
      </Submenu>
      <menu-item v-else :name="item.path" :to="getPath(item)">
        {{ getTitle(item) }}
      </menu-item>
    </template>
  </Menu>
</template>
