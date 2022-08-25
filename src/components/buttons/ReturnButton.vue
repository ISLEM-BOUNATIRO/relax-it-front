<script setup></script>
  <template >

  <div class="flex justify-end py-2 sm:px-6 lg:px-8">
    <router-link :to="{ path: route }">

      <button @click="$store.commit('updateView', { view: viewTitle })"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded relative bottom-0 right-0 ">
        RETURN
      </button>

    </router-link>
  </div>

</template>  

<script>
export default {
  props: {
    viewTitle: String,
    route: String
  },

}

</script>