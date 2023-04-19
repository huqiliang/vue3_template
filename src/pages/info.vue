<script setup lang="ts">
import generatedRoutes from '~pages'
import { filePathsToTree } from '~/libs/files'
// 获取路由树
const routes: any = filePathsToTree(generatedRoutes)
</script>

<template>
  <div>
    <InfiniteMenu :menu-list="routes" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: local
  title: 信息页
</route>
