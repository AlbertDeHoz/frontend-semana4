import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      public:true
    }

  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "categoria" */ '../views/Login.vue'),
    meta: {
      public:true
    }
  },
  {
    path: '/auth',
    name: 'Autorizacion',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "categoria" */ '../views/authApp.vue'),
    meta: {
      auth:true
    },

    children: [{
      path: '/',
      name: 'authHome',
      component: () => import(/* webpackChunkName: "about" */ '../views/authHome.vue')
    },
    {
      path: 'categorias',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "categoria" */ '../views/categoria.vue')
    },
    {
      path: 'articulos',
      name: 'Articulos',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "articulos" */ '../views/articulos.vue'),
    }
  ],
  },

]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next)=>{
  if(to.matched.some(record  => record.meta.public)){
    next();
  }else if (to.matched.some(record  => record.meta.auth)){
    if (store.state.user && store.state.user.rol === 'Administrador'){
      next({name:"Autorizacion"})
    }else{
      next({name:"Login"})
    }
  }else{
    next();
  }
})
//sesion clase de la noche y aclaración de dudas 52min
export default router
