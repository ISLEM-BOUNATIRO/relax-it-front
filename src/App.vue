<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>
<script >
const navLayout = 'nav-layout'
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || navLayout)
    }
  }
}
</script>
