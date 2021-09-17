<template>
  <v-app id="Home">
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
        ></v-text-field>  

        <v-row class="d-flex flex-row">
          <v-col
            cols="6"
          >
            <v-card>
              <v-card-title>
                Chunk Bytes
              </v-card-title>
              <v-card-subtitle>Learn Web Development In Chunks</v-card-subtitle>
              
               <v-list-item-content>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>E-mail</v-list-item-title>
                    <v-list-item-subtitle>
                      thamira@mail.ru
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Address</v-list-item-title>
                    <v-list-item-subtitle>
                      thamira@mail.ru
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Phone</v-list-item-title>
                    <v-list-item-subtitle>
                      thamira@mail.ru
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item> 

                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Website</v-list-item-title>
                    <v-list-item-subtitle>
                      thamira@mail.ru
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item> 

                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Company</v-list-item-title>
                    <v-list-item-subtitle>
                      thamira@mail.ru
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
              <GoogleMap></GoogleMap>             
            </v-card>                      
          </v-col>
        </v-row>

        <v-row>
          <v-col
            v-for="card in cards"
            :key="card"
            cols="12"
          >
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="n in 6">
                  <v-list-item

                    :key="n"
                  >
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Message {{ n }}</v-list-item-title>

                      <v-list-item-subtitle>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="n !== 6"
                    :key="`divider-${n}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

        <v-pagination
      v-model="page"
      :length="6"
      class="mb-6"
    ></v-pagination>
  </v-app>
</template>

<script>
  import GoogleMap from '../components/GoogleMap.vue'
  
  export default {
    name: 'User',
    data: () => ({
      cards: ['POSTS BY USER'],
      page: 1
      
    }),
    components:{
      GoogleMap
    },
  }
</script>
