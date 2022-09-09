<script setup>
import ReturnButtonVue from '@/components/buttons/ReturnButton.vue';
import axios from 'axios'
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any'
</script>
<template>

    <div v-if="result === 'not yet'" class="flex items-center justify-center  bg-gray-100">
        <div class="px-4 py-2 mx-4 mt-4 text-left bg-white shadow-lg md:w-9/12 lg:w-9/12 sm:w-9/12">

            <div class="mt-2">
                <div>
                    <label class="block" for="name">Group name</label>
                    <input spellcheck="false" v-model="Groupname" type="text" placeholder="Group name"
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    <label class="block" for="description">Group description</label>
                    <textarea v-model="description" rows="8" type="text" placeholder="Description"
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"></textarea>

                </div>
                <div class="flex flex-col">
                    <button @click="addGroup"
                        class="w-full px-6 py-2 mt-2 my-1 text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-900">
                        Add Group
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
            <span class="font-medium">The new Group has been added
                successfully!</span>
        </div>
    </div>
    <ReturnButtonVue viewTitle="Manage Groups" route="/ManageGroups" />
</template>

<script>
export default {
    data: () => ({
        Groupname: "",
        description: "",
        Groupcontent: "",
        result: "not yet"
    }), methods: {
        async addGroup() {
            try {
                this.result = await axios.post(this.$store.getters.getIP + '/api/groups', { name: this.Groupname, content: this.Groupcontent, description: this.description, vendor: "" })
                this.result = this.result.data['result']
                if (this.result === "1") {
                    this.result = "Added"
                }
            } catch (error) {
                console.log(error);
            }

        },
    }
}

</script>