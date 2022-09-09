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
        usersList: []
    }), computed: {
        // a computed getter
        filteredUsers() {
            var users = [];
            if (users != []) {
                for (var i = 0; i < this.usersList.length; i++) {
                    if (this.usersList[i].username.includes(this.search) || this.usersList[i].email.includes(this.search) || this.search == "") {
                        users.push(this.usersList[i])
                    }
                }
            }
            return users

        }
    },
    methods: {
        goToUser(item) {
            this.$store.commit('updateUserView', { view: 'Modify User', user: item })
        },

    },
    created: function () {
        axios(this.$store.getters.getIP + '/api/users',
            {

            })
            .then(response => {
                this.usersList = response.data
            })
    }
}
</script>
<template>
    <div class="flex flex-col items-center justify-center  bg-gray-100">
        <LargeButton class="m-4"
            @click="$router.push('/NewUser'), $store.commit('updateUserView', { view: 'New User' })"
            buttonText=" Add new user">

        </LargeButton>
        <input spellcheck="false" v-on:input="applySearch" v-model="search"
            class="  px-6 py-2.5 w-1/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username / email " />




    </div>

    <div class=" flex flex-col">
        <div class="">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="min-w-full">
                        <thead class="bg-white border-b">
                            <tr>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    #
                                </th>

                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Username
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Email
                                </th>

                            </tr>
                        </thead>
                        <tbody v-if="usersList != []">
                            <!--ON CLICK TAKES YOU TO THE USER-->
                            <tr v-for="item in filteredUsers" :key="item.id"
                                @click="$router.push('/EditUser/' + item.username)"
                                class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.id
                                }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ item.username }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ item.email }}
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <ReturnButtonVue viewTitle="Main Menu" route="/DashBoard" />

</template >

