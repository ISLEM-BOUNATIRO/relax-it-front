<template>
    <div>
        <button type="button"
            class="content-center mt-10 mx-20 mb-2 w-1/3 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Scan BP
        </button>

        <label class="block" for="content">Command Output</label>
        <textarea v-model="output" rows="8" type="text" placeholder="Content"
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"></textarea>
        <span v-for="message in this.received_messages" :key="message">{{ message }}</span>
    </div>
</template>
<script>
import { io } from "socket.io-client";
export default {
    data() {
        return {
            socket: null,
            output: "",
            received_messages: []
        }
    },
    methods: {
        send_msg() {
            this.socket.emit('message', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        },
        add_message(msg) {
            this.received_messages.push(msg)
            //this.output = this.output + " , " + msg
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
        this.socket.on('message', function (msg) {
            // console.log(msg)
            vm.add_message(msg)
        })
    }
}
</script>