<script setup lang="ts">
import { io } from "socket.io-client";
const directory = useDirectoryStore()
const isWelcomeShow = ref(true)
const socket = io('localhost:5000');

const executing = () => {
  const commandStr = commandInput.value.trim()
  socket.emit(directory.socket_message, directory.socket_arg + "&&&&" + commandStr);
}



socket.on('message', function (msg: string) {
  const b = !directory.we_are_excuting
  if (msg.includes("#"))
    directory.addShowCommand({
      commandStr: commandInput.value.trim(),
      type: '',
      description: msg
    });
  else if (msg.includes("added") && b)
    directory.addShowCommand({
      commandStr: "a",
      type: 'success',
      description: msg
    });
  else if (msg.includes("%") && b)
    directory.terminal_header = msg
  else if (msg.includes("attention") && b) {

    directory.addShowCommand({
      commandStr: "a",
      type: 'warning',
      description: msg.replace("attention", "")
    });
  }
  else if (b)
    directory.addShowCommand({
      commandStr: "a",
      type: 'info',
      description: msg
    });


})
const clear_all = () => {
  isWelcomeShow.value = false
  commandInput.value = ''
  directory.clearShowCommands()

}

const commandInput = ref('')
const termBody = ref<HTMLElement | null>(null)

onMounted(() => {
  //CLEAR
  if (!directory.we_are_excuting)
    socket.emit(directory.socket_message, directory.socket_arg);
  clear_all();

  watch(directory.showCommands, async () => {
    await nextTick();
    if (directory.we_are_excuting)
      (termBody.value as HTMLElement).scrollIntoView(false)
  })
})
onUnmounted(() => {
  socket.emit(directory.socket_message, directory.socket_arg + "exit");
  socket.disconnect()
})
let start = 0
const goToHistoryCommand = (keyName: string) => {
  if (directory.showCommands.length === 0) {
    return
  }
  if (start < 0 || start > directory.showCommands.length - 1) {
    start = directory.showCommands.length - 1
  }
  if (keyName === 'ArrowUp') {
    commandInput.value = directory.showCommands[start--].commandStr
  } else {
    commandInput.value = directory.showCommands[start++].commandStr
  }
}
useAddEventListener(document, 'keydown', ((e: KeyboardEvent) => {
  if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
    goToHistoryCommand(e.key)
  }
  // eslint-disable-next-line no-undef
}) as EventListener)
</script>

<template>
  <main class="box-body scrollbar">
    <div ref="termBody">
      <TermWelcome></TermWelcome>

      <HistoryCommand v-for="command of directory.showCommands" :key="command.commandStr" :command="command">
        <template #history-command>
          <div class="command-input">{{ command.commandStr }}</div>
        </template>
      </HistoryCommand>

      <InputCommand v-if="directory.we_are_excuting" ref="inputCommandRef" v-model="commandInput"
        @keydown.enter="executing" :isInput="true">
        <template #show-area>
          <div></div>
        </template>
      </InputCommand>
    </div>
  </main>
</template>
