import Vue from 'vue'
import Vuex from 'vuex'
import posts from "@/store/posts";
import users from "@/store/users";
import albums from "@/store/albums";

Vue.use(Vuex)


const store = new Vuex.Store({
    modules: {
      posts,
      users,
      albums,
    },
	state: {},    
    getters: {},
    actions: {},
    mutations: {},	
})

export default store;

