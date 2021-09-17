<template>
  <v-app id="User">


    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >

        <v-row class="d-flex flex-row" v-if="currentUser">
          <v-col
            cols="6"
          >
            <v-card>
              <v-card class="d-flex justify-space-between flex-row mb-6">
                <div>
                  <v-card-title v-text="user.name"></v-card-title>
                  <v-card-subtitle>{{user.website}}</v-card-subtitle>
                </div>
                <v-icon
                  right
                  dark
                  class="mr-5"
                  color="primary"
                  @click="EditUserModal()"
                >
                  mdi-account-star
                </v-icon>
              </v-card>

               <v-list-item-content>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>E-mail</v-list-item-title>
                    <v-list-item-subtitle>
                      {{user.email}}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Address</v-list-item-title>
                    <v-list-item-subtitle>
                       {{address}}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Phone</v-list-item-title>
                    <v-list-item-subtitle>
                      {{user.phone}}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item> 


                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Company</v-list-item-title>
                    <v-list-item-subtitle>
                      {{company}}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>   
              </v-list-item-content>                                                           
            </v-card>
          </v-col>

          <v-col
            cols="6"
          >
            <v-card height="100%">
              <GoogleMap :center="location"></GoogleMap>             
            </v-card>                      
          </v-col>
        </v-row>


        <PostsList :postlabel="'POSTS BY USER'" :posts="postsByUser" :perPage="5" class="mt-10"></PostsList>
        <v-dialog v-model="ShowUserModal" width="450" >
          <EditUser v-on:close-dialog="ShowUserModal = false"></EditUser>
        </v-dialog>

      </v-container>
    </v-main>

  </v-app>
</template>

<script>
  import GoogleMap from '../components/GoogleMap.vue'
  import { UserInitDataMixins } from '@/mixins/UserInitDataMixins';
  import {mapGetters} from "vuex"
  import PostsList from "../components/PostsList.vue"
  import EditUser from "../components/EditUser.vue"  

  export default {
    name: 'User',
    data: () => ({
      cards: ['USER ALBUMS','POSTS BY USER'],
      page: 1,
      // location: {lat: 6.927079, lng: 79.861244 },
      ShowUserModal: false,
    }),
    components:{
      GoogleMap,
      PostsList,
      EditUser
    },
    computed:{
      ...mapGetters(["currentUser", "postsByUser"]),
    
    },
    mixins: [
      UserInitDataMixins
    ],    
    methods: {
      EditUserModal(){
        if(this.user.id){
          this.ShowUserModal = true;
        }
        else{
          this.$toasted.show('This *MOCK-UP user can\'t edit...',{
            position: "bottom-right", 
            duration : 2000,
            class: 'toasting warning'
          });          
        }
      }
    }, 
    mounted(){
      if(!this.currentUser){
        this.$router.push({ name: 'Users' });
      }
      this.$store.dispatch("postsByUser");
    }
  }
</script>
