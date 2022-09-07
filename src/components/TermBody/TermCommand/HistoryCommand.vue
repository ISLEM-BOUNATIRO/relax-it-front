<script setup lang="ts">
import type { Command } from '@/store/useDirectoryStore'

const { historyPath, showCommands, filesAndDirectories } = useDirectoryStore()
const { commandStr, isValid, type, description } =
  showCommands[showCommands.length - 1]

const [files, directories] = filesAndDirectories()

defineExpose<{
  command: Command
}>()

const isMessageShow = ref(true)
if (commandStr === '') {
  isMessageShow.value = false
}
</script>

<template>
  <BaseCommand>
    <!-- <template #path>
      <div>{{ historyPath }}</div>
    </template> -->
    <template #history-command>
      <div class="pl-5" :class="isValid ? 'text-green-500' : 'text-red-500'">
        {{ commandStr }}
      </div>
    </template>
    <template #show-area>
      <TermMessage v-if="isMessageShow " :type="type">{{ type }}
      </TermMessage>
      <span v-if="description && isMessageShow" class="break-words">
        &thinsp; {{ description }}
      </span>
      <TermWelcome v-if="commandStr.split(' ')[0] === 'welcome'" />
      <TermScript v-if="commandStr.split(' ')[0] === 'execute'" />
      <TermHelp v-else-if="commandStr.split(' ')[0] === 'help'" />
    </template>
  </BaseCommand>
</template>
