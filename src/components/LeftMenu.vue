<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-sheet
        color="lighten-4"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        >
          <v-img src="my_img.jpg"></v-img>
        </v-avatar>
        <v-list>
          <div>thamira.wijesinghe@gmail.com</div>
          <div>+79253781721</div>
        </v-list>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text, link, color] in links"
          :key="icon"
          :to="link"
        >
          <v-list-item-icon>
            <v-icon
            :color="color"
            >{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>   
  </div>
</template>

<script>
export default {
  name: 'LeftMenu',
  data() {
    return {
      drawer: null,
      links: [
        ['mdi-account-box', 'Users','/Users', 'primary'],
        ['mdi-inbox-arrow-down', 'Posts','/Posts', 'success'],
        ['mdi-folder-multiple-image', 'Albums','/Albums', 'warning'],
      ],      
    }
  }
}
</script>