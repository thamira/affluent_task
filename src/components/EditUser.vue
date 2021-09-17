<template v-slot:default="ShowUserModal">
  <v-card>
    <v-toolbar
      color="dark"
      dark
    >EDIT USER</v-toolbar>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="user.name"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="address"
          label="Address"
        ></v-text-field>

        <v-text-field
          v-model="user.phone"
          label="Phone"
        ></v-text-field>

        <v-text-field
          v-model="company"
          label="Company"
        ></v-text-field>

        <v-text-field
          v-model="user.website"
          label="Website"
        ></v-text-field>

        <v-btn
          color="success"
          @click="EditUser()"
          large
          width="100%"
        >
          EDIT USER
        </v-btn>

      </v-form>
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn
        text
        @click="closeDialog()"
      >Close</v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
  import {mapGetters} from "vuex"
  import { UserInitDataMixins } from '@/mixins/UserInitDataMixins';  

  export default{
    name: 'CreateEditUser',
    props: ['method'],
    data(){
      return {
        valid: true,
        nameRules: [
          v => !!v || 'Name is required',
        ],        
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],

      }
    },
    mixins:[
      UserInitDataMixins
    ],
    computed:{
      ...mapGetters(["currentUser"]),      
    },

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      closeDialog: function(){
        this.$emit('close-dialog');        
      },
      EditUser(){
        if(this.$refs.form.validate()){
          fetch('https://jsonplaceholder.typicode.com/users/'+this.user.id, {
            method: 'PUT',
            body: JSON.stringify(this.user),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
          .then((response) => response.json())
          .then((json) => {
            this.$store.dispatch("currentUser", json)
            this.$toasted.show('Sucess...',{
              position: "bottom-right", 
              duration : 2000,
              class: 'toasting'
            });
            this.closeDialog();            
          });
        }
      }     
    }
  }
</script>

<style scoped="scoped">
  
</style>