import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import  {getCookie}  from "./utils/index"

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      // name: 'home',
      // component: Home,
      redirect:'/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/show',
      name: 'show',
      component: () => import(/* webpackChunkName: "about" */ './views/Show.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/grade',
      name: 'grade',
      component: () => import(/* webpackChunkName: "about" */ './views/Grade.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/rector',
      name: 'rector',
      component: () => import(/* webpackChunkName: "about" */ './views/Rector.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/charts',
      name: 'charts',
      component: () => import(/* webpackChunkName: "about" */ './views/Charts.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to.path)
  // if(to.path ==="/login"){
  //   if(getCookie()){
  //     next({
  //       path: '/show',
  //     })
  //   }
  //   else {
  //     next()
  //   }
  // }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    if (!getCookie()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default  router