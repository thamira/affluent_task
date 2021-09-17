<template>
  <v-app>
    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <PostsList :postlabel="'Posts'" :posts="postsData" :perPage="10"></PostsList>
      </v-container>
  </v-main>
  </v-app>
</template>

<script>
  import {mapGetters} from "vuex"
  import PostsList from "../components/PostsList.vue"

  export default {
    name: 'Posts',
    data: () => ({   
    }),
    components:{
      PostsList
    },
    computed:{
      ...mapGetters(["postsData"]),
    },
    mounted() {
      this.$store.dispatch("postsData");
    }    
  }
</script>
