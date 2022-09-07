<template>
    <div>
        <button
            class="content-center mx-20 mb-2 w-1/3 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            @click="send_msg">Button</button>
        <label class="block">Output</label>
        <textarea v-model="output" rows="8" type="text" placeholder="output"
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"></textarea>
    </div>
    <div class="flex items-center justify-center bg-gray-100 ">
        <TermContainer class="mx-8 mt-8"></TermContainer>
    </div>
</template>
<script>
//const directory = useDirectoryStore()
import { io } from "socket.io-client";
export default {
    data() {
        return {
            output: "",
            socket: null,

        }
    }/*,
    methods: {
        send_msg() {
            //directory.we_are_excuting = !directory.we_are_excuting
            //this.socket.emit('scan_bp', "192.168.217.0")
            this.socket.emit('scan_bp', "192.168.217.0")
        },
        add_message(msg) {
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
        this.socket.on('message', function (msg) {
            // console.log(msg)
            vm.add_message(msg)
        })
    }*/
}
</script>