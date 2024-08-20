<script setup>
import _ from 'lodash-es';
import { findMenu } from '~/libs/menu';
const props = defineProps({
  menuList: Array
});
const { app } = useAppStore();
const { tabList } = toRefs(app);
const route = useRoute();
const { menuList } = props;

const layout = import.meta.env.VITE_LAYOUT;
const getTitle = (item) => {
  return item?.meta?.title || item?.title || item.name || item.path;
};
const getPath = (item) => {
  const { id, name, path } = item;
  if (layout === 'native') {
    item.path;
  } else {
    const tabMenu = _.find(tabList.value, ['id', id]);

    if (tabMenu) {
      return {
        path: tabMenu.path,
        query: tabMenu.query
      };
    } else {
      return { path };
    }
  }
};
</script>

<template>
  <div v-for="item in menuList" :key="item.id">
    <Submenu v-if="item.children && item.children.length > 0 && !item.hide" :name="item.id || item.path">
      <template #title>
        {{ getTitle(item) }}
      </template>
      <InfiniteMenu :menu-list="item.children" />
    </Submenu>
    <menu-item v-else-if="!item.hide" :name="item.id || item.path" :to="getPath(item)">
      {{ getTitle(item) }}
    </menu-item>
  </div>
</template>
