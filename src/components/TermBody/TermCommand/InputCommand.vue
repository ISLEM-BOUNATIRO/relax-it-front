<script setup lang="ts">
interface Props {
  isInput?: boolean
  modelValue?: string
}

const { currentFullPath } = storeToRefs(useDirectoryStore())
const { isValidCommand } = useDirectoryStore()


// eslint-disable-next-line vue/no-setup-props-destructure
const { isInput = false } = defineProps<Props>()

const VFocus = {
  mounted: (el: HTMLInputElement) => {
    el.focus()
  }
}


const commandInputRef = ref<HTMLInputElement | null>(null)
watchEffect(() => {
  useGlobalFocus(commandInputRef)
})

const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <BaseCommand>
    <template #input-area>
      <input spellcheck="false" v-if="isInput" type="text" class="command-input" :class="{ 'text-green-400': true }"
        v-focus ref="commandInputRef" :value="modelValue" @input="
          emits('update:modelValue', ($event.target! as HTMLInputElement).value)
        " />
    </template>
  </BaseCommand>
</template>
