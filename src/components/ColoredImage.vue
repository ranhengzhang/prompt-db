<script lang="ts" setup>
import {convertFileSrc} from "@tauri-apps/api/core";
import {nextTick, onMounted, ref} from "vue";
import {getImageSize, messageWithEl} from "../utils.ts";
import autohue from 'autohue.js'
import {ElImage} from "element-plus";
import {CopyDocument} from "@element-plus/icons-vue";
import {path} from "@tauri-apps/api";
import {writeText} from "@tauri-apps/plugin-clipboard-manager";

const props = defineProps({
  img: {
    type: String
  },
  shouldLoad: {
    type: Boolean,
    default: false
  }
})

const imgSrc = ref("")
const imgUrl = ref("")
const element = ref()
const width = ref(1)
const height = ref(1)
let picW = 0
let picH = 0
const style = ref({
  backgroundImage: ""
})

const setWH = () => {
  if (picW) return

  getImageSize(props.img).then((v) => {
    ({width: picW, height: picH} = {...v})
    loadImage()
  })
}

const setBG = () => {
  if (picW && style.value.backgroundImage.length === 0 && imgSrc.value.length > 0) {
    autohue(imgSrc.value, {
      threshold: 5,
      maxSize: 50
    })
        .then((result) => {
          try {
            if ((width.value / height.value) > (picW / picH)) {
              style.value.backgroundImage = `linear-gradient(0.25turn, ${result.backgroundColor.left} 0 50%, ${result.backgroundColor.right} 50%)`
            } else {
              style.value.backgroundImage = `linear-gradient(${result.backgroundColor.top} 0 50%, ${result.backgroundColor.bottom} 50%)`
            }
          } catch (error) {
            console.error(error)
          }
        })
        .catch((err) => console.error(err))
  }
}

const setIMG = () => {
  if (imgSrc.value.length === 0)
    imgSrc.value = convertFileSrc(props.img)

  if (imgUrl.value.length === 0)
    imgUrl.value = `url(${imgSrc.value})`
}

const loadImage = () => {
  setIMG()
  setBG()
  setWH()
}

const showImage = ref({
  show: false,
  fileName: await path.basename(props.img),
  start: () => {
    if (imgSrc.value.length !== 0)
      showImage.value.show = true
  }
})

defineExpose({loadImage})

onMounted(() => {
  nextTick(() => {
    [width.value, height.value] = [element.value.$el.clientWidth, element.value.$el.clientHeight]
    if (props.shouldLoad)
      loadImage()
  })
})
</script>

<template>
  <el-col ref="element" :style="style" style="width: 100%; height: 100%;">
    <el-image :alt="props.img" :src="imgSrc" fit="scale-down" style="z-index: 1;" @click="showImage.start"/>
  </el-col>
  <el-dialog v-model="showImage.show" align-center append-to-body width="auto">
    <template #title>
      <el-button :icon="CopyDocument" style="margin-right: 5px;" text
                 type="info" @click="messageWithEl(props.img, 'success', ()=>writeText(props.img))"/>
      <el-text size="large" type="info">
        {{ showImage.fileName }}
      </el-text>
    </template>
    <img id="show-img" :alt="props.img" :src="imgSrc"/>
  </el-dialog>
</template>

<style scoped>
#show-img {
  object-fit: scale-down;
  max-height: 80vh;
  max-width: 80vw;
  width: 100%;
  height: 100%;
  border-radius: var(--el-dialog-border-radius);
}

.el-image {
  width: 100%;
  height: 100%;
}

.el-col::after {
  content: "";
  background-image: v-bind(imgUrl);
  background-position: center;
  background-size: contain;
  position: absolute;
  width: 102%;
  height: 102%;
  display: block;
  top: -1%;
  left: -1%;
  background-repeat: no-repeat;
  filter: blur(40px);
  transform: translateZ(0);
}
</style>