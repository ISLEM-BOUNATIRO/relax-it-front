<script setup>
import axios from 'axios'

const directory = useDirectoryStore()
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any'
</script>
<script>
export default {
  name: "LoginPage",
  data: () => ({ username: "", password: "" }),
  methods: {
    async redirectUser() {
      const response = await axios.post(this.$store.getters.getIP + '/login', { username: this.username, password: this.password })
      this.$store.commit('setLoginStatus', response.data['result'])
      let connected = (this.$store.getters.getLoginStatus == "connected")

      if (connected) {
        this.directory.current_user = this.username
        this.$store.commit('updateView', { view: 'Main Menu' })
        this.$store.commit('updateUserView', { view: 'User' })
        this.$router.push('/DashBoard')
      }
    }
  }
}
</script>
<template>
  <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
    <div className='hidden sm:block'>
      <img className='w-full h-full object-cover' src="../assets/login.jpg" alt="" />
    </div>

    <div className='bg-neutral-200 flex flex-col justify-center'>
      <div className='drop-shadow-lg hover:drop-shadow-xl max-w-[400px] w-full mx-auto bg-white p-4'>
        <h2 className='text-4xl font-bold text-center py-6'>RELAX-IT</h2>
        <div className='flex flex-col py-2'>
          <label>Username</label>
          <input spellcheck="false" v-model="username" className='border p-2' type="text" />
        </div>
        <div className='flex flex-col py-2'>
          <label>Password</label>
          <input spellcheck="false" v-model="password" className='border p-2' type="password" />
        </div>

        <button @click=redirectUser()
          className='border w-full my-5 py-2 bg-stone-900 hover:bg-stone-900 text-white'>Sign In</button>
        <div className='flex justify-between'>
        </div>
      </div>
    </div>
  </div>

</template>
