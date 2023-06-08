<script setup lang="tsx">
import { Message } from 'view-ui-plus'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import projectConfig from '../../project.config.json'
import generatedRoutes from '~pages'
import { filePathsToTree } from '~/libs/files'

const store = useLocaleStore()
// const route = useRoute()

const { locale, localeArray } = storeToRefs(store)

const page = reactive({ tips: false })

// 全局设置配置
const settings = reactive({
  show: false,
  columns: [
    {
      title: '开启天工',
      key: 'open',
      renderForm: {
        type: 'i-switch',
      },
    },
    {
      title: '项目id',
      key: 'project_id',
      showForm(params: any) {
        return params.value.open
      },
    },
  ],
  form: { ...projectConfig.tg, show: false, src: '' },
})

// 获取路由树
const routes: any = filePathsToTree(generatedRoutes)

// UC授权
async function auth() {
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

// window.addEventListener('message', (e) => {
//   const { type } = e.data
//   if (type === 'tg')
//     console.log(e.data)
// }, false)

// 天工
function tgToggle() {
  const { form } = settings
  form.show = !form.show
  if (settings.form.show)
    form.src = 'http://localhost:8081/#/build?project_id=b4b1f7b3d8a54f09a0a6d466a4fa5222&page_id=1a6a731647454f2d9ce7f6ee7dfa3a75&local=true'
    // form.src
    // = 'https://work.ihotel.cn/login?redirect=http://192.168.0.38:8989/#/build?service=TG&project_id=cce2b795d63e44bca54bd1c6e58d0fec&page_id=1a6a731647454f2d9ce7f6ee7dfa3a75&local=true'

  // axios.post('/__tg_createPage', { viewPath: '/pages/test3.vue', code: '<template><pro-table v-bind="config" />/template>' })
}
// 保存天工配置

async function saveTGConfig() {
  const res = await axios.post('/__tg_tgConfig', settings.form)
  console.log(res)
}
</script>

<template>
  <div class="layout">
    <Layout>
      <Sider class="vh" hide-trigger collapsible :collapsed-width="78">
        <InfiniteMenu :menu-list="routes" />
      </Sider>
      <Layout>
        <Header class="layout-header-bar" style="padding:0">
          <div class="flex items-center justify-between px-5" :class="settings.form.show && settings.form.open ? 'bg-yellow-200' : ''">
            <div>
              <Button class="mr5" type="success" @click="auth">
                授权
              </Button>
              <Button
                v-if="settings.form.open"
                class="mr5"
                :type="!settings.form.show ? 'default' : 'primary'"
                @click="tgToggle"
              >
                天工
              </Button>
            </div>
            <div style="width: 120px" flex items-center>
              <pro-select v-model="locale" :list="localeArray" mr3 />
              <Icon
                type="ios-settings"
                size="25"
                cursor-pointer
                @click="settings.show = true"
              />
            </div>
          </div>
        </Header>
        <Content id="#app" p-5>
          <iframe v-if="settings.form.open && settings.form.show" class="iframe" :src="settings.form.src" />
          <router-view v-else />
        </Content>
      </Layout>
    </Layout>
    <Modal v-model="settings.show" title="全局项目配置" :footer-hide="true" @on-cancel="saveTGConfig">
      <div>
        <Steps :current="1">
          <Step title="已完成" content="这里是该步骤的描述信息" />
          <Step title="进行中" content="这里是该步骤的描述信息" />
          <Step title="待进行" content="这里是该步骤的描述信息" />
          <Step title="待进行" content="这里是该步骤的描述信息" />
        </Steps>
        <pro-form v-model="settings.form" :columns="settings.columns" />
      </div>
    </Modal>
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

<style scoped lang="less">
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
