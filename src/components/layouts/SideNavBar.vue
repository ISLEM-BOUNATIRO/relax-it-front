<script setup>
import SideButtonVue from '@/components/buttons/SideButton.vue';

const directory = useDirectoryStore()
</script>
<template>
    <nav aria-label="alternative nav">
        <div
            class="bg-gray-800 shadow-xl h-20 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 content-center">

            <div
                class="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
                <ul class="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
                    <SideButtonVue
                        @click="$router.push({ name: 'DashBoard'}), $store.commit('updateView', { view: 'Main Menu' })"
                        buttonText="Dashboard" buttonIcon="fas fa-home pr-0 md:pr-3" buttonStyle="white" />
                    <SideButtonVue
                        @click="$router.push({ name: 'ScanEquipments'}), $store.commit('updateView', { view: 'Scan Equipments' }),directory.socket_message = ''"
                        buttonText="Scan" buttonIcon="fas fa-search pr-0 md:pr-3" buttonStyle="green" />
                    <SideButtonVue
                        @click="$router.push({ name: 'ManageDevices'}), $store.commit('updateView', { view: 'Manage Devices' }),directory.socket_message = ''"
                        buttonText="Devices" buttonIcon="fas fa-server pr-0 md:pr-3" buttonStyle="blue" />
                    <SideButtonVue
                        @click="$router.push({ name: 'ManageScripts'}), $store.commit('updateView', { view: 'Manage Scripts' })"
                        buttonText="Scripts" buttonIcon="fas fa-tasks pr-0 md:pr-3" buttonStyle="purple" />
                    <SideButtonVue
                        @click="$router.push({ name: 'ManageGroups'}), $store.commit('updateView', { view: 'Manage Groups' })"
                        buttonText="Groups" buttonIcon="fas fa-inbox pr-0 md:pr-3" buttonStyle="red" />
                    <SideButtonVue
                        @click="$router.push({ name: 'ManageUsers'}), $store.commit('updateView', { view: 'Manage Users' })"
                        buttonText="Users" buttonIcon="fas fa-users pr-0 md:pr-3" buttonStyle="pink" />
                    <SideButtonVue
                        @click="$router.push({ name: 'ManageOffices'}), $store.commit('updateView', { view: 'Manage Offices' })"
                        buttonText="Offices" buttonIcon="fas fa-building pr-0 md:pr-3" buttonStyle="yellow" />
                </ul>
            </div>


        </div>
    </nav>
</template>