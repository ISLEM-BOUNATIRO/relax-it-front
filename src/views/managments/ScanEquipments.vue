<script setup>
import ReturnButtonVue from '@/components/buttons/ReturnButton.vue';
</script>
<template>
    <div class="grid grid-cols-4 gap-4">
        <div>01</div>
        <div>01</div>
        <div>01</div>
        <div>01</div>
        <div>01</div>
        <div>01</div>
        <div>01</div>
        <div>01</div>
        <div>01</div>
    </div>

    <ReturnButtonVue viewTitle="Main Menu" route="/DashBoard" />

</template>

<script>
export default {
    methods: {

    }
}
</script>