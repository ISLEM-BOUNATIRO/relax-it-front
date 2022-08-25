<script setup>
import ReturnButtonVue from '@/components/buttons/ReturnButton.vue';
import axios from 'axios'
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any'
import { useRoute } from 'vue-router';
</script>
<template>

    <div v-if="result === 'not yet'" class="flex items-center justify-center  bg-gray-100">
        <div class="px-4 py-2 mx-4 mt-4 text-left bg-white shadow-lg md:w-9/12 lg:w-9/12 sm:w-9/12">
            <div class="mt-2">
                <div>
                    <label class="block" for="ip">Device Ip</label>
                    <input v-model="ip" type="text" disabled
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    <label class="block" for="type">Type</label>
                    <input v-model="type" type="text" disabled
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    <label class="block" for="vendor">Vendor</label>
                    <input v-model="vendor" type="text" disabled
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    <label class="block" for="model">Model</label>
                    <input v-model="model" type="text" disabled
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    <label class="block" for="serial_number">Serial Number</label>
                    <input v-model="serial_number" type="text" disabled
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    <label class="block" for="firmware_version">Firmware Version</label>
                    <input v-model="firmware_version" type="text" disabled
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                </div>
                <div class="flex flex-col">
                    <button @click="editDevice"
                        class="w-full px-6 py-2 mt-2 my-1 text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-900">
                        Apply changes
                    </button>
                    <button @click="deleteDevice"
                        class="w-full px-6 py-2 my-1 bg-red-600 hover:bg-red-700 text-white  font-medium rounded-lg">
                        <div class=" inline-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                </path>
                            </svg>
                            Delete
                        </div>

                    </button>
                </div>

            </div>
        </div>
    </div>

    <div v-if="result === 'Edited'"
        class="flex p-4 mt-2 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
        role="alert">
        <svg aria-hidden="true" class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"></path>
        </svg>
        <span class="sr-only">Info</span>
        <div>
            <span class="font-medium">device edited
                successfully!</span>
        </div>
    </div>

    <div v-if="result === 'Deleted'"
        class="flex p-4 mt-2 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
        role="alert">
        <svg aria-hidden="true" class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"></path>
        </svg>
        <span class="sr-only">Info</span>
        <div>
            <span class="font-medium">device deleted
                successfully!</span>
        </div>
    </div>

    <ReturnButtonVue viewTitle="Manage Devices" route="/Managedevices" />
</template>

<script>
export default {
    created: async function () {
        const route = useRoute()

        const response = await axios.post(this.$store.getters.getIP + '/api/device', { "ip": route.params.ip }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });


        this.ip = response.data.ip
        this.type = response.data.type
        this.vendor = response.data.vendor
        this.model = response.data.model
        this.serial_number = response.data.serial_number
        this.firmware_version = response.data.firmware_version


    },
    data: () => ({
        ip: "",
        type: "",
        vendor: "",
        model: "",
        serial_number: "",
        firmware_version: "",
        result: "not yet"
    }), methods: {
        async editDevice() {
            try {
                this.result = await axios.post(this.$store.getters.getIP + '/api/devices/edit', { ip: this.ip, type: this.type, vendor: this.vendor, model: this.model, serial_number: this.serial_number, firmware_version: this.firmware_version })
                this.result = this.result.data['result']
                if (this.result === "3") {
                    this.result = "Edited"
                }
            } catch (error) {
                console.log(error);
            }
            window.scrollTo(0, 0)
        },
        async deleteDevice() {
            try {
                this.result = await axios.post(this.$store.getters.getIP + '/api/devices/delete', { ip: this.ip }
                    , {}
                )
                this.result = this.result.data['result']
                if (this.result === "2") {
                    this.result = "Deleted"
                }
            } catch (error) {
                console.log(error);
            }
            window.scrollTo(0, 0)
        },
    }
}

</script>