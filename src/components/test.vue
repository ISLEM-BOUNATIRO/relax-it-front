<template>
    <div>
        <button @click="send_msg">Button</button>
        <span v-for="message in this.received_messages" :key="message" >{{ message }}</span>
    </div>
</template>
<script>
import { io } from "socket.io-client";
export default {
    data(){
        return {
            socket: null,
            received_messages: []
        }
    },
    methods:{
        send_msg(){
            this.socket.emit('message', [0,1,2,3,4,5,6,7,8,9])
        },
        add_message(msg){
            // console.log('msg frmo method', msg)
            this.received_messages.push(msg)
        }
    },
    created(){
        
        // io.on("connection", (socket) => {
        //     this.socket = socket
        // });
        this.socket = io('localhost:5000');
    },
    mounted(){
        let vm = this
        this.socket.on('message',function(msg){
            // console.log(msg)
            vm.add_message(msg)
        })
    }
}
</script>