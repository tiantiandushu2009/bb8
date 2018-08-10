import router from './router'
import axios from 'axios'
import {
  getToken
} from './store'

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})

axios.interceptors.request.use(
  config => {
    if (config.url != '/login') {
      var token = getToken()
      if (token) {
        config.headers.Authorization = 'Bear ' + token;
      }
    }
    return config
  },
  err => {
    return Promise.reject(err);
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: '/login'
          })
      }
    }
    return Promise.reject(error.response)
  }
)
