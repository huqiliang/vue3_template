<script setup lang="tsx">
import { Message } from 'view-ui-plus';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import projectConfig from '../../project.config.json';
import { routes } from 'vue-router/auto-routes';

const store = useLocaleStore();
const route: any = useRoute();

const { locale, localeArray } = storeToRefs(store);
const { childPort, tg }: any = projectConfig;

const { server: tgServer } = tg;
const localTgServer = `http://localhost:${childPort}`;

const page = reactive({ tips: false });
const loading = ref(true);

// 全局设置配置
const settings = reactive({
  show: false,
  columns: [
    {
      title: '开启天工',
      key: 'open',
      renderForm: {
        type: 'i-switch'
      }
    }
  ],
  form: { ...projectConfig.tg, show: false }
});
const tgOpen = computed(() => {
  return settings.form.jwt && settings.form.project_id && settings.form.open;
});
const tgSrc = computed(() => {
  const { name } = route;
  return `${tgServer}/?time=${new Date().getTime()}/#/build?project_id=${tg.project_id}&name=${name}&local=true&port=${childPort}&token=${tg.jwt}`;
});
// 新增页面
const addNew = reactive({
  show: false,
  columns: [
    {
      title: '代码',
      key: 'name',
      rules: [
        {
          required: true,
          message: '代码必填'
        }
      ]
    },
    {
      title: '名称',
      key: 'title'
    }
  ],
  form: {}
});
// 获取路由树

// UC授权
async function auth() {
  const res: any = await axios({
    url: 'https://test.ihotel.cn/uc-web/sso/login',
    method: 'post',
    data: {
      appCode: '',
      orgCode: 'GCBZG',
      userCode: 'GCBZG_ADMIN',
      password: 'f6af7afd01d4eb0dc5fe0a342cd6cee7'
    },
    headers: {
      nomsg: true
    }
  });

  if (res.success) {
    localStorage.setItem('token', res.retVal.jwtToken);
    Message.success({ content: '授权成功' });
  } else {
    page.tips = true;
  }
}

// 天工
function tgToggle() {
  const { form } = settings;
  form.show = !form.show;
}
// 保存天工配置

async function saveTGConfig() {
  if (tg.jwt && tg.project_id) {
    const { open } = settings.form;
    await axios.post(`${localTgServer}/saveTGConfig`, { open });
    Message.success({ content: '设置成功 正在重启' });
  }
}

// 保存新建页面

async function addNewHandle() {
  const { project_id, jwt } = tg;
  const { name, title }: any = addNew.form;
  let tgRes: any;
  if (tgOpen.value) {
    tgRes = await axios.post(
      `${tgServer}/api/pages`,
      {
        title,
        project_id,
        name
      },
      {
        headers: {
          noauth: true,
          nomsg: true,
          Authorization: `Bearer ${jwt}`
        }
      }
    );
    if (tgRes && tgRes.code === 0) {
      localCreate();
    } else {
      setTimeout(() => {
        loading.value = false; // 改变loading状态
        nextTick(() => {
          loading.value = true;
        });
      });
      Message.error({ content: '页面代码重复,请修改' });
    }
  } else {
    localCreate();
  }

  async function localCreate() {
    const res = await axios.post(`${localTgServer}/saveNew`, addNew.form);
    if (res) Message.success({ content: '新建成功' });
    else Message.error({ content: '新建失败' });
  }
}
const menuList: any = routes;
</script>

<template>
  <div class="layout">
    <Layout>
      <Sider class="vh" hide-trigger collapsible :collapsed-width="78">
        <Menu accordion width="auto" theme="dark"> <InfiniteMenu :menu-list="menuList"></InfiniteMenu></Menu>
        <div
          mt-2
          border-dashed
          color-white
          text-center
          py-2
          mx-3
          cursor-pointer
          @click="
            addNew.form = {};
            addNew.show = true;
          "
        >
          新增页面
        </div>
      </Sider>
      <Layout>
        <Header class="layout-header-bar" style="padding: 0">
          <div class="flex items-center justify-between px-5" :class="settings.form.show && tgOpen ? 'bg-yellow-200' : ''">
            <div>
              <Button class="mr5" type="success" @click="auth"> 授权 </Button>
              <Button v-if="tgOpen" class="mr5" :type="!settings.form.show ? 'default' : 'primary'" @click="tgToggle"> 天工 </Button>
            </div>
            <div style="width: 120px" flex items-center>
              <pro-select v-model="locale" :list="localeArray" mr3 />
              <Icon type="ios-settings" size="25" cursor-pointer @click="settings.show = true" />
            </div>
          </div>
        </Header>
        <Content id="#app">
          <iframe v-if="tgOpen && settings.form.show" class="iframe" :src="tgSrc" />
          <router-view v-else class="px-5 py-2" />
        </Content>
      </Layout>
    </Layout>
    <Modal v-model="settings.show" :width="tg.jwt && tg.project_id ? 500 : 1200" title="全局项目配置" :footer-hide="true" @on-cancel="saveTGConfig">
      <pro-form v-if="tg.jwt && tg.project_id" v-model="settings.form" :columns="settings.columns" />
      <iframe v-else :src="`${tgServer}/#/login?local=true&port=${childPort}`" class="iframe" />
    </Modal>
    <Modal v-model="addNew.show" title="新增页面" :loading="loading" @on-ok="addNewHandle">
      <pro-form v-if="addNew.show" v-model="addNew.form" :columns="addNew.columns" :label-width="70" />
    </Modal>
    <Modal v-model="page.tips">
      <div>
        <p p-1>自动登录失败,请按以下操作:</p>
        <p p-1>
          1.请打开
          <a target="_blank" href="http://192.168.0.85:8180/sso"> 测试服 </a>
          登陆 账号请联系 - 基础研发部
        </p>
        <p p-1>2.打开 f12 查找任意接口 , 复制 header 中的 Authorization 的值</p>
        <p p-1>3.在当前 url 后加入 ?token=复制的值 , 刷新即可</p>
      </div>
    </Modal>
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
