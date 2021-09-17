<template>
  <v-app id="Albums">


    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >


        <v-row>
          <v-col
            v-for="card in cards"
            :key="card"
            cols="12"
          >

              <v-subheader>{{ card }}</v-subheader>

              <div class="d-flex justify-space-between flex-wrap mb-6">

                <v-card
                    elevation="24"
                    width="300"
                    class="mx-auto mb-10"
                    v-for="item in VisibleAlbums"
                    :key="item.id"
                >
                  <v-system-bar lights-out></v-system-bar>
                  <v-carousel
                    :continuous="false"
                    :cycle="cycle"
                    :show-arrows="false"
                    hide-delimiter-background
                    delimiter-icon="mdi-minus"
                    height="300"
                  >
                    <v-carousel-item
                      v-for="(slide, i) in item.images"
                      :key="i"
                    >
                      <v-sheet
                        height="100%"
                        tile
                      >
                        <v-row
                          class="fill-height"
                          align="center"
                          justify="center"
                        >

                        <v-img
                          :lazy-src="slide.thumbnailUrl"
                          v-bind:src="slide.thumbnailUrl"
                          class="rounded"
                        ></v-img>


                          
                        </v-row>
                      </v-sheet>
                    </v-carousel-item>
                  </v-carousel>
                  <v-list two-line>
                    <v-list-item>
                      <v-list-item-avatar color="success">
                        <v-icon v-text="item.title.substring(0, 2)"></v-icon>
                        <!-- <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img> -->
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{item.title}}</v-list-item-title>
                        <v-list-item-subtitle>Title</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>

              </div>
       
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

  </v-app>
</template>

<script>

  import {mapGetters} from "vuex"
  export default {
    name: 'Albums',
    data: () => ({
      cards: ['Albums'],
      page: 1,
      Pageslength: 1,
      perPage: 4,   
      cycle: false,      
    }),
    watch:{
      AlbumsData(){
        this.Pageslength = Math.ceil(this.AlbumsData.length / this.perPage)
      }
    },    
    computed:{
      ...mapGetters(["AlbumsData"]),
      VisibleAlbums() {
        return this.AlbumsData.slice((this.page - 1) * this.perPage, this.page* this.perPage)
      }, 
    },
    mounted() {
      this.$store.dispatch("AlbumsData");
    }
  }
</script>
