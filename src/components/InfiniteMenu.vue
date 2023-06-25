<script setup lang="ts">
const props = defineProps({
  menuList: Array<any>,
})
const route = useRoute()
const { menuList } = props
</script>

<template>
  <Menu width="auto" theme="dark" :active-name="route.path">
    <template v-for="item in menuList" :key="item.path">
      <Submenu v-if="item.children && item.children.length > 0" :name="item.path">
        <template #title>
          {{ item.title || item.name }}
        </template>
        <InfiniteMenu :menu-list="item.children" />
      </Submenu>
      <menu-item v-else :name="item.path" :to="item.path">
        {{ item.title || item.name }}
      </menu-item>
    </template>
  </Menu>
</template>
