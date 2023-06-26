<script setup lang="tsx">
import { Message } from 'view-ui-plus'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import projectConfig from '../../project.config.json'
import generatedRoutes from '~pages'
import { filePathsToTree } from '~/libs/files'

const store = useLocaleStore()
const route: any = useRoute()

const { locale, localeArray } = storeToRefs(store)
const { childPort, tg } = projectConfig

const tgServer = 'http://localhost:8081'
const localTgServer = `http://localhost:${childPort}`

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
    // {
    //   title: '项目匹配',
    //   key: 'project_id',
    //   showForm(params: any) {
    //     return params.value.open
    //   },
    //   renderForm() {
    //     return <pro-select request={() => {
    //       return axios.get(`${tgServer}/api/projects`, { headers: { aa: 'Aa', Authorization: tg.jwt, noAuth: true } })
    //     }} map={{ titlePath: 'title', valuePath: 'uuid', dataPath: 'data.rows' }}></pro-select>
    //   },
    // },
  ],
  form: { ...projectConfig.tg, show: false, src: '' },
})
// 新增页面
const addNew = reactive({
  show: false,
  columns: [{
    title: '代码',
    key: 'uuid',
    rules: [
      {
        required: true,
        message: '代码必填',
      },
    ],
  }, {
    title: '名称',
    key: 'title',
  }],
  form: {},
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
  }
  else {
    page.tips = true
  }
}

// 天工
function tgToggle() {
  const { form } = settings
  form.show = !form.show
  if (settings.form.show) {
    const { name } = route
    form.src = `${tgServer}/#/build?project_id=${tg.project_id}&page_id=${name}&local=true&port=${childPort}`
  }
}
// 保存天工配置

async function saveTGConfig() {
  const res = await axios.post(`${localTgServer}/saveTGConfig`, settings.form)
  console.log(res)
}
</script>

<template>
  <div class="layout">
    <Layout>
      <Sider class="vh" hide-trigger collapsible :collapsed-width="78">
        <InfiniteMenu :menu-list="routes" />
        <div v-if="settings.form.open" mt-2 border-dashed color-white text-center py-2 mx-3 cursor-pointer @click="addNew.form = {};addNew.show = true;">
          新增页面
        </div>
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
    <Modal v-model="settings.show" :width="tg.jwt && tg.project_id ? 500 : 1200" title="全局项目配置" :footer-hide="true" @on-cancel="saveTGConfig">
      <pro-form v-if="tg.jwt && tg.project_id" v-model="settings.form" :columns="settings.columns" />
      <iframe v-else :src="`${tgServer}/#/login?local=true&port=${childPort}`" class="iframe" />
    </Modal>
    <Modal v-model="addNew.show" title="新增页面">
      <pro-form v-if="addNew.show" v-model="addNew.form" :columns="addNew.columns" :label-width="70" />
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
.iframe{
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
