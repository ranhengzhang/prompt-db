<script lang="ts" setup>
import {ElCard} from 'element-plus'
import {computed, ref} from "vue";
import {writeText} from '@tauri-apps/plugin-clipboard-manager';
import {CopyDocument, ElementPlus, Finished} from "@element-plus/icons-vue";
import {db} from "../database";

const words = ref("")
const dataString = ref("")
const load = async () => {
  let datas = {}
  datas["templaters"] = await db.templaters.toArray()
  datas["commands"] = await db.commands.toArray()
  datas["models"] = await db.models.toArray()
  dataString.value = JSON.stringify(datas)
}
const save = async () => {
  const datas = JSON.parse(dataString.value)
  await db.templaters.bulkPut(datas["templaters"])
  await db.commands.bulkPut(datas["commands"])
  await db.models.bulkPut(datas["models"])
}
const formatedWords = computed(() => words.value.split('\n').map(v => v.trim()).join('\n').replace(/([,，]\s?)+/gm, ', ').replace(/\n{3,}/gm, '\n\n').replace(/\ {2,}/gm, ' '))
</script>

<template>
  <el-card shadow="always">
    <template #header>
      <el-text size="large">提示词格式化</el-text>
    </template>
    <el-input v-model="words" :rows="8" type="textarea"/>
    <el-divider/>
    <el-text v-if="formatedWords" v-html="formatedWords.replace(/\n/gm, '<br/>')"/>
    <el-text v-else>...</el-text>
    <template #footer>
      <el-col style="display: grid; grid-template-columns: 1fr auto;">
        <el-col></el-col>
        <el-button :icon="CopyDocument" type="primary" @click="writeText(formatedWords)"/>
      </el-col>
    </template>
  </el-card>
  <el-card shadow="always">
    <template #header>
      <el-text size="large">IndexedDB 导入导出</el-text>
    </template>
    <el-input v-model="dataString" :rows="8" type="textarea"/>
    <template #footer>
      <el-button :icon="ElementPlus" size="large" type="primary" @click="load">导出</el-button>
      <el-button :icon="Finished" size="large" type="success" @click="save">导入</el-button>
    </template>
  </el-card>
</template>

<style scoped>
.el-card:not(:last-child) {
  margin-bottom: 16px;
}
</style>