<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    {{ t('not-found') }}
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
  title: 全局错误页面
</route>
