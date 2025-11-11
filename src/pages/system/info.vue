<script setup lang="tsx">
import { RouterLink } from 'vue-router';
// 移除对 unplugin-vue-router 的依赖
// import { routes } from 'vue-router/auto-routes';

// 自定义渲染
function renderContent(h: any, { data }: any) {
  return (
    <RouterLink to={data.name || data.path}>
      {data?.meta?.title || data?.name || data.path}
    </RouterLink>
  );
}
const { VITE_BASE_URL, MODE } = import.meta.env;
</script>

<template>
  <div>
    <p>当前模式: {{ MODE }}</p>
    <p mt2>接口地址: {{ VITE_BASE_URL }}</p>
    <div mt2>
      <p>自动路由信息:</p>
      <!-- 移除对 routes 的引用 -->
      <!-- <Tree :data="routes" :render="renderContent" /> -->
      <p>路由信息已移除</p>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  title: 信息页
</route>
