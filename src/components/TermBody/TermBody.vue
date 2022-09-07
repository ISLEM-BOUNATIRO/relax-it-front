<script setup lang="ts">
import { io } from "socket.io-client";
const directory = useDirectoryStore()
const isWelcomeShow = ref(true)

// 执行指令
const executing = () => {
  const commandStr = commandInput.value.trim()
  const simpleCommand = commandStr.split(' ')[0]
  if (simpleCommand === 'clear') {
    isWelcomeShow.value = false
    commandInput.value = ''
    return void directory.clearShowCommands()
  }
  // prettier-ignore

  console.log(simpleCommand)
  type Options = keyof typeof directory;
  if (directory[simpleCommand as Options]) {
    void (
      directory[simpleCommand as Options] as (...args: unknown[]) => unknown
    )(commandStr)
  } else {
    directory.handleOther(commandStr)
  }
  start = directory.showCommands.length - 1
  commandInput.value = ''
}


const socket = io('localhost:5000');

let vm = this
socket.on('message', function (msg: string) {
  //console.log(msg)
  if (!msg.includes("offline"))
    directory.addShowCommand({
      commandStr: "a",
      type: 'success',
      description: msg
    })

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
  socket.emit('scan_bp', "192.168.217.0")
  clear_all();

  watch(directory.showCommands, async () => {
    await nextTick()
      ; //(termBody.value as HTMLElement).scrollIntoView(false)
  })
})
onUnmounted(() => {
  socket.disconnect()
})

// 实现上下键 pageup pagedown 点击切换历史命令
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
      <!-- 历史命令区域 HistoryCommand -->
      <HistoryCommand v-for="command of directory.showCommands" :key="command.commandStr" :command="command">
        <template #history-command>
          <div class="command-input">{{ command.commandStr }}</div>
        </template>
      </HistoryCommand>
      <!-- 命令输入框区域 InputCommand -->
      <InputCommand v-if="directory.we_are_excuting" ref="inputCommandRef" v-model="commandInput"
        @keydown.enter="executing" :isInput="true">
        <template #show-area>
          <div></div>
        </template>
      </InputCommand>
    </div>
  </main>
</template>
