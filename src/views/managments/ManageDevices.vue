<script setup>
import ReturnButtonVue from '@/components/buttons/ReturnButton.vue';
import LargeButton from "@/components/buttons/LargeButton.vue";
import axios from 'axios'
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any'

</script>
<script>
export default {
    name: "App",
    data: () => ({
        search: "",
        devicesList: [],
        devicesToAdd: [],
        allSelected: false,
        groupsList: [],
        group: "",
        toAdd: 1,
        result: "not yet"
    }), computed: {
        // a computed getter
        filteredDevices() {
            var devices = []
            if (devices != []) {
                for (var i = 0; i < this.devicesList.length; i++) {
                    if (this.devicesList[i].ip.includes(this.search) || this.search == "") {
                        devices.push(this.devicesList[i])
                    }
                }
            }
            return devices

        }
    },
    methods: {
        selectAll() {
            this.devicesToAdd = []
            if (!this.allSelected) {
                for (var i = 0; i < this.filteredDevices.length; i++) {
                    this.devicesToAdd.push(this.filteredDevices[i].ip)
                }
            }

            this.allSelected = !this.allSelected
        },
        async addMembers() {
            try {
                this.result = await axios.post(this.$store.getters.getIP + '/api/groups/addmembers', { name: this.group, members: this.devicesToAdd.join(",") })
                this.result = this.result.data['result']
                if (this.result === "4") {
                    this.result = "MembersAdded"
                }
            } catch (error) {
                console.log(error)
            }
            window.scrollTo(0, 0)
        },

    },
    created: function () {
        axios(this.$store.getters.getIP + '/api/devices')
            .then(response => {
                this.devicesList = response.data
            })
        axios(this.$store.getters.getIP + '/api/groups')
            .then(response => {
                this.groupsList = response.data
            })
    }
}
</script>
<template>
    <div v-if="result === 'not yet'" class="flex flex-col items-center justify-center  bg-gray-100">
        <LargeButton class="m-4" @click="$router.push('/NewDevice')" buttonText=" Add new device">
        </LargeButton>
        <input spellcheck="false" v-on:input="applySearch" v-model="search"
            class="  px-6 py-2.5 w-1/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="device ip " />
    </div>

    <div v-if="result === 'not yet'" class=" flex flex-col">

        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
                <table class="min-w-full">
                    <thead class="bg-white border-b">
                        <tr>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                #
                            </th>

                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Ip
                            </th>

                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Type
                            </th>

                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Vendor
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Model
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Firmware Version
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                <input spellcheck="false" @click="selectAll"
                                    class=" cursor-pointer accent-emerald-500 text-sm font-medium" type="checkbox" />
                            </th>
                        </tr>
                    </thead>
                    <tbody v-if="filteredDevices != []">
                        <!--ON CLICK TAKES YOU TO THE USER-->
                        <tr v-for="item in filteredDevices" :key="item.id"
                            class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.id
                            }}
                            </td>
                            <td @click="$router.push('/EditDevice/' + item.ip)"
                                class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {{ item.ip }}
                            </td>
                            <td @click="$router.push('/EditDevice/' + item.ip)"
                                class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {{ item.type }}
                            </td>
                            <td @click="$router.push('/EditDevice/' + item.ip)"
                                class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {{ item.vendor }}
                            </td>
                            <td @click="$router.push('/EditDevice/' + item.ip)"
                                class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {{ item.model }}
                            </td>
                            <td @click="$router.push('/EditDevice/' + item.ip)"
                                class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {{ item.firmware_version }}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input spellcheck="false" v-model="devicesToAdd" type="checkbox"
                                    class="cursor-pointer accent-emerald-500 text-sm font-medium  " :value="item.ip" />

                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>

    </div>
    <div v-if="devicesToAdd.length > 0 && result === 'not yet'">
        <label> Selected Devices :</label>
        <h1>{{ devicesToAdd }}</h1>
        <button v-if="toAdd === 1" @click="toAdd = 2"
            class="content-center mx-8 mb-2 w-1/6 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            ADD TO GROUP
        </button>
        <select v-if="toAdd === 2" v-model="group"
            class="px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
            <option v-for="group_select in groupsList" :key="group_select.id" :value="group_select.name">
                {{ group_select.name }}</option>
        </select>
        <button @click="addMembers" v-if="toAdd === 2"
            class="content-center mx-8 mb-2 w-1/6 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            ADD
        </button>
    </div>
    <div v-if="result === 'MembersAdded'"
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
            <span class="font-medium">The devices have been added to the group!</span>
        </div>
    </div>
    <ReturnButtonVue viewTitle="Main Menu" route="/DashBoard" />

</template >

