<script setup lang="ts">
const { commandScript } = useDirectoryStore()
</script>

<template>
  <div v-for="item of commandScript" :key="item[0]">
    <TermMessage type="success" :showTime="false">###### </TermMessage>{{ item[0] }}

  </div>
</template>
