import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Index from '@/components/Index'
import Details from '@/components/Details'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  routes: [{
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/result',
      name: 'Details',
      component: Details
    }
  ]
})
