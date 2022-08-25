
<script setup>
import ScanCardVue from '@/components/cards/ScanCard.vue';
import ManageDevicesCardVue from '@/components/cards/ManageDevicesCard.vue';
import ManageScriptsCardVue from '@/components/cards/ManageScriptsCard.vue';
import ManageGroupsCardVue from '@/components/cards/ManageGroupsCard.vue';
import UsersCardVue from '@/components/cards/UsersCard.vue';
import PostOfficeVue from '@/components/cards/PostOffice.vue';

</script>
<template>
    <div class="flex flex-wrap">
        <div @click="$router.push('/ScanEquipments'), $store.commit('updateView', { view: 'Scan Equipments' })"
            class="w-full md:w-1/2 xl:w-1/3 p-6">
            <ScanCardVue />
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
            <div @click="$router.push('/ManageDevices'), $store.commit('updateView', { view: 'Manage Devices' })">
                <ManageDevicesCardVue />
            </div>

        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
            <div @click="$router.push('/ManageScripts'), $store.commit('updateView', { view: 'Manage Scripts' })">
                <ManageScriptsCardVue />
            </div>

        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
            <div @click="$router.push('/ManageGroups'), $store.commit('updateView', { view: 'Manage Groups' })">
                <ManageGroupsCardVue />
            </div>

        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
            <div @click="$router.push('/ManageUsers'), $store.commit('updateView', { view: 'Manage Users' })">
                <UsersCardVue />
            </div>

        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
            <div @click="$router.push('/ManageOffices'), $store.commit('updateView', { view: 'Manage Offices' })">
                <PostOfficeVue />
            </div>

        </div>
    </div>
</template>

