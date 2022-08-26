<script setup>
import ReturnButtonVue from '@/components/buttons/ReturnButton.vue';
import axios from 'axios'
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any'
</script>
<template>
    <div class="flex items-center justify-center bg-gray-100 ">
        <TermContainer class="mx-8 mt-8"></TermContainer>
    </div>
    <ReturnButtonVue viewTitle="Manage Devices" route="/Managedevices" />
</template>
