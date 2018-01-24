import Vue from 'vue';
import VueRouter from 'vue-router';

import VueAxios from 'vue-axios';
import axios from 'axios';

import App from './App.vue';
import DisplayItem from './components/DisplayItem.vue';
import EditItem from './components/EditItem.vue';
import Home from './components/Home.vue';
import DisplayMenu from './components/DisplayMenu.vue';
import Login from './components/Login.vue'

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const routes = [{
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'Login',
        path: '/login',
        component: Login
    },
    {
        name: 'DisplayItem',
        path: '/displayMenuItems',
        component: DisplayItem
    },
    {
        name: 'DisplayMenu',
        path: '/menu',
        component: DisplayMenu
    },
    {
        name: 'EditItem',
        path: '/edit/:id',
        component: EditItem
    }
];
const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');