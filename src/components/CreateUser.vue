<template v-slot:default="ShowUserModal">
  <v-card>
    <v-toolbar
      color="dark"
      dark
    >CREATE USER</v-toolbar>
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
          @click="CreateUser()"
          large
          width="100%"
        >
          CREATE USER
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
  import { UserBasicDataMixins } from '@/mixins/UserBasicDataMixins';  
  // import axios from 'axios';

  export default{
    name: 'CreateUser',
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
        address: null,
        company: null,
        location: {lat: 6.927079, lng: 79.861244 }

      }
    },
    mixins:[
      UserBasicDataMixins
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
      CreateUser(){
        if(this.$refs.form.validate()){
          this.user.address = {
            city: this.address,
            street: '',
            suite: '',
            geo: this.location
          };
          this.user.company = {name: this.company } 

          console.log(this.user)
          fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify(this.user),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
          .then((response) => response.json())
          .then((json) => {
            console.log(json)
            json.address.geo =  { lat: 6.927079, lng: 79.861244}
            json.id = null
            this.$toasted.show('Success...',{
              position: "bottom-right", 
              duration : 2000,
              class: 'toasting'
            });
            
            this.closeDialog();   
            this.$store.dispatch("currentUser", json);
            this.$router.push('User')                     
          });
        }

      },  
    }
  }
</script>

<style scoped="scoped">
  
</style>