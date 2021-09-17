<template>
  <v-app id="User">

    <LeftMenu/>
  
     
    <router-view />

  </v-app>
</template>

<script>

	import LeftMenu from '../components/LeftMenu.vue'
  export default {
    name: 'Layout',
    data: () => ({      
    }),
    components:{
      LeftMenu
    },
   
  }
</script>    