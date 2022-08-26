<script setup>
import ReturnButtonVue from '@/components/buttons/ReturnButton.vue';
import axios from 'axios'
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any'
</script>
<template>

    <div class="flex items-center justify-center  bg-gray-100">
        <div class="px-4 py-2 mx-4 mt-4 text-left bg-white shadow-lg md:w-full lg:w-full sm:w-full">
            <TermContainer></TermContainer>
        </div>
    </div>

    <ReturnButtonVue viewTitle="Manage Devices" route="/Managedevices" />
</template>
