<template>
  <div class="tabsContain" v-if="tabList && tabList.length > 0">
    <Tabs class="newTab" ref="newTab" type="card" prefixCls="aa" :closable="tabList && tabList.length > 0" v-model="active" @on-click="handleTabActive" :before-remove="handleTabRemove">
      <TabPane v-for="(item, index) in tabList" :label="item.title" :name="item.path" :key="index"> </TabPane>
    </Tabs>
  </div>
</template>
<script setup>
import _ from 'lodash-es';
const { tabList } = useAppStore();
const route = useRoute();
const router = useRouter();
console.log('tabList', route.path);

const active = ref(route.path);
const handleTabActive = (path) => {
  router.push(path);
};
const handleTabRemove = (index) => {
  const { path } = tabList[index];
  tabList.splice(index, 1);

  if (route.path === path) {
    const last = _.get(_.findLast(tabList), 'path');
    if (last) {
      router.push(last);
    }
  }
};
onBeforeRouteLeave((to, from) => {
  active.value = to.path;
});
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
