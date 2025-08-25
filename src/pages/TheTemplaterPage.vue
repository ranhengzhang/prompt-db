<script lang="ts" setup>
import {computed, onMounted, onUnmounted, provide, Ref, ref} from "vue";
import {db} from "../database";
import {Templater} from "../types/templater.ts";
import {ElMessage, ElMessageBox} from 'element-plus'
import {liveQuery, Subscription} from "dexie";
import {Model} from "../types/model.ts";
import {useNSFWStore} from '../store/nsfwStore.ts';
import emitter from "../mitt.ts";
import {Version} from "../types/version.ts";
import TemplaterCard from "../components/TemplaterCard.vue";

const nsfwStore = useNSFWStore()
const recentPage = ref(1)

const filters = ref([])
const templaters: Ref<Templater[]> = ref([])
let templaters_subscription: Subscription | null = null
const filted = computed(()=>templaters.value.filter(val=>filters.value.filter(v=>JSON.stringify(val).indexOf(v)===-1).length === 0))
const pageTemplaters = computed(() => filted.value.slice((recentPage.value - 1) * 20, Math.min(recentPage.value * 20, templaters.value.length)))

const models: Ref<Model[]> = ref([])
let models_subscription: Subscription | null = null
provide('models', models)

const newTemplater = () => {
  ElMessageBox.prompt('Please input name', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern:
        /^.+$/,
    inputErrorMessage: "Can't be Empty",
  })
      .then(({value}) => {
        ElMessage({
          type: 'success',
          message: `Name is: ${value}`,
        })
        const newValue = new Templater(value)
        newValue.versions.push(new Version())
        db.templaters.add(newValue)
      })
      .catch((e) => {
        ElMessage({
          type: 'info',
          message: 'Input canceled: ' + e.message,
        })
        console.error(e)
      })
}

onMounted(() => {
  templaters_subscription = liveQuery(() => db.templaters.toArray())
      .subscribe({
        next: (result) => {
          templaters.value = result.sort((a, b) => a.date < b.date ? 1 : -1)
        }
      })
  models_subscription = liveQuery(() => db.models.toArray())
      .subscribe({
        next: (result) => {
          models.value = result
        }
      })
  recentPage.value = Number(sessionStorage.getItem("templaterPage") ?? 1)
  filters.value = JSON.parse(sessionStorage.getItem("templaterFilters")) ?? []
})

onUnmounted(() => {
  templaters_subscription?.unsubscribe()
  models_subscription?.unsubscribe()
  sessionStorage.setItem("templaterPage", String(recentPage.value))
  sessionStorage.setItem("templaterFilters", JSON.stringify(filters.value))
})
</script>

<template>
  <el-button type="primary" @click="newTemplater" @mouseleave="nsfwStore['cancel']" @mouseover="nsfwStore['load']">ADD
  </el-button>
  <el-input-tag v-model="filters" @change="filters" size="large" tag-type="primary" tag-effect="dark" style="margin-top: 10px;"/>
  <el-main class="main">
    <templater-card v-for="templater in pageTemplaters" :key="templater.uuid" :templater="templater"/>
  </el-main>
  <el-footer>
    <el-pagination v-model:current-page="recentPage" :page-count="Math.ceil(filted.length/20)"
                   background layout="prev, pager, next" size="large" @change="emitter.emit('scroll-to-top')"/>
  </el-footer>
</template>

<style scoped>
</style>