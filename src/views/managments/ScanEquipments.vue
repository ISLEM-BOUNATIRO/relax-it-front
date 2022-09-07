<script setup>
import ReturnButtonVue from '@/components/buttons/ReturnButton.vue';
import testVue from '@/components/test.vue';
const directory = useDirectoryStore()

</script>
<template>
    <div v-if="directory.socket_message!=''" class="flex items-center justify-center bg-gray-100 ">
        <TermContainer class="mx-8 mt-8"></TermContainer>
    </div>
    <span v-else>
        <LargeButton class="m-4" @click="scanWilaya" buttonText=" Scan wilaya">
        </LargeButton>
        <LargeButton class="m-4" @click="scanOffice" buttonText=" Scan Office">
        </LargeButton>
    </span>

    <ReturnButtonVue viewTitle="Main Menu" route="/DashBoard" />

</template>
<script>
export default {
    data: () => ({
        wilaya_number: 0,
        office_subnet: 0
    }),
    methods: {
        scanOffice() {
            this.directory.we_are_excuting = false
            this.directory.socket_arg = "192.168.217.0"
            //ORDER IS IMPORTANT  socket_message HAS TO BE LAST 
            this.directory.socket_message = "scan_bp"
            console.log(directory.socket_message)
        },
        scanWilaya() {
            this.directory.we_are_excuting = false
            this.directory.socket_arg = "104"
            //ORDER IS IMPORTANT  socket_message HAS TO BE LAST 
            this.directory.socket_message = "scan_wilaya"
        }
    },
    created: function () {
        this.directory.socket_message = ""

    }
}

</script>

