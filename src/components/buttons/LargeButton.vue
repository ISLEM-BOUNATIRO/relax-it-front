<template>

    <button type="button"
        class="content-center mx-20 mb-2 w-1/3 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">

        {{ buttonText }}

    </button>

</template>

<script>
export default {
    props: { buttonText: String },
}
</script>