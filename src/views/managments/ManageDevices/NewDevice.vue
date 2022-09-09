<script setup>
import ReturnButtonVue from '@/components/buttons/ReturnButton.vue';
import axios from 'axios'
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any'
</script>
<template>

    <div v-if="state === 'not yet'" class="flex items-center justify-center  bg-gray-100">
        <div class="px-4 py-2 mx-4 mt-4 text-left bg-white shadow-lg md:w-9/12 lg:w-9/12 sm:w-9/12">

            <div class="mt-2">
                <label class="block" for="ip">Device Ip</label>
                <input spellcheck="false" id="ip-field" v-model="ip" type="text"
                    class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                <div v-if="searched">
                    <label class="block">Hostname</label>
                    <input spellcheck="false" v-model="hostname" type="text" disabled
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    <label class="block" for="type">Type</label>
                    <input spellcheck="false" v-model="type" type="text" disabled
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    <label class="block" for="vendor">Vendor</label>
                    <input spellcheck="false" v-model="vendor" type="text" disabled
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    <label class="block" for="model">Model</label>
                    <input spellcheck="false" v-model="model" type="text" disabled
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    <label class="block" for="serial_number">Serial Number</label>
                    <input spellcheck="false" v-model="serial_number" type="text" disabled
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    <label class="block" for="firmware_version">Firmware Version</label>
                    <input spellcheck="false" v-model="firmware_version" type="text" disabled
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

    <div v-if="state === 'Added'"
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
        hostname: "",
        searched: false,
        state: "not yet"
    }), methods: {
        async addDevice() {
            try {
                const result = await axios.post(this.$store.getters.getIP + '/api/devices', { ip: this.ip, hostname: this.hostname, type: this.type, vendor: this.vendor, model: this.model, serial_number: this.serial_number, firmware_version: this.firmware_version })
                if (result.data['result'] === "1") {
                    this.state = "Added"
                } else {
                    this.ip = result.data['result']

                }
            } catch (error) {
                console.log(error);
            }
            window.scrollTo(0, 0)
        },
        async getInfo() {

            const result = await axios.post(this.$store.getters.getIP + '/api/get_device_info', { ip: this.ip });
            if (result.data['ip']) {
                this.type = result.data['type'];
                this.vendor = result.data['vendor'];
                this.hostname = result.data['hostname'];
                this.model = result.data['model'];
                this.serial_number = result.data['serial_number'];
                this.firmware_version = result.data['firmware_version'];
            }
            document.getElementById("ip-field").disabled = true;
            this.searched = true;
        }
    }
}

</script>