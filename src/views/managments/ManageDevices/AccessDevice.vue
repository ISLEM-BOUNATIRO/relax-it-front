<script setup>
import ReturnButtonVue from '@/components/buttons/ReturnButton.vue';
import axios from 'axios'
import { useRoute } from 'vue-router';
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any'
const directory = useDirectoryStore()

</script>
<template>

    <div v-if="directory.socket_message!=''" class="flex items-center justify-center bg-gray-100 ">
        <TermContainer class="mx-8 mt-8"></TermContainer>
    </div>
    <div v-else>
        <LargeButton class="m-4" @click="accessTelnet" buttonText=" Use Telnet">
        </LargeButton>
        <LargeButton class="m-4" @click="accessTelnet" buttonText=" Use Ssh">
        </LargeButton>
    </div>
    <ReturnButtonVue viewTitle="Manage Devices" :route=return_route />
</template>
<script>
export default {
    data: () => ({
        ip: "",
        return_route: "/EditDevice/"
    }),
    methods: {
        accessTelnet() {
            this.directory.we_are_excuting = true
            this.directory.socket_arg = this.ip
            //ORDER IS IMPORTANT  socket_message HAS TO BE LAST 
            this.directory.socket_message = "access_telnet"
        },
        accessSsh() {
            this.directory.we_are_excuting = true
            this.directory.socket_arg = this.ip
            //ORDER IS IMPORTANT  socket_message HAS TO BE LAST 
            this.directory.socket_message = "access_ssh"

        }
    },
    created: function () {

        const route = useRoute()

        this.ip = route.params.ip
        this.return_route = this.return_route + this.ip
        this.directory.we_are_excuting = false
        this.directory.socket_message = ""
        this.directory.terminal_header = ""




    }
}

</script>