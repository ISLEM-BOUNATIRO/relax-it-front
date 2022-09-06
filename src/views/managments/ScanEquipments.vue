<script setup>
import ReturnButtonVue from '@/components/buttons/ReturnButton.vue';
import testVue from '@/components/test.vue';
</script>
<template>
    <testVue />
    <br />

    <ReturnButtonVue viewTitle="Main Menu" route="/DashBoard" />

</template>

<script>
export default {
    methods: {

    }
}
</script>