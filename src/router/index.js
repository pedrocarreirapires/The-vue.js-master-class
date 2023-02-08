import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/PageHome'
import ThreadShow from '../pages/PageThreadShow'
import ThreadEdit from '../pages/PageThreadEdit'
import ThreadCreate from '../pages/PageThreadCreate'
import NotFound from '../pages/PageNotFound'
import Forum from '../pages/PageForum'
import Profile from '../pages/PageProfile'
import Register from '../pages/PageRegister'
import SignIn from '../pages/PageSingIn'
import Category from '../pages/PageCategory'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: Category,
      props: true
    },
    {
      path: '/forum/:id',
      name: 'Forum',
      component: Forum,
      props: true
    },
    {
      path: '/thread/create/:forumId',
      name: 'ThreadCreate',
      component: ThreadCreate,
      props: true
    },
    {
      path: '/thread/:id',
      name: 'ThreadShow',
      component: ThreadShow,
      props: true
    },
    {
      path: '/thread/:id/edit',
      name: 'ThreadEdit',
      component: ThreadEdit,
      props: true
    },
    {
      path: '/me',
      name: 'Profile',
      component: Profile,
      props: true,
      meta: {requiresAuth: true}
    },
    {
      path: '/me/edit',
      name: 'ProfileEdit',
      component: Profile,
      props: {edit: true}
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/logout',
      name: 'SignOut',
      beforeEnter (to, from, next) {
        store.dispatch('signOut').then(() => next({name: 'Home'}))
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  console.log(`Navigation to ${to.name} from ${from.name}`)
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (store.state.authId) {
      next()
    } else {
      next({name: 'Home'})
    }
  } else {
    next()
  }
})
export default router
