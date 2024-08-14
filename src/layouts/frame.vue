<script setup lang="tsx">
import NoFrame from './default.vue';
import logo from '~/assets/images/logo.png';
import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic';
import { getMenuList } from '~/api/menu';

const useMenuListData = defineBasicLoader('/', async (route) => {
  return getMenuList();
});

const { data, isLoading } = useMenuListData();
const { user } = useUserStore();

const menuList: any = data;
const isCollapsed = ref(false);
</script>

<template>
  <div class="layout">
    <Layout>
      <Sider class="vh" hide-trigger collapsible :collapsed-width="0" v-model="isCollapsed">
        <div class="app_header">
          <div class="logo_box">
            <img class="app_logo" :src="logo" />
          </div>
          <div class="system_name" v-show="!isCollapsed">测试系统</div>
        </div>
        <div class="flex justify-center p-2" v-if="isLoading">
          <Spin></Spin>
        </div>
        <InfiniteMenu :menu-list="menuList" v-else></InfiniteMenu>
      </Sider>
      <Layout>
        <Header class="layout-header-bar flex items-center justify-between" style="padding: 0">
          <Icon @click="isCollapsed = !isCollapsed" class="header_icon" type="md-menu" size="24"></Icon>

          <div class="message px-2">
            <Avatar class="flex justify-center items-center" style="background-color: rgb(34 197 94); width: 55px" icon="ios-person" />
            <div style="margin-left: 10px" class="flex flex-wrap">
              <div class="userInfo">{{ user.orgCode }} / {{ user.orgName }}</div>
              <div class="userInfo">{{ user.userCode }} / {{ user.userName }}</div>
            </div>
          </div>
        </Header>
        <Content id="#app">
          <TabsContain></TabsContain>
          <NoFrame></NoFrame>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<style scoped lang="less">
.layout {
  :deep(.ivu-menu-vertical .ivu-menu-item),
  :deep(.ivu-menu-vertical .ivu-menu-submenu-title) {
    padding-top: 0;
    padding-bottom: 0;
    height: 40px;
    line-height: 40px;
    white-space: nowrap;
    background: #00152c;
    &:hover {
      background: #00264f;
    }
  }
  :deep(.ivu-layout-sider) {
    background: #00152c;
  }
  :deep(.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu)),
  :deep(.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu)) {
    background: #2d8cf0 !important;
    color: #fff;
  }
  :deep(.ivu-menu-dark) {
    background: #00152c;
  }
  background: #f5f7f9;
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  .vh {
    min-height: 100vh;
  }
  .app_header {
    padding-left: 15px;
    height: 64px;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #00152c;

    .logo_box {
      height: 100%;
      width: 50px;
      // background: #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .app_logo {
      height: 32px;
      width: 32px;
      display: flex;
      align-items: center;
      background-repeat: no-repeat;
    }
    .system_name {
      color: #fff;
      font-size: 16px;
    }
  }
  .layout-header-bar {
    background: #00152c;
    .header_icon {
      margin: 0 20px;
      color: #fff;
    }
    .message {
      display: flex;
      align-items: center;
      height: 64px;
      cursor: pointer;
      width: 250px;
      .userInfo {
        width: 100%;
        height: 22px;
        line-height: 22px;
        color: #9fb2c5;
      }
      &:hover {
        background: hsla(0, 0%, 100%, 0.05);
      }
    }
  }
}
</style>
