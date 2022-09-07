<script setup lang="ts">
interface TermMessageProps {
  type: 'info' | 'error' | 'success' | 'warning'
  showTime?: boolean
}

const MessageToColor = {
  info: 'bg-blue-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-500',
  error: 'bg-red-700'
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { showTime = true } = defineProps<TermMessageProps>()
const getTime = () => new Date().toLocaleTimeString()
</script>

<template>
  <!--       
  <span v-if="showTime" class="pr-3">{{ getTime() }}</span>
-->
  <span :class="MessageToColor[type]">
    <slot>default</slot>
  </span>
</template>
