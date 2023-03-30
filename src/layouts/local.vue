<script setup lang="ts">
import { Message } from 'view-ui-plus'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import generatedRoutes from '~pages'
import { filePathsToTree } from '~/libs/files'

const store = useLocaleStore()

const { locale, localeArray } = storeToRefs(store)

const page = reactive({ tips: false })

const auth = async () => {
  const res: any = await axios({
    url: 'https://test.ihotel.cn/uc-web/sso/login',
    method: 'post',
    data: {
      appCode: '',
      orgCode: 'GCBZG',
      userCode: 'GCBZG_ADMIN',
      password: 'e10adc3949ba59abbe56e057f20f883e',
    },
    headers: {
      nomsg: true,
    },
  })

  if (res.success) {
    localStorage.setItem('token', res.retVal.jwtToken)
    Message.success({ content: '授权成功' })
    window.location.reload()
  }
  else {
    page.tips = true
  }
}
const routes: any = filePathsToTree(generatedRoutes)
</script>

<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" class="vh" hide-trigger collapsible :collapsed-width="78">
        <InfiniteMenu :menu-list="routes" />
      </Sider>
      <Layout>
        <Header class="layout-header-bar flex items-center justify-between p5">
          <div>
            <Button class="mr5" type="success" @click="auth">
              授权
            </Button>
          </div>
          <div style="width: 90px">
            <pro-select v-model="locale" :list="localeArray" />
          </div>
        </Header>
        <Content id="#app" p-5>
          <router-view />
        </Content>
      </Layout>
    </Layout>
    <Modal v-model="page.tips">
      <div>
        <p p-1>
          自动登录失败,请按以下操作:
        </p>
        <p p-1>
          1.请打开
          <a target="_blank" href="http://192.168.0.85:8180/sso"> 测试服 </a>
          登陆 账号请联系 - 基础研发部
        </p>
        <p p-1>
          2.打开 f12 查找任意接口 , 复制 header 中的 Authorization 的值
        </p>
        <p p-1>
          3.在当前 url 后加入 ?token=复制的值 , 刷新即可
        </p>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
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
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
