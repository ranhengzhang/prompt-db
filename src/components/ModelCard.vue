<script lang="ts" setup>
import {defineProps} from "vue";
import {db} from "../database";
import {Model} from "../types/model.ts";
import {CopyDocument} from "@element-plus/icons-vue";
import {writeText} from '@tauri-apps/plugin-clipboard-manager';

const props = defineProps({
  modelUuid: {
    type: String,
  },
  modelVersion: {
    type: String,
  },
  hideFooter: {
    type: Boolean,
    default: false
  }
})

const model: Model = await db.models.get(props.modelUuid) as Model
const type_badges = [
  {text: "基础模型", offset: -42},
  {text: "LoRA", offset: -24},
  {text: "Embedding", offset: -60}
]
</script>

<template>
  <el-badge :offset="[type_badges[model.type].offset,0]" :value="type_badges[model.type].text" type="info">
    <el-card shadow="always">
      <template #header>
        {{ model.title }} - {{ modelVersion }}
      </template>
      <span :class="model.words?'':'hide'">
        <span v-if="model.words">{{ model.words }}</span>
        <el-divider v-if="model.words && model.dewords"/>
        <span v-if="model.dewords">{{ model.dewords }}</span>
      </span>
      <template v-if="!props.hideFooter" #footer>
        <el-button :icon="CopyDocument" type="primary" @click="writeText(model.words)"/>
        <slot/>
      </template>
    </el-card>
  </el-badge>
</template>

<style scoped>
.el-card.hide .el-card__body {
  display: none;
}
</style>