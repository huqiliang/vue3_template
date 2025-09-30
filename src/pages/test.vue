<script setup lang="ts">
const router = useRouter();

defineOptions({
  name: 'test'
});
const goToIndex = () => {
  router.push('/');
};
</script>

<template>
  <div>
    <Button @click="goToIndex">跳转到首页</Button>
    <pro-footer></pro-footer>
  </div>
</template>

<route lang="yaml">
meta:
  title: 测试
  layout: default
</route>
