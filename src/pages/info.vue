<script setup lang="tsx">
import { RouterLink } from 'vue-router'
import generatedRoutes from '~pages'
import { filePathsToTree } from '~/libs/files'
// 获取路由树
const routes: any = filePathsToTree(generatedRoutes)
// 自定义渲染
const renderContent = (h: any, { data }: any) => {
  return (
    <RouterLink to={data.path}>
      {data.title || data.name}({data.path})
    </RouterLink>
  )
}
const { VITE_BASE_URL, MODE } = import.meta.env
</script>

<template>
  <div>
    <p>构建模式: {{ MODE }}</p>
    <p mt2>
      接口地址: {{ VITE_BASE_URL }}
    </p>
    <div mt2>
      <p>路由信息:</p>
      <Tree :data="routes" :render="renderContent" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: local
  title: 信息页
</route>
