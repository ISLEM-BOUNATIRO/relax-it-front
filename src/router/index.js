import { createRouter, createWebHistory } from "vue-router";
import store from '@/store'

import LoginPage from '@/views/LoginPage.vue'

import DashBoard from '@/views/DashBoard.vue'

import ScanEquipmentsVue from "@/views/managments/ScanEquipments.vue";

import ManageDevicesVue from "@/views/managments/ManageDevices.vue"
import NewDeviceVue from "@/views/managments/ManageDevices/NewDevice.vue"
import EditDeviceVue from "@/views/managments/ManageDevices/EditDevice.vue"
import AccessDeviceVue from "@/views/managments/ManageDevices/AccessDevice.vue"

import ManageScriptsVue from "@/views/managments/ManageScripts.vue"
import NewScriptVue from "@/views/managments/ManageScripts/NewScript.vue"
import EditScriptVue from "@/views/managments/ManageScripts/EditScript.vue"

import ManageGroupsVue from "@/views/managments/ManageGroups.vue"
import NewGroupVue from "@/views/managments/ManageGroups/NewGroup.vue"
import EditGroupVue from "@/views/managments/ManageGroups/EditGroup.vue"

import ManageUsersVue from "@/views/managments/ManageUsers.vue"
import NewUserVue from "@/views/managments/ManageUsers/NewUser.vue"
import EditUserVue from "@/views/managments/ManageUsers/EditUser.vue"

import ManageOfficesVue from "@/views/managments/ManageOffices.vue"
import NewOfficeVue from "@/views/managments/ManageOffices/NewOffice.vue"
import EditOfficeVue from "@/views/managments/ManageOffices/EditOffice.vue"


const routes = [
    {
        path: '/',
        name: 'LoginPage',
        component: LoginPage,
        meta: { layout: 'empty-layout' }
    },
    {
        path: '/DashBoard',
        name: 'DashBoard',
        component: DashBoard,
    },
    {
        path: '/ScanEquipments',
        name: 'ScanEquipments',
        component: ScanEquipmentsVue,
    },
    {
        path: '/ManageScripts',
        name: 'ManageScripts',
        component: ManageScriptsVue,
    }, {
        path: '/NewScript',
        name: 'NewScript',
        component: NewScriptVue,
    },
    {
        path: '/EditScript/:name',
        name: 'EditScript',
        component: EditScriptVue,
    },
    {
        path: '/ManageGroups',
        name: 'ManageGroups',
        component: ManageGroupsVue,
    }, {
        path: '/NewGroup',
        name: 'NewGroup',
        component: NewGroupVue,
    },
    {
        path: '/EditGroup/:name',
        name: 'EditGroup',
        component: EditGroupVue,
    },
    {
        path: '/ManageUsers',
        name: 'ManageUsers',
        component: ManageUsersVue,
    },
    {
        path: '/NewUser',
        name: 'NewUser',
        component: NewUserVue,
    },
    {
        path: '/EditUser/:username',
        name: 'EditUser',
        component: EditUserVue,
    },
    {
        path: '/ManageOffices',
        name: 'ManageOffices',
        component: ManageOfficesVue,
    },
    {
        path: '/NewOffice',
        name: 'NewOffice',
        component: NewOfficeVue,
    },
    {
        path: '/EditOffice/:name',
        name: 'EditOffice',
        component: EditOfficeVue,
    },
    {
        path: '/ManageDevices',
        name: 'ManageDevices',
        component: ManageDevicesVue,
    },
    {
        path: '/NewDevice',
        name: 'NewDevice',
        component: NewDeviceVue,
    },
    {
        path: '/EditDevice/:ip',
        name: 'EditDevice',
        component: EditDeviceVue,
    },
    {
        path: '/AccessDevice',
        name: 'AccessDevice',
        component: AccessDeviceVue,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
router.beforeEach(async (to, from, next) => {
    window.scrollTo(0, 0)
    let connected = (store.getters.getLoginStatus == "connected")
    if (!connected && to.name !== 'LoginPage') {
        next({ name: 'LoginPage' })
    }
    else
        next()
})
export default router
