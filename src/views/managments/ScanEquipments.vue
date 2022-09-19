<script setup>
import ReturnButtonVue from '@/components/buttons/ReturnButton.vue';
import axios from 'axios'
const directory = useDirectoryStore()

</script>
<template>
    <div v-if="directory.socket_message!=''" class="flex items-center justify-center bg-gray-100 ">
        <TermContainer class="mx-8 mt-8"></TermContainer>
    </div>
    <span v-else>
        <label class="block" for="wilaya">Wilaya</label>
        <select v-model="wilaya"
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
            <option v-for="wilaya_select in list_wilaya" :key="wilaya_select.id" :value="wilaya_select.num">
                {{ wilaya_select.name }}</option>
        </select>
        <label class="block" for="name">Wilaya subnet(/16) : {{"10." + (this.wilaya + 64) + ".0.0"}}</label>




        <LargeButton class="m-4" @click="scanWilaya" buttonText=" Scan wilaya">
        </LargeButton>
        <label class="block" for="name">Office Subnet /24</label>
        <input spellcheck="false" v-model="office_subnet" type="text"
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">

        <LargeButton class="m-4" @click="scanOffice" buttonText=" Scan Office">
        </LargeButton>
    </span>

    <ReturnButtonVue viewTitle="Main Menu" route="/DashBoard" />

</template>
<script>
export default {
    data: () => ({
        wilaya_number: 31,
        office_subnet: "10.95.15.0",
        list_wilaya: [],
        wilaya: 0,
    }),
    methods: {
        scanOffice() {
            this.directory.we_are_excuting = false
            this.directory.socket_arg = this.office_subnet
            //ORDER IS IMPORTANT  socket_message HAS TO BE LAST 
            if (this.office_subnet != "")
                this.directory.socket_message = "scan_bp"

        },
        scanWilaya() {

            this.directory.we_are_excuting = false
            this.directory.socket_arg = "10." + (this.wilaya + 64) + ".0.0"
            //ORDER IS IMPORTANT  socket_message HAS TO BE LAST 
            if (this.wilaya != 0)
                this.directory.socket_message = "scan_wilaya";
        }
    },
    created: function () {
        this.directory.we_are_excuting = false
        this.directory.socket_message = ""
        this.directory.terminal_header = ""

        axios(this.$store.getters.getIP + '/api/wilayas')
            .then(response => {
                this.list_wilaya = response.data
            })


    }
}

</script>

