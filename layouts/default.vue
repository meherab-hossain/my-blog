<template>
   <v-app>
      <Sidebar/>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
   </v-app>
</template>

<script>
import Sidebar from '../includes/Sidebar'
export default {
  components:{
    Sidebar
  },
  data () {
    return {
      
    }
  }
}
</script>
