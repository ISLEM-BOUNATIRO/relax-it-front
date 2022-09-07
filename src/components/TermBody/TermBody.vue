<script setup lang="ts">
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
const executing2 = () => {
  isWelcomeShow.value = false
  commandInput.value = ''
  directory.clearShowCommands()

}

const commandInput = ref('')
const termBody = ref<HTMLElement | null>(null)

onMounted(() => {
  //CLEAR
  executing2();

  watch(directory.showCommands, async () => {
    await nextTick()
      ; //(termBody.value as HTMLElement).scrollIntoView(false)
  })
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
      <!-- 历史命令区域 HistoryCommand -->
      <HistoryCommand v-for="command of directory.showCommands" :key="command.commandStr" :command="command">
        <template #history-command>
          <div class="command-input">{{ command.commandStr }}</div>
        </template>
      </HistoryCommand>
      <!-- 命令输入框区域 InputCommand -->
      <InputCommand ref="inputCommandRef" v-model="commandInput" @keydown.enter="executing" :isInput="true">
        <template #show-area>
          <div></div>
        </template>
      </InputCommand>
    </div>
  </main>
</template>
<script lang="ts">
import { io } from "socket.io-client";
export default {
  data() {
    return {
      output: "",
      socket: null,

    }
  },
  methods: {
    send_msg() {
      //this.socket.emit('scan_bp', "192.168.217.0")
      this.socket.emit('scan_bp', "192.168.217.0")
    },
    add_message(msg: String) {
      // console.log('msg frmo method', msg)

      this.output = this.output + msg + "\n"
    }
  },
  created() {

    // io.on("connection", (socket) => {
    //     this.socket = socket
    // });
    this.socket = io('localhost:5000');
  },
  mounted() {

    let vm = this
    this.socket.on('message', function (msg: String) {
      // console.log(msg)
      vm.add_message(msg)
    })
  }
}
</script>
