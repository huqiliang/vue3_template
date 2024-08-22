<template>
  <div class="tabsContain" v-if="tabList && tabList.length > 0">
    <Tabs
      class="newTab"
      ref="newTab"
      type="card"
      prefixCls="aa"
      :closable="tabList && tabList.length > 1"
      :modelValue="tabId"
      @on-click="handleTabActive"
      :before-remove="handleTabRemove"
    >
      <TabPane
        v-for="(item, index) in tabList"
        :label="item.title"
        :name="item.id"
        :key="index"
      >
      </TabPane>
    </Tabs>
  </div>
</template>
<script setup>
import _ from 'lodash-es';
import { findMenu } from '~/libs/menu';
const { app } = useAppStore();
const { menuList, tabList, activeMenu } = toRefs(app);
const route = useRoute();
const router = useRouter();
const tabId = computed(() => {
  return activeMenu.value.id;
});
const handleTabActive = (id) => {
  const menu = _.find(tabList.value, ['id', id]);
  if (menu) {
    const { path, query } = menu;
    router.push({
      path,
      query
    });
  }
};
const handleTabRemove = (index) => {
  const { path } = tabList.value[index];
  tabList.value.splice(index, 1);

  if (route.path === path) {
    const last = _.findLast(tabList.value);
    if (last) {
      const { path, query } = last;
      router.push({
        path,
        query
      });
    }
  }
};
</script>

<style lang="less">
.tabsContain {
  margin: 5px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .divider {
    width: 2px;
    height: 14px;
    background: #ddd;
  }
}
.newTab {
  .ivu-tabs-bar {
    border-bottom: none;
    margin-bottom: 0px;
  }

  .ivu-tabs-tab {
    background: #fff !important;
    // background: ;
    border-radius: 3px !important;
    border: none !important;
    // margin-right: 6px !important;
    // color: #808695 !important;
  }
  .ivu-tabs-tab-active {
    color: #2d8cf0 !important;
  }
  .ivu-tabs-nav {
    min-width: 100vw;
    display: flex;
  }
}
</style>
