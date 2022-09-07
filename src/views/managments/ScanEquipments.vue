<script setup>
import ReturnButtonVue from '@/components/buttons/ReturnButton.vue';
import testVue from '@/components/test.vue';
</script>
<template>
    <div class="flex items-center justify-center bg-gray-100 ">
        <TermContainer class="mx-8 mt-8"></TermContainer>
    </div>

    <ReturnButtonVue viewTitle="Main Menu" route="/DashBoard" />

</template>

<script>
export default {
    methods: {

    }
}
</script>