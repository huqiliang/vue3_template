<script setup lang="ts">
const { t, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  // const locales = availableLocales
  // locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  locale.value = locale.value === "zh-CN" ? "en-US" : "zh-CN"
}
</script>

<template>
  <nav text-xl mt-6>
    <RouterLink class="icon-btn mx-2" to="/" :title="t('button.home')">
      <div i-carbon-campsite />
    </RouterLink>

    <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales()">
      <div i-carbon-language />
    </a>

    <RouterLink class="icon-btn mx-2" to="/about" :title="t('button.about')">
      <div i-carbon-dicom-overlay />
    </RouterLink>

    <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank" title="GitHub">
      <div i-carbon-logo-github />
    </a>
  </nav>
</template>
