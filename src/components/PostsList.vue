<template>
  <div id="PostsList" v-if="posts.length>0">
     <v-text-field
        placeholder="Search Posts"
        filled
        rounded
        dense
        v-model="SearchPosts"
      ></v-text-field>  

      <v-row class="justify-end mt-2 mr-1">
        <v-btn
          :loading="loading"
          :disabled="IsDeleteEnabled"
          color="green"
          class="mt-2 white--text"
          @click="DeletePost()"
        >
          Delete Selected Posts
        </v-btn>          
      </v-row>

      <v-row>
        <v-col>
          <v-card>
            <v-subheader>{{ postlabel }}</v-subheader>
            <v-list two-line dense
              v-for="(item) in VisiblePosts"
              :key="item.id"            
            >

              <v-list-item>

                <v-list-item-avatar color="success">
                  <v-icon v-text="item.title.substring(0, 2)"></v-icon>
                </v-list-item-avatar>

                <v-list-item-content> 
                  <v-list-item-title>{{item.id}}. {{ item.title }}</v-list-item-title>

                  <v-list-item-subtitle>
                    {{item.body}}
                  </v-list-item-subtitle>

                  <v-btn :to="`/Post/${item.id}`" class="mt-3">Go to the Post</v-btn>
                  
                </v-list-item-content>

                 <v-checkbox
                    v-model="CheckedPosts"
                    color="success"
                    :value="item.id"
                    class="pr-5"
                  ></v-checkbox>                 
              </v-list-item>

            </v-list>
          </v-card>

        </v-col>
      </v-row>

      <v-pagination
        v-model="page"
        :length="Pageslength"
        :total-visible="perPage"
        class="mt-6"
      ></v-pagination>          
  </div>
  <div v-else="">
    <v-card>
      <v-card-text >
        <p class="font-weight-medium text-center mt-6">NOT FOUND POSTS FOR THIS USER</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import axios from 'axios';
  import {mapGetters} from "vuex";
  export default {
    name: 'PostsList',
    props: ['postlabel', 'posts', 'perPage'],
    data: () => ({
      page: 1,
      loading3: null,   
      SearchPosts: null,
      CheckedPosts: [],
      loading: false,
    }),
    watch:{
      SearchPosts(){
        this.VisiblePosts = this.posts.filter((post) => post.title.toLowerCase().includes(this.SearchPosts.toLowerCase()) && this.SearchPosts != '' );
      }
    }, 
    methods:{
      DeletePost(){
        if(this.CheckedPosts.length>0){
          this.loading = true
          this.CheckedPosts.forEach(id => {
            axios.delete('https://jsonplaceholder.typicode.com/posts/'+id).then((response) => {
              console.log(response);
              let filterdArray = this.VisiblePosts.filter((post)=>post.id != id)

              this.VisiblePosts = filterdArray.reverse();
              this.$toasted.show('Sucess...',{
                position: "bottom-right", 
                duration : 2000,
                class: 'toasting'
              });

              this.loading = false
              this.IsDeleteEnabled = [];
            }) 
          });
        }
      }
    },   
    computed:{
      VisiblePosts: {
        get:function(){
          return this.posts.slice().reverse().slice((this.page - 1) * this.perPage, this.page* this.perPage)
        },
        set:function(search_posts){
          if(this.postlabel == 'POSTS BY USER'){
            this.$store.dispatch("postsByUser", search_posts);
          }
          else{
            this.$store.dispatch("postsData", search_posts);
          }
        }
      }, 
      IsDeleteEnabled:{
        get:function(){
          return this.CheckedPosts.length > 0 ? false : true
        },
        set:function(arr){
          this.CheckedPosts = arr
        }
      }, 
      ...mapGetters(["usersData"]),     
      Pageslength(){
        return Math.ceil(this.posts.length / this.perPage);
      }
    },

  }
</script>
