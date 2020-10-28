import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/components/Home";
import Add from "@/components/Adds/Add";
import AddList from "@/components/Adds/AddList";
import NewAdd from "@/components/Adds/NewAdd";
import Login from "@/components/Auth/Login";
import Registration from "@/components/Auth/Registration";
import Orders from "@/components/User/Orders";

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ad/:id',
      name: 'ad',
      component: Add
    },
    {
      path: '/list',
      name: 'list',
      component: AddList
    },
    {
      path: '/new',
      name: 'newAd',
      component: NewAdd
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'reg',
      component: Registration
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
  ],
  mode: 'history'
})
export default router
