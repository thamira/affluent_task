<template>
  <v-app>
    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >

        <v-list-item
          :key="postData.id"
        >
          <v-list-item-avatar color="success">
            <v-icon v-text="icon_text"></v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ postData.title }}</v-list-item-title>

            <v-list-item-subtitle>
              {{postData.body}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-row class="justify-end mt-2 ml-1">
          <v-btn
            :loading="loading"
            :disabled="IsDeleteEnabled"
            color="green"
            class="mt-2 white--text"
            @click="DeleteComments()"
          >
            Delete Selected Comments
          </v-btn>          
        </v-row>

         <v-card class="mt-10">
          <v-subheader>Post Comments</v-subheader>
          <v-list dense>
            <v-list-item-group
            v-model="selectedComment"
            >
              <v-list-item v-for="comment in PostComments" :key="comment.id" class="px-5 py-2">
                 <v-checkbox
                    v-model="CheckedComments"
                    color="success"
                    :value="comment.id"
                    class="pr-5"
                  ></v-checkbox>  
                  <v-list-item-content>                  
                    <v-list-item-title v-html="comment.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="comment.body" class="mb-10"></v-list-item-subtitle>
                    <v-list-item-subtitle v-html="comment.email"></v-list-item-subtitle>
                  </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>



      </v-container>
  </v-main>
  </v-app>
</template>

<script>
  import {mapGetters} from "vuex"
  import axios from 'axios';


  export default {
    name: 'Posts',
    data: () => ({   
      icon_text: 'New',
      selectedComment: null,
      loading: false,
      CheckedComments: [],
    }),
    components:{
    },
    methods:{
      DeleteComments(){
        if(this.CheckedComments.length>0){
          this.loading = true
          this.CheckedComments.forEach(id => {
            axios.delete('https://jsonplaceholder.typicode.com/comments/'+id).then((response) => {
              console.log(response)

              let filterdArray = this.PostComments.filter((comment)=>comment.id != id)
              this.$store.dispatch("removePostComment", filterdArray);
              
              this.$toasted.show('Sucess...',{
                position: "bottom-right", 
                duration : 2000,
                class: 'toasting'
              });

              this.loading = false
              this.IsDeleteEnabled = []
            }) 
          });
        }
      }
    },
    watch:{
      'postData.title': function(){
        this.icon_text = this.postData.title.substring(0, 2)
      }
    },    
    computed:{
      ...mapGetters(["postData", "PostComments"]),
      IsDeleteEnabled:{
        get:function(){
          return this.CheckedComments.length > 0 ? false : true
        },
        set:function(arr){
          this.CheckedComments = arr
        }
      },       
    },
    mounted() {
      this.$store.dispatch("postData", this.$route.params.id);
      this.$store.dispatch("PostComments", this.$route.params.id);
    }    
  }
</script>
