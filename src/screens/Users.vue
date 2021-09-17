<template>
  <v-app id="Users"> 
    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
       <v-text-field
          placeholder="Search Users"
          filled
          rounded
          dense
          v-model="SearchUser"
        ></v-text-field>  

        <v-row class="justify-end">
          <v-btn
            :loading="loading"
            :disabled="loading"
            color="blue"
            class="ma-2 white--text"
            @click="ShowUserModal = true"
          >
            Create User
            <v-icon
              right
              dark
            >
              mdi-account-star
            </v-icon>
          </v-btn>

          <v-btn
            :loading="loading"
            :disabled="IsDeleteEnabled"
            color="dark"
            class="ma-2 white--text"
            @click="DeleteUser()"
          >
            Remove Selected Users
            <v-icon
              right
              dark
            >
              mdi-account-remove
            </v-icon>
          </v-btn>                    
        </v-row>


        <v-row>
          <v-col
            v-for="card in cards"
            :key="card"
            cols="12"
          >
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list dense>
                <v-list-item-group color="primary">                
                  <template >
                    <v-list-item v-for="(item) in VisibleUsers"
                      :key="item.id"
                    >
                      <v-list-item-avatar color="primary darken-1">
                        <v-icon v-text="item.name.substring(0, 2)"></v-icon>
                      </v-list-item-avatar>

                      <v-list-item three-line @click="SetCurrentUser(item)">
                        <v-list-item-content>
                          <v-list-item-title v-text="item.name"></v-list-item-title>

                          <v-list-item-subtitle>
                            Login: {{item.username}} 
                          </v-list-item-subtitle>

                          <v-list-item-subtitle>
                            E-mail: {{item.email}}
                          </v-list-item-subtitle>                        
                        </v-list-item-content>
                      </v-list-item>

                       <v-checkbox
                          v-model="CheckedUsers"
                          color="primary"
                          :value="item.id"
                          class="pr-5"
                        ></v-checkbox>                       
                    </v-list-item>

                  </template>
                </v-list-item-group>
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
      </v-container>
    </v-main>

    <v-dialog v-model="ShowUserModal" width="450" >
      <CreateUser v-on:close-dialog="ShowUserModal = false"></CreateUser>
    </v-dialog>
    

  </v-app>
</template>

<script>
  import axios from 'axios';  
  import {mapGetters} from "vuex"

  import { UserBasicDataMixins } from '@/mixins/UserBasicDataMixins'; 
  import CreateUser from "../components/CreateUser.vue"  
  
  export default {
    name: 'Users',
    data: () => ({
      cards: ['USERS'],
      page: 1,
      loading: false,
      perPage: 5,
      SearchUser: null,
      CheckedUsers: [],
      ShowUserModa: true,
      ShowUserModal: false,
    }),
    components:{
      CreateUser
    },
    mixins:[UserBasicDataMixins],
    methods:{
      SetCurrentUser(user){
        this.$store.dispatch("currentUser", user);
        this.$router.push('User');
      },
      DeleteUser(){
        if(this.CheckedUsers.length>0){
          this.loading = true
          this.CheckedUsers.forEach(id => {
            axios.delete('https://jsonplaceholder.typicode.com/users/'+id).then((response) => {
              console.log(response);
              let filterdArray = this.VisibleUsers.filter((post)=>post.id != id)

              this.VisibleUsers = filterdArray.reverse();
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
      SearchUser(){
        this.VisibleUsers = this.usersData.filter((user) => user.name.toLowerCase().includes(this.SearchUser.toLowerCase()) && this.SearchUser != '' )
      }
    },
    computed: {
      ...mapGetters(["usersData", "currentUser"]),

      VisibleUsers: {
        get:function(){
          return this.usersData.slice().reverse().slice((this.page - 1) * this.perPage, this.page* this.perPage)
        },
        set:function(search_users){
          this.$store.dispatch("usersData", search_users);
        }
      },  
      IsDeleteEnabled:{
        get:function(){
          return this.CheckedUsers.length > 0 ? false : true
        },
        set:function(arr){
          this.CheckedUsers = arr
        }
      },        
      Pageslength(){
        return Math.ceil(this.usersData.length / this.perPage);
      }         
    },
    mounted() {
      this.$store.dispatch("usersData");
    }    
  }
</script>
