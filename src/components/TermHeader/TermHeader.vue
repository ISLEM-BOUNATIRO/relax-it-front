<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { currentDirName } = storeToRefs(useDirectoryStore())

const directory = useDirectoryStore()
const foo = inject<() => void>(closeKey)
</script>

<template>

  <header class="box-header">
    <div class="circle-container">
      <div @click="foo" class="circle bg-red-600">
        <Icon class="circle-icon" icon="ep:close-bold" />
      </div>
      <div class="circle bg-yellow-400">
        <Icon class="circle-icon" icon="akar-icons:minus" />
      </div>
      <div class="circle bg-green-500">
        <Icon class="circle-icon" icon="fa-solid:expand-arrows-alt" />
      </div>
    </div>
    <div class="center-dir-title">
      <Icon icon="ant-design:folder-filled" class="text-[#57c5ff]" />
      <span class="ml-2 select-none">{{ directory.socket_arg.split('&&&&')[0]}}</span>
    </div>
    <div class="circle-container"></div>
  </header>
</template>
