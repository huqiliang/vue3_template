<script setup lang="tsx">
import NoFrame from './default.vue';

import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic';
import { getMenuList } from '~/api/menu';

const useUserData = defineBasicLoader('/', async (route) => {
  return getMenuList();
});

const { data, isLoading } = useUserData();

const menuList: any = data;
</script>

<template>
  <div class="layout">
    <Layout>
      <Sider class="vh" hide-trigger collapsible :collapsed-width="78">
        <div class="flex justify-center p-2" v-if="isLoading">
          <Spin></Spin>
        </div>
        <InfiniteMenu :menu-list="menuList" v-else></InfiniteMenu>
      </Sider>
      <Layout>
        <Header class="layout-header-bar" style="padding: 0"> </Header>
        <Content id="#app" p-5>
          <NoFrame></NoFrame>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<style scoped lang="less">
.iframe {
  width: 100%;
  min-height: 550px;
  border: none;
}

.layout {
  background: #f5f7f9;
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  .iframe {
    position: relative;
    height: 100%;
    width: 100%;
    border: 1px dashed #ccc;
    display: block;
  }
}

.vh {
  min-height: 100vh;
}

.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

.menu-icon {
  transition: all 0.3s;
}

.rotate-icon {
  transform: rotate(-90deg);
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}

.menu-item i {
  transform: translateX(0px);
  transition:
    font-size 0.2s ease,
    transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition:
    font-size 0.2s ease 0.2s,
    transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
