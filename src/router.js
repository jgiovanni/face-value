import Vue from "vue";
import { store } from "./store/index";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Landing from "./views/Landing.vue";
import MyAccount from "./views/MyAccount.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/hello",
      name: "Hello",
      component: Landing,
      meta: {
        rootClasses: 'landing-page',
        headerClasses: ''
      }
    },
    {
      path: "/about",
      name: "about",
      meta: {
        access: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    
    // Authenticated Routes (User must be logged in)
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        access: true,
      }
    },
    {
      path: "/account",
      name: "settings",
      component: MyAccount,
      meta: {
        access: true,
      }
    },

  ],
  mode: 'history'
});

let promise = new Promise(resolve => {
  router.start = resolve;
});

router.beforeEach(async (to, from, next) => {
  await promise; // wait until 'start' called
  const currentUser = store.getters.user;
  const currentUserData = store.getters.userData;
  const requiresAuth = to.matched.some(record => record.meta.access);
  // debugger;
  if (requiresAuth && !currentUser) next("/hello");
  else if (Array.isArray(to.meta.access) && currentUser) {
    // check if user has access to page
    if (to.meta.access.includes(currentUserData.role)) next();
    // else go to dashboard
    else next("/");
  } else next();
});

router.afterEach((to, from) => {
  // console.log(this);
  $.material.init();
  
  $('.checkbox > label').on('click', function () {
    $(this).closest('.checkbox').addClass('clicked');
  })
});

export default router;
