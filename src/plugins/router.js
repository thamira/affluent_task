import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts/default.vue';
import Home from '@/screens/Home.vue';
import User from '@/screens/User.vue';
import Users from '@/screens/Users.vue';
import Albums from '@/screens/Albums.vue';
import Posts from '@/screens/Posts.vue';
import Post from '@/screens/Post.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/Users',
        children: [
            {
                path: '/Home',
                name: 'Home',
                component: Home,
            },        
            {
                path: '/User',
                name: 'User',
                component: User,
            },
            {
                path: '/Users',
                name: 'Users',
                component: Users,
            }, 
            {
                path: '/Posts',
                name: 'Posts',
                component: Posts,
            },
            {
                path: '/Post/:id',
                name: 'Post',
                component: Post,
            },             
            {
                path: '/Albums',
                name: 'Albums',
                component: Albums,
            },                                    
        ]
    },

    
]

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;