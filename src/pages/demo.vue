<script setup>
const config = reactive({
  columns: [
    { title: '颜色选择器', validate_type: null, key: 'ColorPicker_0', renderForm: { type: 'ColorPicker', props: {} } },
    { title: '颜色选择器', validate_type: null, key: 'ColorPicker_1', renderForm: { type: 'ColorPicker', props: {} } },
    { title: '颜色选择器', validate_type: null, key: 'ColorPicker_2', renderForm: { type: 'ColorPicker', props: {} } },
    { title: '颜色选择器', validate_type: null, key: 'ColorPicker_3', renderForm: { type: 'ColorPicker', props: {} } },
    { title: '滑块', validate_type: 'number', key: 'Slider_4', renderForm: { type: 'Slider', props: {} } },
    { title: '滑块', validate_type: 'number', key: 'Slider_5', renderForm: { type: 'Slider', props: {} } },
    { title: '滑块', validate_type: 'number', key: 'Slider_6', renderForm: { type: 'Slider', props: {} } },
  ],
})
</script>

<template>
  <pro-form v-bind="config" />
</template>
