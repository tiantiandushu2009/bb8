import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

import Index from '@/components/Index'
import Details from '@/components/Details'
import Login from '@/components/Login'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(Element, {
  size: 'medium'
})

Vue.prototype.$http = axios

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/result',
      name: 'Details',
      component: Details
    }
  ]
})
