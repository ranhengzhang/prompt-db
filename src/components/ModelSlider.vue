<script setup lang="ts">
const model = defineModel<number>()
</script>

<template>
  <div class="el-slider">
    <el-slider v-model="model" :max="2" :min="-2" :step="0.01"/>
    <el-input-number v-model="model" :max="2" :min="-2" :step="0.1" :precision="2"/>
  </div>
</template>

<style scoped>
.el-slider {
  gap: 30px;
}
</style>