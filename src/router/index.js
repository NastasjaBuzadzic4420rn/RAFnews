import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/users',
    name: 'Users',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Categories.vue')
  },

  {
    path: '/editCategory/:id',
    name: 'EditCategory',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/EditCategory.vue')
  },
  {
    path: '/news/:id',
    name: 'News',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/News.vue')
  },
  {
    path: '/addArticle',
    name: 'AddArticle',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/AddArticle.vue')
  },
  {
    path: '/editArticle/:id',
    name: 'EditArticle',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/EditArticle.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      next({name: 'Login'});
      return;
    }

    const payload = JSON.parse(atob(jwt.split('.')[1]));
    const expDate = new Date(payload.exp * 1000);
    if (expDate < new Date()) {
      next({name: 'Login'});
      return;
    }
  }

  next();
});

export default router
