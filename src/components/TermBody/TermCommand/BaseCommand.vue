<script setup lang="ts">
interface Props {
  modelValue?: string
}
defineProps<Props>()
</script>

<template>

  <div class="pt-3 pr-5">
    <div class="flex items-center">
      <span class="text-lg font-bold text-[#1aa8ae]">❯</span>
      <slot name="history-command"></slot>
      <slot name="input-area"></slot>
    </div>
    <slot name="show-area">
      <div></div>
    </slot>
  </div>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue'
</script>
