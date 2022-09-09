<script setup>
const UnderlineColor = {
    pink: 'block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500 focus:border-pink-500',
    blue: 'block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-blue-500 focus:border-blue-500',
    green: 'block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-green-500 focus:border-green-500',
    red: 'block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500 focus:border-red-500',
    yellow: 'block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-yellow-500 focus:border-yellow-500',
    white: 'block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-white focus:border-white',
    purple: 'block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500 focus:border-purple-500',
}
</script>
<template>
    <li class="mr-3 flex-1">
        <a :class="UnderlineColor[buttonStyle]">
            <i :class=buttonIcon></i><span
                class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">{{
                buttonText }}</span>
        </a>
    </li>
</template>
<script>
export default {
    props: {
        buttonText: String,
        buttonIcon: String,
        buttonStyle: String,
        buttonRoute: String

    },

}
</script>