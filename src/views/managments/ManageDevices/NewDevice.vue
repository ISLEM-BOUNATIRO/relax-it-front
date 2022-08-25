<script setup>
import ReturnButtonVue from '@/components/buttons/ReturnButton.vue';
import axios from 'axios'
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any'
</script>
<template>

    <div v-if="result === 'not yet'" class="flex items-center justify-center  bg-gray-100">
        <div class="px-4 py-2 mx-4 mt-4 text-left bg-white shadow-lg md:w-9/12 lg:w-9/12 sm:w-9/12">

            <div class="mt-2">
                <label class="block" for="ip">Device Ip</label>
                <input id="ip-field" v-model="ip" type="text"
                    class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                <div v-if="searched">
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
                <div v-if="searched === false" class="flex flex-col">
                    <button @click="getInfo"
                        class="w-full px-6 py-2 mt-2 my-1 text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-900">
                        Get informations with device IP
                    </button>
                </div>
                <div v-else class="flex flex-col">
                    <button @click="addDevice"
                        class="w-full px-6 py-2 mt-2 my-1 text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-900">
                        Add Device
                    </button>
                </div>

            </div>
        </div>
    </div>

    <div v-if="result === 'Added'"
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
            <span class="font-medium">The new device has been added
                successfully!</span>
        </div>
    </div>
    <ReturnButtonVue viewTitle="Manage Devices" route="/Managedevices" />
</template>

<script>
export default {
    data: () => ({
        ip: "",
        type: "",
        vendor: "",
        model: "",
        serial_number: "",
        firmware_version: "",
        searched: false,
        result: "not yet"
    }), methods: {
        async addDevice() {
            try {
                this.result = await axios.post(this.$store.getters.getIP + '/api/devices', { ip: this.ip, type: this.type, vendor: this.vendor, model: this.model, serial_number: this.serial_number, firmware_version: this.firmware_version })
                this.result = this.result.data['result']
                if (this.result === "1") {
                    this.result = "Added"
                }
            } catch (error) {
                console.log(error);
            }
            window.scrollTo(0, 0)
        },
        getInfo() {
            document.getElementById("ip-field").disabled = true;
            this.searched = true
        }
    }
}

</script>