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
                    <label class="block" for="name">Group name</label>
                    <input v-model="name" type="text"
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        disabled>
                    <textarea v-model="description" type="text" placeholder="Description"
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"></textarea>
                    <div v-if="members.length > 0" class=" flex flex-col">

                        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hidden">
                                <table class="min-w-full">
                                    <thead class="bg-white border-b">
                                        <tr>
                                            <th scope="col"
                                                class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                #
                                            </th>

                                            <th scope="col"
                                                class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Ip
                                            </th>

                                            <th scope="col"
                                                class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Type
                                            </th>

                                            <th scope="col"
                                                class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Vendor
                                            </th>
                                            <th scope="col"
                                                class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Model
                                            </th>
                                            <th scope="col"
                                                class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Firmware Version
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!--ON CLICK TAKES YOU TO THE USER-->
                                        <tr v-for="item in members" :key="item.id"
                                            class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                                                    item.id
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

                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col">
                    <button @click="editGroup"
                        class="w-full px-6 py-2 mt-2 my-1 text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-900">
                        Apply changes
                    </button>
                    <button @click="deleteGroup"
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
            <span class="font-medium">Group edited
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
            <span class="font-medium">Group deleted
                successfully!</span>
        </div>
    </div>

    <ReturnButtonVue viewTitle="Manage Groups" route="/ManageGroups" />

</template>

<script>
export default {
    created: async function () {
        const route = useRoute()

        const response = await axios.post(this.$store.getters.getIP + '/api/group', { "name": route.params.name }).catch(function (error) {
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


        this.name = response.data.name
        this.description = response.data.description
        this.members_ip_list = response.data.members.split(",")

        const res = await axios.post(this.$store.getters.getIP + '/api/devicelist', { iplist: this.members_ip_list })
        this.members = res.data
    },
    data: () => ({
        name: "",
        description: "",
        members_ip_list: [],
        members: [],
        result: "not yet"
    }), methods: {
        async editGroup() {
            try {
                this.result = await axios.post(this.$store.getters.getIP + '/api/groups/edit', { name: this.name, members: this.members, description: this.description })
                this.result = this.result.data['result']
                if (this.result === "3") {
                    this.result = "Edited"
                }
            } catch (error) {
                console.log(error);
            }
            window.scrollTo(0, 0)
        },
        async deleteGroup() {
            try {
                this.result = await axios.post(this.$store.getters.getIP + '/api/groups/delete', { name: this.name })
                this.result = this.result.data['result']
                if (this.result === "2") {
                    this.result = "Deleted"
                }
            } catch (error) {
                console.log(error);
            }
            window.scrollTo(0, 0)
        },
    },

}

</script>